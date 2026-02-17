import { LuMicroscope } from 'react-icons/lu';
import PlaceholderPage from '../components/PlaceholderPage';

export default function DevyserIntegracion() {
  return (
    <PlaceholderPage
      icon={LuMicroscope}
      title="Integración Devyser"
      description="Integración directa con la plataforma de secuenciación Devyser para importación y procesamiento automatizado."
      features={[
        'Importación de archivos CSV/TSV de secuenciación',
        'Parseo automático de resultados Devyser',
        'Monitoreo de runs procesados y pendientes',
        'Métricas de calidad de secuenciación',
        'Sincronización automática de datos',
        'Historial de importaciones',
      ]}
    />
  );
}
