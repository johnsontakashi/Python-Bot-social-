# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Political Monitor Analytics Platform - a modern, responsive web dashboard for political influencer monitoring with drag-and-drop dashboard builder, data visualization, and comprehensive analytics. Built with React 18 and designed for large video wall displays with support for multiple resolutions (720p to 8K).

## Technology Stack

- **Frontend**: React 18.2.0 with functional components and hooks
- **Styling**: CSS3 with CSS custom properties (CSS variables)
- **Grid System**: React Grid Layout (v1.5.2) for drag-and-drop dashboard building
- **State Management**: React useState and useEffect hooks
- **Build Tool**: Create React App (react-scripts 5.0.1)
- **Package Manager**: npm
- **Testing**: React Testing Library and Jest

## Development Commands

### Setup and Installation
```bash
npm install          # Install dependencies
npm start           # Start development server (http://localhost:3000)
npm test            # Run tests in watch mode
npm run build       # Build for production
```

### Available Scripts (from package.json)
- `npm start` - Starts development server with hot reloading
- `npm run build` - Creates production build
- `npm test` - Runs test suite in interactive watch mode  
- `npm run eject` - Eject from Create React App (irreversible)

## Project Architecture

### Core Application Structure
```
src/
├── components/
│   ├── MainSidebar.js           # Main navigation sidebar
│   ├── TopNavigation.js         # Header with search and actions
│   ├── Projects.js              # Campaign management dashboard
│   ├── DashboardBuilder.js      # Drag-and-drop dashboard editor
│   ├── WidgetLibrary.js         # Widget selection panel
│   ├── Widget.js                # Base widget wrapper component
│   ├── DataExplorer.js          # Social media content explorer
│   ├── Datasets.js              # Data collection management
│   ├── Accounts.js              # User management
│   ├── Locations.js             # Geographic management
│   ├── Events.js                # Event logs
│   ├── Alerts.js                # Notification management
│   ├── Settings.js              # Organization settings
│   ├── Analytics.js             # Analytics dashboard
│   ├── Dashboard.js             # Dashboard display component
│   └── widgets/                 # Widget components
│       ├── KpiWidget.js         # KPI metric cards
│       ├── CounterWidget.js     # Animated counters
│       ├── ChartWidget.js       # Data visualizations
│       ├── ClockWidget.js       # Time displays
│       ├── ImageWidget.js       # Image/logo widgets
│       ├── TextWidget.js        # Rich text panels
│       └── TrendWidget.js       # Social media trends
├── App.js                       # Main application component with routing
├── App.css                      # Application-specific styles
├── index.js                     # Application entry point
└── index.css                    # Global styles and design system
```

### Key Application States
The main App.js component manages three key states:
- **currentView**: Navigation state ('projects', 'datasets', 'accounts', 'locations', 'events', 'alerts', 'settings')
- **selectedDataset**: Active dataset for exploration/dashboard creation
- **currentMode**: Application mode ('main', 'builder', 'explorer')

### Application Flow
1. **Main Mode**: Shows sidebar navigation + main content area with current view
2. **Builder Mode**: Full-screen dashboard builder with widget drag-and-drop
3. **Explorer Mode**: Data exploration interface for selected dataset

## Design System

### CSS Custom Properties (Variables)
```css
:root {
  --color-bg-primary: #0d1117;      /* Deep dark base */
  --color-bg-secondary: #161b22;    /* Panel backgrounds */
  --color-bg-tertiary: #21262d;     /* Interactive elements */
  --color-border-primary: #30363d;  /* Subtle separators */
  --color-text-primary: #f0f6fc;    /* High contrast text */
  --color-text-secondary: #e6edf3;  /* Standard text */
  --color-text-tertiary: #7d8590;   /* Muted text */
  --color-accent-primary: #4a90e2;  /* Primary actions */
  --color-success: #2ecc71;         /* Positive indicators */
  --color-danger: #e74c3c;          /* Alerts and errors */
  --color-warning: #f39c12;         /* Cautions */
}
```

### Typography Scale
- **Display**: 2.5rem (40px) - KPI values, hero numbers
- **H1**: 2rem (32px) - Page titles  
- **H2**: 1.5rem (24px) - Section headers
- **H3**: 1.25rem (20px) - Widget titles
- **Body**: 1rem (16px) - Standard text
- **Caption**: 0.875rem (14px) - Labels
- **Small**: 0.75rem (12px) - Metadata

