import { useState } from "react";
import { Box, Collapsible, Flex, Separator, Spinner, Text } from "@chakra-ui/react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useSwapiResources } from "@/hooks/useSwapiResource";
import type { Film, Person, Starship } from "@/types/swapi";

interface StarshipCardProps {
  starship: Starship;
}

function StatCell({ label, value }: { label: string; value: string }) {
  return (
    <Box>
      <Text fontSize="2xs" color="fg.muted" fontWeight="medium" textTransform="uppercase" letterSpacing="wide">
        {label}
      </Text>
      <Text fontSize="md">{value}</Text>
    </Box>
  );
}

function StarshipDetails({ starship }: { starship: Starship }) {
  const pilotResults = useSwapiResources<Person>(starship.pilots);
  const filmResults = useSwapiResources<Film>(starship.films);

  const isLoading =
    pilotResults.some((r) => r.isLoading) ||
    filmResults.some((r) => r.isLoading);

  if (isLoading)
    return (
      <Flex justify="center" py={4} role="status" aria-label="Loading details">
        <Spinner size="sm" aria-hidden="true" />
      </Flex>
    );

  const pilotNames =
    pilotResults
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
      <StatCell label="Manufacturer" value={starship.manufacturer} />
      <StatCell label="Cost" value={`${starship.cost_in_credits} credits`} />
      <StatCell label="Length" value={`${starship.length}m`} />
      <StatCell label="Crew" value={starship.crew} />
      <StatCell label="Passengers" value={starship.passengers} />
      <StatCell label="Hyperdrive" value={starship.hyperdrive_rating} />
      <StatCell label="MGLT" value={starship.MGLT} />
      <StatCell label="Cargo" value={`${starship.cargo_capacity}kg`} />
      <StatCell label="Pilots" value={pilotNames} />
      <StatCell label="Films" value={filmTitles} />
    </Box>
  );
}

export function StarshipCard({ starship }: StarshipCardProps) {
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
          aria-label={`${open ? "Collapse" : "Expand"} details for ${starship.name}`}
        >
          <Flex justify="space-between" align="center">
            <Box textAlign="left">
              <Text fontWeight="semibold" fontSize="lg">{starship.name}</Text>
              <Text fontSize="sm" color="fg.muted">
                Model: {starship.model} · Class: {starship.starship_class}
              </Text>
            </Box>
            <Box color="fg.muted">
              {open ? <FiChevronUp aria-hidden="true" /> : <FiChevronDown aria-hidden="true" />}
            </Box>
          </Flex>
        </Collapsible.Trigger>
        <Collapsible.Content>
          {open && (
            <>
              <Separator mt={3} />
              <StarshipDetails starship={starship} />
            </>
          )}
        </Collapsible.Content>
      </Box>
    </Collapsible.Root>
  );
}
