import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider, useThemeContext } from "@/context/ThemeContext";

function TestConsumer() {
  const { colorMode, toggleColorMode } = useThemeContext();
  return (
    <div>
      <span data-testid="color-mode">{colorMode}</span>
      <button onClick={toggleColorMode}>Toggle</button>
    </div>
  );
}

function renderWithTheme() {
  return render(
    <ThemeProvider>
      <TestConsumer />
    </ThemeProvider>,
  );
}

describe("ThemeContext", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove("light", "dark");
  });

  it("defaults to light mode when localStorage is empty", () => {
    renderWithTheme();
    expect(screen.getByTestId("color-mode")).toHaveTextContent("light");
  });

  it("reads initial color mode from localStorage", () => {
    localStorage.setItem("theme", "dark");
    renderWithTheme();
    expect(screen.getByTestId("color-mode")).toHaveTextContent("dark");
  });

  it("toggles from light to dark", async () => {
    const user = userEvent.setup();
    renderWithTheme();

    await user.click(screen.getByRole("button", { name: /toggle/i }));

    expect(screen.getByTestId("color-mode")).toHaveTextContent("dark");
  });

  it("toggles from dark back to light", async () => {
    const user = userEvent.setup();
    localStorage.setItem("theme", "dark");
    renderWithTheme();

    await user.click(screen.getByRole("button", { name: /toggle/i }));

    expect(screen.getByTestId("color-mode")).toHaveTextContent("light");
  });

  it("persists the new color mode to localStorage on toggle", async () => {
    const user = userEvent.setup();
    renderWithTheme();

    await user.click(screen.getByRole("button", { name: /toggle/i }));

    expect(localStorage.getItem("theme")).toBe("dark");
  });

  it("applies the color mode class to document.documentElement on toggle", async () => {
    const user = userEvent.setup();
    renderWithTheme();

    await user.click(screen.getByRole("button", { name: /toggle/i }));

    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(document.documentElement.classList.contains("light")).toBe(false);
  });

  it("throws when useThemeContext is used outside of ThemeProvider", () => {
    expect(() => render(<TestConsumer />)).toThrow(
      "useThemeContext must be used within a ThemeProvider",
    );
  });
});
