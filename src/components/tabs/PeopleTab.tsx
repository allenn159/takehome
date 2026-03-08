import { Flex, Spinner, Stack, Text } from "@chakra-ui/react";
import { useSwapi } from "@/hooks/useSwapi";
import { PersonCard } from "@/components/cards/PersonCard";
import type { Person } from "@/types/swapi";

export function PeopleTab() {
  const { data, isLoading, error } = useSwapi<Person>(
    "https://swapi.info/api/people",
  );

  if (isLoading) return <Flex justify="center" align="center" py={12}><Spinner /></Flex>;
  if (error) return <Flex justify="center" align="center" py={12}><Text color="red.500">{error.message}</Text></Flex>;
  if (!data) return <Flex justify="center" align="center" py={12}><Text color="fg.muted">No results available</Text></Flex>;

  return (
    <Stack mt={4} gap={3}>
      {data.map((person) => (
        <PersonCard key={person.url} person={person} />
      ))}
    </Stack>
  );
}
