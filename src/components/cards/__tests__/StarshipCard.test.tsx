import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { StarshipCard } from "@/components/cards/StarshipCard";
import { renderWithProviders, mockQueryResult } from "@/test/utils";
import { mockStarship, mockPerson, mockFilm } from "@/test/fixtures";
import type { Film, Person } from "@/types/swapi";

vi.mock("@/hooks/useSwapiResource");
import { useSwapiResources } from "@/hooks/useSwapiResource";

const mockedUseSwapiResources = vi.mocked(useSwapiResources);

describe("StarshipCard", () => {
  it("renders the starship's name", () => {
    renderWithProviders(<StarshipCard starship={mockStarship} />);
    expect(screen.getByText("Millennium Falcon")).toBeInTheDocument();
  });

  it("renders preview info with labels", () => {
    renderWithProviders(<StarshipCard starship={mockStarship} />);
    expect(screen.getByText(/Model: YT-1300 light freighter/)).toBeInTheDocument();
    expect(screen.getByText(/Class: Light freighter/)).toBeInTheDocument();
  });

  it("shows a spinner while related data is loading", async () => {
    const user = userEvent.setup();
    mockedUseSwapiResources.mockReturnValue([mockQueryResult<Person>({ isLoading: true, isPending: true, status: "pending" })]);

    renderWithProviders(<StarshipCard starship={mockStarship} />);
    await user.click(screen.getByText("Millennium Falcon"));

    expect(document.querySelector(".chakra-spinner")).toBeInTheDocument();
  });

  it("shows related data when loaded", async () => {
    const user = userEvent.setup();
    mockedUseSwapiResources
      .mockReturnValueOnce([mockQueryResult<Person>({ data: mockPerson, isSuccess: true, status: "success" })])
      .mockReturnValueOnce([mockQueryResult<Film>({ data: mockFilm, isSuccess: true, status: "success" })]);

    renderWithProviders(<StarshipCard starship={mockStarship} />);
    await user.click(screen.getByText("Millennium Falcon"));

    expect(await screen.findByText(/Luke Skywalker/)).toBeInTheDocument();
    expect(screen.getByText(/A New Hope/)).toBeInTheDocument();
  });
});
