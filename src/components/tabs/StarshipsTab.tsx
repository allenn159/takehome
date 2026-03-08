import { Flex, Spinner, Stack, Text } from "@chakra-ui/react";
import { useSwapi } from "@/hooks/useSwapi";
import { StarshipCard } from "@/components/cards/StarshipCard";
import type { Starship } from "@/types/swapi";

export function StarshipsTab() {
  const { data, isLoading, error } = useSwapi<Starship>(
    "https://swapi.info/api/starships",
  );

  if (isLoading) return <Flex justify="center" align="center" py={12}><Spinner /></Flex>;
  if (error) return <Flex justify="center" align="center" py={12}><Text color="red.500">{error.message}</Text></Flex>;
  if (!data) return <Flex justify="center" align="center" py={12}><Text color="fg.muted">No results available</Text></Flex>;

  return (
    <Stack mt={4} gap={3}>
      {data.map((starship) => (
        <StarshipCard key={starship.url} starship={starship} />
      ))}
    </Stack>
  );
}
