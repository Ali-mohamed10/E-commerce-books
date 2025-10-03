import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "next-themes";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Determine the base path based on environment
const basePath = import.meta.env.MODE === 'production' ? '/E-commerce-books' : '';
const signOutUrl = `${basePath}/`;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <BrowserRouter basename="/E-commerce-books">
        {PUBLISHABLE_KEY ? (
          <ClerkProvider 
            publishableKey={PUBLISHABLE_KEY} 
            afterSignOutUrl={signOutUrl}
          >
            <App />
          </ClerkProvider>
        ) : (
          <App />
        )}
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);


