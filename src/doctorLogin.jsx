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
      (u) => u.phone === phone && u.password === password && u.role === "doctor"
    );

    if(!user){
      setError("Invalid phone number or password");
      setPhone(""); 
      setPassword("");
      return;
    }

    setError("");
    localStorage.setItem("isLoggedIn", "true"); // The user is currently logged in, even after refresh will stay on the same page
    localStorage.setItem("userPhone", phone); // This stores who is logged in.

    navigate("/doctorDashboard"); // different dashboards for doctor and patient, and will navigate accordingly
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
        fontFamily: "'Inter', 'Roboto', 'Segoe UI', sans-serif",
        background: "linear-gradient(135deg, #fff1f2 0%, #ffe4e6 100%)",
      }}
    >
      <div onClick={() => {
            navigate("/");
        }}style={{
            position: "fixed",
            bottom: "40px",
            right: "40px",
            backgroundColor: "white",
            color: "#881337",
            height: "64px",
            width: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            fontSize: "28px",
            cursor: "pointer",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            zIndex: 1000,
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-4px)"
          e.currentTarget.style.boxShadow = "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
          }}
          onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)"
          e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
        }}>
          👤
        </div>
      <form
        onSubmit={handleSubmit}
        style={{
          padding: "3rem 2.5rem",
          borderRadius: "16px",
          width: "360px",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.6)",
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.15)",
        }}
      >
        <h2 style={{ textAlign: "center", color: "#881337", margin: "0 0 8px 0", fontSize: "1.875rem", fontWeight: "800", letterSpacing: "-0.025em"}}>MediConnect</h2>

        <h3 style={{ textAlign: "center", color: "#64748b", margin: "0 0 2.5rem 0", fontSize: "1.125rem", fontWeight: "500"}}>Staff Login</h3>

        <div style={{ marginBottom: "1.5rem" }}>
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{ width: "100%", boxSizing: "border-box", padding: "0.875rem 1.25rem", backgroundColor: "#f8fafc", color: "#0f172a", border: "1px solid #cbd5e1", borderRadius: "0.75rem", fontSize: "1rem", outline: "none", transition: "all 0.2s ease" }}

          />
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", boxSizing: "border-box", padding: "0.875rem 1.25rem", backgroundColor: "#f8fafc", color: "#0f172a", border: "1px solid #cbd5e1", borderRadius: "0.75rem", fontSize: "1rem", outline: "none", transition: "all 0.2s ease"}}
          />
        </div>

        {error && (
          <p style={{ color: "#ef4444", fontSize: "0.875rem", marginBottom: "1.5rem", marginTop: "-0.5rem", backgroundColor: "#fef2f2", padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid #fecaca", textAlign: "center" }}>{error}</p>
        )}

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "0.875rem",
            backgroundColor: "#e11d48",
            color: "white",
            border: "none",
            borderRadius: "0.75rem",
            fontSize: "1rem",
            fontWeight: "600",
            cursor: "pointer",
            boxShadow: "0 4px 6px -1px rgba(225, 29, 72, 0.4)",
            transition: "all 0.2s ease",
          }}
        >
          Login
        </button>
        
      </form>
    </div>
  );
}

export default Login;
