import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { users } from "./users";

function Login() {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [role, setRole] = useState("");

  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = users.find(
      (u) => u.phone === phone && u.password === password && u.role === "patient"
    );

    if(!user){
      setError("Invalid phone number orpassword");
      setPhone(""); 
      setPassword("");  
    return;
    }

    setError("");
    localStorage.setItem("isLoggedIn", "true"); // The user is currently logged in, even after refresh will stay on the same page
    localStorage.setItem("userPhone", phone); // This stores who is logged in.

    // alert("Login successful (mock)");
    navigate("/dashboard"); // works both for patient and doctor, but later will make different dashboards for doctor and patient, and will navigate accordingly
    setPhone(""); 
    setPassword("");
    setRole("");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#FFFBE6",
      }}
    >
      <div onClick={() => {
            navigate("/doctorlogin");
        }}style={{
            position: "fixed",
            top: "85vh",
            right: "5vw",
            backgroundColor: "white",
            color: "white",
            padding: "10px 20px",
            borderRadius: "8px",
            fontSize: "20px",
            fontWeight: "250px",
          }}
          onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.5)"
          }}
          onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0)"
        }}>
          🩺
        </div>
      <form
        onSubmit={handleSubmit}
        style={{
          padding: "2rem",
          // border: "1px solid black",
          borderRadius: "8px",
          width: "320px",
          backgroundColor: "white",
          boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
        }}
      >
        <h2 style={{ textAlign: "center", color: "black"}}>MediConnect</h2>

        <h3 style={{ textAlign: "center", color: "black", marginTop: "0px"}}>Patient Login</h3>

        <div style={{ marginBottom: "1rem" }}>
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{ width: "93%", padding: "0.5rem", backgroundColor: "white", color: "black", borderRadius: "0.5rem" }}

          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "93%", padding: "0.5rem", backgroundColor: "white", color: "black", borderRadius: "0.5rem"}}
          />
        </div>

        {/* <div style={{ marginBottom: "1rem" }}>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{
              width: "99%",
              padding: "0.5rem",
              marginBottom: "1rem",
              backgroundColor: "white",
              color: "black",
            }}
          >
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
          </select>
        </div> */}

        {error && (
          <p style={{ color: "red", fontSize: "0.9rem" }}>{error}</p>
        )}

        <button
          type="submit"
          style={{
            width: "99%",
            padding: "0.6rem",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Login
        </button>
        <p style={{
          marginTop: "1rem",
          background: "none",
          border: "none",
          color: "black",
          textAlign: "center",
        }}>New User?
          <button
            type="button"
            onClick={() => navigate("/createuser")}
            style={{
              color: "#2563eb",
              background: "none",
              border: "none",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Create new user
          </button>
        </p>
        
      </form>
    </div>
  );
}

export default Login;
