import { useState } from "react";
import { Box, Collapsible, Flex, Spinner, Text } from "@chakra-ui/react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useSwapiResources } from "@/hooks/useSwapiResource";
import type { Film, Person, Planet } from "@/types/swapi";

interface PlanetCardProps {
  planet: Planet;
}

function PlanetDetails({ planet }: { planet: Planet }) {
  const residentResults = useSwapiResources<Person>(planet.residents);
  const filmResults = useSwapiResources<Film>(planet.films);

  const isLoading =
    residentResults.some((r) => r.isLoading) ||
    filmResults.some((r) => r.isLoading);

  if (isLoading) return <Flex justify="center" py={4}><Spinner size="sm" /></Flex>;

  const residentNames = residentResults.map((r) => r.data?.name).filter(Boolean).join(", ") || "None";
  const filmTitles = filmResults.map((r) => r.data?.title).filter(Boolean).join(", ") || "None";

  return (
    <Box mt={3} display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
      <Text fontSize="sm"><Text as="span" fontWeight="medium">Population:</Text> {planet.population}</Text>
      <Text fontSize="sm"><Text as="span" fontWeight="medium">Diameter:</Text> {planet.diameter}km</Text>
      <Text fontSize="sm"><Text as="span" fontWeight="medium">Gravity:</Text> {planet.gravity}</Text>
      <Text fontSize="sm"><Text as="span" fontWeight="medium">Surface Water:</Text> {planet.surface_water}%</Text>
      <Text fontSize="sm"><Text as="span" fontWeight="medium">Rotation:</Text> {planet.rotation_period}h</Text>
      <Text fontSize="sm"><Text as="span" fontWeight="medium">Orbital Period:</Text> {planet.orbital_period} days</Text>
      <Text fontSize="sm" gridColumn="1 / -1"><Text as="span" fontWeight="medium">Residents:</Text> {residentNames}</Text>
      <Text fontSize="sm" gridColumn="1 / -1"><Text as="span" fontWeight="medium">Films:</Text> {filmTitles}</Text>
    </Box>
  );
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
          {open && <PlanetDetails planet={planet} />}
        </Collapsible.Content>
      </Box>
    </Collapsible.Root>
  );
}
