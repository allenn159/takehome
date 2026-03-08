import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PersonCard } from "@/components/cards/PersonCard";
import { renderWithProviders } from "@/test/utils";
import { mockQueryResult } from "@/test/utils";
import {
  mockPerson,
  mockPlanet,
  mockFilm,
  mockVehicle,
  mockStarship,
} from "@/test/fixtures";
import type { Film, Planet, Starship, Vehicle } from "@/types/swapi";

vi.mock("@/hooks/useSwapiResource");
import { useSwapiResource, useSwapiResources } from "@/hooks/useSwapiResource";

const mockedUseSwapiResource = vi.mocked(useSwapiResource);
const mockedUseSwapiResources = vi.mocked(useSwapiResources);

describe("PersonCard", () => {
  it("renders the person's name", () => {
    renderWithProviders(<PersonCard person={mockPerson} />);
    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
  });

  it("renders preview info with labels", () => {
    renderWithProviders(<PersonCard person={mockPerson} />);
    expect(screen.getByText(/Birth Year: 19BBY/)).toBeInTheDocument();
    expect(screen.getByText(/Gender: male/)).toBeInTheDocument();
  });

  it("does not show detail fields when collapsed", () => {
    renderWithProviders(<PersonCard person={mockPerson} />);
    expect(screen.queryByText(/Height:/)).not.toBeInTheDocument();
  });

  it("shows a spinner while related data is loading", async () => {
    const user = userEvent.setup();
    mockedUseSwapiResource.mockReturnValue(
      mockQueryResult<Planet>({
        isLoading: true,
        isPending: true,
        status: "pending",
      }),
    );
    mockedUseSwapiResources.mockReturnValue([
      mockQueryResult<Film>({
        isLoading: true,
        isPending: true,
        status: "pending",
      }),
    ]);

    renderWithProviders(<PersonCard person={mockPerson} />);
    await user.click(screen.getByText("Luke Skywalker"));

    expect(document.querySelector(".chakra-spinner")).toBeInTheDocument();
  });

  it("shows related data when loaded", async () => {
    const user = userEvent.setup();
    mockedUseSwapiResource.mockReturnValue(
      mockQueryResult<Planet>({
        data: mockPlanet,
        isSuccess: true,
        status: "success",
      }),
    );
    mockedUseSwapiResources
      .mockReturnValueOnce([
        mockQueryResult<Film>({
          data: mockFilm,
          isSuccess: true,
          status: "success",
        }),
      ])
      .mockReturnValueOnce([
        mockQueryResult<Film>({
          data: mockFilm,
          isSuccess: true,
          status: "success",
        }),
      ])
      .mockReturnValueOnce([
        mockQueryResult<Vehicle>({
          data: mockVehicle,
          isSuccess: true,
          status: "success",
        }),
      ])
      .mockReturnValueOnce([
        mockQueryResult<Starship>({
          data: mockStarship,
          isSuccess: true,
          status: "success",
        }),
      ]);

    renderWithProviders(<PersonCard person={mockPerson} />);
    await user.click(screen.getByText("Luke Skywalker"));

    expect(await screen.findByText(/Tatooine/)).toBeInTheDocument();
    expect(screen.getByText(/A New Hope/)).toBeInTheDocument();
  });
});
