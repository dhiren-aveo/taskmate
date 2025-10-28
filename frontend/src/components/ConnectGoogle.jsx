// src/components/ConnectGoogle.jsx
import React, { useState } from "react";
import axios from "axios";

function ConnectGoogle() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleConnect = async () => {
    try {
      setLoading(true);
      setMessage("");

      // 🔹 call your backend API
      const response = await axios.get("http://localhost:3002/integration/connect");

      // if your backend returns a URL, open popup
      if (response.data?.url) {
        window.open(response.data.url, "_blank", "width=500,height=600");
        setMessage("Google account popup opened ✅");
      } else {
        setMessage("Connected successfully ✅");
      }
    } catch (error) {
      console.error("Error connecting Google:", error);
      setMessage("Failed to connect ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="google-container">
      <button
        onClick={handleConnect}
        className="google-btn"
        disabled={loading}
      >
        {loading ? "Connecting..." : "🔗 Connect Google Account"}
      </button>

      {message && <p className="google-status">{message}</p>}
    </div>
  );
}

export default ConnectGoogle;
