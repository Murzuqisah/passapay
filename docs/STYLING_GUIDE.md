# PassaPay Styling Guide

## Design System Overview

PassaPay uses a modern, glass-morphism inspired design system built with **TailwindCSS 4** and **DaisyUI** components. The design emphasizes transparency, depth, and smooth animations to create an engaging user experience for artists and creators.

## Color Palette

### Primary Colors
- **Primary**: Dynamic based on theme (purple/blue gradient)
- **Secondary**: Muted complementary colors
- **Accent**: Highlight colors for CTAs and important elements

### Semantic Colors
- **Success**: Green variants for positive actions
- **Warning**: Yellow/orange for cautions
- **Error**: Red variants for errors and validation
- **Info**: Blue variants for informational content

### Background System
- **Background**: Main page background
- **Foreground**: Primary text color
- **Muted**: Secondary text and subtle elements
- **Border**: Dividers and component borders

## Typography

### Font Stack
- **Primary**: Geist Sans (modern, clean)
- **Monospace**: Geist Mono (code and technical content)

### Text Hierarchy
```css
/* Headers */
.section-header - Large gradient headers
text-4xl font-bold - Main page titles
text-2xl font-semibold - Section titles
text-xl font-semibold - Subsection titles

/* Body Text */
text-base - Standard body text
text-sm - Secondary information
text-xs - Captions and metadata

/* Responsive Scaling */
text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl
```

## Glass Morphism Components

### Core Glass Classes
```css
.section-glass - Main glass container with backdrop blur
.glass-card - Smaller glass elements with subtle borders
```

### Implementation
- **Backdrop blur**: `backdrop-blur-md`
- **Background opacity**: `bg-background/80`
- **Borders**: `border border-border/50`
- **Shadows**: `shadow-lg` for depth

## Component Patterns

### Navigation
- **Fixed positioning** with scroll-based transitions
- **Rounded corners** that flatten on scroll
- **Responsive breakpoints** for mobile/desktop layouts

### Cards and Containers
- **Consistent padding**: `p-4 sm:p-6` for responsive spacing
- **Rounded corners**: `rounded-lg` or `rounded-2xl`
- **Hover states**: Subtle scale and opacity changes

### Buttons
- **Primary**: Solid background with hover effects
- **Secondary**: Outline style with fill on hover
- **Ghost**: Transparent with subtle hover background

## Animation System

### Transitions
- **Duration**: `duration-300` for quick interactions
- **Duration**: `duration-500` for layout changes
- **Easing**: `ease-out` for natural movement

### Hover Effects
```css
hover:scale-105 - Subtle scale increase
hover:bg-primary/90 - Background color changes
transition-all duration-300 - Smooth transitions
```

### Loading States
- **Opacity changes**: `opacity-50` for disabled states
- **Pulse animations**: For loading indicators
- **Skeleton screens**: Placeholder content during loading

## Responsive Design

### Breakpoint Strategy
```css
/* Mobile First Approach */
xs: 475px - Extra small devices
sm: 640px - Small devices
md: 768px - Medium devices
lg: 1024px - Large devices
xl: 1280px - Extra large devices
```

### Layout Patterns
- **Grid systems**: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- **Flexbox**: For component alignment and distribution
- **Container queries**: For component-specific responsive behavior

## Accessibility

### Color Contrast
- All text meets WCAG AA standards
- Focus indicators are clearly visible
- Color is not the only way to convey information

### Interactive Elements
- **Focus states**: Clear outline or background changes
- **Touch targets**: Minimum 44px for mobile
- **Keyboard navigation**: Full keyboard accessibility

### Screen Readers
- Semantic HTML structure
- ARIA labels where needed
- Alt text for all images

## Dark Mode Support

### Implementation
- Uses CSS custom properties for theme switching
- **ThemeProvider** component manages theme state
- **System preference** detection and manual override

### Color Adaptation
- All colors automatically adapt to theme
- **Opacity-based** backgrounds for consistency
- **Border colors** adjust with theme

## Performance Considerations

### CSS Optimization
- **Tailwind purging** removes unused styles
- **Critical CSS** inlined for above-the-fold content
- **Lazy loading** for non-critical styles

### Animation Performance
- **Transform-based** animations for GPU acceleration
- **Will-change** property for complex animations
- **Reduced motion** support for accessibility

## Component Library

### UI Components
- **Button**: Multiple variants with consistent styling
- **Input**: Form inputs with validation states
- **Card**: Container component with glass styling
- **Modal**: Overlay components with backdrop blur

### Layout Components
- **Navbar**: Responsive navigation with scroll effects
- **Footer**: Site footer with newsletter subscription
- **Hero**: Landing page hero sections
- **Section**: Content section wrapper

## Best Practices

### CSS Organization
1. Use **utility classes** for most styling
2. Create **component classes** for repeated patterns
3. Keep **custom CSS** minimal and well-documented
4. Use **CSS variables** for theme-dependent values

### Performance
1. **Minimize** custom CSS
2. Use **transform** instead of changing layout properties
3. **Batch** DOM updates when possible
4. **Optimize** images and use appropriate formats

### Maintainability
1. **Consistent naming** conventions
2. **Document** complex styling decisions
3. **Test** across different devices and browsers
4. **Regular audits** of unused styles

## Development Workflow

### Setup
1. TailwindCSS 4 with custom configuration
2. DaisyUI for component base styles
3. PostCSS for processing
4. ESLint/Prettier for code formatting

### Testing
1. **Visual regression** testing for UI changes
2. **Accessibility** testing with automated tools
3. **Cross-browser** compatibility testing
4. **Performance** monitoring and optimization

This styling guide ensures consistent, accessible, and performant UI across the PassaPay platform while maintaining the artistic and creative aesthetic that resonates with our target audience.