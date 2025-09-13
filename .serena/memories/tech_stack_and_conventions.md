# Tech Stack and Code Conventions

## Tech Stack
- **Next.js** 13.4.12 (Pages Router)
- **TypeScript** 5.1.6
- **Tailwind CSS** 3.3.3 with custom configuration
- **Framer Motion** 10.13.0 for animations
- **React Icons** 4.10.1

## Code Style and Conventions
- **File Structure**: Pages in `/pages`, components in `/components`
- **Component Style**: Functional components with TypeScript interfaces
- **Naming**: PascalCase for components, camelCase for variables/functions
- **Export Pattern**: Default exports for main components
- **Animation Pattern**: Framer Motion with consistent transition durations (0.3s-0.6s)

## Custom Theme (Tailwind)
- **Primary Orange**: `#FEBD69` (textOrange)
- **Light Text**: `#ccd6f6` (textLight) 
- **Dark Text**: `#8892b0` (textDark)
- **Background**: Dark gradient theme with slate/gray tones
- **Custom Breakpoints**: xs(320px), sm(375px), sml(500px), md(667px), mdl(768px), lg(960px), lgl(1024px), xl(1280px)

## Component Patterns
- Section components with motion wrappers
- Consistent gradient backgrounds and hover effects
- Orange accent color for primary elements
- SectionTitle component for section headers
- Cards with hover animations and border effects