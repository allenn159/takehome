import { Flex, Spinner, Stack, Text } from "@chakra-ui/react";
import { useSwapi } from "@/hooks/useSwapi";
import { StarshipCard } from "@/components/cards/StarshipCard";
import { SWAPI_URLS } from "@/constants/swapi";
import { filterByName } from "@/utils/filterByName";
import type { Starship } from "@/types/swapi";

interface StarshipsTabProps {
  searchTerm: string;
}

export function StarshipsTab({ searchTerm }: StarshipsTabProps) {
  const { data, isLoading, error } = useSwapi<Starship>(SWAPI_URLS.starships);

  if (isLoading)
    return (
      <Flex justify="center" align="center" py={12}>
        <Spinner />
      </Flex>
    );
  if (error)
    return (
      <Flex justify="center" align="center" py={12}>
        <Text color="red.500">{error.message}</Text>
      </Flex>
    );
  if (!data)
    return (
      <Flex justify="center" align="center" py={12}>
        <Text color="fg.muted">No results available</Text>
      </Flex>
    );

  const filtered = filterByName(data, searchTerm);

  return (
    <Stack mt={4} gap={3}>
      {filtered.length === 0 ? (
        <Text color="fg.muted" textAlign="center" py={8}>
          No results for "{searchTerm}"
        </Text>
      ) : (
        filtered.map((starship) => (
          <StarshipCard key={starship.url} starship={starship} />
        ))
      )}
    </Stack>
  );
}
