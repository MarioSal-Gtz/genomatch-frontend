import { useState } from 'react';
import { LuCheck, LuScale, LuSearch, LuList, LuPrinter, LuChevronDown, LuX } from 'react-icons/lu';
import { useTheme } from '../context/ThemeContext';

// Genetic data
const sampleInfo = { sample: "RBCPv3-Geno-03", gene: "KEL", genotype: "KEL*02 / KEL*02", variants: 113 };

const alleles = [
  { name: "Alelo 1", value: "KEL*02" },
  { name: "Alelo 2", value: "KEL*02" }
];

const genotypes = [
  { system: "Sistema Kell (KEL)", tags: [{ name: "K", status: "0" }, { name: "k", status: "+" }, { name: "Kpa", status: "0" }, { name: "Kpb", status: "+" }, { name: "Kpc", status: "0" }] },
  { system: "Sistema Kidd (JK)", tags: [{ name: "Jka", status: "+" }, { name: "Jkb", status: "+" }, { name: "Jk3", status: "+" }] },
  { system: "Sistema Duffy (FY)", tags: [{ name: "Fya", status: "+" }, { name: "Fyb", status: "+" }, { name: "FY3", status: "+" }] },
  { system: "Sistema Lutheran (LU)", tags: [{ name: "Lua", status: "0" }, { name: "Lub", status: "+" }, { name: "Lu5", status: "+" }] }
];

const amplicons = [
  { name: "KELex3", color: "rgba(96,165,250,0.7)", variants: [{ pos: "c.160", ref: "A", a1: "A", a2: "A" }, { pos: "c.161", ref: "T", a1: "T", a2: "T" }, { pos: "c.184", ref: "T", a1: "T", a2: "T" }, { pos: "c.201", ref: "C", a1: "C", a2: "C" }, { pos: "c.223+1", ref: "G", a1: "G", a2: "G" }] },
  { name: "KELex4", color: "rgba(52,211,153,0.7)", variants: [{ pos: "c.230", ref: "G", a1: "G", a2: "G" }, { pos: "c.244", ref: "T", a1: "T", a2: "T" }, { pos: "c.257", ref: "G", a1: "G", a2: "G" }, { pos: "c.267", ref: "C", a1: "C", a2: "C" }, { pos: "c.299", ref: "G", a1: "G", a2: "G" }, { pos: "c.306", ref: "C", a1: "C", a2: "C" }, { pos: "c.328", ref: "A", a1: "A", a2: "A" }, { pos: "c.371", ref: "A", a1: "A", a2: "A" }] },
  { name: "KELex5", color: "rgba(192,132,252,0.7)", variants: [{ pos: "c.436", ref: "G", a1: "G", a2: "G" }, { pos: "c.454", ref: "T", a1: "T", a2: "T" }, { pos: "c.455", ref: "A", a1: "A", a2: "A" }, { pos: "c.456", ref: "C", a1: "C", a2: "C" }, { pos: "c.481", ref: "A", a1: "A", a2: "A" }] },
  { name: "KELex6", color: "rgba(251,191,36,0.7)", variants: [{ pos: "c.526-2", ref: "A", a1: "A", a2: "A" }, { pos: "c.538", ref: "C", a1: "C", a2: "C" }, { pos: "c.539", ref: "G", a1: "G", a2: "G" }, { pos: "c.574", ref: "C", a1: "C", a2: "C" }, { pos: "c.577", ref: "A", a1: "A", a2: "A" }] },
  { name: "KELex8", color: "rgba(52,211,153,0.7)", variants: [{ pos: "c.736-1", ref: "G", a1: "G", a2: "G" }, { pos: "c.742", ref: "C", a1: "C", a2: "C" }, { pos: "c.745", ref: "G", a1: "G", a2: "G" }, { pos: "c.758", ref: "A", a1: "A", a2: "A" }, { pos: "c.780", ref: "G", a1: "G", a2: "G" }, { pos: "c.787", ref: "G", a1: "G", a2: "G" }] },
  { name: "KELex9", color: "rgba(248,113,113,0.7)", variants: [{ pos: "c.937", ref: "G", a1: "G", a2: "G" }, { pos: "c.948", ref: "G", a1: "G", a2: "G" }, { pos: "c.965", ref: "C", a1: "C", a2: "C" }, { pos: "c.972", ref: "C", a1: "C", a2: "C" }] }
];

