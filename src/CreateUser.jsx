import { useState } from "react";
import { users, addUser } from "./users";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [role, setRole] = useState("");

  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (name.trim().length < 2) {
      setError("Name must be at least 2 characters");
      return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      setError("Enter a valid 10-digit phone number");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    // Check if user already exists
    const existingUser = users.find((u) => u.phone === phone);
    if (existingUser) {
      setError("User with this phone number already exists");
      return;
    }

    // Create new user
    const newUser = {
      id: Date.now(),
      name,
      phone,
      password,
      role,
    };

    addUser(newUser);

    setSuccess("User created successfully! You can now log in.");
    setError("");
    setName("");
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
        <h2 style={{ textAlign: "center", color: "#881337", margin: "0 0 2.5rem 0", fontSize: "1.875rem", fontWeight: "800", letterSpacing: "-0.025em" }}>Create New User</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError("");
          }}
          style={{ width: "100%", boxSizing: "border-box", padding: "0.875rem 1.25rem", marginBottom: "1.5rem", backgroundColor: "#f8fafc", color: "#0f172a", border: "1px solid #cbd5e1", borderRadius: "0.75rem", fontSize: "1rem", outline: "none", transition: "all 0.2s ease" }}
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
            setError("");
          }}
          style={{ width: "100%", boxSizing: "border-box", padding: "0.875rem 1.25rem", marginBottom: "1.5rem", backgroundColor: "#f8fafc", color: "#0f172a", border: "1px solid #cbd5e1", borderRadius: "0.75rem", fontSize: "1rem", outline: "none", transition: "all 0.2s ease" }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
          style={{ width: "100%", boxSizing: "border-box", padding: "0.875rem 1.25rem", marginBottom: "1.5rem", backgroundColor: "#f8fafc", color: "#0f172a", border: "1px solid #cbd5e1", borderRadius: "0.75rem", fontSize: "1rem", outline: "none", transition: "all 0.2s ease" }}
        />

        {error && <p style={{ color: "#ef4444", fontSize: "0.875rem", marginBottom: "1.5rem", marginTop: "-0.5rem", backgroundColor: "#fef2f2", padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid #fecaca", textAlign: "center" }}>{error}</p>}
        {success && <p style={{ color: "#16a34a", fontSize: "0.875rem", marginBottom: "1.5rem", marginTop: "-0.5rem", backgroundColor: "#f0fdf4", padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid #bbf7d0", textAlign: "center" }}>{success}</p>}

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "0.875rem",
            backgroundColor: "#16a34a",
            color: "white",
            border: "none",
            borderRadius: "0.75rem",
            fontSize: "1rem",
            fontWeight: "600",
            cursor: "pointer",
            boxShadow: "0 4px 6px -1px rgba(22, 163, 74, 0.4)",
            transition: "all 0.2s ease",
          }}
        >
          Create Account
        </button>
        <p style={{
          marginTop: "1.75rem",
          background: "none",
          border: "none",
          color: "#64748b",
          textAlign: "center",
          fontSize: "0.95rem",
        }}> Already have an account?
          <button
            type="button"
            onClick={() => navigate("/")}
            style={{
              color: "#e11d48",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "0.95rem",
              paddingLeft: "0.5rem",
              textDecoration: "none",
            }}
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
}

export default CreateUser;
