import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PlanetCard } from "@/components/cards/PlanetCard";
import { renderWithProviders, mockQueryResult } from "@/test/utils";
import { mockPlanet, mockPerson, mockFilm } from "@/test/fixtures";
import type { Film, Person } from "@/types/swapi";

vi.mock("@/hooks/useSwapiResource");
import { useSwapiResources } from "@/hooks/useSwapiResource";

const mockedUseSwapiResources = vi.mocked(useSwapiResources);

describe("PlanetCard", () => {
  it("renders the planet's name", () => {
    renderWithProviders(<PlanetCard planet={mockPlanet} />);
    expect(screen.getByText("Tatooine")).toBeInTheDocument();
  });

  it("renders preview info with labels", () => {
    renderWithProviders(<PlanetCard planet={mockPlanet} />);
    expect(screen.getByText(/Climate: arid/)).toBeInTheDocument();
    expect(screen.getByText(/Terrain: desert/)).toBeInTheDocument();
  });

  it("shows a spinner while related data is loading", async () => {
    const user = userEvent.setup();
    mockedUseSwapiResources.mockReturnValue([mockQueryResult<Person>({ isLoading: true, isPending: true, status: "pending" })]);

    renderWithProviders(<PlanetCard planet={mockPlanet} />);
    await user.click(screen.getByText("Tatooine"));

    expect(document.querySelector(".chakra-spinner")).toBeInTheDocument();
  });

  it("shows related data when loaded", async () => {
    const user = userEvent.setup();
    mockedUseSwapiResources
      .mockReturnValueOnce([mockQueryResult<Person>({ data: mockPerson, isSuccess: true, status: "success" })])
      .mockReturnValueOnce([mockQueryResult<Film>({ data: mockFilm, isSuccess: true, status: "success" })]);

    renderWithProviders(<PlanetCard planet={mockPlanet} />);
    await user.click(screen.getByText("Tatooine"));

    expect(await screen.findByText(/Luke Skywalker/)).toBeInTheDocument();
    expect(screen.getByText(/A New Hope/)).toBeInTheDocument();
  });
});
