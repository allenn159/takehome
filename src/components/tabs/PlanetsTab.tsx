import { Flex, Spinner, Stack, Text } from "@chakra-ui/react";
import { useSwapi } from "@/hooks/useSwapi";
import { PlanetCard } from "@/components/cards/PlanetCard";
import { SWAPI_URLS } from "@/constants/swapi";
import type { Planet } from "@/types/swapi";

export function PlanetsTab() {
  const { data, isLoading, error } = useSwapi<Planet>(SWAPI_URLS.planets);

  if (isLoading) return <Flex justify="center" align="center" py={12}><Spinner /></Flex>;
  if (error) return <Flex justify="center" align="center" py={12}><Text color="red.500">{error.message}</Text></Flex>;
  if (!data) return <Flex justify="center" align="center" py={12}><Text color="fg.muted">No results available</Text></Flex>;

  return (
    <Stack mt={4} gap={3}>
      {data.map((planet) => (
        <PlanetCard key={planet.url} planet={planet} />
      ))}
    </Stack>
  );
}
