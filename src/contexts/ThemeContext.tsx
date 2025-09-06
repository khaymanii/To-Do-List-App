import React, { createContext, useContext, useState, ReactNode } from "react";
import { Appearance } from "react-native";

type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
  colors: {
    background: string;
    text: string;
    primary: string;
  };
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // Default theme based on system
  const colorScheme = Appearance.getColorScheme();
  const [theme, setTheme] = useState<Theme>(
    colorScheme === "dark" ? "dark" : "light"
  );

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Define theme colors
  const colors =
    theme === "light"
      ? {
          background: "#ffffff", // White
          text: "#000000", // Black
          primary: "#16a34a", // Green-600
        }
      : {
          background: "#000000", // Black
          text: "#ffffff", // White
          primary: "#16a34a", // Green-600
        };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
