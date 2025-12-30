import { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, X, Loader2, UserCheck, UserX } from 'lucide-react';
import { userService } from '../services/api';
import type { User } from '../types';
import { useTheme, ThemeToggle, getThemeStyles } from '../context/ThemeContext';

interface UserFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export default function Usuarios() {
  const { isDark } = useTheme();
  const theme = getThemeStyles(isDark);

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<UserFormData>({ firstName: '', lastName: '', email: '', password: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Liquid glass card style
  const glassCard = {
    background: isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(255, 255, 255, 0.4)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    borderRadius: "20px",
    border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(255, 255, 255, 0.6)"}`,
    padding: "24px"
  };

  // Liquid glass button style
  const glassButton = (isAccent = false) => ({
    padding: "12px 20px",
    borderRadius: "12px",
    border: `1px solid ${isAccent
      ? (isDark ? "rgba(140, 180, 255, 0.2)" : "rgba(70, 130, 180, 0.2)")
      : (isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(255, 255, 255, 0.6)")}`,
    background: isAccent
      ? (isDark ? "rgba(140, 180, 255, 0.1)" : "rgba(70, 130, 180, 0.08)")
      : (isDark ? "rgba(255, 255, 255, 0.04)" : "rgba(255, 255, 255, 0.5)"),
    backdropFilter: "blur(12px)",
    fontWeight: 600,
    fontSize: "13px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: isAccent
      ? (isDark ? "rgba(140, 180, 255, 0.9)" : "rgba(70, 130, 180, 0.9)")
      : theme.text
  });

  const inputStyle = {
    width: "100%",
    padding: "14px 18px",
    borderRadius: "12px",
    border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.06)"}`,
    background: isDark ? "rgba(255, 255, 255, 0.04)" : "rgba(255, 255, 255, 0.5)",
    backdropFilter: "blur(8px)",
    color: theme.text,
    fontSize: "14px",
    fontWeight: 500,
    outline: "none"
  };

  useEffect(() => { loadUsers(); }, []);

  const loadUsers = async () => {
    try {
      const response = await userService.getAll();
      if (response.success) setUsers(response.data);
    } catch (err) { console.error('Error:', err); }
    finally { setLoading(false); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      if (editingUser) {
        await userService.update(editingUser.id, { firstName: formData.firstName, lastName: formData.lastName, email: formData.email });
      } else {
        await userService.create(formData);
      }
      setShowModal(false);
      setEditingUser(null);
      setFormData({ firstName: '', lastName: '', email: '', password: '' });
      loadUsers();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error al guardar');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setFormData({ firstName: user.firstName, lastName: user.lastName, email: user.email, password: '' });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Eliminar usuario?')) return;
    try { await userService.delete(id); loadUsers(); }
    catch (err) { console.error(err); }
  };

  const handleToggleActive = async (user: User) => {
    try { await userService.update(user.id, { isActive: !user.isActive }); loadUsers(); }
    catch (err) { console.error(err); }
  };

