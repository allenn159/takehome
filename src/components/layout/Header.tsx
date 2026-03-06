import { Flex, IconButton } from "@chakra-ui/react";
import { LuSun } from "react-icons/lu";

export function Header() {
  // Add light/dark mode toggle
  return (
    <Flex as="header" px="6" py="4" align="center" justify="flex-end">
      <IconButton variant="ghost" aria-label="Toggle color mode" size="md">
        <LuSun />
      </IconButton>
    </Flex>
  );
}
