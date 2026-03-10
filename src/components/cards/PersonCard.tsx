import { useState } from "react";
import {
  Box,
  Collapsible,
  Flex,
  Separator,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useSwapiResource, useSwapiResources } from "@/hooks/useSwapiResource";
import type {
  Film,
  Person,
  Planet,
  Species,
  Starship,
  Vehicle,
} from "@/types/swapi";

interface PersonCardProps {
  person: Person;
}

function StatCell({ label, value }: { label: string; value: string }) {
  return (
    <Box>
      <Text
        fontSize="2xs"
        color="fg.muted"
        fontWeight="medium"
        textTransform="uppercase"
        letterSpacing="wide"
      >
        {label}
      </Text>
      <Text fontSize="md">{value}</Text>
    </Box>
  );
}

function PersonDetails({ person }: { person: Person }) {
  const { data: homeworld, isLoading: homeworldLoading } =
    useSwapiResource<Planet>(person.homeworld);
  const speciesResults = useSwapiResources<Species>(person.species);
  const filmResults = useSwapiResources<Film>(person.films);
  const vehicleResults = useSwapiResources<Vehicle>(person.vehicles);
  const starshipResults = useSwapiResources<Starship>(person.starships);

  const isLoading =
    homeworldLoading ||
    speciesResults.some((r) => r.isLoading) ||
    filmResults.some((r) => r.isLoading) ||
    vehicleResults.some((r) => r.isLoading) ||
    starshipResults.some((r) => r.isLoading);

  if (isLoading)
    return (
      <Flex justify="center" py={4} role="status" aria-label="Loading details">
        <Spinner size="sm" aria-hidden="true" />
      </Flex>
    );

  const speciesNames =
    speciesResults
      .map((r) => r.data?.name)
      .filter(Boolean)
      .join(", ") || "Human";
  const filmTitles =
    filmResults
      .map((r) => r.data?.title)
      .filter(Boolean)
      .join(", ") || "None";
  const vehicleNames =
    vehicleResults
      .map((r) => r.data?.name)
      .filter(Boolean)
      .join(", ") || "None";
  const starshipNames =
    starshipResults
      .map((r) => r.data?.name)
      .filter(Boolean)
      .join(", ") || "None";

  return (
    <Box mt={4} display="grid" gridTemplateColumns="1fr 1fr" gap={4}>
      <StatCell label="Height" value={`${person.height}cm`} />
      <StatCell label="Mass" value={`${person.mass}kg`} />
      <StatCell label="Hair" value={person.hair_color} />
      <StatCell label="Eyes" value={person.eye_color} />
      <StatCell label="Skin" value={person.skin_color} />
      <StatCell label="Homeworld" value={homeworld?.name ?? "—"} />
      <StatCell label="Species" value={speciesNames} />
      <StatCell label="Films" value={filmTitles} />
      <StatCell label="Vehicles" value={vehicleNames} />
      <StatCell label="Starships" value={starshipNames} />
    </Box>
  );
}

export function PersonCard({ person }: PersonCardProps) {
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
          aria-label={`${open ? "Collapse" : "Expand"} details for ${person.name}`}
        >
          <Flex justify="space-between" align="center">
            <Box textAlign="left">
              <Text fontWeight="semibold" fontSize="lg">
                {person.name}
              </Text>
              <Text fontSize="sm" color="fg.muted">
                Birth Year: {person.birth_year} · Gender: {person.gender}
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
              <PersonDetails person={person} />
            </>
          )}
        </Collapsible.Content>
      </Box>
    </Collapsible.Root>
  );
}
