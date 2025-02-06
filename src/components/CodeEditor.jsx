import React, { useState } from "react";
import axios from "axios";
import MonacoEditor from "react-monaco-editor";
import Select from "react-select";
import { FaSun, FaMoon, FaUserPlus, FaTimes, FaClipboard } from "react-icons/fa";

const CodeEditor = () => {
  const [files, setFiles] = useState([
    { id: 1, name: "main.c", language: "c", content: "// Write your C code here" },
  ]);
  const [activeFile, setActiveFile] = useState(files[0]);
  const [output, setOutput] = useState("Compiling...");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [roomCode, setRoomCode] = useState("");
  const [showModal, setShowModal] = useState(false);

  const languageOptions = [
    { value: "c", label: "C", id: 50 },
    { value: "cpp", label: "C++", id: 54 },
    { value: "python", label: "Python", id: 71 },
    { value: "javascript", label: "JavaScript", id: 63 },
  ];

  const compileCode = async (sourceCode, language) => {
    setOutput("Compiling...");
    const languageId = languageOptions.find((opt) => opt.value === language)?.id;
    if (!languageId) {
      setOutput("Invalid Language Selected.");
      return;
    }

    try {
      const response = await axios.post(
        "https://judge0-ce.p.rapidapi.com/submissions",
        {
          language_id: languageId,
          source_code: sourceCode,
          stdin: "",
        },
        {
          headers: {
            "X-RapidAPI-Key": "YOUR_RAPIDAPI_KEY", // Replace with your actual API key
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          },
        }
      );
      setOutput(response.data.stdout || response.data.stderr || "No Output");
    } catch (error) {
      setOutput("Compilation Error");
      console.error(error);
    }
  };

  const generateRoomCode = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setRoomCode(code);
    setShowModal(true);
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        height: "100vh",
        backgroundColor: isDarkMode ? "#1e1e1e" : "#ffffff",
        color: isDarkMode ? "white" : "black",
        display: "flex",
      }}
    >
      {/* Left Side: Code Editor */}
      <div style={{ flex: 1, padding: "20px", borderRight: isDarkMode ? "2px solid #444" : "2px solid #ccc" }}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
          <h2 style={{ flex: 1 }}>Code Editor</h2>
          <Select
            styles={{
              control: (provided) => ({
                ...provided,
                width: 150,
                backgroundColor: "#000", // Always black
                color: "white",
              }),
              singleValue: (provided) => ({ ...provided, color: "white" }),
              menu: (provided) => ({ ...provided, backgroundColor: "#000", color: "white" }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isSelected ? "#333" : "#000",
                color: "white",
                cursor: "pointer",
              }),
            }}
            options={languageOptions}
            value={languageOptions.find((opt) => opt.value === activeFile.language)}
            onChange={(selected) => setActiveFile({ ...activeFile, language: selected.value })}
          />
          <button
            style={{
              marginLeft: "10px",
              padding: "5px 10px",
              backgroundColor: "#ff5722",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => compileCode(activeFile.content, activeFile.language)}
          >
            Compile
          </button>
        </div>

        <MonacoEditor
          width="100%"
          height="calc(100vh - 100px)"
          language={activeFile.language}
          theme={isDarkMode ? "vs-dark" : "light"}
          value={activeFile.content}
          options={{ fontSize: 14 }}
          onChange={(content) => setActiveFile({ ...activeFile, content })}
        />
      </div>

      {/* Right Side: Output */}
      <div style={{ flex: 0.5, padding: "20px", backgroundColor: isDarkMode ? "#252526" : "#f0f0f0" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h2>Output</h2>
          <div style={{ display: "flex", gap: "10px" }}>
            <button style={{ background: "none", border: "none", color: "inherit", fontSize: "1.5rem", cursor: "pointer" }} onClick={() => setIsDarkMode(!isDarkMode)}>
              {isDarkMode ? <FaSun /> : <FaMoon />}
            </button>
            <button style={{ background: "none", border: "none", color: "inherit", fontSize: "1.5rem", cursor: "pointer" }} onClick={generateRoomCode}>
              <FaUserPlus />
            </button>
          </div>
        </div>
        <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word", color: isDarkMode ? "#0f0" : "black", backgroundColor: isDarkMode ? "#000" : "#fff", padding: "10px", borderRadius: "5px", height: "calc(100vh - 60px)", overflowY: "auto" }}>
          {output}
        </pre>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Share Room Code</h3>
            <p><strong>Code:</strong> {roomCode}</p>
            <button onClick={() => navigator.clipboard.writeText(roomCode)}><FaClipboard /> Copy</button>
            <button onClick={() => setShowModal(false)}><FaTimes /> Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeEditor;
