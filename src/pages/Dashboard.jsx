import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc
} from "firebase/firestore";
import "../components/Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);

  // 🔓 logout
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  // 🔥 fetch programări
  const fetchAppointments = async () => {
    try {
      const q = query(
        collection(db, "appointments"),
        where("userId", "==", auth.currentUser.uid)
      );

      const querySnapshot = await getDocs(q);

      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setAppointments(data);

    } catch (error) {
      console.log(error);
    }
  };

  // 🗑️ delete
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "appointments", id));
      fetchAppointments(); // refresh
    } catch (error) {
      console.log(error);
    }
  };

    useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
        fetchAppointments(user.uid);
        }
    });

    return () => unsubscribe();
    }, []);

  return (
    <div className="dashboard">

      <div className="navbar">
        <h2>Happy Paws 🐾</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <div className="content">
        <h3>Programările mele</h3>

        <button onClick={() => navigate("/add")}>
          + Adaugă programare
        </button>

        <div className="appointments">

          {appointments.length === 0 ? (
            <p>Nu ai programări încă.</p>
          ) : (
            appointments.map(app => (
              <div key={app.id} className="card">
                
            <h4>{app.petName}</h4>
            <p>📅 {app.date}</p>
            <p>🕒 {app.time}</p>
            <p>🩺 {app.problem}</p>

                {/* 🔥 BUTOANE */}
                <div>
                  <button onClick={() => handleDelete(app.id)}>
                    Șterge
                  </button>

                  <button onClick={() => navigate(`/edit/${app.id}`)}>
                    Editează
                  </button>
                  <button onClick={() => navigate("/map")}>
                    Vezi locația clinicii
                </button>
                </div>

              </div>
            ))
          )}

        </div>
      </div>

    </div>
  );
}

export default Dashboard;