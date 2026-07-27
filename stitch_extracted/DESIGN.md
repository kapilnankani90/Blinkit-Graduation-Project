---
name: Celestial Intelligence
colors:
  surface: '#0f131c'
  surface-dim: '#0f131c'
  surface-bright: '#353943'
  surface-container-lowest: '#0a0e17'
  surface-container-low: '#181b25'
  surface-container: '#1c1f29'
  surface-container-high: '#262a34'
  surface-container-highest: '#31353f'
  on-surface: '#dfe2ef'
  on-surface-variant: '#d8c3ad'
  inverse-surface: '#dfe2ef'
  inverse-on-surface: '#2c303a'
  outline: '#a08e7a'
  outline-variant: '#534434'
  surface-tint: '#ffb95f'
  primary: '#ffc174'
  on-primary: '#472a00'
  primary-container: '#f59e0b'
  on-primary-container: '#613b00'
  inverse-primary: '#855300'
  secondary: '#d0bcff'
  on-secondary: '#3c0091'
  secondary-container: '#571bc1'
  on-secondary-container: '#c4abff'
  tertiary: '#b6ccff'
  on-tertiary: '#002e6a'
  tertiary-container: '#8ab0ff'
  on-tertiary-container: '#00408f'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffddb8'
  primary-fixed-dim: '#ffb95f'
  on-primary-fixed: '#2a1700'
  on-primary-fixed-variant: '#653e00'
  secondary-fixed: '#e9ddff'
  secondary-fixed-dim: '#d0bcff'
  on-secondary-fixed: '#23005c'
  on-secondary-fixed-variant: '#5516be'
  tertiary-fixed: '#d8e2ff'
  tertiary-fixed-dim: '#adc6ff'
  on-tertiary-fixed: '#001a42'
  on-tertiary-fixed-variant: '#004395'
  background: '#0f131c'
  on-background: '#dfe2ef'
  surface-variant: '#31353f'
typography:
  display-lg:
    fontFamily: Outfit
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Outfit
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Outfit
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Outfit
    fontSize: 20px
    fontWeight: '500'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  headline-lg-mobile:
    fontFamily: Outfit
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  max-width: 1400px
  base-grid: 8px
  gutter: 24px
  margin-desktop: 48px
  margin-mobile: 20px
  container-padding: 32px
---

## Brand & Style

The design system is engineered for high-level decision-makers who require clarity amidst complex data. The brand personality is **sophisticated, technical, and illuminating**. It leverages a "Deep Space" aesthetic—a dark mode environment where information is brought to the foreground through light, glow, and transparency.

The design style is a hybrid of **Glassmorphism** and **Modern Corporate**. It utilizes high-transparency layers to maintain a sense of depth and hierarchy without cluttering the interface. Visual interest is generated through light-leak effects and subtle glowing borders, mimicking a futuristic cockpit or a premium command center. The emotional response should be one of control, precision, and forward-thinking innovation.

## Colors

The palette is anchored by a **Deep Space Dark (#0a0e17)** foundation, providing a high-contrast backdrop for vibrant accents. 

- **Primary Accent (Amber Gold):** Used for critical calls to action, primary brand indicators, and "Warning" or "Pending" states that require immediate PM attention.
- **Secondary Accent (Electric Violet):** Used for secondary interactions, creative insights, and specific data categories in charts.
- **Interactive/Info (Soft Cyan):** Used for standard links, information tooltips, and neutral interactive states.
- **Success & Danger:** Reserved strictly for performance indicators (e.g., metric growth vs. churn).

Surface colors are not solid; they are built using low-opacity white overlays on the base dark background to create the glass effect, ensuring the background remains visible through the layers.

## Typography

This design system uses a dual-font strategy to balance character with readability.

- **Headings (Outfit):** A geometric sans-serif that brings a modern, tech-forward energy. Use for all page titles, card headers, and large metric displays.
- **Body & Interface (Inter):** Chosen for its exceptional legibility at small sizes. Used for all analytical text, table data, labels, and paragraph copy.

Hierarchies are strictly maintained through weight variations. Labels should frequently use `uppercase` and increased `letter-spacing` to differentiate metadata from body content. For large numbers in dashboard widgets, use `display-lg` with `semibold` weight.

## Layout & Spacing

The layout follows a **Fixed-Fluid Hybrid** model. The main content area is capped at **1400px** to ensure data density remains readable on ultra-wide monitors, while the sidebars and margins expand fluidly.

- **Grid:** A 12-column grid system with 24px gutters.
- **Rhythm:** All spacing (padding, margins, element gaps) must be multiples of **8px**.
- **Desktop:** Generous 48px outer margins to provide "breathing room" around the glass containers.
- **Tablet/Mobile:** At 768px and below, the grid collapses to 1 column. Padding is reduced to 20px to maximize screen real estate for charts.

Data cards should use `container-padding: 32px` to allow complex charts and mentions enough internal room to avoid a cramped "data-heavy" look.

## Elevation & Depth

Depth is established through **optical transparency** rather than traditional drop shadows.

1.  **Level 0 (Base):** Deep Space Dark (#0a0e17).
2.  **Level 1 (Cards):** Surface `rgba(255, 255, 255, 0.03)` with a `backdrop-filter: blur(12px)`.
3.  **Level 2 (Modals/Popovers):** Surface `rgba(255, 255, 255, 0.06)` with a `backdrop-filter: blur(20px)`.

**Glow Effects:**
- **Active State:** Elements like active stepper nodes or hovered cards receive a `box-shadow: 0 0 20px rgba(245, 158, 11, 0.15)` (using the primary accent color).
- **Borders:** Cards use a 1px solid border at `rgba(255, 255, 255, 0.1)`. On hover, the border color transitions to the primary or secondary accent at 30% opacity.

## Shapes

The shape language is **distinctly rounded but structured**. 

- **Cards/Containers:** Use `1rem` (16px) corner radius to soften the technical nature of the dashboard.
- **Buttons/Inputs:** Use `0.5rem` (8px) for a more precise, clickable feel.
- **Mention Pills:** Use `3` (Pill-shaped) to distinguish them clearly from interactive buttons or stat cards.
- **Charts:** Bar charts should have slightly rounded top corners (4px) to match the overall UI softness.

## Components

### Buttons & Interactive Elements
- **Primary:** Solid Amber Gold (#f59e0b) with dark text. No shadow, but a subtle outer glow on hover.
- **Ghost:** Transparent background with a 1px border and accent-colored text.

### Stat Cards
Stat cards should feature a large `display-lg` metric, a small sparkline chart in the background, and a "trend indicator" (Emerald for up, Crimson for down) in the top right.

### Mention Pills & Context Boxes
- **Mention Pills:** Small, high-contrast pills (e.g., Violet or Cyan backgrounds at 15% opacity) used within text or card footers.
- **Trigger Context Boxes:** Small popover menus that appear on hover/click, using the Level 2 elevation (Glassmorphism) to overlay other content without losing context.

### Charts
- **Donut/Bar:** Use the primary, secondary, and tertiary colors. Use semi-transparent versions of these colors for non-highlighted data series.
- **Gradients:** Use vertical gradients on bar charts (Solid Color -> Transparent) to emphasize the verticality and integration with the dark background.

### Stepper
Horizontal or vertical line with 32px circular nodes. Active nodes should "glow" using the Amber Gold accent, while completed nodes use a subtle Cyan checkmark.