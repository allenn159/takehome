import { Box } from "@chakra-ui/react";
import { Header } from "./Header";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <Box minH="100vh">
      <Header />
      <Box as="main" px="6" py="8">
        {children}
      </Box>
    </Box>
  );
}
