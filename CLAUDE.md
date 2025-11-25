# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Social Media Datasets Dashboard built with React 18, featuring a clean, flat-style interface inspired by data analytics platforms. The dashboard displays social media datasets with metrics and management capabilities.

## Technology Stack

- **Frontend**: React 18
- **Styling**: CSS3 with Flexbox
- **Icons**: SVG icons
- **Build Tool**: Create React App
- **Package Manager**: npm

## Development Commands

### Setup and Installation
```bash
npm install          # Install dependencies
npm start           # Start development server (http://localhost:3000)
npm test            # Run tests
npm run build       # Build for production
```

### Development Workflow
- Development server runs on port 3000
- Hot reloading is enabled for development
- CSS changes reflect immediately

## Project Structure

```
src/
├── components/
│   ├── Sidebar.js          # Left navigation menu with icons
│   ├── Dashboard.js        # Main dashboard container
│   ├── DatasetSection.js   # Dataset section wrapper
│   └── DatasetItem.js      # Individual dataset row component
├── App.js                  # Main app component
├── index.js               # App entry point
└── *.css                  # Component-specific stylesheets
```

## Design System

### Color Palette
- **Background**: `#1a1a1a` (dark)
- **Panels**: `#262626` (lighter gray)
- **Borders**: `#404040` (separators)
- **Text Primary**: `#ffffff`
- **Text Secondary**: `#e0e0e0`
- **Text Muted**: `#999999`
- **Accent**: `#4a90e2` (blue)

### Component Architecture
- **Sidebar**: Fixed-width navigation with icons and labels
- **DatasetSection**: Grouped dataset displays with titles
- **DatasetItem**: Individual rows with colored icons, metrics, and actions
- Each component has its own CSS file for modular styling

### Key Features
- Dark theme with flat design principles
- Hover effects for interactive elements
- Color-coded dataset icons
- Metrics display (hits yesterday/today)
- Action buttons (play/delete) with hover states

## Development Guidelines

- Follow React functional component patterns
- Use CSS modules approach (component-specific stylesheets)
- Maintain consistent spacing and typography
- Preserve dark theme color scheme
- Keep flat design aesthetic with minimal shadows