  const filteredUsers = users.filter((u) =>
    u.firstName.toLowerCase().includes(search.toLowerCase()) ||
    u.lastName.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const openNewModal = () => {
    setEditingUser(null);
    setFormData({ firstName: '', lastName: '', email: '', password: '' });
    setError('');
    setShowModal(true);
  };

  return (
    <div>
      {/* Header - Floating cards style */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px", flexWrap: "wrap", gap: "16px" }}>
        <div style={{
          padding: "16px 20px",
          borderRadius: "14px",
          background: isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(255, 255, 255, 0.4)",
          backdropFilter: "blur(12px)",
          border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(255, 255, 255, 0.6)"}`
        }}>
          <h1 style={{ fontSize: "20px", fontWeight: 700, color: theme.text, marginBottom: "4px" }}>
            Usuarios
          </h1>
          <p style={{ color: theme.textMuted, fontSize: "13px" }}>
            Gestiona los usuarios de la plataforma
          </p>
        </div>
        <button onClick={openNewModal} style={glassButton(true)}>
          <Plus size={16} />
          Nuevo Usuario
        </button>
      </div>

      {/* Search & Table */}
      <div style={glassCard}>
        {/* Search */}
        <div style={{ marginBottom: "20px" }}>
          <div style={{ position: "relative", maxWidth: "350px" }}>
            <Search
              size={16}
              style={{
                position: "absolute",
                left: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                color: theme.textMuted
              }}
            />
            <input
              type="text"
              placeholder="Buscar usuarios..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ ...inputStyle, paddingLeft: "42px" }}
            />
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "60px" }}>
            <Loader2 size={28} style={{ animation: "spin 1s linear infinite", color: isDark ? "rgba(140, 180, 255, 0.7)" : "rgba(70, 130, 180, 0.7)" }} />
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(0, 0, 0, 0.06)"}` }}>
                {['Usuario', 'Email', 'Estado', 'Creado', 'Acciones'].map((header, i) => (
                  <th
                    key={header}
                    style={{
                      textAlign: i === 4 ? "right" : "left",
                      padding: "12px 14px",
                      fontSize: "11px",
                      fontWeight: 700,
                      color: theme.textMuted,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px"
                    }}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center", padding: "48px", color: theme.textMuted }}>
                    No se encontraron usuarios
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} style={{ borderBottom: `1px solid ${isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(0, 0, 0, 0.04)"}` }}>
                    <td style={{ padding: "14px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <div
                          style={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "10px",
                            background: isDark ? "rgba(140, 180, 255, 0.15)" : "rgba(70, 130, 180, 0.1)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: isDark ? "rgba(140, 180, 255, 0.9)" : "rgba(70, 130, 180, 0.9)",
                            fontWeight: 600,
                            fontSize: "13px"
                          }}
                        >
                          {user.firstName.charAt(0)}
                        </div>
                        <span style={{ fontWeight: 600, color: theme.text, fontSize: "13px" }}>
                          {user.firstName} {user.lastName}
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: "14px", color: theme.textMuted, fontSize: "13px" }}>
                      {user.email}
                    </td>
                    <td style={{ padding: "14px" }}>
                      <button
                        onClick={() => handleToggleActive(user)}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          padding: "6px 12px",
                          borderRadius: "8px",
                          border: `1px solid ${user.isActive
                            ? (isDark ? "rgba(100, 180, 150, 0.25)" : "rgba(100, 180, 150, 0.3)")
                            : (isDark ? "rgba(200, 120, 120, 0.25)" : "rgba(200, 120, 120, 0.3)")}`,
                          fontSize: "11px",
                          fontWeight: 600,
                          cursor: "pointer",
                          background: user.isActive
                            ? (isDark ? "rgba(100, 180, 150, 0.1)" : "rgba(100, 180, 150, 0.08)")
                            : (isDark ? "rgba(200, 120, 120, 0.1)" : "rgba(200, 120, 120, 0.08)"),
                          color: user.isActive
                            ? (isDark ? "rgba(150, 220, 180, 0.9)" : "rgba(60, 140, 100, 0.9)")
                            : (isDark ? "rgba(240, 150, 150, 0.9)" : "rgba(180, 80, 80, 0.9)")
                        }}
                      >
                        {user.isActive ? <UserCheck size={12} /> : <UserX size={12} />}
                        {user.isActive ? 'Activo' : 'Inactivo'}
                      </button>
                    </td>
                    <td style={{ padding: "14px", color: theme.textMuted, fontSize: "12px" }}>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td style={{ padding: "14px" }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "8px" }}>
                        <button
                          onClick={() => handleEdit(user)}
                          style={{
                            padding: "8px",
                            borderRadius: "8px",
                            border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.06)"}`,
                            background: isDark ? "rgba(255, 255, 255, 0.04)" : "rgba(255, 255, 255, 0.5)",
                            backdropFilter: "blur(8px)",
                            color: theme.textMuted,
                            cursor: "pointer"
                          }}
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          style={{
                            padding: "8px",
                            borderRadius: "8px",
                            border: `1px solid ${isDark ? "rgba(200, 120, 120, 0.2)" : "rgba(200, 120, 120, 0.2)"}`,
                            background: isDark ? "rgba(200, 120, 120, 0.1)" : "rgba(200, 120, 120, 0.08)",
                            backdropFilter: "blur(8px)",
                            color: isDark ? "rgba(240, 150, 150, 0.9)" : "rgba(180, 80, 80, 0.9)",
                            cursor: "pointer"
                          }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal - Liquid Glass */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: isDark ? "rgba(0, 0, 0, 0.4)" : "rgba(0, 0, 0, 0.2)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "20px"
          }}
        >
          <div
            style={{
              background: isDark ? "rgba(30, 30, 50, 0.8)" : "rgba(255, 255, 255, 0.7)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              borderRadius: "24px",
              padding: "28px",
              width: "100%",
              maxWidth: "420px",
              border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(255, 255, 255, 0.6)"}`
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
              <h2 style={{ fontSize: "18px", fontWeight: 700, color: theme.text }}>
                {editingUser ? 'Editar Usuario' : 'Nuevo Usuario'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  padding: "8px",
                  borderRadius: "8px",
                  border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.06)"}`,
                  background: isDark ? "rgba(255, 255, 255, 0.04)" : "rgba(255, 255, 255, 0.5)",
                  color: theme.textMuted,
                  cursor: "pointer"
                }}
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              {error && (
                <div
                  style={{
                    background: isDark ? "rgba(200, 120, 120, 0.1)" : "rgba(200, 120, 120, 0.08)",
                    border: `1px solid ${isDark ? "rgba(200, 120, 120, 0.2)" : "rgba(200, 120, 120, 0.2)"}`,
                    color: isDark ? "rgba(240, 150, 150, 0.9)" : "rgba(180, 80, 80, 0.9)",
                    padding: "12px 16px",
                    borderRadius: "12px",
                    fontSize: "13px",
                    marginBottom: "20px"
                  }}
                >
                  {error}
                </div>
              )}

              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: theme.textMuted, marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    Nombre
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    style={inputStyle}
                    required
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: theme.textMuted, marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    Apellido
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    style={inputStyle}
                    required
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: theme.textMuted, marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={inputStyle}
                    required
                  />
                </div>

                {!editingUser && (
                  <div>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: theme.textMuted, marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                      Contrasena
                    </label>
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      style={inputStyle}
                      required
                    />
                  </div>
                )}

                <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    style={{
                      ...glassButton(),
                      flex: 1,
                      justifyContent: "center"
                    }}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    style={{
                      ...glassButton(true),
                      flex: 1,
                      justifyContent: "center",
                      opacity: submitting ? 0.6 : 1,
                      cursor: submitting ? "not-allowed" : "pointer"
                    }}
                  >
                    {submitting ? <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} /> : (editingUser ? 'Guardar' : 'Crear')}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      <ThemeToggle />

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        input:focus {
          border-color: ${isDark ? "rgba(140, 180, 255, 0.3)" : "rgba(70, 130, 180, 0.3)"} !important;
        }
      `}</style>
    </div>
  );
}
