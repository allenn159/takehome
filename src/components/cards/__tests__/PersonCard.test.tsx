import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PersonCard } from "@/components/cards/PersonCard";
import { renderWithProviders } from "@/test/utils";
import { mockPerson } from "@/test/fixtures";

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
    expect(screen.queryByText(/Height:/)).not.toBeVisible();
  });

  it("shows detail fields after clicking to expand", async () => {
    const user = userEvent.setup();
    renderWithProviders(<PersonCard person={mockPerson} />);

    await user.click(screen.getByText("Luke Skywalker"));

    expect(await screen.findByText(/Height:/)).toBeVisible();
    expect(screen.getByText(/Mass:/)).toBeVisible();
    expect(screen.getByText(/Hair:/)).toBeVisible();
  });
});
