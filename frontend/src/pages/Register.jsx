import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import AuthForm from "../components/AuthForm";
import { useNavigate } from "react-router-dom";
import { api } from "../utils/api";
import { Box } from "@mui/material";

export default function Register() {
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (form) => {
    setError("");
    try {
      await api.post("/auth/register", form);
      // Connexion automatique après inscription
      const loginRes = await api.post("/auth/login", {
        email: form.email,
        password: form.password,
      });
      login(loginRes.user, loginRes.token);
      navigate("/dashboard");
    } catch (e) {
      setError(e.message || "Erreur à l'inscription");
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
      <AuthForm mode="register" onSubmit={handleRegister} error={error} />
    </Box>
  );
}