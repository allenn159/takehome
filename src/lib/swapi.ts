import type { SwapiUrl } from "@/types/swapi";

export async function fetchSwapiList<T>(url: SwapiUrl): Promise<T[]> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `SWAPI request failed: ${response.status} ${response.statusText}`,
    );
  }

  return response.json();
}
