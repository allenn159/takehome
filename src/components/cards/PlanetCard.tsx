import { useState } from "react";
import { Box, Collapsible, Flex, Text } from "@chakra-ui/react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import type { Planet } from "@/types/swapi";

interface PlanetCardProps {
  planet: Planet;
}

export function PlanetCard({ planet }: PlanetCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible.Root open={open} onOpenChange={(details) => setOpen(details.open)}>
      <Box borderWidth="1px" borderRadius="md" p={4}>
        <Collapsible.Trigger width="100%" cursor="pointer">
          <Flex justify="space-between" align="center">
            <Box textAlign="left">
              <Text fontWeight="semibold">{planet.name}</Text>
              <Text fontSize="sm" color="fg.muted">
                Climate: {planet.climate} · Terrain: {planet.terrain}
              </Text>
            </Box>
            {open ? <FiChevronUp /> : <FiChevronDown />}
          </Flex>
        </Collapsible.Trigger>
        <Collapsible.Content>
          <Box mt={3} display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
            <Text fontSize="sm"><Text as="span" fontWeight="medium">Population:</Text> {planet.population}</Text>
            <Text fontSize="sm"><Text as="span" fontWeight="medium">Diameter:</Text> {planet.diameter}km</Text>
            <Text fontSize="sm"><Text as="span" fontWeight="medium">Gravity:</Text> {planet.gravity}</Text>
            <Text fontSize="sm"><Text as="span" fontWeight="medium">Surface Water:</Text> {planet.surface_water}%</Text>
            <Text fontSize="sm"><Text as="span" fontWeight="medium">Rotation:</Text> {planet.rotation_period}h</Text>
            <Text fontSize="sm"><Text as="span" fontWeight="medium">Orbital Period:</Text> {planet.orbital_period} days</Text>
            <Text fontSize="sm"><Text as="span" fontWeight="medium">Residents:</Text> {planet.residents.length}</Text>
            <Text fontSize="sm"><Text as="span" fontWeight="medium">Films:</Text> {planet.films.length}</Text>
          </Box>
        </Collapsible.Content>
      </Box>
    </Collapsible.Root>
  );
}
