import { useState } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import "../components/Form.css";

function AddAppointment() {
  const [petName, setPetName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [problem, setProblem] = useState("");
  const [takenTimes, setTakenTimes] = useState([]);

  const navigate = useNavigate();

  const allTimes = [
    "09:00", "10:00", "11:00", "12:00",
    "13:00", "14:00", "15:00", "16:00"
  ];

  const fetchTakenTimes = async (selectedDate) => {
    const q = query(
      collection(db, "appointments"),
      where("date", "==", selectedDate)
    );

    const snapshot = await getDocs(q);
    const times = snapshot.docs.map((doc) => doc.data().time);
    setTakenTimes(times);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!petName || !date || !time || !problem) {
      alert("Completează toate câmpurile!");
      return;
    }

    try {
      const q = query(
        collection(db, "appointments"),
        where("date", "==", date),
        where("time", "==", time)
      );

      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        alert("Există deja o programare la această dată și oră!");
        return;
      }

      await addDoc(collection(db, "appointments"), {
        userId: auth.currentUser.uid,
        petName,
        date,
        time,
        problem
      });

      await emailjs.send(
        "service_eu2djlg",
        "template_qqew6du",
        {
          to_email: auth.currentUser.email,
          petName,
          date,
          time,
          problem
        },
        {
          publicKey: "BV6Au7cWGEzHWQ9rK"
        }
      );

      alert("Programare adăugată!");
      navigate("/dashboard");
    } catch (error) {
      console.log("EROARE:", error);
      alert("A apărut o eroare la salvarea programării.");
    }
  };

  return (
    <div className="form-wrapper">
      <div className="form-container">
        <h2>Adaugă programare 🐾</h2>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Nume animal"
            value={petName}
            onChange={(e) => setPetName(e.target.value)}
          />

          <input
            type="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              setTime("");
              fetchTakenTimes(e.target.value);
            }}
          />

          <select
            value={time}
            onChange={(e) => setTime(e.target.value)}
          >
            <option value="">Selectează ora</option>

            {allTimes.map((hour) =>
              !takenTimes.includes(hour) ? (
                <option key={hour} value={hour}>
                  {hour}
                </option>
              ) : null
            )}
          </select>

          <input
            placeholder="Problemă"
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
          />

          <button type="submit">Salvează</button>
          <button type="button" onClick={() => navigate("/dashboard")}>
            Înapoi
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddAppointment;