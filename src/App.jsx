import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import CreateUser from "./CreateUser";
import Dashboard from "./dashboard";
import DoctorLogin from "./doctorLogin";
import MedicineInventory from "./medicineInventory";
import DoctorDashboard from "./doctorDashboard";
import DoctorMedicineInventory from "./doctorMedicineInventory";

function App() {// This is the main component that sets up routing for the application
  return (
    <BrowserRouter>
      <Routes> 
        <Route path="/" element={<Login />} />
        <Route path="/doctorlogin" element={<DoctorLogin />} />
        <Route path="/createuser" element={<CreateUser />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/medicineInventory" element={<MedicineInventory />} />
        <Route path="/doctorDashboard" element={<DoctorDashboard />} />
        <Route path="/doctorMedicineInventory" element={<DoctorMedicineInventory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
