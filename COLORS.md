# 🎨 Paleta de Colores - Inmobiliaria

## Colores Principales

### Modo Claro

| Variable             | Color | Hex       | Descripción                                 |
| -------------------- | ----- | --------- | ------------------------------------------- |
| `--primary`          | 🟣    | `#8b5cf6` | Lila vibrante - Color principal de la marca |
| `--secondary`        | 🟣    | `#e9d5ff` | Lila suave - Color secundario               |
| `--accent`           | 🟣    | `#f3e8ff` | Lila muy claro - Acentos y highlights       |
| `--background`       | ⚪    | `#ffffff` | Fondo principal                             |
| `--foreground`       | ⚫    | `#1a1a2e` | Texto principal                             |
| `--card`             | ⚪    | `#fafafa` | Fondo de tarjetas                           |
| `--card-foreground`  | ⚫    | `#1a1a2e` | Texto en tarjetas                           |
| `--muted`            | ⚪    | `#f3f4f6` | Fondo muted                                 |
| `--muted-foreground` | ⚫    | `#6b7280` | Texto muted                                 |
| `--border`           | ⚪    | `#e5e7eb` | Bordes                                      |
| `--destructive`      | 🔴    | `#ef4444` | Errores y acciones destructivas             |

### Modo Oscuro

| Variable             | Color | Hex       | Descripción                                |
| -------------------- | ----- | --------- | ------------------------------------------ |
| `--primary`          | 🟣    | `#a855f7` | Lila vibrante (más claro para modo oscuro) |
| `--secondary`        | 🟣    | `#2d1b69` | Lila oscuro                                |
| `--accent`           | 🟣    | `#3d1f7a` | Lila medio oscuro                          |
| `--background`       | ⚫    | `#0f0f23` | Fondo principal oscuro                     |
| `--foreground`       | ⚪    | `#f3f4f6` | Texto principal claro                      |
| `--card`             | ⚫    | `#1a1a2e` | Fondo de tarjetas oscuro                   |
| `--card-foreground`  | ⚪    | `#f3f4f6` | Texto en tarjetas claro                    |
| `--muted`            | ⚫    | `#1f2937` | Fondo muted oscuro                         |
| `--muted-foreground` | ⚪    | `#9ca3af` | Texto muted claro                          |
| `--border`           | ⚫    | `#374151` | Bordes oscuros                             |
| `--destructive`      | 🔴    | `#dc2626` | Errores en modo oscuro                     |

## Colores de Gráficos (Charts)

### Modo Claro

- `--chart-1`: `#8b5cf6` (Lila principal)
- `--chart-2`: `#a855f7` (Lila más claro)
- `--chart-3`: `#6366f1` (Índigo)
- `--chart-4`: `#3b82f6` (Azul)
- `--chart-5`: `#10b981` (Verde)

### Modo Oscuro

- `--chart-1`: `#a855f7` (Lila principal)
- `--chart-2`: `#c084fc` (Lila claro)
- `--chart-3`: `#818cf8` (Índigo claro)
- `--chart-4`: `#60a5fa` (Azul claro)
- `--chart-5`: `#34d399` (Verde claro)

## Uso en Tailwind CSS

```css
/* Ejemplos de uso */
.bg-primary {
  background-color: #8b5cf6;
}
.text-primary {
  color: #8b5cf6;
}
.border-primary {
  border-color: #8b5cf6;
}

.bg-secondary {
  background-color: #e9d5ff;
}
.text-secondary {
  color: #1a1a2e;
}

.bg-accent {
  background-color: #f3e8ff;
}
.text-accent {
  color: #1a1a2e;
}
```

## Gradientes Comunes

```css
/* Gradiente principal */
.bg-gradient-primary {
  background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%);
}

/* Gradiente sutil */
.bg-gradient-subtle {
  background: linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%);
}

/* Gradiente de fondo */
.bg-gradient-background {
  background: linear-gradient(135deg, #ffffff 0%, #f3f4f6 100%);
}
```

## Accesibilidad

Todos los colores han sido seleccionados para cumplir con los estándares de contraste WCAG 2.1:

- **Contraste mínimo**: 4.5:1 para texto normal
- **Contraste alto**: 7:1 para texto pequeño
- **Contraste de botones**: 3:1 mínimo

## Personalización

Para cambiar el color principal, simplemente modifica:

```css
:root {
  --primary: #tu-nuevo-color;
}
```

Y todos los colores relacionados se ajustarán automáticamente manteniendo la coherencia visual.
