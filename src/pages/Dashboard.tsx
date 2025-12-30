import { useState } from 'react';
import { Check, Scale, Search as SearchIcon, List, Printer, ChevronDown, X } from 'lucide-react';
import { useTheme, ThemeToggle, getThemeStyles } from '../context/ThemeContext';

// Genetic data from HTML
const sampleInfo = {
  sample: "RBCPv3-Geno-03",
  gene: "KEL",
  genotype: "KEL*02 / KEL*02",
  variants: 113
};

const alleles = [
  { name: "Alelo 1", value: "KEL*02" },
  { name: "Alelo 2", value: "KEL*02" }
];

const genotypes = [
  {
    system: "Sistema Kell (KEL)",
    tags: [
      { name: "K", status: "0" },
      { name: "k", status: "+" },
      { name: "Kpa", status: "0" },
      { name: "Kpb", status: "+" },
      { name: "Kpc", status: "0" }
    ]
  },
  {
    system: "Sistema Kidd (JK)",
    tags: [
      { name: "Jka", status: "+" },
      { name: "Jkb", status: "+" },
      { name: "Jk3", status: "+" }
    ]
  },
  {
    system: "Sistema Duffy (FY)",
    tags: [
      { name: "Fya", status: "+" },
      { name: "Fyb", status: "+" },
      { name: "FY3", status: "+" }
    ]
  },
  {
    system: "Sistema Lutheran (LU)",
    tags: [
      { name: "Lua", status: "0" },
      { name: "Lub", status: "+" },
      { name: "Lu5", status: "+" }
    ]
  }
];

const amplicons = [
  {
    name: "KELex3",
    color: "rgba(140, 180, 255, 0.7)",
    variants: [
      { pos: "c.160", ref: "A", a1: "A", a2: "A" },
      { pos: "c.161", ref: "T", a1: "T", a2: "T" },
      { pos: "c.184", ref: "T", a1: "T", a2: "T" },
      { pos: "c.201", ref: "C", a1: "C", a2: "C" },
      { pos: "c.223+1", ref: "G", a1: "G", a2: "G" }
    ]
  },
  {
    name: "KELex4",
    color: "rgba(100, 200, 200, 0.7)",
    variants: [
      { pos: "c.230", ref: "G", a1: "G", a2: "G" },
      { pos: "c.244", ref: "T", a1: "T", a2: "T" },
      { pos: "c.257", ref: "G", a1: "G", a2: "G" },
      { pos: "c.267", ref: "C", a1: "C", a2: "C" },
      { pos: "c.299", ref: "G", a1: "G", a2: "G" },
      { pos: "c.306", ref: "C", a1: "C", a2: "C" },
      { pos: "c.328", ref: "A", a1: "A", a2: "A" },
      { pos: "c.371", ref: "A", a1: "A", a2: "A" }
    ]
  },
  {
    name: "KELex5",
    color: "rgba(160, 140, 200, 0.7)",
    variants: [
      { pos: "c.436", ref: "G", a1: "G", a2: "G" },
      { pos: "c.454", ref: "T", a1: "T", a2: "T" },
      { pos: "c.455", ref: "A", a1: "A", a2: "A" },
      { pos: "c.456", ref: "C", a1: "C", a2: "C" },
      { pos: "c.481", ref: "A", a1: "A", a2: "A" }
    ]
  },
  {
    name: "KELex6",
    color: "rgba(220, 180, 100, 0.7)",
    variants: [
      { pos: "c.526-2", ref: "A", a1: "A", a2: "A" },
      { pos: "c.538", ref: "C", a1: "C", a2: "C" },
      { pos: "c.539", ref: "G", a1: "G", a2: "G" },
      { pos: "c.574", ref: "C", a1: "C", a2: "C" },
      { pos: "c.577", ref: "A", a1: "A", a2: "A" }
    ]
  },
  {
    name: "KELex8",
    color: "rgba(100, 180, 150, 0.7)",
    variants: [
      { pos: "c.736-1", ref: "G", a1: "G", a2: "G" },
      { pos: "c.742", ref: "C", a1: "C", a2: "C" },
      { pos: "c.745", ref: "G", a1: "G", a2: "G" },
      { pos: "c.758", ref: "A", a1: "A", a2: "A" },
      { pos: "c.780", ref: "G", a1: "G", a2: "G" },
      { pos: "c.787", ref: "G", a1: "G", a2: "G" }
    ]
  },
  {
    name: "KELex9",
    color: "rgba(200, 120, 120, 0.7)",
    variants: [
      { pos: "c.937", ref: "G", a1: "G", a2: "G" },
      { pos: "c.948", ref: "G", a1: "G", a2: "G" },
      { pos: "c.965", ref: "C", a1: "C", a2: "C" },
      { pos: "c.972", ref: "C", a1: "C", a2: "C" }
    ]
  }
];

