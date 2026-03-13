import { useState } from "react";
import {
  Collapsible,
  Flex,
  Separator,
  Spinner,
  Box,
  Text,
} from "@chakra-ui/react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useSwapiResources } from "@/hooks/useSwapiResource";
import { StatCell } from "./StatCell";
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

  if (isLoading)
    return (
      <Flex justify="center" py={4} role="status" aria-label="Loading details">
        <Spinner size="sm" aria-hidden="true" />
      </Flex>
    );

  const residentNames =
    residentResults
      .map((r) => r.data?.name)
      .filter(Boolean)
      .join(", ") || "None";
  const filmTitles =
    filmResults
      .map((r) => r.data?.title)
      .filter(Boolean)
      .join(", ") || "None";

  return (
    <Box mt={4} display="grid" gridTemplateColumns="1fr 1fr" gap={4}>
      <StatCell label="Population" value={planet.population} />
      <StatCell label="Diameter" value={`${planet.diameter}km`} />
      <StatCell label="Gravity" value={planet.gravity} />
      <StatCell label="Surface Water" value={`${planet.surface_water}%`} />
      <StatCell label="Rotation" value={`${planet.rotation_period}h`} />
      <StatCell
        label="Orbital Period"
        value={`${planet.orbital_period} days`}
      />
      <StatCell label="Residents" value={residentNames} />
      <StatCell label="Films" value={filmTitles} />
    </Box>
  );
}

export function PlanetCard({ planet }: PlanetCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible.Root
      open={open}
      onOpenChange={(details) => setOpen(details.open)}
    >
      <Box
        borderWidth="1px"
        borderRadius="xl"
        p={4}
        boxShadow="sm"
        transition="box-shadow 0.2s"
        _hover={{ boxShadow: "md" }}
      >
        <Collapsible.Trigger
          width="100%"
          cursor="pointer"
          aria-label={`${open ? "Collapse" : "Expand"} details for ${planet.name}`}
        >
          <Flex justify="space-between" align="center">
            <Box textAlign="left">
              <Text fontWeight="semibold" fontSize="lg">
                {planet.name}
              </Text>
              <Text fontSize="sm" color="fg.muted">
                Climate: {planet.climate} · Terrain: {planet.terrain}
              </Text>
            </Box>
            <Box color="fg.muted">
              {open ? (
                <FiChevronUp aria-hidden="true" />
              ) : (
                <FiChevronDown aria-hidden="true" />
              )}
            </Box>
          </Flex>
        </Collapsible.Trigger>
        <Collapsible.Content>
          {open && (
            <>
              <Separator mt={3} />
              <PlanetDetails planet={planet} />
            </>
          )}
        </Collapsible.Content>
      </Box>
    </Collapsible.Root>
  );
}
