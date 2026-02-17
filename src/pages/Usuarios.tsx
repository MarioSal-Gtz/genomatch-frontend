import { useState, useEffect, useMemo } from 'react';
import {
  LuPlus, LuSearch, LuPencil, LuTrash2, LuX, LuLoader,
  LuUserCheck, LuUserX, LuUsers, LuShield, LuFlaskConical,
  LuStethoscope, LuCrown, LuEye, LuEyeOff, LuDownload,
  LuChevronDown, LuArrowUp, LuArrowDown, LuTriangleAlert,
} from 'react-icons/lu';
import { userService } from '../services/api';
import type { User } from '../types';
import { useTheme } from '../context/ThemeContext';

// ── Roles ──────────────────────────────────────────────────────────
const ROLES = [
  { id: 1, name: 'Administrador', icon: LuShield, color: 'accent' as const, desc: 'Acceso total al sistema' },
  { id: 2, name: 'Técnico', icon: LuFlaskConical, color: 'success' as const, desc: 'Operación diaria del laboratorio' },
  { id: 3, name: 'Médico', icon: LuStethoscope, color: 'indigo' as const, desc: 'Consulta clínica y reportes' },
  { id: 4, name: 'Root', icon: LuCrown, color: 'purple' as const, desc: 'Administración ABALAT' },
  { id: 5, name: 'Solo lectura', icon: LuEye, color: 'slate' as const, desc: 'Solo visualización' },
] as const;

type RoleColor = typeof ROLES[number]['color'];

function getRoleById(id?: number | null) {
  return ROLES.find((r) => r.id === id) ?? null;
}

function roleColorTokens(color: RoleColor, t: ReturnType<typeof useTheme>['t']) {
  const map: Record<RoleColor, { bg: string; fg: string }> = {
    accent: { bg: t.accentBg, fg: t.accentText },
    success: { bg: t.successBg, fg: t.success },
    indigo: { bg: t.indigoBg, fg: t.indigo },
    purple: { bg: t.purpleBg, fg: t.purple },
    slate: { bg: t.slateBg, fg: t.slate },
  };
  return map[color];
}

// ── Form types ─────────────────────────────────────────────────────
interface UserFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  roleId: number;
}

const emptyForm: UserFormData = { firstName: '', lastName: '', email: '', password: '', phone: '', roleId: 2 };

type SortKey = 'name' | 'email' | 'role' | 'createdAt';
type SortDir = 'asc' | 'desc';

