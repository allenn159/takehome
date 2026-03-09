import { useState } from "react";
import { Box, Collapsible, Flex, Spinner, Text } from "@chakra-ui/react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useSwapiResources } from "@/hooks/useSwapiResource";
import type { Film, Person, Starship } from "@/types/swapi";

interface StarshipCardProps {
  starship: Starship;
}

function StarshipDetails({ starship }: { starship: Starship }) {
  const pilotResults = useSwapiResources<Person>(starship.pilots);
  const filmResults = useSwapiResources<Film>(starship.films);

  const isLoading =
    pilotResults.some((r) => r.isLoading) ||
    filmResults.some((r) => r.isLoading);

  if (isLoading)
    return (
      <Flex justify="center" py={4}>
        <Spinner size="sm" />
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
    <Box mt={3} display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
      <Text fontSize="sm">
        <Text as="span" fontWeight="medium">
          Manufacturer:
        </Text>{" "}
        {starship.manufacturer}
      </Text>
      <Text fontSize="sm">
        <Text as="span" fontWeight="medium">
          Cost:
        </Text>{" "}
        {starship.cost_in_credits} credits
      </Text>
      <Text fontSize="sm">
        <Text as="span" fontWeight="medium">
          Length:
        </Text>{" "}
        {starship.length}m
      </Text>
      <Text fontSize="sm">
        <Text as="span" fontWeight="medium">
          Crew:
        </Text>{" "}
        {starship.crew}
      </Text>
      <Text fontSize="sm">
        <Text as="span" fontWeight="medium">
          Passengers:
        </Text>{" "}
        {starship.passengers}
      </Text>
      <Text fontSize="sm">
        <Text as="span" fontWeight="medium">
          Hyperdrive:
        </Text>{" "}
        {starship.hyperdrive_rating}
      </Text>
      <Text fontSize="sm">
        <Text as="span" fontWeight="medium">
          MGLT:
        </Text>{" "}
        {starship.MGLT}
      </Text>
      <Text fontSize="sm">
        <Text as="span" fontWeight="medium">
          Cargo:
        </Text>{" "}
        {starship.cargo_capacity}kg
      </Text>
      <Text fontSize="sm" gridColumn="1 / -1">
        <Text as="span" fontWeight="medium">
          Pilots:
        </Text>{" "}
        {pilotNames}
      </Text>
      <Text fontSize="sm" gridColumn="1 / -1">
        <Text as="span" fontWeight="medium">
          Films:
        </Text>{" "}
        {filmTitles}
      </Text>
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
          {open && <StarshipDetails starship={starship} />}
        </Collapsible.Content>
      </Box>
    </Collapsible.Root>
  );
}
