import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Alert,
} from "@mui/material";

export default function AuthForm({ mode = "login", onSubmit, error }) {
  const isRegister = mode === "register";

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phone: "",
    role: "CLIENT",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f4f6fb",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card sx={{ width: 400, boxShadow: 3, borderRadius: 3 }}>
        <CardContent>
          <Typography
            variant="h5"
            fontWeight="bold"
            align="center"
            mb={2}
            color="primary"
          >
            {isRegister ? "Créer un compte" : "Connexion"}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {isRegister && (
              <>
                <TextField
                  name="firstname"
                  label="Prénom"
                  value={form.firstname}
                  onChange={handleChange}
                  required
                  fullWidth
                  autoComplete="given-name"
                />
                <TextField
                  name="lastname"
                  label="Nom"
                  value={form.lastname}
                  onChange={handleChange}
                  required
                  fullWidth
                  autoComplete="family-name"
                />
                <TextField
                  name="phone"
                  label="Téléphone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  fullWidth
                  autoComplete="tel"
                />
                <FormControl fullWidth>
                  <InputLabel id="role-label">Rôle</InputLabel>
                  <Select
                    labelId="role-label"
                    name="role"
                    value={form.role}
                    label="Rôle"
                    onChange={handleChange}
                  >
                    <MenuItem value="CLIENT">Client</MenuItem>
                    <MenuItem value="PROVIDER">Prestataire</MenuItem>
                  </Select>
                </FormControl>
              </>
            )}
            <TextField
              name="email"
              label="Email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              fullWidth
              autoComplete="email"
            />
            <TextField
              name="password"
              label="Mot de passe"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              fullWidth
              autoComplete={isRegister ? "new-password" : "current-password"}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              sx={{ mt: 1, borderRadius: 2, fontWeight: "bold", boxShadow: 1 }}
            >
              {isRegister ? "Créer un compte" : "Se connecter"}
            </Button>
            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}