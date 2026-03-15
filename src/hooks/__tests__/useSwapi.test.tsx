import { describe, it, expect, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useSwapi } from "@/hooks/useSwapi";
import { createQueryWrapper } from "@/test/utils";
import { mockPeople } from "@/test/fixtures";
import { SWAPI_URLS } from "@/constants/swapi";

vi.mock("@/lib/swapi");
import { fetchSwapiList } from "@/lib/swapi";

const mockedFetch = vi.mocked(fetchSwapiList);

describe("useSwapi", () => {
  it("starts in a loading state", () => {
    mockedFetch.mockResolvedValue(new Promise(() => {}) as never); // never resolves

    const { result } = renderHook(() => useSwapi(SWAPI_URLS.people), {
      wrapper: createQueryWrapper(),
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();
  });

  it("returns data on successful fetch", async () => {
    mockedFetch.mockResolvedValue(mockPeople);

    const { result } = renderHook(() => useSwapi(SWAPI_URLS.people), {
      wrapper: createQueryWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(mockPeople);
  });

  it("returns an error on failed fetch", async () => {
    mockedFetch.mockRejectedValue(
      new Error("SWAPI request failed: 404 Not Found"),
    );

    const { result } = renderHook(() => useSwapi(SWAPI_URLS.people), {
      wrapper: createQueryWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error).toBeDefined();
  });
});
