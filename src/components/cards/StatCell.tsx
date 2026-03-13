import { Box, Text } from "@chakra-ui/react";

export function StatCell({ label, value }: { label: string; value: string }) {
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
