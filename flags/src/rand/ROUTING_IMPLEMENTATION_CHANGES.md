# React Router Implementation Changes

**Date:** September 12, 2025
**Purpose:** Added React Router functionality to enable navigation between components and country-specific pages

## Overview

This document outlines all the changes made to implement React Router in the flags application. The main goals were:

1. Add routes to components
2. Add back navigation to the back button
3. Add route to country page for specific countries when clicked on cards

## Files Modified

### 1. `src/main.jsx`

**Original backup:** `routing-backup/main-original.jsx`

**Changes Made:**

- Wrapped the entire app with `BrowserRouter` from `react-router-dom`
- This enables routing functionality throughout the application

**Key Changes:**

```jsx
// BEFORE
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// AFTER
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
```

### 2. `src/App.jsx`

**Original backup:** `routing-backup/App-original.jsx`

**Changes Made:**

- Completely restructured to act as the main router component
- Added route definitions for home page and country-specific pages
- Imported necessary React Router components

**Key Changes:**

```jsx
// BEFORE - App.jsx contained the main card display logic

// AFTER - App.jsx now serves as the router
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import CountryPage from "./countryPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/country/:countryName" element={<CountryPage />} />
    </Routes>
  );
}

export default App;
```

### 3. `src/Home.jsx` (New File)

**Purpose:** Created to house the original card display functionality from App.jsx

**Features:**

- Contains the main card grid display
- Includes search and filter functionality
- Displays all country cards
- Acts as the landing page for the application

**Key Implementation:**

```jsx
import { useState, useEffect } from "react";
import Card from "./card";
import Navbar from "./navbar";

function Home() {
  // All the original card display logic from App.jsx
  // Including countries state, search functionality, etc.
}

export default Home;
```

### 4. `src/card.jsx`

**Original backup:** `routing-backup/card-original.jsx`

**Changes Made:**

- Added click handler to navigate to country-specific pages
- Imported `useNavigate` hook from React Router
- Made entire card clickable for better UX

**Key Changes:**

```jsx
// ADDED IMPORTS
import { useNavigate } from 'react-router-dom'

// ADDED NAVIGATION FUNCTIONALITY
const navigate = useNavigate()

const handleCardClick = () => {
  navigate(`/country/${country.name.common}`)
}

// ADDED CLICK HANDLER TO CARD
<div className="card" onClick={handleCardClick} style={{cursor: 'pointer'}}>
```

### 5. `src/countryPage.jsx`

**Original backup:** `routing-backup/countryPage-original.jsx`

**Changes Made:**

- Added URL parameter extraction to get specific country name
- Implemented proper back navigation using React Router
- Dynamic country filtering based on URL parameter

**Key Changes:**

```jsx
// ADDED IMPORTS
import { useParams, useNavigate } from "react-router-dom";

// ADDED PARAMETER EXTRACTION
const { countryName } = useParams();
const navigate = useNavigate();

// UPDATED FILTERING LOGIC
const filteredCountry = countries.filter(
  (country) => country.name.common.toLowerCase() === countryName.toLowerCase()
);

// UPDATED BACK BUTTON FUNCTIONALITY
const handleBack = () => {
  navigate(-1); // Goes back to previous page
};
```

## Route Structure

The application now has the following route structure:

```
/ (Home Route)
├── Displays all country cards
├── Search and filter functionality
└── Click on any card navigates to /country/:countryName

/country/:countryName (Country Detail Route)
├── Shows detailed view of specific country
├── Back button returns to previous page
└── Dynamically loads country data based on URL parameter
```

## Navigation Flow

1. **Home Page (`/`):**

   - User lands on home page with all country cards
   - Can search and filter countries
   - Clicking any card navigates to `/country/[CountryName]`

2. **Country Page (`/country/:countryName`):**
   - Shows detailed information for the specific country
   - Back button navigates back to the previous page
   - URL parameter determines which country to display

## Benefits of This Implementation

1. **URL-based Navigation:** Users can bookmark specific country pages
2. **Browser History:** Back/forward buttons work correctly
3. **Dynamic Routing:** Country pages are generated dynamically based on URL
4. **Better UX:** Clean navigation between components
5. **SEO Friendly:** Each country has its own URL
6. **Maintainable:** Clear separation of routing logic

## Dependencies Used

- `react-router-dom`: For routing functionality
  - `BrowserRouter`: Provides routing context
  - `Routes`: Container for route definitions
  - `Route`: Individual route definitions
  - `useNavigate`: Hook for programmatic navigation
  - `useParams`: Hook for extracting URL parameters

## Backup Files Location

All original files have been backed up in the `routing-backup/` folder:

- `routing-backup/main-original.jsx`
- `routing-backup/App-original.jsx`
- `routing-backup/card-original.jsx`
- `routing-backup/countryPage-original.jsx`
- `routing-backup/Home-original.jsx`

## Testing the Implementation

To test the routing functionality:

1. Start the development server: `npm run dev`
2. Navigate to the home page
3. Click on any country card to navigate to its detail page
4. Use the back button to return to the home page
5. Test direct URL access (e.g., `/country/Jamaica`)

## Future Enhancements

Possible improvements for the routing system:

1. Add loading states during navigation
2. Implement error boundaries for invalid country names
3. Add transition animations between routes
4. Implement breadcrumb navigation
5. Add query parameters for search/filter state persistence
