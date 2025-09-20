# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React-based flute practice tracking application built with Create React App. It's designed to help flute students track their daily practice over a 6-month period with weekly structured goals and progress tracking.

## Development Commands

```bash
# Start development server
npm start

# Run tests in watch mode
npm test

# Run a specific test file
npm test -- src/App.test.js

# Build for production
npm run build

# Lint JavaScript/JSX files
npx eslint src/

# Check for linting issues without fixing
npx eslint src/ --no-fix
```

## Architecture & Structure

The application is a single-page React app with the main logic contained in `src/App.js`. Key architectural elements:

- **Main Component**: `FluteChecklistApp` in src/App.js - Contains all practice tracking logic, state management, and UI
- **State Management**: Uses React hooks (useState, useEffect) for local state
- **Styling**: Custom CSS in src/App.css
- **Icons**: Lucide React icons for UI elements
- **Testing**: Jest and React Testing Library configured via Create React App

## Key Features & Data Flow

1. **Practice Tracking**: Daily checklist items with time allocations and point values
2. **Weekly Progression**: 26 weeks of structured practice plans with increasing difficulty
3. **Progress Persistence**: Stores practice data in localStorage
4. **Dynamic Scheduling**: Calculates current week/day based on start date
5. **Gamification**: Points system, streaks, and achievements to encourage consistent practice

## Testing Approach

- Test files use `.test.js` suffix
- Located alongside source files
- Run with `npm test` for interactive watch mode
- Use `npm test -- --coverage` for coverage report