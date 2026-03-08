import { useQueries, useQuery } from "@tanstack/react-query";
import { fetchSwapiResource } from "@/lib/swapi";

export function useSwapiResource<T>(url: string) {
  return useQuery<T>({
    queryKey: [url],
    queryFn: () => fetchSwapiResource<T>(url),
    enabled: !!url,
  });
}

export function useSwapiResources<T>(urls: string[]) {
  return useQueries({
    queries: urls.map((url) => ({
      queryKey: [url],
      queryFn: () => fetchSwapiResource<T>(url),
      enabled: !!url,
    })),
  });
}
