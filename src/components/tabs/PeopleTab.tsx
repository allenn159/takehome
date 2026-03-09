import { Flex, Spinner, Stack, Text } from "@chakra-ui/react";
import { useSwapi } from "@/hooks/useSwapi";
import { PersonCard } from "@/components/cards/PersonCard";
import { SWAPI_URLS } from "@/constants/swapi";
import { filterByName } from "@/utils/filterByName";
import type { Person } from "@/types/swapi";

interface PeopleTabProps {
  searchTerm: string;
}

export function PeopleTab({ searchTerm }: PeopleTabProps) {
  const { data, isLoading, error } = useSwapi<Person>(SWAPI_URLS.people);

  if (isLoading)
    return (
      <Flex justify="center" align="center" py={12} role="status" aria-live="polite" aria-label="Loading people">
        <Spinner aria-hidden="true" />
      </Flex>
    );
  if (error)
    return (
      <Flex justify="center" align="center" py={12} role="alert" aria-live="assertive">
        <Text color="red.500">{error.message}</Text>
      </Flex>
    );
  if (!data)
    return (
      <Flex justify="center" align="center" py={12} role="status" aria-live="polite">
        <Text color="fg.muted">No results available</Text>
      </Flex>
    );

  const filtered = filterByName(data, searchTerm);

  return (
    <Stack mt={4} gap={3} aria-live="polite">
      {filtered.length === 0 ? (
        <Text color="fg.muted" textAlign="center" py={8} role="status">
          No results for "{searchTerm}"
        </Text>
      ) : (
        filtered.map((person) => (
          <PersonCard key={person.url} person={person} />
        ))
      )}
    </Stack>
  );
}
