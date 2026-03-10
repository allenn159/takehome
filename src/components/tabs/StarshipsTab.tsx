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
      <Flex
        justify="center"
        align="center"
        py={12}
        role="status"
        aria-live="polite"
        aria-label="Loading starships"
      >
        <Spinner aria-hidden="true" />
      </Flex>
    );
  if (error)
    return (
      <Flex
        justify="center"
        align="center"
        py={12}
        role="alert"
        aria-live="assertive"
      >
        <Text color="red.500">{error.message}</Text>
      </Flex>
    );
  if (!data)
    return (
      <Flex
        justify="center"
        align="center"
        py={12}
        role="status"
        aria-live="polite"
      >
        <Text color="fg.muted">No results available</Text>
      </Flex>
    );

  const filtered = filterByName(data, searchTerm);

  return (
    <Stack mb={2} gap={3} aria-live="polite">
      {filtered.length === 0 ? (
        <Text color="fg.muted" textAlign="center" py={8} role="status">
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
