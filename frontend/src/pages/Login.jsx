import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import AuthForm from "../components/AuthForm";
import { useNavigate } from "react-router-dom";
import { api } from "../utils/api";
import { Box } from "@mui/material";

export default function Login() {
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (form) => {
    setError("");
    try {
      const res = await api.post("/auth/login", form);
      login(res.user, res.token);
      navigate("/dashboard");
    } catch (e) {
      setError(e.message || "Erreur à la connexion");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        minWidth: "100vw",
        bgcolor: "#f4f6fb",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <AuthForm mode="login" onSubmit={handleLogin} error={error} />
    </Box>
  );
}