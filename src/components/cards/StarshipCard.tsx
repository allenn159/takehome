import { useState } from "react";
import { Box, Collapsible, Flex, Text } from "@chakra-ui/react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import type { Starship } from "@/types/swapi";

interface StarshipCardProps {
  starship: Starship;
}

export function StarshipCard({ starship }: StarshipCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible.Root open={open} onOpenChange={(details) => setOpen(details.open)}>
      <Box borderWidth="1px" borderRadius="md" p={4}>
        <Collapsible.Trigger width="100%" cursor="pointer">
          <Flex justify="space-between" align="center">
            <Box textAlign="left">
              <Text fontWeight="semibold">{starship.name}</Text>
              <Text fontSize="sm" color="fg.muted">
                Model: {starship.model} · Class: {starship.starship_class}
              </Text>
            </Box>
            {open ? <FiChevronUp /> : <FiChevronDown />}
          </Flex>
        </Collapsible.Trigger>
        <Collapsible.Content>
          <Box mt={3} display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
            <Text fontSize="sm"><Text as="span" fontWeight="medium">Manufacturer:</Text> {starship.manufacturer}</Text>
            <Text fontSize="sm"><Text as="span" fontWeight="medium">Cost:</Text> {starship.cost_in_credits} credits</Text>
            <Text fontSize="sm"><Text as="span" fontWeight="medium">Length:</Text> {starship.length}m</Text>
            <Text fontSize="sm"><Text as="span" fontWeight="medium">Crew:</Text> {starship.crew}</Text>
            <Text fontSize="sm"><Text as="span" fontWeight="medium">Passengers:</Text> {starship.passengers}</Text>
            <Text fontSize="sm"><Text as="span" fontWeight="medium">Hyperdrive:</Text> {starship.hyperdrive_rating}</Text>
            <Text fontSize="sm"><Text as="span" fontWeight="medium">MGLT:</Text> {starship.MGLT}</Text>
            <Text fontSize="sm"><Text as="span" fontWeight="medium">Cargo:</Text> {starship.cargo_capacity}kg</Text>
          </Box>
        </Collapsible.Content>
      </Box>
    </Collapsible.Root>
  );
}
