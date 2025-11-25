# Social Media Datasets Dashboard

A clean, flat-style dashboard interface inspired by data analytics platforms, built with React 18. This dashboard displays social media datasets with metrics and management capabilities.

## Features

- **Dark Theme**: Modern dark interface with muted gray backgrounds and lighter panels
- **Sidebar Navigation**: Vertical menu with Projects, Datasets, Accounts, Locations, Events, Alerts, and Settings
- **Dataset Management**: View datasets with metrics (hits yesterday/today) and action buttons
- **Clean Flat Design**: Minimal icons, structured spacing, and professional appearance
- **Responsive Layout**: Optimized for desktop dashboard usage

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view the dashboard

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## Project Structure

```
src/
├── components/
│   ├── Sidebar.js          # Left navigation menu
│   ├── Dashboard.js        # Main dashboard container
│   ├── DatasetSection.js   # Dataset section wrapper
│   └── DatasetItem.js      # Individual dataset row
├── App.js                  # Main app component
└── index.js               # App entry point
```

## Technologies

- React 18
- CSS3 with Flexbox
- SVG Icons
- Create React App