### Component Design Patterns
- **Glass Effects**: Use `--glass-bg` for subtle transparency
- **Rounded Corners**: Consistent radius using `--radius-*` variables
- **Shadows**: Three-tier shadow system (`--shadow-sm/md/lg`)
- **Hover States**: All interactive elements have hover feedback
- **Focus States**: Accessible focus indicators with accent colors

## Dashboard Builder System

### Grid Layout Configuration
```javascript
// Responsive breakpoints and column counts
breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }
cols: { lg: 24, md: 20, sm: 12, xs: 8, xxs: 4 }
rowHeight: 30  // Grid unit height in pixels
margin: [8, 8]  // Widget spacing
```

### Widget Architecture
- **Widget Types**: 12 different widget types available
- **Default Sizing**: Each widget has predefined dimensions and minimums
- **Configuration**: Widgets have editable config objects
- **Layout Persistence**: Layout state managed in parent component

### Resolution Support
```javascript
resolutions = {
  '720p': { width: 1280, height: 720 },
  '1080p': { width: 1920, height: 1080 },
  '4K': { width: 3840, height: 2160 },
  '8K': { width: 7680, height: 4320 }
}
```

## Widget Development Guidelines

### Creating New Widgets
1. Create component in `src/components/widgets/`
2. Add to `WidgetLibrary.js` configuration array
3. Import and handle in `Widget.js` switch statement
4. Define default config and sizing constraints

### Widget Configuration Structure
```javascript
{
  type: 'widget-type',
  name: 'Display Name',
  description: 'Widget description',
  icon: <SVGComponent />,
  defaultTitle: 'Default Title',
  defaultSize: { w: 4, h: 4 },
  minSize: { w: 2, h: 2 },
  defaultConfig: {
    // Widget-specific settings
  }
}
```

## Development Patterns

### State Management
- Use React hooks (useState, useEffect, useCallback)
- Avoid complex state libraries for current scope
- Pass data down through props and callbacks up
- Keep state as close to usage as possible

### Component Communication
- Parent-child communication via props
- Event handling via callback props
- Context not currently used but recommended for theme/user data
- No external state management library required

### Styling Approach
- Component-specific CSS files
- CSS custom properties for theme consistency
- BEM-like naming for complex components
- Utility classes available for common patterns

### Performance Considerations
- Grid layout optimized for large numbers of widgets
- Lazy loading not implemented but recommended for widget content
- CSS transitions used for smooth interactions
- Virtual scrolling not required for current data volumes

## File Naming Conventions

- **Components**: PascalCase (e.g., `DashboardBuilder.js`)
- **Styles**: Same name as component (e.g., `DashboardBuilder.css`)
- **Constants**: UPPER_SNAKE_CASE
- **Functions**: camelCase
- **CSS Classes**: kebab-case with component prefix

## Testing Guidelines

- Test component rendering and basic functionality
- Focus on user interactions (clicks, drags, form inputs)
- Test responsive behavior across breakpoints
- Verify accessibility features (keyboard navigation, focus states)
- Widget configuration changes should be testable

## Deployment Considerations

### Production Build
- Run `npm run build` for optimized production bundle
- Static files served from `build/` directory
- Environment variables support via `.env` files
- Single-page application - configure server routing

### Video Wall Display
- Use browser full-screen mode for video wall projection
- Configure dashboard resolution to match display hardware
- Consider auto-refresh for live data updates
- Test scaling behavior on different screen sizes and DPI

## Future Enhancement Areas

1. **Data Integration**: Connect to real social media APIs
2. **User Authentication**: Add login/logout and user management
3. **Dashboard Sharing**: Export/import dashboard configurations
4. **Real-time Updates**: WebSocket integration for live data
5. **Advanced Analytics**: More sophisticated data visualization
6. **Mobile Optimization**: Responsive design for mobile devices
7. **Accessibility**: Enhanced screen reader and keyboard support

## Common Development Tasks

### Adding a New Section to Sidebar
1. Add route to `MainSidebar.js` menuItems array
2. Create component file in `src/components/`
3. Import and handle in `App.js` renderMainView()
4. Add routing logic and navigation state

### Modifying Theme Colors
1. Update CSS custom properties in `index.css`
2. Verify contrast ratios meet accessibility standards
3. Test across all components for consistency
4. Update documentation if adding new color variables

### Creating Custom Charts
1. Extend `ChartWidget.js` with new chart type
2. Add configuration options in widget config
3. Use SVG or canvas for custom visualizations
4. Follow existing color and styling patterns