const antigens = [
  { name: "K", status: "0" }, { name: "k", status: "+" }, { name: "Kpa", status: "0" }, { name: "Kpb", status: "+" },
  { name: "Jsa", status: "0" }, { name: "Jsb", status: "+" }, { name: "KEL11", status: "+" }, { name: "KEL12", status: "+" },
  { name: "KEL14", status: "+" }, { name: "KEL17", status: "0" }, { name: "KEL18", status: "+" }, { name: "KEL19", status: "+" },
  { name: "TOU", status: "+" }, { name: "RAZ", status: "+" }, { name: "KALT", status: "+" }, { name: "KTIM", status: "+" }
];

export default function Expedientes() {
  const { t } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSections, setExpandedSections] = useState({ sample: true, alleles: true, genotypes: true });
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const filteredAmplicons = amplicons.filter(amp =>
    amp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    amp.variants.some(v => v.pos.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const Modal = ({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) => (
    <div style={{ position: "fixed", inset: 0, background: t.bgOverlay, backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "20px" }} onClick={onClose}>
      <div style={{ background: t.bgModal, backdropFilter: "blur(24px)", borderRadius: "20px", padding: "28px", width: "100%", maxWidth: "480px", border: `1px solid ${t.borderInput}` }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: 700, color: t.text }}>{title}</h2>
          <button onClick={onClose} style={{ padding: "8px", borderRadius: "8px", border: `1px solid ${t.borderInput}`, background: t.bgInput, color: t.textMuted, cursor: 'pointer' }}>
            <LuX size={16} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );

  return (
    <>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4" style={{ marginBottom: '28px' }}>
        <div>
          <h2 className="font-bold" style={{ fontSize: '26px', letterSpacing: '-0.02em', color: t.text }}>Expedientes</h2>
          <p style={{ color: t.textMuted, fontSize: '14px', marginTop: '6px' }}>Visualización detallada de genotipo y variantes</p>
        </div>
        <div className="flex items-center" style={{ gap: '10px', flexWrap: 'wrap' }}>
          {[
            { label: "Tareas", icon: LuCheck, onClick: () => setActiveModal('tareas') },
            { label: "Comparar", icon: LuScale, onClick: () => setActiveModal('comparar') },
            { label: "Similares", icon: LuSearch, onClick: () => setActiveModal('similares') },
            { label: "Listas", icon: LuList, onClick: () => setActiveModal('listas') },
            { label: "Imprimir", icon: LuPrinter, onClick: () => setActiveModal('imprimir') },
          ].map((btn) => (
            <button key={btn.label} onClick={btn.onClick} style={{ padding: '8px 14px', borderRadius: '8px', border: `1px solid ${t.borderInput}`, background: t.bgInput, color: t.textMuted, fontSize: '12px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <btn.icon size={14} /> {btn.label}
            </button>
          ))}
          <div style={{ padding: '8px 14px', borderRadius: '8px', background: t.successBg, border: `1px solid ${t.successBorder}`, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: t.successDot }} />
            <span style={{ fontSize: '12px', fontWeight: 700, color: t.success }}>QC: PASS</span>
          </div>
        </div>
      </div>

      {/* Sample Info Cards */}
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '24px' }}>
        {[
          { label: "Muestra", value: sampleInfo.sample },
          { label: "Gen", value: sampleInfo.gene, accent: true },
          { label: "Genotipo", value: sampleInfo.genotype },
          { label: "Variantes", value: sampleInfo.variants, accent: true }
        ].map((item) => (
          <div key={item.label} style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: '14px', padding: '14px 18px' }}>
            <div style={{ fontSize: '10px', color: t.textSubtle, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>{item.label}</div>
            <div style={{ fontSize: '15px', fontWeight: 700, color: item.accent ? t.accentText : t.text }}>{item.value}</div>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr 240px', gap: '20px' }}>
        {/* Left Sidebar */}
        <div style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: '14px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px', maxHeight: 'calc(100vh - 320px)', overflowY: 'auto' }}>
          <div>
            <div onClick={() => toggleSection('sample')} style={{ fontSize: '10px', color: t.textSubtle, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '10px', fontWeight: 700, display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
              Información de Muestra
              <LuChevronDown size={12} style={{ transform: expandedSections.sample ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.3s', color: t.textSubtle }} />
            </div>
            {expandedSections.sample && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ padding: '12px', borderRadius: '10px', border: `1px solid ${t.border}`, background: t.bgInput }}>
                  <div style={{ color: t.textSubtle, marginBottom: '4px', fontSize: '11px', fontWeight: 600 }}>Grupo Sanguíneo</div>
                  <div style={{ fontWeight: 700, fontSize: '14px', color: t.text }}>006 KEL</div>
                </div>
                <div style={{ padding: '12px', borderRadius: '10px', border: `1px solid ${t.border}`, background: t.bgInput }}>
                  <div style={{ color: t.textSubtle, marginBottom: '4px', fontSize: '11px', fontWeight: 600 }}>Transcript ID</div>
                  <div style={{ fontWeight: 700, fontSize: '12px', color: t.text }}>NM_000420.3</div>
                </div>
              </div>
            )}
          </div>
          <div style={{ height: '1px', background: t.border }} />
          <div>
            <div onClick={() => toggleSection('alleles')} style={{ fontSize: '10px', color: t.textSubtle, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '10px', fontWeight: 700, display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
              Alelos
              <LuChevronDown size={12} style={{ transform: expandedSections.alleles ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.3s', color: t.textSubtle }} />
            </div>
            {expandedSections.alleles && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {alleles.map((allele) => (
                  <div key={allele.name} style={{ padding: '12px', borderRadius: '10px', background: t.successBg, border: `1px solid ${t.successBorder}` }}>
                    <div style={{ color: t.success, marginBottom: '4px', fontSize: '11px', fontWeight: 600, opacity: 0.7 }}>{allele.name}</div>
                    <div style={{ fontWeight: 700, fontSize: '14px', color: t.success }}>{allele.value}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div style={{ height: '1px', background: t.border }} />
          <div>
            <div onClick={() => toggleSection('genotypes')} style={{ fontSize: '10px', color: t.textSubtle, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '10px', fontWeight: 700, display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
              Genotipos Detallados
              <LuChevronDown size={12} style={{ transform: expandedSections.genotypes ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.3s', color: t.textSubtle }} />
            </div>
            {expandedSections.genotypes && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {genotypes.map((gt) => (
                  <div key={gt.system} style={{ padding: '10px', background: t.bgInput, borderRadius: '10px', border: `1px solid ${t.border}` }}>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: t.text, marginBottom: '8px' }}>{gt.system}</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                      {gt.tags.map((tag) => (
                        <span key={tag.name} style={{ padding: '3px 8px', borderRadius: '6px', fontSize: '10px', fontWeight: 600, background: tag.status === '+' ? t.successBg : t.dangerBg, color: tag.status === '+' ? t.success : t.danger }}>
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
        <div style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: '14px', padding: '20px', overflow: 'auto', maxHeight: 'calc(100vh - 320px)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', position: 'sticky', top: 0, background: t.bgTopbar, backdropFilter: 'blur(12px)', paddingBottom: '12px', borderBottom: `1px solid ${t.border}`, zIndex: 10 }}>
            <div style={{ fontSize: '10px', color: t.textSubtle, letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 700 }}>Variantes por Amplicon</div>
            <input type="text" placeholder="Buscar amplicon..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ background: t.bgInput, border: `1px solid ${t.borderInput}`, borderRadius: '8px', padding: '8px 14px', color: t.text, fontSize: '12px', fontWeight: 600, width: '160px', outline: 'none' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filteredAmplicons.map((amplicon) => (
              <div key={amplicon.name} style={{ padding: '16px', borderRadius: '12px', border: `1px solid ${amplicon.color}`, background: t.bgInput }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: amplicon.color }} />
                  <span style={{ fontWeight: 700, fontSize: '14px', color: t.text }}>{amplicon.name}</span>
                  <span style={{ marginLeft: 'auto', fontSize: '10px', color: t.textSubtle, padding: '4px 10px', background: t.bgHover, borderRadius: '6px', fontWeight: 700 }}>{amplicon.variants.length} variantes</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(60px, 1fr))', gap: '8px' }}>
                  {amplicon.variants.map((v) => (
                    <div key={v.pos} style={{ padding: '10px 6px', borderRadius: '8px', textAlign: 'center', cursor: 'pointer', border: `1px solid ${t.border}`, background: t.bgCard }}>
                      <div style={{ fontSize: '7px', color: t.textSubtle, marginBottom: '4px', fontWeight: 700, textTransform: 'uppercase' }}>{v.pos}</div>
                      <div style={{ fontSize: '20px', fontWeight: 900, color: t.accentText, marginBottom: '2px' }}>{v.ref}</div>
                      <div style={{ fontSize: '7px', color: t.textSubtle, fontWeight: 600 }}>{v.a1}/{v.a2}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar - Antigens */}
        <div style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: '14px', padding: '20px', maxHeight: 'calc(100vh - 320px)', overflowY: 'auto' }}>
          <div style={{ fontSize: '10px', color: t.textSubtle, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '12px', fontWeight: 700 }}>Antígenos ({antigens.length})</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {antigens.map((antigen) => (
              <div key={antigen.name} style={{ padding: '12px 14px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', background: antigen.status === '+' ? t.successBg : t.bgInput, border: `1px solid ${antigen.status === '+' ? t.successBorder : t.border}` }}>
                <span style={{ fontWeight: 700, fontSize: '12px', color: t.text }}>{antigen.name}</span>
                <span style={{ fontWeight: 900, fontSize: '16px', color: antigen.status === '+' ? t.success : t.textSubtle }}>{antigen.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      {activeModal === 'tareas' && (
        <Modal title="Tareas" onClose={() => setActiveModal(null)}>
          <p style={{ color: t.textMuted, fontSize: '13px', marginBottom: '16px' }}>Gestiona las tareas pendientes para esta muestra.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {["Verificar genotipo KEL*02", "Revisar variantes KELex4", "Confirmar antígenos"].map((task, i) => (
              <div key={i} style={{ padding: '12px', borderRadius: '10px', background: t.bgInput, border: `1px solid ${t.borderInput}`, display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '16px', height: '16px', borderRadius: '4px', border: `2px solid ${t.textSubtle}` }} />
                <span style={{ color: t.text, fontSize: '13px' }}>{task}</span>
              </div>
            ))}
          </div>
        </Modal>
      )}
      {activeModal === 'comparar' && (
        <Modal title="Comparar" onClose={() => setActiveModal(null)}>
          <p style={{ color: t.textMuted, fontSize: '13px', marginBottom: '16px' }}>Compara esta muestra con otras muestras en el sistema.</p>
          <button style={{ padding: '12px 20px', borderRadius: '10px', border: `1px solid ${t.accentBorder}`, background: t.accentBg, color: t.accentText, fontWeight: 600, fontSize: '13px', cursor: 'pointer', width: '100%' }}>Seleccionar muestra para comparar</button>
        </Modal>
      )}
      {activeModal === 'similares' && (
        <Modal title="Muestras Similares" onClose={() => setActiveModal(null)}>
          <p style={{ color: t.textMuted, fontSize: '13px', marginBottom: '16px' }}>Encuentra muestras con genotipos similares.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {["RBCPv3-Geno-07 (98% similar)", "RBCPv3-Geno-12 (95% similar)", "RBCPv3-Geno-21 (91% similar)"].map((s, i) => (
              <div key={i} style={{ padding: '12px', borderRadius: '10px', background: t.bgInput, border: `1px solid ${t.borderInput}`, color: t.text, fontSize: '13px' }}>{s}</div>
            ))}
          </div>
        </Modal>
      )}
      {activeModal === 'listas' && (
        <Modal title="Listas" onClose={() => setActiveModal(null)}>
          <p style={{ color: t.textMuted, fontSize: '13px', marginBottom: '16px' }}>Agrega esta muestra a una lista.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {["Muestras prioritarias", "Revisión pendiente", "Archivo 2024"].map((list, i) => (
              <button key={i} style={{ padding: '12px 20px', borderRadius: '10px', border: `1px solid ${t.borderInput}`, background: t.bgInput, color: t.textMuted, fontWeight: 600, fontSize: '13px', cursor: 'pointer', textAlign: 'left' }}>{list}</button>
            ))}
          </div>
        </Modal>
      )}
      {activeModal === 'imprimir' && (
        <Modal title="Imprimir" onClose={() => setActiveModal(null)}>
          <p style={{ color: t.textMuted, fontSize: '13px', marginBottom: '16px' }}>Selecciona el formato de impresión.</p>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button style={{ flex: 1, padding: '12px', borderRadius: '10px', border: `1px solid ${t.accentBorder}`, background: t.accentBg, color: t.accentText, fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}>PDF</button>
            <button style={{ flex: 1, padding: '12px', borderRadius: '10px', border: `1px solid ${t.borderInput}`, background: t.bgInput, color: t.textMuted, fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}>Excel</button>
          </div>
        </Modal>
      )}

      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        input::placeholder { color: ${t.placeholder}; }
        input:focus { border-color: ${t.inputFocus} !important; }
      `}</style>
    </>
  );
}
