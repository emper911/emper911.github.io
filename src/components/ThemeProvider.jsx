import { createContext, useContext } from "react";
import { themes } from "../tokens";

const ThemeContext = createContext("dark");

/**
 * Applies CSS custom properties based on site config theme.
 * Wraps the entire app.
 *
 * Props:
 *   theme: "light" | "dark" | "auto"
 */
export function ThemeProvider({ theme = "dark", children }) {
  const resolved =
    theme === "auto"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme;

  const vars = themes[resolved] || themes.dark;

  return (
    <ThemeContext.Provider value={resolved}>
      <div style={{ ...vars }}>{children}</div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
