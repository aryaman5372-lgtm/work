# Dark Mode Implementation Guide

## Overview

This document explains the complete dark mode implementation for the React flags application using the `react-toggle-dark-mode` package and React Context API.

## Table of Contents

1. [Package Used](#package-used)
2. [Architecture Overview](#architecture-overview)
3. [Implementation Details](#implementation-details)
4. [File Structure](#file-structure)
5. [CSS Theme System](#css-theme-system)
6. [Usage Guide](#usage-guide)
7. [Troubleshooting](#troubleshooting)

---

## Package Used

### `react-toggle-dark-mode`

- **Purpose**: Provides an animated toggle component for switching between light and dark modes
- **Installation**: `yarn add react-toggle-dark-mode`
- **Features**:
  - Smooth sun ↔ moon animation
  - Customizable colors and sizes
  - TypeScript support
  - Lightweight and performant

---

## Architecture Overview

The dark mode implementation follows a **Context API pattern** for global state management:

```
App Root
├── DarkModeProvider (Context)
│   ├── Navbar (Consumer)
│   ├── Card Component (Consumer)
│   └── Other Components (Consumers)
```

### Key Components:

1. **DarkModeContext**: Global state management
2. **DarkModeProvider**: Wrapper component
3. **useDarkMode Hook**: Context consumer hook
4. **CSS Classes**: Theme-based styling

---

## Implementation Details

### 1. Context Setup (`DarkModeContext.jsx`)

```jsx
import React, { createContext, useState, useContext, useEffect } from "react";

const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Apply dark mode class to body
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error("useDarkMode must be used within a DarkModeProvider");
  }
  return context;
};
```

**Key Features:**

- **State Management**: `isDarkMode` boolean state
- **Body Class Toggle**: Automatically adds/removes `dark-mode` class
- **Toggle Function**: `toggleDarkMode()` for switching themes
- **Error Handling**: Context validation in custom hook

### 2. Navbar Integration (`navbar.jsx`)

```jsx
import React from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { useDarkMode } from "./DarkModeContext";

const Navbar = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <nav className="navbar">
      <div className="nav">
        <h1>Where in the world?</h1>
        <button className="dark-mode-btn" onClick={toggleDarkMode}>
          <DarkModeSwitch
            checked={isDarkMode}
            onChange={toggleDarkMode}
            size={20}
            moonColor="#ffffff"
            sunColor="#ffffff"
          />
          Dark Mode
        </button>
      </div>
    </nav>
  );
};
```

**Component Properties:**

- **checked**: Current theme state
- **onChange**: Toggle function
- **size**: Icon size (20px)
- **moonColor/sunColor**: Icon colors for both themes

### 3. App Wrapper (`main.jsx`)

```jsx
import { DarkModeProvider } from "./DarkModeContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DarkModeProvider>
      <Navbar />
      <Card />
      {/* Other components */}
    </DarkModeProvider>
  </StrictMode>
);
```

---

## File Structure

```
src/
├── DarkModeContext.jsx     # Context provider and hook
├── navbar.jsx              # Navbar with toggle component
├── main.jsx                # App wrapper with provider
├── card.jsx                # Country cards component
├── index.css               # Global styles + navbar themes
└── card.css                # Card-specific themes
```

---

## CSS Theme System

The theming system uses CSS classes with the `body.dark-mode` selector pattern.

### Global Styles (`index.css`)

#### Light Mode (Default):

```css
body {
  background-color: #fafafa;
  color: #111517;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.navbar {
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
```

#### Dark Mode:

```css
body.dark-mode {
  background-color: #202c37;
  color: #ffffff;
}

body.dark-mode .navbar {
  background-color: #2b3945;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}
```

### Component Styles (`card.css`)

#### Light Mode Cards:

```css
.country-card {
  background: #ffffff;
  color: #111517;
}

.search-input {
  background-color: #ffffff;
  border: 1px solid #e5e5e5;
  color: #111517;
}
```

#### Dark Mode Cards:

```css
body.dark-mode .country-card {
  background: #2b3945;
  color: #ffffff;
}

body.dark-mode .search-input {
  background-color: #2b3945;
  border-color: #2b3945;
  color: white;
}
```

### Color Palette

| Element      | Light Mode | Dark Mode |
| ------------ | ---------- | --------- |
| Background   | `#fafafa`  | `#202c37` |
| Cards/Navbar | `#ffffff`  | `#2b3945` |
| Text         | `#111517`  | `#ffffff` |
| Borders      | `#e5e5e5`  | `#2b3945` |

---

## Usage Guide

### For Developers

#### 1. Adding Dark Mode to New Components:

```jsx
import { useDarkMode } from "./DarkModeContext";

const NewComponent = () => {
  const { isDarkMode } = useDarkMode();

  return (
    <div className={`new-component ${isDarkMode ? "dark" : "light"}`}>
      {/* Component content */}
    </div>
  );
};
```

#### 2. CSS Pattern for New Styles:

```css
/* Light mode (default) */
.new-component {
  background-color: #ffffff;
  color: #111517;
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* Dark mode */
body.dark-mode .new-component {
  background-color: #2b3945;
  color: #ffffff;
}
```

### For Users

1. **Toggle Dark Mode**: Click the moon/sun icon in the navbar
2. **Automatic Transitions**: All elements will smoothly transition between themes
3. **Consistent Experience**: All components respect the selected theme

---

## Technical Features

### ✅ Implemented Features:

- **Global State Management** via React Context API
- **Smooth Animations** (0.3s CSS transitions)
- **Animated Toggle Icon** (sun ↔ moon)
- **Body Class Management** for global theme application
- **Responsive Design** maintained in both themes
- **Error Boundaries** with context validation
- **TypeScript Support** (if needed)

### 🔄 Transition Effects:

- Background colors fade smoothly
- Text colors transition gradually
- Box shadows adjust automatically
- Icon animates between sun and moon

---

## Troubleshooting

### Common Issues:

#### 1. **Toggle Not Working**

- Check if component is wrapped in `DarkModeProvider`
- Verify `useDarkMode` hook is imported correctly
- Ensure Context is not used outside Provider

#### 2. **Styles Not Applying**

- Verify CSS selectors use `body.dark-mode` prefix
- Check for CSS specificity conflicts
- Ensure transitions are defined for smooth changes

#### 3. **Console Warnings**

- React 19 compatibility warnings with `react-spring` dependency
- These are non-breaking and don't affect functionality

#### 4. **Missing Animations**

- Verify `react-toggle-dark-mode` package is installed
- Check component props (`checked`, `onChange`, etc.)
- Ensure proper import statement

---

## Best Practices

### CSS Organization:

1. **Global themes** in `index.css`
2. **Component-specific themes** in respective CSS files
3. **Consistent color variables** across components
4. **Smooth transitions** on all themed elements

### React Patterns:

1. **Single source of truth** for theme state
2. **Error boundaries** for context usage
3. **Memoization** for performance (if needed)
4. **Consistent naming** for theme-related classes

---

## Future Enhancements

### Potential Improvements:

1. **Local Storage Persistence** - Remember user preference
2. **System Theme Detection** - Follow OS preference
3. **Multiple Themes** - Add more color schemes
4. **Theme Customization** - User-defined colors
5. **Accessibility** - Enhanced screen reader support

### Implementation Ideas:

```jsx
// Local storage persistence
useEffect(() => {
  const savedTheme = localStorage.getItem("darkMode");
  if (savedTheme) {
    setIsDarkMode(JSON.parse(savedTheme));
  }
}, []);

useEffect(() => {
  localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
}, [isDarkMode]);

// System theme detection
useEffect(() => {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  setIsDarkMode(mediaQuery.matches);

  const handleChange = (e) => setIsDarkMode(e.matches);
  mediaQuery.addEventListener("change", handleChange);

  return () => mediaQuery.removeEventListener("change", handleChange);
}, []);
```

---

## Conclusion

This dark mode implementation provides a robust, scalable solution using modern React patterns and CSS best practices. The Context API ensures global state management, while the CSS class-based approach allows for easy theme expansion and maintenance.

The implementation is production-ready and follows React best practices for performance and maintainability.
