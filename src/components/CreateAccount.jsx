import React, { useState } from "react";
import axios from "axios";

const CreateAccount = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/register", { email, password });
      alert("Account created! Please log in.");
      onClose();
    } catch (error) {
      console.error("Account creation failed:", error);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: "0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "1.5rem",
          borderRadius: "8px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          width: "350px",
        }}
      >
        <h2 style={{ fontSize: "1.25rem", fontWeight: "600", textAlign: "center", marginBottom: "1rem" }}>
          Create Account
        </h2>
        <form onSubmit={handleCreateAccount} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <input
            type="email"
            placeholder="Enter Email"
            style={{
              border: "1px solid #ccc",
              padding: "0.5rem",
              borderRadius: "5px",
              fontSize: "1rem",
              outlineColor: "#10b981",
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter Password"
            style={{
              border: "1px solid #ccc",
              padding: "0.5rem",
              borderRadius: "5px",
              fontSize: "1rem",
              outlineColor: "#10b981",
            }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            style={{
              backgroundColor: "#10b981",
              color: "white",
              padding: "0.5rem",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "1rem",
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = "#059669"}
            onMouseOut={(e) => e.target.style.backgroundColor = "#10b981"}
          >
            Create Account
          </button>
        </form>
        <button
          onClick={onClose}
          style={{
            color: "#ef4444",
            marginTop: "1rem",
            display: "block",
            width: "100%",
            textAlign: "center",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CreateAccount;
