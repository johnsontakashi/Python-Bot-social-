# Political Monitor Analytics Platform

A modern, responsive web dashboard for political influencer monitoring with drag-and-drop dashboard builder, data visualization, and comprehensive analytics. Built with React 18 and designed for large video wall displays.

## 🚀 Features

### Core Platform Capabilities
- **Dashboard Builder**: Full drag-and-drop interface with widget library
- **Multi-Resolution Support**: 720p, 1080p, 4K, 8K dashboard layouts
- **Dual Mode Interface**: Editing mode with tools, viewing mode for displays
- **Comprehensive Navigation**: Projects, Datasets, Accounts, Locations, Events, Alerts, Settings
- **Data Explorer**: Rich social media content analysis with sentiment highlighting
- **Real-time Analytics**: Live charts, KPIs, and social media trend monitoring

### Widget System
- **KPI Cards**: Large metrics with trend indicators
- **Animated Counters**: Progress tracking with targets
- **Charts**: Bar, line, pie, and donut visualizations  
- **Clocks**: Digital and analog time displays
- **Content Widgets**: Images, text panels, rich media
- **Social Trends**: Platform-specific analytics (Twitter, Instagram, TikTok)

### Design System
- **Modern Dark Theme**: Professional video wall appearance
- **Glassmorphism Effects**: Subtle transparency and blur effects
- **High Contrast Typography**: Inter font family with excellent readability
- **Responsive Grid System**: React Grid Layout with drag-and-drop
- **Custom Scrollbars**: Styled for consistency across browsers
- **Accessibility**: Focus states, keyboard navigation, screen reader support

## 🛠️ Technical Stack

- **Frontend**: React 18 with functional components and hooks
- **Styling**: CSS3 with CSS custom properties (variables)
- **Grid System**: React Grid Layout for dashboard building
- **Icons**: Custom SVG icon library
- **Typography**: Inter font family from Google Fonts
- **Build Tool**: Create React App with modern JavaScript features

## 📦 Installation

1. **Clone the repository**:
```bash
git clone <repository-url>
cd political-monitor-dashboard
```

2. **Install dependencies**:
```bash
npm install
```

3. **Start development server**:
```bash
npm start
```

4. **Open in browser**:
Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Architecture

```
src/
├── components/
│   ├── MainSidebar.js           # Main navigation sidebar
│   ├── TopNavigation.js         # Header with search and actions
│   ├── Projects.js              # Campaign management
│   ├── DashboardBuilder.js      # Drag-and-drop dashboard editor
│   ├── WidgetLibrary.js         # Widget selection panel
│   ├── Widget.js                # Base widget component
│   ├── DataExplorer.js          # Social media content explorer
│   └── widgets/
│       ├── KpiWidget.js         # KPI metric cards
│       ├── CounterWidget.js     # Animated counters
│       ├── ChartWidget.js       # Data visualizations
│       ├── ClockWidget.js       # Time displays
│       ├── ImageWidget.js       # Image/logo widgets
│       ├── TextWidget.js        # Rich text panels
│       └── TrendWidget.js       # Social media trends
├── App.js                       # Main application component
├── index.js                     # Application entry point
└── index.css                    # Global styles and design system
```

## 🎨 Design System

### Color Palette
- **Primary Background**: `#0d1117` - Deep dark base
- **Secondary Background**: `#161b22` - Panel backgrounds
- **Tertiary Background**: `#21262d` - Interactive elements
- **Border Colors**: `#30363d` - Subtle separators
- **Text Primary**: `#f0f6fc` - High contrast text
- **Text Secondary**: `#e6edf3` - Standard text
- **Text Tertiary**: `#7d8590` - Muted text
- **Accent Blue**: `#4a90e2` - Primary actions
- **Success Green**: `#2ecc71` - Positive indicators
- **Danger Red**: `#e74c3c` - Alerts and errors
- **Warning Orange**: `#f39c12` - Cautions

### Typography Scale
- **Display**: 2.5rem (40px) - KPI values, hero numbers
- **Heading 1**: 2rem (32px) - Page titles
- **Heading 2**: 1.5rem (24px) - Section headers
- **Heading 3**: 1.25rem (20px) - Widget titles
- **Body**: 1rem (16px) - Standard text
- **Caption**: 0.875rem (14px) - Labels, descriptions
- **Small**: 0.75rem (12px) - Metadata, tags

## 🎯 Usage Guide

### Creating a Dashboard
1. Navigate to **Projects** in the sidebar
2. Click **"Create Dashboard"** on any project card
3. Use **"Add Widget"** to open the widget library
4. Drag widgets to position them on the canvas
5. Click widgets to configure their settings
6. Use **Resolution** dropdown to set display size
7. Toggle between **Edit** and **Preview** modes
8. Click **"Save Dashboard"** when complete

### Widget Configuration
- **KPI Cards**: Set value, label, format, and color
- **Counters**: Configure target value and animation
- **Charts**: Bind to data sources and set visualization type
- **Clocks**: Choose digital/analog and timezone settings
- **Text Panels**: Rich text editing with formatting options
- **Social Trends**: Select platform and metrics to display

### Data Explorer
1. Go to **Datasets** and select a data collection
2. View social media posts with sentiment analysis
3. Filter by language, date granularity (Day/Week), platform, or keywords
4. Create dashboards directly from data insights

### Activity Dashboard
- Auto-loads `public/data/sample_activities.json` on first open.
- Use the `Upload JSON/NDJSON` button to load your own file.
- Use the `Language` dropdown to filter to a specific language (e.g., `english`, `portuguese`) or choose `All`.
- The dropdown options are built dynamically from `schema:activity.content:language` values present in your file.

## 🔧 Development

### Available Scripts
- `npm start` - Development server with hot reloading
- `npm test` - Run test suite
- `npm run build` - Production build optimized for deployment
- `npm run eject` - Eject from Create React App (irreversible)

### Adding New Widgets
1. Create widget component in `src/components/widgets/`
2. Add widget type to `WidgetLibrary.js` configuration
3. Import and handle in `Widget.js` switch statement
4. Define default settings and sizing constraints

### Customization
- **Themes**: Modify CSS custom properties in `index.css`
- **Colors**: Update the `:root` color variables
- **Fonts**: Change font imports and family declarations
- **Grid**: Adjust breakpoints and column counts in `DashboardBuilder.js`

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Environment Setup
- Supports standard React environment variables
- Configure API endpoints via `.env` files
- Set up proper routing for single-page application

### Video Wall Display
- Use full-screen mode for video wall projection
- Configure dashboard resolution to match display specs
- Set up auto-refresh for live data updates
- Consider display scaling for different screen sizes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes following the existing code style
4. Test your changes thoroughly
5. Commit with descriptive messages
6. Push and create a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For questions, issues, or feature requests:
- Create an issue in the GitHub repository
- Check existing documentation in `/docs`
- Review component examples in `/src/components`

---

**Built for political campaign monitoring and social media analytics with professional video wall display capabilities.**