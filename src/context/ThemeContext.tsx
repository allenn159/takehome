import { createContext, useContext, useState } from "react";

const STORAGE_KEY = "theme";

type ColorMode = "light" | "dark";

interface ThemeContextValue {
  colorMode: ColorMode;
  toggleColorMode: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [colorMode, setColorMode] = useState<ColorMode>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
    return "light";
  });

  const toggleColorMode = () => {
    const next = colorMode === "dark" ? "light" : "dark";
    setColorMode(next);
    localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(next);
  };

  return (
    <ThemeContext.Provider value={{ colorMode, toggleColorMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
}
