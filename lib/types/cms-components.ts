// Tipos para componentes CMS basados en la API

export interface CMSComponent {
  _id: string;
  name: string;
  type: string;
  page: string;
  data: Record<string, any>; // Datos dinámicos del componente
  content?: string; // Contenido adicional si existe
  status: 'published' | 'draft' | 'archived';
  isActive: boolean;
  isVisible: boolean;
  thumbnail?: {
    url: string;
    alt: string;
  };
  description?: string;
  createdAt: string;
  updatedAt: string;
  clientName: string;
}

export interface CMSComponentsResponse {
  success: boolean;
  data: {
    components: CMSComponent[];
    client: {
      id: string;
      name: string;
      slug: string;
    };
  };
  message: string;
}

export interface CMSComponentResponse {
  success: boolean;
  data: {
    component: CMSComponent;
    client: {
      id: string;
      name: string;
      slug: string;
    };
  };
  message: string;
}

// Filtros para componentes CMS
export interface CMSComponentFilters {
  type?: string;
  page_filter?: string;
  status?: string;
}

// Hook return types
export interface UseCMSComponentsReturn {
  components: CMSComponent[] | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
  getComponentByType: (type: string) => CMSComponent | null;
  getComponentsByPage: (page: string) => CMSComponent[];
  cacheStats: {
    total: number;
    valid: number;
    expired: number;
    hitRate: number;
  };
}

export interface UseCMSComponentReturn {
  component: CMSComponent | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

