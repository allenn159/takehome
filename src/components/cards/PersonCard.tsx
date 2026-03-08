import { useState } from "react";
import { Box, Collapsible, Flex, Text } from "@chakra-ui/react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import type { Person } from "@/types/swapi";

interface PersonCardProps {
  person: Person;
}

export function PersonCard({ person }: PersonCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible.Root open={open} onOpenChange={(details) => setOpen(details.open)}>
      <Box borderWidth="1px" borderRadius="md" p={4}>
        <Collapsible.Trigger width="100%" cursor="pointer">
          <Flex justify="space-between" align="center">
            <Box textAlign="left">
              <Text fontWeight="semibold">{person.name}</Text>
              <Text fontSize="sm" color="fg.muted">
                Birth Year: {person.birth_year} · Gender: {person.gender}
              </Text>
            </Box>
            {open ? <FiChevronUp /> : <FiChevronDown />}
          </Flex>
        </Collapsible.Trigger>
        <Collapsible.Content>
          <Box mt={3} display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
            <Text fontSize="sm"><Text as="span" fontWeight="medium">Height:</Text> {person.height}cm</Text>
            <Text fontSize="sm"><Text as="span" fontWeight="medium">Mass:</Text> {person.mass}kg</Text>
            <Text fontSize="sm"><Text as="span" fontWeight="medium">Hair:</Text> {person.hair_color}</Text>
            <Text fontSize="sm"><Text as="span" fontWeight="medium">Eyes:</Text> {person.eye_color}</Text>
            <Text fontSize="sm"><Text as="span" fontWeight="medium">Skin:</Text> {person.skin_color}</Text>
            <Text fontSize="sm"><Text as="span" fontWeight="medium">Films:</Text> {person.films.length}</Text>
            <Text fontSize="sm"><Text as="span" fontWeight="medium">Starships:</Text> {person.starships.length}</Text>
            <Text fontSize="sm"><Text as="span" fontWeight="medium">Vehicles:</Text> {person.vehicles.length}</Text>
          </Box>
        </Collapsible.Content>
      </Box>
    </Collapsible.Root>
  );
}
