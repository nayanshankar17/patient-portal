import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import CreateUser from "./CreateUser";
import Dashboard from "./Dashboard";
import DoctorLogin from "./doctorLogin";
import MedicineInventory from "./medicineInventory";

function App() {// This is the main component that sets up routing for the application
  return (
    <BrowserRouter>
      <Routes> 
        <Route path="/" element={<Login />} />
        <Route path="/doctorlogin" element={<DoctorLogin />} />
        <Route path="/createuser" element={<CreateUser />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/medicineInventory" element={<MedicineInventory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
