import { LuFileChartColumn } from 'react-icons/lu';
import PlaceholderPage from '../components/PlaceholderPage';

export default function Reportes() {
  return (
    <PlaceholderPage
      icon={LuFileChartColumn}
      title="Reportes"
      description="Generación de reportes clínicos en múltiples formatos con historial completo y trazabilidad."
      features={[
        'Reporte básico (resumen PDF)',
        'Reporte extenso (completo PDF)',
        'Formatos: PDF, Excel, HL7-FHIR',
        'Impresión directa y envío por email',
        'Historial de reportes generados',
        'Personalización por organización',
      ]}
    />
  );
}
