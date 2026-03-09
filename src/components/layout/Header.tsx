import { Flex, IconButton, Text } from "@chakra-ui/react";
import { LuMoon, LuSun } from "react-icons/lu";
import { useThemeContext } from "@/context/ThemeContext";

export function Header() {
  const { colorMode, toggleColorMode } = useThemeContext();

  return (
    <Flex as="header" px="6" py="4" align="center" justify="space-between">
      <Text fontWeight="bold" fontSize="xl">
        Star Wars Explorer
      </Text>
      <IconButton
        variant="ghost"
        aria-label="Toggle color mode"
        size="md"
        onClick={toggleColorMode}
      >
        {colorMode === "dark" ? <LuMoon /> : <LuSun />}
      </IconButton>
    </Flex>
  );
}
