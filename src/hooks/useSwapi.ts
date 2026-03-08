import { useQuery } from "@tanstack/react-query";
import { fetchSwapiList } from "@/lib/swapi";
import type { SwapiUrl } from "@/types/swapi";

export function useSwapi<T>(url: SwapiUrl) {
  return useQuery<T[]>({
    queryKey: [url],
    queryFn: () => fetchSwapiList<T>(url),
  });
}
