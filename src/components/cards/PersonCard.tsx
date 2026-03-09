import { useState } from "react";
import { Box, Collapsible, Flex, Spinner, Text } from "@chakra-ui/react";
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
      <Flex justify="center" py={4}>
        <Spinner size="sm" />
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
    <Box mt={3} display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
      <Text fontSize="sm">
        <Text as="span" fontWeight="medium">
          Height:
        </Text>{" "}
        {person.height}cm
      </Text>
      <Text fontSize="sm">
        <Text as="span" fontWeight="medium">
          Mass:
        </Text>{" "}
        {person.mass}kg
      </Text>
      <Text fontSize="sm">
        <Text as="span" fontWeight="medium">
          Hair:
        </Text>{" "}
        {person.hair_color}
      </Text>
      <Text fontSize="sm">
        <Text as="span" fontWeight="medium">
          Eyes:
        </Text>{" "}
        {person.eye_color}
      </Text>
      <Text fontSize="sm">
        <Text as="span" fontWeight="medium">
          Skin:
        </Text>{" "}
        {person.skin_color}
      </Text>
      <Text fontSize="sm">
        <Text as="span" fontWeight="medium">
          Homeworld:
        </Text>{" "}
        {homeworld?.name ?? "—"}
      </Text>
      <Text fontSize="sm" gridColumn="1 / -1">
        <Text as="span" fontWeight="medium">
          Species:
        </Text>{" "}
        {speciesNames}
      </Text>
      <Text fontSize="sm" gridColumn="1 / -1">
        <Text as="span" fontWeight="medium">
          Vehicles:
        </Text>{" "}
        {vehicleNames}
      </Text>
      <Text fontSize="sm" gridColumn="1 / -1">
        <Text as="span" fontWeight="medium">
          Starships:
        </Text>{" "}
        {starshipNames}
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

export function PersonCard({ person }: PersonCardProps) {
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
              <Text fontWeight="semibold">{person.name}</Text>
              <Text fontSize="sm" color="fg.muted">
                Birth Year: {person.birth_year} · Gender: {person.gender}
              </Text>
            </Box>
            {open ? <FiChevronUp /> : <FiChevronDown />}
          </Flex>
        </Collapsible.Trigger>
        <Collapsible.Content>
          {open && <PersonDetails person={person} />}
        </Collapsible.Content>
      </Box>
    </Collapsible.Root>
  );
}
