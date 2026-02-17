import { LuSettings } from 'react-icons/lu';
import PlaceholderPage from '../components/PlaceholderPage';

export default function Configuracion() {
  return (
    <PlaceholderPage
      icon={LuSettings}
      title="Configuración"
      description="Configuración general del sistema, catálogos y preferencias de la organización."
      features={[
        'Configuración de organización (logo, colores, reportes)',
        'Catálogos de sistemas ISBT',
        'Configuración de notificaciones',
        'Parámetros de integración HL7-FHIR',
        'Gestión de respaldos',
        'Preferencias de usuario',
      ]}
    />
  );
}
