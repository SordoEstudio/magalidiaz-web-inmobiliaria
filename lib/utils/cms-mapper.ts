import { CMSComponent } from '@/lib/types/cms-components'

// Tipos para diferentes componentes CMS
export interface AboutComponentData {
  img_perfil: string
  txt_nombre: string
  txt_apellido: string
  txt_descripcion: string
  txt_destacado: string
  txt_image_alt: string
  lista_titulos: Array<{
    titulo: string
    descripcion: string
  }>
}

export interface HeroBannerData {
  titulo_principal: string
  subtitulo: string
  descripcion: string
  imagen_fondo: string
  boton_texto: string
  boton_url: string
}

export interface ServiceComponentData {
  titulo: string
  descripcion: string
  servicios: Array<{
    icono: string
    titulo: string
    descripcion: string
  }>
}

export interface HeroSearchData {
  txt_title: string
  txt_featured_text: string
  txt_description: string
  img_background: string
  txt_cta_text: string
  txt_cta_description: string
  txt_cta_label: string
  txt_url_cta: string
}
// Mapeador de componentes CMS
export class CMSComponentMapper {
  private static instance: CMSComponentMapper
  private componentMappers: Map<string, (data: any) => any> = new Map()

  constructor() {
    this.initializeMappers()
  }

  static getInstance(): CMSComponentMapper {
    if (!CMSComponentMapper.instance) {
      CMSComponentMapper.instance = new CMSComponentMapper()
    }
    return CMSComponentMapper.instance
  }

  private initializeMappers() {
    // Mapper para componente About
    this.componentMappers.set('about_component', (data: any): AboutComponentData => ({
      img_perfil: data.img_perfil || '',
      txt_nombre: data.txt_nombre || '',
      txt_apellido: data.txt_apellido || '',
      txt_descripcion: data.txt_descripcion || '',
      txt_destacado: data.txt_destacado || '',
      txt_image_alt: data.txt_image_alt || '',
      lista_titulos: data.lista_titulos || []
    }))

    // Mapper para Hero Banner
    this.componentMappers.set('hero_banner', (data: any): HeroBannerData => ({
      titulo_principal: data.titulo_principal || '',
      subtitulo: data.subtitulo || '',
      descripcion: data.descripcion || '',
      imagen_fondo: data.imagen_fondo || '',
      boton_texto: data.boton_texto || '',
      boton_url: data.boton_url || ''
    }))

    // Mapper para Servicios
    this.componentMappers.set('services_component', (data: any): ServiceComponentData => ({
      titulo: data.titulo || '',
      descripcion: data.descripcion || '',
      servicios: data.servicios || []
    }))
    // Mapper para Hero Search
    this.componentMappers.set('hero_search', (data: any): HeroSearchData => ({
      txt_title: data.txt_title || '',
      txt_featured_text: data.txt_featured_text || '',
      txt_description: data.txt_description || '',
      img_background: data.img_background || '',
      txt_cta_text: data.txt_cta_text || '',
      txt_cta_description: data.txt_cta_description || '',
      txt_cta_label: data.txt_cta_label || '',
      txt_url_cta: data.txt_url_cta || ''
    }))
  }

  // Mapear un componente individual
  mapComponent(component: CMSComponent): any {
    const mapper = this.componentMappers.get(component.type)
    if (!mapper) {
      console.warn(`No mapper found for component type: ${component.type}`)
      return component.data
    }

    try {
      return mapper(component.data)
    } catch (error) {
      console.error(`Error mapping component ${component._id}:`, error)
      return component.data
    }
  }

  // Mapear múltiples componentes
  mapComponents(components: CMSComponent[]): Map<string, any> {
    const mappedComponents = new Map<string, any>()
    
    components.forEach(component => {
      const mappedData = this.mapComponent(component)
      mappedComponents.set(component.type, {
        ...component,
        mappedData
      })
    })
    
    return mappedComponents
  }

  // Obtener componente por tipo
  getComponentByType(components: CMSComponent[], type: string): any | null {
    const component = components.find(c => c.type === type)
    if (!component) return null
    
    return this.mapComponent(component)
  }

  // Obtener componentes por página
  getComponentsByPage(components: CMSComponent[], page: string): any[] {
    return components
      .filter(c => c.page === page && c.isActive && c.isVisible)
      .map(component => this.mapComponent(component))
  }

  // Validar datos de componente
  validateComponentData(component: CMSComponent): boolean {
    if (!component.isActive || !component.isVisible) return false
    if (!component.data || typeof component.data !== 'object') return false
    
    // Validaciones específicas por tipo
    switch (component.type) {
      case 'about_component':
        return this.validateAboutComponent(component.data)
      case 'hero_banner':
        return this.validateHeroBanner(component.data)
      default:
        return true
    }
  }

  private validateAboutComponent(data: any): boolean {
    return !!(
      data.txt_nombre &&
      data.txt_apellido &&
      data.txt_descripcion
    )
  }

  private validateHeroBanner(data: any): boolean {
    return !!(
      data.titulo_principal &&
      data.descripcion
    )
  }

  // Agregar nuevo mapper dinámicamente
  addMapper(type: string, mapper: (data: any) => any) {
    this.componentMappers.set(type, mapper)
  }

  // Obtener tipos de componentes disponibles
  getAvailableTypes(): string[] {
    return Array.from(this.componentMappers.keys())
  }
}

// Instancia singleton
export const cmsMapper = CMSComponentMapper.getInstance()
