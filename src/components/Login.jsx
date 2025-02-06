import React, { useState } from "react";
import { FaGoogle, FaGithub, FaEye, FaEyeSlash } from "react-icons/fa";
import CreateAccount from "./CreateAccount";
import axios from "axios";

const Login = () => {
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/login", { email, password });
      if (response.data.success) {
        alert("Login successful!");
        window.location.href = "/editor";
      } else {
        alert("Create an account first");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div
        style={{
          width: "50%",
          backgroundImage: "url('/code editor.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <div style={{ width: "50%", display: "flex", justifyContent: "center", alignItems: "center", background: "linear-gradient(to right, #1e293b, #0f172a)" }}>
        <div style={{ backgroundColor: "#fff", padding: "2rem", borderRadius: "8px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", width: "350px" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", textAlign: "center", marginBottom: "1.5rem" }}>Login</h2>
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <input
              type="email"
              placeholder="Email"
              style={{
                border: "1px solid #ccc",
                padding: "0.5rem",
                borderRadius: "5px",
                fontSize: "1rem",
                outlineColor: "#3b82f6",
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                style={{
                  width: "88%",
                  border: "1px solid #ccc",
                  padding: "0.5rem",
                  borderRadius: "5px",
                  fontSize: "1rem",
                  outlineColor: "#3b82f6",
                  paddingRight: "2rem",
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  color: "#555",
                }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <button
              type="submit"
              style={{
                backgroundColor: "#3b82f6",
                color: "white",
                padding: "0.5rem",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "1rem",
                transition: "background-color 0.3s ease",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#2563eb")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#3b82f6")}
            >
              Login
            </button>
          </form>
          <button
            onClick={() => setShowCreateAccount(true)}
            style={{
              color: "#2563eb",
              marginTop: "1rem",
              marginLeft: "104px",
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            Create an account
          </button>
          <div style={{ display: "flex", gap: "1rem", marginTop: "2rem", justifyContent: "center" }}>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.5rem",
                border: "1px solid #ccc",
                borderRadius: "5px",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#f1f5f9")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "transparent")}
            >
              <FaGoogle /> Google
            </button>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.5rem",
                border: "1px solid #ccc",
                borderRadius: "5px",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#f1f5f9")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "transparent")}
            >
              <FaGithub /> GitHub
            </button>
          </div>
        </div>
      </div>
      {showCreateAccount && <CreateAccount onClose={() => setShowCreateAccount(false)} />}
    </div>
  );
};

export default Login;
