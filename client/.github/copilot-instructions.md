# Copilot Instructions for AI Agents

## Project Overview
- This is a React + Vite project with HMR (Hot Module Replacement) and ESLint integration.
- Source code is in `src/`, with main entry points in `src/main.jsx` and `src/App.jsx`.
- Components are organized under `src/components/`, pages under `src/pages/`, and shared context in `src/context/`.
- Static assets are in `src/assets/` and `public/`.

## Architecture & Patterns
- Use functional React components and hooks (see `Navbar.jsx`, `RecruiterLogin.jsx`).
- Context API is used for global state (`src/context/AppContext.jsx`).
- Page-level routing is implied; check for navigation logic in `src/pages/` and `src/components/Navbar.jsx`.
- Styling is handled via CSS files (`App.css`, `index.css`) and component-level imports.
- Asset imports use relative paths (e.g., `import logo from '../assets/logo.svg'`).

## Developer Workflows
- **Start Dev Server:**
  - Use `npm run dev` to start Vite with HMR.
- **Build for Production:**
  - Use `npm run build` to generate optimized assets.
- **Preview Production Build:**
  - Use `npm run preview` to serve the build locally.
- **Linting:**
  - Use `npm run lint` to check code style and errors (see `eslint.config.js`).
- **No test framework is present by default.**

## Conventions & Integration
- Prefer named exports for components.
- Keep business logic inside components or context, not in global scripts.
- Use assets from `src/assets/` for UI icons and images.
- External dependencies are managed via `package.json` (React, Vite, ESLint, etc.).
- No backend/API integration is present in this template; add API calls in context or page components as needed.

## Examples
- To add a new page, create a file in `src/pages/` and link it via the navigation component.
- To add a new global state, update `src/context/AppContext.jsx` and wrap your app in the provider.
- To add a new asset, place it in `src/assets/` and import it in your component.

## Key Files
- `src/main.jsx`: App entry point
- `src/App.jsx`: Root component
- `src/context/AppContext.jsx`: Global state
- `src/components/`: UI components
- `src/pages/`: Page-level components
- `eslint.config.js`: Linting rules
- `vite.config.js`: Vite configuration

---
For questions or unclear conventions, check `README.md` or ask for clarification.
