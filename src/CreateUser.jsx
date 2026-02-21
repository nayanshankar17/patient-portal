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
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#FFFBE6",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          padding: "2rem",
          border: "none",
          borderRadius: "8px",
          width: "320px",
          backgroundColor: "white",
          boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
          color: "black",
        }}
      >
        <h2 style={{ textAlign: "center", color: "black" }}>Create New User</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError("");
          }}
          style={{ width: "95%", padding: "0.5rem", marginBottom: "1rem", backgroundColor: "white", color: "black", borderRadius: "0.5rem" }}
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
            setError("");
          }}
          style={{ width: "95%", padding: "0.5rem", marginBottom: "1rem", backgroundColor: "white", color: "black", borderRadius: "0.5rem" }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
          style={{ width: "95%", padding: "0.5rem", marginBottom: "1rem", backgroundColor: "white", color: "black", borderRadius: "0.5rem" }}
        />

        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "0.6rem",
            backgroundColor: "#16a34a",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Create Account
        </button>
        <p style={{
          marginTop: "1rem",
          background: "none",
          border: "none",
          color: "black",
          textAlign: "center",
        }}> Already have an account?
          <button
            type="button"
            onClick={() => navigate("/")}
            style={{
              color: "#2563eb",
              background: "none",
              border: "none",
              cursor: "pointer",
              textDecoration: "underline",
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
