import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { authService, userService } from "../services/api";
import { useTheme, ThemeToggle, getThemeStyles } from "../context/ThemeContext";

export default function Login() {
  const { isDark } = useTheme();
  const theme = getThemeStyles(isDark);

  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const inputStyle = {
    width: "100%",
    padding: "14px 18px",
    borderRadius: "14px",
    border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.06)"}`,
    background: isDark ? "rgba(255, 255, 255, 0.04)" : "rgba(255, 255, 255, 0.5)",
    backdropFilter: "blur(8px)",
    color: theme.text,
    fontSize: "14px",
    fontWeight: 500,
    outline: "none",
    transition: "all 0.2s ease"
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      if (isRegister) {
        await userService.create({ firstName, lastName, email, password });
        setSuccess("Cuenta creada exitosamente. Inicia sesion para continuar.");
        setIsRegister(false);
        setFirstName("");
        setLastName("");
        setPassword("");
      } else {
        const response = await authService.login(email, password);
        if (response.success) {
          login(response.data.user, response.data.token);
          navigate("/dashboard");
        }
      }
    } catch (err: any) {
      setError(err.response?.data?.error || (isRegister ? "Error al crear la cuenta" : "Credenciales incorrectas"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        background: isDark
          ? "#0f0f1a"
          : "#F5F6FA",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* DNA Background Pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden"
        }}
      >
        <img
          src="/dna.gif"
          alt=""
          style={{
            width: "auto",
            height: "120%",
            opacity: isDark ? 0.06 : 0.04,
            filter: isDark ? "invert(1) hue-rotate(180deg)" : "grayscale(100%)",
            mixBlendMode: isDark ? "screen" : "normal"
          }}
        />
      </div>

      {/* Subtle gradient orbs */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          right: "-5%",
          width: "400px",
          height: "400px",
          background: `radial-gradient(circle, rgba(140, 180, 255, ${isDark ? 0.08 : 0.06}) 0%, transparent 70%)`,
          borderRadius: "50%"
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-10%",
          left: "-5%",
          width: "350px",
          height: "350px",
          background: `radial-gradient(circle, rgba(100, 180, 150, ${isDark ? 0.06 : 0.05}) 0%, transparent 70%)`,
          borderRadius: "50%"
        }}
      />

      {/* Card - Liquid Glass */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          maxWidth: "420px"
        }}
      >
        <div
          style={{
            background: isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(255, 255, 255, 0.4)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            borderRadius: "28px",
            padding: "40px 36px",
            border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(255, 255, 255, 0.6)"}`
          }}
        >
          {/* Logo Text */}
          <div style={{ textAlign: "center", marginBottom: "36px" }}>
            <h1
              style={{
                fontSize: "34px",
                fontWeight: 300,
                letterSpacing: "0.08em",
                color: theme.text,
                marginBottom: "8px"
              }}
            >
              geno<span style={{
                fontWeight: 600,
                color: isDark ? "rgba(140, 180, 255, 0.9)" : "rgba(70, 130, 180, 0.9)"
              }}>match</span>
            </h1>
            <p style={{
              color: theme.textMuted,
              fontSize: "13px",
              letterSpacing: "0.3px"
            }}>
              {isRegister ? "Crea tu cuenta" : "Plataforma Genetica"}
            </p>
          </div>

          {/* Tabs - Liquid Glass */}
          <div
            style={{
              display: "flex",
              gap: "8px",
              marginBottom: "28px",
              padding: "5px",
              background: isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(255, 255, 255, 0.4)",
              backdropFilter: "blur(8px)",
              borderRadius: "14px",
              border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 255, 255, 0.5)"}`
            }}
          >
            <button
              type="button"
              onClick={() => { setIsRegister(false); setError(""); setSuccess(""); }}
              style={{
                flex: 1,
                padding: "12px 18px",
                fontSize: "13px",
                fontWeight: 600,
                borderRadius: "10px",
                border: "none",
                cursor: "pointer",
                transition: "all 0.2s ease",
                background: !isRegister
                  ? (isDark ? "rgba(140, 180, 255, 0.15)" : "rgba(70, 130, 180, 0.12)")
                  : "transparent",
                color: !isRegister
                  ? (isDark ? "rgba(140, 180, 255, 0.9)" : "rgba(70, 130, 180, 0.9)")
                  : theme.textMuted
              }}
            >
              Iniciar Sesion
            </button>
            <button
              type="button"
              onClick={() => { setIsRegister(true); setError(""); setSuccess(""); }}
              style={{
                flex: 1,
                padding: "12px 18px",
                fontSize: "13px",
                fontWeight: 600,
                borderRadius: "10px",
                border: "none",
                cursor: "pointer",
                transition: "all 0.2s ease",
                background: isRegister
                  ? (isDark ? "rgba(140, 180, 255, 0.15)" : "rgba(70, 130, 180, 0.12)")
                  : "transparent",
                color: isRegister
                  ? (isDark ? "rgba(140, 180, 255, 0.9)" : "rgba(70, 130, 180, 0.9)")
                  : theme.textMuted
              }}
            >
              Registrarse
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Alerts */}
            {error && (
              <div style={{
                background: isDark ? "rgba(200, 120, 120, 0.1)" : "rgba(200, 120, 120, 0.08)",
                backdropFilter: "blur(8px)",
                border: `1px solid ${isDark ? "rgba(200, 120, 120, 0.2)" : "rgba(200, 120, 120, 0.2)"}`,
                color: isDark ? "rgba(240, 150, 150, 0.9)" : "rgba(180, 80, 80, 0.9)",
                padding: "12px 16px",
                borderRadius: "12px",
                fontSize: "13px",
                textAlign: "center",
                marginBottom: "18px"
              }}>
                {error}
              </div>
            )}
            {success && (
              <div style={{
                background: isDark ? "rgba(100, 180, 150, 0.1)" : "rgba(100, 180, 150, 0.08)",
                backdropFilter: "blur(8px)",
                border: `1px solid ${isDark ? "rgba(100, 180, 150, 0.2)" : "rgba(100, 180, 150, 0.2)"}`,
                color: isDark ? "rgba(150, 220, 180, 0.9)" : "rgba(60, 140, 100, 0.9)",
                padding: "12px 16px",
                borderRadius: "12px",
                fontSize: "13px",
                textAlign: "center",
                marginBottom: "18px"
              }}>
                {success}
              </div>
            )}

            {/* Register Fields */}
            {isRegister && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Nombre"
                  required
                  style={inputStyle}
                />
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Apellido"
                  required
                  style={inputStyle}
                />
              </div>
            )}

            {/* Email */}
            <div style={{ marginBottom: "12px" }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Correo electronico"
                required
                style={inputStyle}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: "24px", position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contrasena"
                required
                style={{ ...inputStyle, paddingRight: "50px" }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  color: theme.textMuted,
                  cursor: "pointer",
                  padding: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "16px 24px",
                borderRadius: "14px",
                border: `1px solid ${isDark ? "rgba(140, 180, 255, 0.2)" : "rgba(70, 130, 180, 0.2)"}`,
                background: isDark ? "rgba(140, 180, 255, 0.12)" : "rgba(70, 130, 180, 0.1)",
                backdropFilter: "blur(8px)",
                color: isDark ? "rgba(140, 180, 255, 0.9)" : "rgba(70, 130, 180, 0.9)",
                fontSize: "14px",
                fontWeight: 600,
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.6 : 1,
                transition: "all 0.2s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px"
              }}
            >
              {loading ? (
                <Loader2 size={20} style={{ animation: "spin 1s linear infinite" }} />
              ) : (
                isRegister ? "Crear Cuenta" : "Iniciar Sesion"
              )}
            </button>
          </form>

        </div>

        {/* Brand */}
        <p style={{
          textAlign: "center",
          color: theme.textLight,
          fontSize: "11px",
          marginTop: "24px",
          fontWeight: 500
        }}>
          genomatch 2024
        </p>
      </div>

      <ThemeToggle />

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        input::placeholder {
          color: ${theme.textLight};
        }
        input:focus {
          border-color: ${isDark ? "rgba(140, 180, 255, 0.25)" : "rgba(70, 130, 180, 0.25)"} !important;
          background: ${isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(255, 255, 255, 0.6)"} !important;
        }
      `}</style>
    </div>
  );
}