// ── CSV Export ─────────────────────────────────────────────────────
function exportCSV(users: User[]) {
  const header = 'Nombre,Apellido,Email,Rol,Teléfono,Estado,Creado';
  const rows = users.map((u) => {
    const role = getRoleById(u.roleId)?.name ?? 'Sin rol';
    const phone = u.phone ?? '';
    const status = u.isActive ? 'Activo' : 'Inactivo';
    const created = new Date(u.createdAt).toLocaleDateString();
    return [u.firstName, u.lastName, u.email, role, phone, status, created]
      .map((v) => `"${v.replace(/"/g, '""')}"`)
      .join(',');
  });
  const blob = new Blob([header + '\n' + rows.join('\n')], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `usuarios_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// ── Component ──────────────────────────────────────────────────────
export default function Usuarios() {
  const { t } = useTheme();

  // Data
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [filterRole, setFilterRole] = useState<number | 0>(0);
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');

  // Sort
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortDir, setSortDir] = useState<SortDir>('asc');

  // Modals
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<UserFormData>({ ...emptyForm });
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Delete confirmation
  const [deleteTarget, setDeleteTarget] = useState<User | null>(null);

  useEffect(() => { loadUsers(); }, []);

  const loadUsers = async () => {
    try {
      const response = await userService.getAll();
      if (response.success) setUsers(response.data);
    } catch (err) { console.error('Error:', err); }
    finally { setLoading(false); }
  };

  // ── Filtered + sorted list ───────────────────────────────────────
  const filteredUsers = useMemo(() => {
    let list = users.filter((u) => {
      const q = search.toLowerCase();
      const matchSearch = !q || u.firstName.toLowerCase().includes(q) || u.lastName.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
      const matchRole = filterRole === 0 || u.roleId === filterRole;
      const matchStatus = filterStatus === 'all' || (filterStatus === 'active' ? u.isActive : !u.isActive);
      return matchSearch && matchRole && matchStatus;
    });

    list.sort((a, b) => {
      let cmp = 0;
      switch (sortKey) {
        case 'name': cmp = `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`); break;
        case 'email': cmp = a.email.localeCompare(b.email); break;
        case 'role': cmp = (a.roleId ?? 99) - (b.roleId ?? 99); break;
        case 'createdAt': cmp = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(); break;
      }
      return sortDir === 'asc' ? cmp : -cmp;
    });

    return list;
  }, [users, search, filterRole, filterStatus, sortKey, sortDir]);

  // ── Stats ────────────────────────────────────────────────────────
  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.isActive).length;
  const roleSummary = useMemo(() => {
    const counts: Record<number, number> = {};
    users.forEach((u) => { if (u.roleId) counts[u.roleId] = (counts[u.roleId] || 0) + 1; });
    return ROLES.filter((r) => counts[r.id]).map((r) => `${counts[r.id]} ${r.name.length > 5 ? r.name.slice(0, 4) + '.' : r.name}`).join(', ') || 'Sin roles';
  }, [users]);

  // ── Handlers ─────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      if (editingUser) {
        await userService.update(editingUser.id, {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone || undefined,
          roleId: formData.roleId,
        });
      } else {
        await userService.create({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          phone: formData.phone || undefined,
          roleId: formData.roleId,
        });
      }
      setShowModal(false);
      setEditingUser(null);
      setFormData({ ...emptyForm });
      loadUsers();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error al guardar');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: '',
      phone: user.phone ?? '',
      roleId: user.roleId ?? 2,
    });
    setError('');
    setShowPassword(false);
    setShowModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try { await userService.delete(deleteTarget.id); loadUsers(); }
    catch (err) { console.error(err); }
    finally { setDeleteTarget(null); }
  };

  const handleToggleActive = async (user: User) => {
    try { await userService.update(user.id, { isActive: !user.isActive }); loadUsers(); }
    catch (err) { console.error(err); }
  };

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
  };

  const openNewModal = () => {
    setEditingUser(null);
    setFormData({ ...emptyForm });
    setError('');
    setShowPassword(false);
    setShowModal(true);
  };

  // ── Shared styles ────────────────────────────────────────────────
  const labelStyle: React.CSSProperties = { display: 'block', fontSize: '10px', fontWeight: 700, color: t.textSubtle, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.08em' };
  const inputStyle: React.CSSProperties = { width: '100%', padding: '12px 16px', borderRadius: '8px', border: `1px solid ${t.borderInput}`, background: t.bgInput, color: t.text, fontSize: '13px', fontWeight: 500, outline: 'none' };
  const selectStyle: React.CSSProperties = { ...inputStyle, appearance: 'none', paddingRight: '36px', cursor: 'pointer' };

  // ── Render ───────────────────────────────────────────────────────
  return (
    <>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4" style={{ marginBottom: '24px' }}>
        <div>
          <h2 className="font-bold" style={{ fontSize: '26px', letterSpacing: '-0.02em', color: t.text }}>
            Usuarios
          </h2>
          <p style={{ color: t.textMuted, fontSize: '14px', marginTop: '6px' }}>
            Gestiona los usuarios de la plataforma
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" style={{ marginBottom: '24px' }}>
        {[
          { label: 'Total Usuarios', value: totalUsers, icon: LuUsers, color: t.accentText, bg: t.accentBg },
          { label: 'Activos', value: activeUsers, icon: LuUserCheck, color: t.success, bg: t.successBg },
          { label: 'Por Rol', value: roleSummary, icon: LuShield, color: t.purple, bg: t.purpleBg },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              background: t.bgCard,
              border: `1px solid ${t.border}`,
              borderRadius: '14px',
              padding: '20px 24px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: stat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <stat.icon size={20} style={{ color: stat.color }} />
            </div>
            <div style={{ minWidth: 0 }}>
              <p style={{ fontSize: '11px', fontWeight: 600, color: t.textSubtle, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{stat.label}</p>
              <p style={{ fontSize: typeof stat.value === 'number' ? '22px' : '13px', fontWeight: 700, color: t.text, marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters bar + table */}
      <div style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: '14px', overflow: 'hidden' }}>
        {/* Filter row */}
        <div style={{ padding: '16px 24px', borderBottom: `1px solid ${t.border}`, background: t.bgCardHeader, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px' }}>
          {/* Search */}
          <div style={{ position: 'relative', minWidth: '200px', flex: '1 1 200px', maxWidth: '320px' }}>
            <LuSearch size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: t.textFaint }} />
            <input
              type="text"
              placeholder="Buscar usuarios..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ ...inputStyle, height: '36px', paddingLeft: '36px', paddingRight: '16px', fontSize: '12px' }}
            />
          </div>

          {/* Role filter */}
          <div style={{ position: 'relative' }}>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(Number(e.target.value))}
              style={{ ...selectStyle, height: '36px', fontSize: '12px', padding: '0 32px 0 12px', minWidth: '150px' }}
            >
              <option value={0}>Todos los roles</option>
              {ROLES.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
            </select>
            <LuChevronDown size={14} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: t.textFaint, pointerEvents: 'none' }} />
          </div>

          {/* Status filter */}
          <div style={{ position: 'relative' }}>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as 'all' | 'active' | 'inactive')}
              style={{ ...selectStyle, height: '36px', fontSize: '12px', padding: '0 32px 0 12px', minWidth: '130px' }}
            >
              <option value="all">Todo estado</option>
              <option value="active">Activo</option>
              <option value="inactive">Inactivo</option>
            </select>
            <LuChevronDown size={14} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: t.textFaint, pointerEvents: 'none' }} />
          </div>

          <div style={{ flex: '1 1 0', minWidth: '0' }} />

          {/* Export CSV */}
          <button
            onClick={() => exportCSV(filteredUsers)}
            style={{ height: '36px', padding: '0 14px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, background: t.bgInput, border: `1px solid ${t.borderInput}`, color: t.textMuted, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <LuDownload size={14} />
            Exportar
          </button>

          {/* New user */}
          <button
            onClick={openNewModal}
            style={{ height: '36px', padding: '0 16px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, background: t.accent, border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: t.accentShadow }}
          >
            <LuPlus size={14} />
            Nuevo Usuario
          </button>
        </div>

        {/* Table */}
        {loading ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px' }}>
            <LuLoader size={28} style={{ animation: 'spin 1s linear infinite', color: t.accentText }} />
          </div>
        ) : (
          <div className="overflow-auto">
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${t.border}` }}>
                  {([
                    { label: 'Usuario', key: 'name' as SortKey },
                    { label: 'Email', key: 'email' as SortKey },
                    { label: 'Rol', key: 'role' as SortKey },
                    { label: 'Teléfono', key: null },
                    { label: 'Estado', key: null },
                    { label: 'Último acceso', key: null },
                    { label: 'Acciones', key: null },
                  ]).map((col, i) => (
                    <th
                      key={col.label}
                      onClick={col.key ? () => toggleSort(col.key!) : undefined}
                      style={{
                        textAlign: i === 6 ? 'right' : 'left',
                        padding: '14px 24px',
                        fontSize: '10px',
                        fontWeight: 700,
                        color: t.textSubtle,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        cursor: col.key ? 'pointer' : 'default',
                        userSelect: 'none',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        {col.label}
                        {col.key && sortKey === col.key && (
                          sortDir === 'asc' ? <LuArrowUp size={11} /> : <LuArrowDown size={11} />
                        )}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ textAlign: 'center', padding: '48px', color: t.textSubtle }}>
                      No se encontraron usuarios
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user, index) => {
                    const role = getRoleById(user.roleId);
                    const colors = role ? roleColorTokens(role.color, t) : null;
                    return (
                      <tr key={user.id} style={{ borderBottom: index !== filteredUsers.length - 1 ? `1px solid ${t.borderLight}` : 'none' }}>
                        {/* Name */}
                        <td style={{ padding: '14px 24px' }}>
                          <div className="flex items-center" style={{ gap: '12px' }}>
                            <div className="flex items-center justify-center shrink-0" style={{ width: '34px', height: '34px', borderRadius: '50%', fontSize: '11px', fontWeight: 700, background: t.accentBg, color: t.accentText }}>
                              {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                            </div>
                            <p style={{ fontSize: '13px', fontWeight: 600, color: t.textSecondary, lineHeight: 1 }}>
                              {user.firstName} {user.lastName}
                            </p>
                          </div>
                        </td>

                        {/* Email */}
                        <td style={{ padding: '14px 24px', fontSize: '13px', color: t.textMuted }}>{user.email}</td>

                        {/* Role badge */}
                        <td style={{ padding: '14px 24px' }}>
                          {role && colors ? (
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, background: colors.bg, color: colors.fg }}>
                              <role.icon size={12} />
                              {role.name}
                            </span>
                          ) : (
                            <span style={{ fontSize: '11px', color: t.textSubtle }}>—</span>
                          )}
                        </td>

                        {/* Phone */}
                        <td style={{ padding: '14px 24px', fontSize: '13px', color: t.textMuted }}>
                          {user.phone || <span style={{ color: t.textSubtle }}>—</span>}
                        </td>

                        {/* Status */}
                        <td style={{ padding: '14px 24px' }}>
                          <button
                            onClick={() => handleToggleActive(user)}
                            style={{
                              display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 10px', borderRadius: '6px', border: 'none', fontSize: '11px', fontWeight: 600, cursor: 'pointer',
                              background: user.isActive ? t.successBg : t.dangerBg,
                              color: user.isActive ? t.success : t.danger,
                            }}
                          >
                            {user.isActive ? <LuUserCheck size={12} /> : <LuUserX size={12} />}
                            {user.isActive ? 'Activo' : 'Inactivo'}
                          </button>
                        </td>

                        {/* Last login */}
                        <td style={{ padding: '14px 24px', fontSize: '12px', color: t.textSubtle, fontVariantNumeric: 'tabular-nums' }}>
                          {user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleDateString() : 'Nunca'}
                        </td>

                        {/* Actions */}
                        <td style={{ padding: '14px 24px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                            <button onClick={() => handleEdit(user)} style={{ padding: '7px', borderRadius: '6px', border: `1px solid ${t.borderInput}`, background: t.bgInput, color: t.textMuted, cursor: 'pointer' }}>
                              <LuPencil size={14} />
                            </button>
                            <button onClick={() => setDeleteTarget(user)} style={{ padding: '7px', borderRadius: '6px', border: `1px solid ${t.dangerBorder}`, background: t.dangerBg, color: t.danger, cursor: 'pointer' }}>
                              <LuTrash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Create / Edit Modal ──────────────────────────────────── */}
      {showModal && (
        <div
          style={{ position: 'fixed', inset: 0, background: t.bgOverlay, backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}
          onClick={() => setShowModal(false)}
        >
          <div
            style={{ background: t.bgModal, backdropFilter: 'blur(24px)', borderRadius: '20px', padding: '28px', width: '100%', maxWidth: '520px', border: `1px solid ${t.borderInput}`, maxHeight: '90vh', overflowY: 'auto' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: t.text }}>
                {editingUser ? 'Editar Usuario' : 'Nuevo Usuario'}
              </h2>
              <button onClick={() => setShowModal(false)} style={{ padding: '8px', borderRadius: '8px', border: `1px solid ${t.borderInput}`, background: t.bgInput, color: t.textMuted, cursor: 'pointer' }}>
                <LuX size={16} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              {error && (
                <div style={{ background: t.dangerBg, border: `1px solid ${t.dangerBorder}`, color: t.danger, padding: '12px 16px', borderRadius: '10px', fontSize: '13px', marginBottom: '20px' }}>
                  {error}
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {/* Row 1: Nombre + Apellido */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={labelStyle}>Nombre</label>
                    <input type="text" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} style={inputStyle} required />
                  </div>
                  <div>
                    <label style={labelStyle}>Apellido</label>
                    <input type="text" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} style={inputStyle} required />
                  </div>
                </div>

                {/* Row 2: Email */}
                <div>
                  <label style={labelStyle}>Email</label>
                  <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} style={inputStyle} required />
                </div>

                {/* Row 3: Teléfono */}
                <div>
                  <label style={labelStyle}>Teléfono</label>
                  <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} style={inputStyle} placeholder="Opcional" />
                </div>

                {/* Row 4: Contraseña (solo crear) */}
                {!editingUser && (
                  <div>
                    <label style={labelStyle}>Contraseña</label>
                    <div style={{ position: 'relative' }}>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        style={{ ...inputStyle, paddingRight: '44px' }}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', padding: '6px', background: 'none', border: 'none', color: t.textSubtle, cursor: 'pointer' }}
                      >
                        {showPassword ? <LuEyeOff size={16} /> : <LuEye size={16} />}
                      </button>
                    </div>
                  </div>
                )}

                {/* Row 5: Role selector */}
                <div>
                  <label style={labelStyle}>Rol</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '8px' }}>
                    {ROLES.map((role) => {
                      const selected = formData.roleId === role.id;
                      const colors = roleColorTokens(role.color, t);
                      return (
                        <button
                          key={role.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, roleId: role.id })}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '10px 12px',
                            borderRadius: '10px',
                            border: `2px solid ${selected ? colors.fg : t.borderInput}`,
                            background: selected ? colors.bg : t.bgInput,
                            color: selected ? colors.fg : t.textMuted,
                            cursor: 'pointer',
                            textAlign: 'left',
                            transition: 'all 0.15s',
                          }}
                        >
                          <role.icon size={16} />
                          <div style={{ minWidth: 0 }}>
                            <p style={{ fontSize: '12px', fontWeight: 600, lineHeight: 1.2 }}>{role.name}</p>
                            <p style={{ fontSize: '10px', opacity: 0.7, lineHeight: 1.2, marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{role.desc}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Buttons */}
                <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                  <button type="button" onClick={() => setShowModal(false)} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: `1px solid ${t.borderInput}`, background: t.bgInput, color: t.textMuted, fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}>
                    Cancelar
                  </button>
                  <button type="submit" disabled={submitting} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', background: t.accent, color: 'white', fontWeight: 600, fontSize: '13px', cursor: submitting ? 'not-allowed' : 'pointer', opacity: submitting ? 0.6 : 1, boxShadow: t.accentShadow }}>
                    {submitting ? <LuLoader size={16} style={{ animation: 'spin 1s linear infinite' }} /> : (editingUser ? 'Guardar' : 'Crear')}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Delete Confirmation Modal ────────────────────────────── */}
      {deleteTarget && (
        <div
          style={{ position: 'fixed', inset: 0, background: t.bgOverlay, backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}
          onClick={() => setDeleteTarget(null)}
        >
          <div
            style={{ background: t.bgModal, backdropFilter: 'blur(24px)', borderRadius: '20px', padding: '28px', width: '100%', maxWidth: '400px', border: `1px solid ${t.borderInput}`, textAlign: 'center' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: t.dangerBg, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <LuTriangleAlert size={24} style={{ color: t.danger }} />
            </div>
            <h3 style={{ fontSize: '17px', fontWeight: 700, color: t.text, marginBottom: '8px' }}>Eliminar usuario</h3>
            <p style={{ fontSize: '13px', color: t.textMuted, marginBottom: '24px' }}>
              Se eliminará permanentemente a <strong style={{ color: t.text }}>{deleteTarget.firstName} {deleteTarget.lastName}</strong>. Esta acción no se puede deshacer.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setDeleteTarget(null)} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: `1px solid ${t.borderInput}`, background: t.bgInput, color: t.textMuted, fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}>
                Cancelar
              </button>
              <button onClick={handleDeleteConfirm} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', background: t.danger, color: 'white', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        input::placeholder { color: ${t.placeholder}; }
        input:focus { border-color: ${t.inputFocus} !important; }
        select:focus { border-color: ${t.inputFocus} !important; outline: none; }
      `}</style>
    </>
  );
}