const antigens = [
  { name: "K", status: "0" }, { name: "k", status: "+" },
  { name: "Kpa", status: "0" }, { name: "Kpb", status: "+" },
  { name: "Jsa", status: "0" }, { name: "Jsb", status: "+" },
  { name: "KEL11", status: "+" }, { name: "KEL12", status: "+" },
  { name: "KEL14", status: "+" }, { name: "KEL17", status: "0" },
  { name: "KEL18", status: "+" }, { name: "KEL19", status: "+" },
  { name: "TOU", status: "+" }, { name: "RAZ", status: "+" },
  { name: "KALT", status: "+" }, { name: "KTIM", status: "+" }
];

export default function Dashboard() {
  const { isDark } = useTheme();
  const theme = getThemeStyles(isDark);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSections, setExpandedSections] = useState({
    sample: true,
    alleles: true,
    genotypes: true
  });
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const filteredAmplicons = amplicons.filter(amp =>
    amp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    amp.variants.some(v => v.pos.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Liquid glass card style
  const glassCard = {
    background: isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(255, 255, 255, 0.4)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    borderRadius: "20px",
    border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(255, 255, 255, 0.6)"}`,
    padding: "20px"
  };

  // Liquid glass button style
  const glassButton = (isAccent = false) => ({
    padding: "10px 16px",
    borderRadius: "12px",
    border: `1px solid ${isAccent
      ? (isDark ? "rgba(140, 180, 255, 0.2)" : "rgba(70, 130, 180, 0.2)")
      : (isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(255, 255, 255, 0.6)")}`,
    background: isAccent
      ? (isDark ? "rgba(140, 180, 255, 0.1)" : "rgba(70, 130, 180, 0.08)")
      : (isDark ? "rgba(255, 255, 255, 0.04)" : "rgba(255, 255, 255, 0.5)"),
    backdropFilter: "blur(12px)",
    fontWeight: 600,
    fontSize: "12px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    color: isAccent
      ? (isDark ? "rgba(140, 180, 255, 0.9)" : "rgba(70, 130, 180, 0.9)")
      : theme.text
  });

  // Modal component
  const Modal = ({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) => (
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
      onClick={onClose}
    >
      <div
        style={{
          background: isDark ? "rgba(30, 30, 50, 0.8)" : "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderRadius: "24px",
          padding: "28px",
          width: "100%",
          maxWidth: "480px",
          border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(255, 255, 255, 0.6)"}`
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: 700, color: theme.text }}>{title}</h2>
          <button
            onClick={onClose}
            style={{
              ...glassButton(),
              padding: "8px"
            }}
          >
            <X size={16} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );

  return (
    <div style={{ position: "relative" }}>
      {/* Floating Action Buttons - Top Right */}
      <div style={{
        position: "fixed",
        top: "80px",
        right: "32px",
        display: "flex",
        gap: "10px",
        flexWrap: "wrap",
        zIndex: 50,
        maxWidth: "400px",
        justifyContent: "flex-end"
      }}>
        <button onClick={() => setActiveModal('tareas')} style={glassButton()}>
          <Check size={14} /> Tareas
        </button>
        <button onClick={() => setActiveModal('comparar')} style={glassButton()}>
          <Scale size={14} /> Comparar
        </button>
        <button onClick={() => setActiveModal('similares')} style={glassButton()}>
          <SearchIcon size={14} /> Similares
        </button>
        <button onClick={() => setActiveModal('listas')} style={glassButton()}>
          <List size={14} /> Listas
        </button>
        <button onClick={() => setActiveModal('imprimir')} style={glassButton()}>
          <Printer size={14} /> Imprimir
        </button>
        <div style={{
          padding: "10px 18px",
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          background: isDark ? "rgba(100, 180, 150, 0.15)" : "rgba(100, 180, 150, 0.12)",
          backdropFilter: "blur(12px)",
          border: `1px solid ${isDark ? "rgba(100, 180, 150, 0.25)" : "rgba(100, 180, 150, 0.3)"}`
        }}>
          <div style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "rgba(100, 180, 150, 0.8)",
            animation: "pulse 2s infinite"
          }} />
          <span style={{
            fontSize: "12px",
            fontWeight: 700,
            color: isDark ? "rgba(150, 220, 180, 0.9)" : "rgba(60, 140, 100, 0.9)"
          }}>QC: PASS</span>
        </div>
      </div>

      {/* Sample Info - Floating */}
      <div style={{
        display: "flex",
        gap: "16px",
        flexWrap: "wrap",
        marginBottom: "20px",
        marginTop: "10px"
      }}>
        {[
          { label: "Muestra", value: sampleInfo.sample },
          { label: "Gen", value: sampleInfo.gene, accent: true },
          { label: "Genotipo", value: sampleInfo.genotype },
          { label: "Variantes", value: sampleInfo.variants, accent: true }
        ].map((item) => (
          <div
            key={item.label}
            style={{
              padding: "14px 18px",
              borderRadius: "14px",
              background: isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(255, 255, 255, 0.4)",
              backdropFilter: "blur(12px)",
              border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(255, 255, 255, 0.6)"}`
            }}
          >
            <div style={{ fontSize: "10px", color: theme.textMuted, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>
              {item.label}
            </div>
            <div style={{
              fontSize: "15px",
              fontWeight: 700,
              color: item.accent
                ? (isDark ? "rgba(140, 180, 255, 0.9)" : "rgba(70, 130, 180, 0.9)")
                : theme.text
            }}>
              {item.value}
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "280px 1fr 240px", gap: "16px" }}>
        {/* Left Sidebar */}
        <div style={{ ...glassCard, display: "flex", flexDirection: "column", gap: "14px", maxHeight: "calc(100vh - 240px)", overflowY: "auto" }}>
          {/* Sample Information */}
          <div>
            <div
              onClick={() => toggleSection('sample')}
              style={{ fontSize: "10px", color: theme.textMuted, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "10px", fontWeight: 700, display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}
            >
              Informacion de Muestra
              <ChevronDown size={12} style={{ transform: expandedSections.sample ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.3s" }} />
            </div>
            {expandedSections.sample && (
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <div style={{
                  padding: "12px",
                  borderRadius: "12px",
                  border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(0, 0, 0, 0.06)"}`,
                  background: isDark ? "rgba(255, 255, 255, 0.02)" : "rgba(255, 255, 255, 0.3)"
                }}>
                  <div style={{ color: theme.textMuted, marginBottom: "4px", fontSize: "11px", fontWeight: 600 }}>Grupo Sanguineo</div>
                  <div style={{ fontWeight: 700, fontSize: "14px", color: theme.text }}>006 KEL</div>
                </div>
                <div style={{
                  padding: "12px",
                  borderRadius: "12px",
                  border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(0, 0, 0, 0.06)"}`,
                  background: isDark ? "rgba(255, 255, 255, 0.02)" : "rgba(255, 255, 255, 0.3)"
                }}>
                  <div style={{ color: theme.textMuted, marginBottom: "4px", fontSize: "11px", fontWeight: 600 }}>Transcript ID</div>
                  <div style={{ fontWeight: 700, fontSize: "12px", color: theme.text }}>NM_000420.3</div>
                </div>
              </div>
            )}
          </div>

          <div style={{ height: "1px", background: isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(0, 0, 0, 0.06)" }} />

          {/* Allele Calls */}
          <div>
            <div
              onClick={() => toggleSection('alleles')}
              style={{ fontSize: "10px", color: theme.textMuted, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "10px", fontWeight: 700, display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}
            >
              Alelos
              <ChevronDown size={12} style={{ transform: expandedSections.alleles ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.3s" }} />
            </div>
            {expandedSections.alleles && (
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {alleles.map((allele) => (
                  <div
                    key={allele.name}
                    style={{
                      padding: "12px",
                      borderRadius: "12px",
                      background: isDark ? "rgba(100, 180, 150, 0.1)" : "rgba(100, 180, 150, 0.1)",
                      border: `1px solid ${isDark ? "rgba(100, 180, 150, 0.2)" : "rgba(100, 180, 150, 0.25)"}`
                    }}
                  >
                    <div style={{ color: isDark ? "rgba(150, 220, 180, 0.7)" : "rgba(60, 140, 100, 0.8)", marginBottom: "4px", fontSize: "11px", fontWeight: 600 }}>{allele.name}</div>
                    <div style={{ fontWeight: 700, fontSize: "14px", color: isDark ? "rgba(150, 220, 180, 0.9)" : "rgba(60, 140, 100, 0.9)" }}>{allele.value}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ height: "1px", background: isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(0, 0, 0, 0.06)" }} />

          {/* Detailed Genotypes */}
          <div>
            <div
              onClick={() => toggleSection('genotypes')}
              style={{ fontSize: "10px", color: theme.textMuted, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "10px", fontWeight: 700, display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}
            >
              Genotipos Detallados
              <ChevronDown size={12} style={{ transform: expandedSections.genotypes ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.3s" }} />
            </div>
            {expandedSections.genotypes && (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {genotypes.map((gt) => (
                  <div
                    key={gt.system}
                    style={{
                      padding: "10px",
                      background: isDark ? "rgba(255, 255, 255, 0.02)" : "rgba(255, 255, 255, 0.3)",
                      borderRadius: "10px",
                      border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(0, 0, 0, 0.06)"}`
                    }}
                  >
                    <div style={{ fontSize: "12px", fontWeight: 700, color: theme.text, marginBottom: "8px" }}>{gt.system}</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                      {gt.tags.map((tag) => (
                        <span
                          key={tag.name}
                          style={{
                            padding: "3px 8px",
                            borderRadius: "6px",
                            fontSize: "10px",
                            fontWeight: 600,
                            background: tag.status === "+"
                              ? (isDark ? "rgba(100, 180, 150, 0.15)" : "rgba(100, 180, 150, 0.12)")
                              : (isDark ? "rgba(200, 120, 120, 0.15)" : "rgba(200, 120, 120, 0.1)"),
                            color: tag.status === "+"
                              ? (isDark ? "rgba(150, 220, 180, 0.9)" : "rgba(60, 140, 100, 0.9)")
                              : (isDark ? "rgba(240, 150, 150, 0.9)" : "rgba(180, 80, 80, 0.9)")
                          }}
                        >
                          {tag.name}:{tag.status}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Main Content - Amplicons */}
        <div style={{ ...glassCard, overflow: "auto", maxHeight: "calc(100vh - 240px)" }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
            position: "sticky",
            top: 0,
            background: isDark ? "rgba(15, 15, 26, 0.9)" : "rgba(245, 246, 250, 0.9)",
            backdropFilter: "blur(12px)",
            paddingBottom: "12px",
            borderBottom: `1px solid ${isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(0, 0, 0, 0.06)"}`,
            zIndex: 10
          }}>
            <div style={{ fontSize: "10px", color: theme.textMuted, letterSpacing: "1px", textTransform: "uppercase", fontWeight: 700 }}>
              Variantes por Amplicon
            </div>
            <input
              type="text"
              placeholder="Buscar amplicon..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                background: isDark ? "rgba(255, 255, 255, 0.04)" : "rgba(255, 255, 255, 0.5)",
                border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.06)"}`,
                borderRadius: "10px",
                padding: "8px 14px",
                color: theme.text,
                fontSize: "12px",
                fontWeight: 600,
                width: "160px",
                outline: "none",
                backdropFilter: "blur(8px)"
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {filteredAmplicons.map((amplicon) => (
              <div
                key={amplicon.name}
                style={{
                  padding: "16px",
                  borderRadius: "16px",
                  border: `1px solid ${amplicon.color}`,
                  background: isDark ? "rgba(255, 255, 255, 0.02)" : "rgba(255, 255, 255, 0.3)"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: amplicon.color }} />
                  <span style={{ fontWeight: 700, fontSize: "14px", color: theme.text }}>{amplicon.name}</span>
                  <span style={{
                    marginLeft: "auto",
                    fontSize: "10px",
                    color: theme.textMuted,
                    padding: "4px 10px",
                    background: isDark ? "rgba(255, 255, 255, 0.04)" : "rgba(255, 255, 255, 0.4)",
                    borderRadius: "8px",
                    fontWeight: 700
                  }}>
                    {amplicon.variants.length} variantes
                  </span>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(60px, 1fr))", gap: "8px" }}>
                  {amplicon.variants.map((v) => (
                    <div
                      key={v.pos}
                      style={{
                        padding: "10px 6px",
                        borderRadius: "10px",
                        textAlign: "center",
                        cursor: "pointer",
                        border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(0, 0, 0, 0.06)"}`,
                        background: isDark ? "rgba(255, 255, 255, 0.02)" : "rgba(255, 255, 255, 0.4)",
                        transition: "all 0.2s ease"
                      }}
                    >
                      <div style={{ fontSize: "7px", color: theme.textMuted, marginBottom: "4px", fontWeight: 700, textTransform: "uppercase" }}>{v.pos}</div>
                      <div style={{ fontSize: "20px", fontWeight: 900, color: isDark ? "rgba(140, 180, 255, 0.8)" : "rgba(70, 130, 180, 0.8)", marginBottom: "2px" }}>{v.ref}</div>
                      <div style={{ fontSize: "7px", color: theme.textMuted, fontWeight: 600 }}>{v.a1}/{v.a2}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar - Antigens */}
        <div style={{ ...glassCard, maxHeight: "calc(100vh - 240px)", overflowY: "auto" }}>
          <div style={{ fontSize: "10px", color: theme.textMuted, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "12px", fontWeight: 700 }}>
            Antigenos ({antigens.length})
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {antigens.map((antigen) => (
              <div
                key={antigen.name}
                style={{
                  padding: "12px 14px",
                  borderRadius: "12px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                  background: antigen.status === "+"
                    ? (isDark ? "rgba(100, 180, 150, 0.1)" : "rgba(100, 180, 150, 0.08)")
                    : (isDark ? "rgba(255, 255, 255, 0.02)" : "rgba(255, 255, 255, 0.3)"),
                  border: `1px solid ${antigen.status === "+"
                    ? (isDark ? "rgba(100, 180, 150, 0.2)" : "rgba(100, 180, 150, 0.2)")
                    : (isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(0, 0, 0, 0.06)")}`,
                  transition: "all 0.2s ease"
                }}
              >
                <span style={{ fontWeight: 700, fontSize: "12px", color: theme.text }}>{antigen.name}</span>
                <span style={{
                  fontWeight: 900,
                  fontSize: "16px",
                  color: antigen.status === "+"
                    ? (isDark ? "rgba(150, 220, 180, 0.9)" : "rgba(60, 140, 100, 0.9)")
                    : theme.textMuted
                }}>
                  {antigen.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      {activeModal === 'tareas' && (
        <Modal title="Tareas" onClose={() => setActiveModal(null)}>
          <p style={{ color: theme.textMuted, fontSize: "13px", marginBottom: "16px" }}>Gestiona las tareas pendientes para esta muestra.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {["Verificar genotipo KEL*02", "Revisar variantes KELex4", "Confirmar antigenos"].map((task, i) => (
              <div key={i} style={{
                padding: "12px",
                borderRadius: "10px",
                background: isDark ? "rgba(255, 255, 255, 0.04)" : "rgba(255, 255, 255, 0.5)",
                border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.06)"}`,
                display: "flex",
                alignItems: "center",
                gap: "10px"
              }}>
                <div style={{ width: "16px", height: "16px", borderRadius: "4px", border: `2px solid ${theme.textMuted}` }} />
                <span style={{ color: theme.text, fontSize: "13px" }}>{task}</span>
              </div>
            ))}
          </div>
        </Modal>
      )}

      {activeModal === 'comparar' && (
        <Modal title="Comparar" onClose={() => setActiveModal(null)}>
          <p style={{ color: theme.textMuted, fontSize: "13px", marginBottom: "16px" }}>Compara esta muestra con otras muestras en el sistema.</p>
          <button style={{ ...glassButton(true), width: "100%", justifyContent: "center" }}>
            Seleccionar muestra para comparar
          </button>
        </Modal>
      )}

      {activeModal === 'similares' && (
        <Modal title="Muestras Similares" onClose={() => setActiveModal(null)}>
          <p style={{ color: theme.textMuted, fontSize: "13px", marginBottom: "16px" }}>Encuentra muestras con genotipos similares.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {["RBCPv3-Geno-07 (98% similar)", "RBCPv3-Geno-12 (95% similar)", "RBCPv3-Geno-21 (91% similar)"].map((sample, i) => (
              <div key={i} style={{
                padding: "12px",
                borderRadius: "10px",
                background: isDark ? "rgba(255, 255, 255, 0.04)" : "rgba(255, 255, 255, 0.5)",
                border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.06)"}`,
                color: theme.text,
                fontSize: "13px"
              }}>
                {sample}
              </div>
            ))}
          </div>
        </Modal>
      )}

      {activeModal === 'listas' && (
        <Modal title="Listas" onClose={() => setActiveModal(null)}>
          <p style={{ color: theme.textMuted, fontSize: "13px", marginBottom: "16px" }}>Agrega esta muestra a una lista.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {["Muestras prioritarias", "Revision pendiente", "Archivo 2024"].map((list, i) => (
              <button key={i} style={{ ...glassButton(), width: "100%", justifyContent: "flex-start" }}>
                {list}
              </button>
            ))}
          </div>
        </Modal>
      )}

      {activeModal === 'imprimir' && (
        <Modal title="Imprimir" onClose={() => setActiveModal(null)}>
          <p style={{ color: theme.textMuted, fontSize: "13px", marginBottom: "16px" }}>Selecciona el formato de impresion.</p>
          <div style={{ display: "flex", gap: "10px" }}>
            <button style={{ ...glassButton(true), flex: 1, justifyContent: "center" }}>PDF</button>
            <button style={{ ...glassButton(), flex: 1, justifyContent: "center" }}>Excel</button>
          </div>
        </Modal>
      )}

      <ThemeToggle />

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        input::placeholder {
          color: ${theme.textLight};
        }
        input:focus {
          border-color: ${isDark ? "rgba(140, 180, 255, 0.3)" : "rgba(70, 130, 180, 0.3)"} !important;
        }
      `}</style>
    </div>
  );
}
