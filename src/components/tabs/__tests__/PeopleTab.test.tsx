import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { PeopleTab } from "@/components/tabs/PeopleTab";
import { renderWithProviders } from "@/test/utils";
import { mockQueryResult } from "@/test/utils";
import { mockPeople } from "@/test/fixtures";
import type { Person } from "@/types/swapi";

vi.mock("@/hooks/useSwapi");
import { useSwapi } from "@/hooks/useSwapi";

const mockedUseSwapi = vi.mocked(useSwapi);

describe("PeopleTab", () => {
  it("shows a spinner while loading", () => {
    mockedUseSwapi.mockReturnValue(
      mockQueryResult<Person[]>({ isLoading: true, isPending: true, status: "pending" }),
    );
    renderWithProviders(<PeopleTab />);
    expect(document.querySelector(".chakra-spinner")).toBeInTheDocument();
  });

  it("shows an error message on failure", () => {
    mockedUseSwapi.mockReturnValue(
      mockQueryResult<Person[]>({
        isError: true,
        error: new Error("Something went wrong"),
      }),
    );
    renderWithProviders(<PeopleTab />);
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  it("shows no results message when data is undefined", () => {
    mockedUseSwapi.mockReturnValue(
      mockQueryResult<Person[]>({ data: undefined }),
    );
    renderWithProviders(<PeopleTab />);
    expect(screen.getByText(/no results available/i)).toBeInTheDocument();
  });

  it("renders a card for each person", () => {
    mockedUseSwapi.mockReturnValue(
      mockQueryResult<Person[]>({ data: mockPeople, isSuccess: true, status: "success" }),
    );
    renderWithProviders(<PeopleTab />);
    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
  });
});
