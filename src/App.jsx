import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddAppointment from "./pages/AddAppointment";
import EditAppointment from "./pages/EditAppointment";
import MapPage from "./pages/MapPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/add" element={<AddAppointment />} />
      <Route path="/edit/:id" element={<EditAppointment />} />
      <Route path="/map" element={<MapPage />} />
    </Routes>
  );
}

export default App;



