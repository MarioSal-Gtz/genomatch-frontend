import { LuSearch } from 'react-icons/lu';
import PlaceholderPage from '../components/PlaceholderPage';

export default function BusquedaMatch() {
  return (
    <PlaceholderPage
      icon={LuSearch}
      title="Búsqueda y Match"
      description="Motor de búsqueda avanzada y algoritmo de compatibilidad molecular para encontrar los mejores donantes compatibles."
      features={[
        'Búsqueda por ID, nombre, código, ISBT, gen o alelo',
        'Autocompletado inteligente con filtros avanzados',
        'Algoritmo de compatibilidad con % y ranking de donantes',
        'Detección de incompatibilidades críticas',
        'Exportar resultados (Excel, PDF, CSV)',
        'Compartir búsquedas (email, WhatsApp, enlace)',
      ]}
    />
  );
}
