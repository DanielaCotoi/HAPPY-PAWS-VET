import { useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";
import "../components/Form.css";

function EditAppointment() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [petName, setPetName] = useState("");
  const [date, setDate] = useState("");
  const [problem, setProblem] = useState("");

  // 🔥 ia datele existente
  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "appointments", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setPetName(data.petName);
        setDate(data.date);
        setProblem(data.problem);
      }
    };

    fetchData();
  }, [id]);

  // 🔥 update în Firestore
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await updateDoc(doc(db, "appointments", id), {
        petName,
        date,
        problem
      });

      alert("Programare actualizată!");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="form-wrapper">
      <div className="form-container">

        <h2>Editează programare ✏️</h2>

        <form onSubmit={handleUpdate}>
          <input
            value={petName}
            onChange={(e) => setPetName(e.target.value)}
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <input
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
          />

          <button type="submit">Salvează</button>
        </form>

      </div>
    </div>
  );
}

export default EditAppointment;