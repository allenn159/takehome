import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { StarWarsExplorer } from "@/components/StarWarsExplorer";
import { renderWithProviders } from "@/test/utils";

vi.mock("@/components/tabs/PeopleTab", () => ({
  PeopleTab: ({ searchTerm }: { searchTerm: string }) => (
    <div>People Content {searchTerm}</div>
  ),
}));
vi.mock("@/components/tabs/PlanetsTab", () => ({
  PlanetsTab: ({ searchTerm }: { searchTerm: string }) => (
    <div>Planets Content {searchTerm}</div>
  ),
}));
vi.mock("@/components/tabs/StarshipsTab", () => ({
  StarshipsTab: ({ searchTerm }: { searchTerm: string }) => (
    <div>Starships Content {searchTerm}</div>
  ),
}));

describe("StarWarsExplorer", () => {
  it("renders all three tab triggers", () => {
    renderWithProviders(<StarWarsExplorer />);
    expect(screen.getByRole("tab", { name: /people/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /planets/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /starships/i })).toBeInTheDocument();
  });

  it("shows People content by default", () => {
    renderWithProviders(<StarWarsExplorer />);
    expect(screen.getByText(/People Content/)).toBeInTheDocument();
    expect(screen.queryByText(/Planets Content/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Starships Content/)).not.toBeInTheDocument();
  });

  it("switches to Planets content when Planets tab is clicked", async () => {
    const user = userEvent.setup();
    renderWithProviders(<StarWarsExplorer />);

    await user.click(screen.getByRole("tab", { name: /planets/i }));

    expect(screen.getByText(/Planets Content/)).toBeInTheDocument();
    expect(screen.queryByText(/People Content/)).not.toBeInTheDocument();
  });

  it("switches to Starships content when Starships tab is clicked", async () => {
    const user = userEvent.setup();
    renderWithProviders(<StarWarsExplorer />);

    await user.click(screen.getByRole("tab", { name: /starships/i }));

    expect(screen.getByText(/Starships Content/)).toBeInTheDocument();
    expect(screen.queryByText(/People Content/)).not.toBeInTheDocument();
  });

  it("renders the search input", () => {
    renderWithProviders(<StarWarsExplorer />);
    expect(screen.getByPlaceholderText(/search by name/i)).toBeInTheDocument();
  });

  it("passes search term down to the active tab", async () => {
    const user = userEvent.setup();
    renderWithProviders(<StarWarsExplorer />);

    await user.type(screen.getByPlaceholderText(/search by name/i), "luke");

    expect(screen.getByText("People Content luke")).toBeInTheDocument();
  });

  it("clears the search term when switching tabs", async () => {
    const user = userEvent.setup();
    renderWithProviders(<StarWarsExplorer />);

    await user.type(screen.getByPlaceholderText(/search by name/i), "luke");
    await user.click(screen.getByRole("tab", { name: /planets/i }));

    expect(screen.getByPlaceholderText(/search by name/i)).toHaveValue("");
    expect(screen.getByText("Planets Content")).toBeInTheDocument();
  });
});
