import React, { useState } from "react";
import { FaClipboard, FaTimes, FaUserPlus, FaSignInAlt } from "react-icons/fa";

const RoomCodeComponent = ({ onJoinRoom }) => {
  const [roomCode, setRoomCode] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateRoomCode = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setGeneratedCode(code);
    setShowModal(true);
    setCopied(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
        backgroundColor: "#121212", // Dark background
        color: "#fff",
      }}
    >
      {/* Generate Room Code Button */}
      <button
        onClick={generateRoomCode}
        style={{
          padding: "12px 20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          transition: "0.3s",
          width: "250px",
          justifyContent: "center",
        }}
      >
        <FaUserPlus /> Generate Room Code
      </button>

      {/* Room Code Input & Join Button */}
      <div
        style={{
          marginTop: "15px",
          display: "flex",
          gap: "10px",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <input
          type="text"
          placeholder="Enter Room Code"
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value)}
          style={{
            padding: "10px",
            width: "60%",
            minWidth: "180px",
            border: "2px solid #4CAF50",
            borderRadius: "5px",
            fontSize: "16px",
            textAlign: "center",
            backgroundColor: "#fff",
            color: "#000",
          }}
        />
        <button
          onClick={() => onJoinRoom(roomCode)}
          style={{
            padding: "12px 20px",
            backgroundColor: "#2196F3",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            transition: "0.3s",
            width: "120px",
            justifyContent: "center",
          }}
        >
          <FaSignInAlt /> Join
        </button>
      </div>

      {/* Modal for Generated Room Code */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "10px",
              textAlign: "center",
              width: "300px",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
              animation: "fadeIn 0.3s ease-in-out",
            }}
          >
            <h3 style={{ marginBottom: "10px", color: "#000" }}>Share Room Code</h3>
            <p
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                backgroundColor: "#eee",
                padding: "10px",
                borderRadius: "5px",
                display: "inline-block",
                letterSpacing: "2px",
                color: "#000",
              }}
            >
              {generatedCode}
            </p>

            {/* Copy Button */}
            <div style={{ marginTop: "15px" }}>
              <button
                onClick={handleCopy}
                style={{
                  padding: "8px 15px",
                  backgroundColor: copied ? "#4CAF50" : "#FF9800",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  transition: "0.3s",
                }}
              >
                <FaClipboard /> {copied ? "Copied!" : "Copy"}
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              style={{
                marginTop: "15px",
                padding: "8px 15px",
                backgroundColor: "#F44336",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                transition: "0.3s",
              }}
            >
              <FaTimes /> Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomCodeComponent;
