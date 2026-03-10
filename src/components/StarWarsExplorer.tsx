import { useState } from "react";
import { Input, Tabs } from "@chakra-ui/react";
import { PeopleTab } from "@/components/tabs/PeopleTab";
import { PlanetsTab } from "@/components/tabs/PlanetsTab";
import { StarshipsTab } from "@/components/tabs/StarshipsTab";

type TabValue = "people" | "planets" | "starships";

export function StarWarsExplorer() {
  const [activeTab, setActiveTab] = useState<TabValue>("people");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Tabs.Root
      value={activeTab}
      paddingX={4}
      colorPalette="blue"
      onValueChange={(details) => {
        setActiveTab(details.value as TabValue);
        setSearchTerm("");
      }}
    >
      <Tabs.List>
        <Tabs.Trigger
          value="people"
          _selected={{ color: "blue.500", fontWeight: "semibold" }}
        >
          People
        </Tabs.Trigger>
        <Tabs.Trigger
          value="planets"
          _selected={{ color: "blue.500", fontWeight: "semibold" }}
        >
          Planets
        </Tabs.Trigger>
        <Tabs.Trigger
          value="starships"
          _selected={{ color: "blue.500", fontWeight: "semibold" }}
        >
          Starships
        </Tabs.Trigger>
      </Tabs.List>
      <Input
        mt={4}
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        aria-label="Search by name"
      />
      <Tabs.Content value="people">
        {activeTab === "people" && <PeopleTab searchTerm={searchTerm} />}
      </Tabs.Content>
      <Tabs.Content value="planets">
        {activeTab === "planets" && <PlanetsTab searchTerm={searchTerm} />}
      </Tabs.Content>
      <Tabs.Content value="starships">
        {activeTab === "starships" && <StarshipsTab searchTerm={searchTerm} />}
      </Tabs.Content>
    </Tabs.Root>
  );
}
