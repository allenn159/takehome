import { describe, it, expect, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useSwapiResource, useSwapiResources } from "@/hooks/useSwapiResource";
import { createQueryWrapper } from "@/test/utils";
import { mockPlanet, mockFilm } from "@/test/fixtures";

vi.mock("@/lib/swapi");
import { fetchSwapiResource } from "@/lib/swapi";

const mockedFetch = vi.mocked(fetchSwapiResource);

describe("useSwapiResource", () => {
  it("starts in a loading state", () => {
    mockedFetch.mockResolvedValue(new Promise(() => {}) as never);

    const { result } = renderHook(
      () => useSwapiResource("https://swapi.info/api/planets/1/"),
      { wrapper: createQueryWrapper() },
    );

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();
  });

  it("returns data on successful fetch", async () => {
    mockedFetch.mockResolvedValue(mockPlanet as never);

    const { result } = renderHook(
      () => useSwapiResource("https://swapi.info/api/planets/1/"),
      { wrapper: createQueryWrapper() },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(mockPlanet);
  });

  it("returns an error on failed fetch", async () => {
    mockedFetch.mockRejectedValue(new Error("SWAPI request failed: 404 Not Found"));

    const { result } = renderHook(
      () => useSwapiResource("https://swapi.info/api/planets/1/"),
      { wrapper: createQueryWrapper() },
    );

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error).toBeDefined();
  });
});

describe("useSwapiResources", () => {
  it("returns one result per url", () => {
    const { result } = renderHook(
      () => useSwapiResources(["https://swapi.info/api/planets/1/", "https://swapi.info/api/films/1/"]),
      { wrapper: createQueryWrapper() },
    );

    expect(result.current).toHaveLength(2);
  });

  it("returns an empty array when no urls are provided", () => {
    const { result } = renderHook(
      () => useSwapiResources([]),
      { wrapper: createQueryWrapper() },
    );

    expect(result.current).toHaveLength(0);
  });
});
