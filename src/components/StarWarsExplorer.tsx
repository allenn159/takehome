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
      onValueChange={(details) => {
        setActiveTab(details.value as TabValue);
        setSearchTerm("");
      }}
    >
      <Tabs.List>
        <Tabs.Trigger value="people">People</Tabs.Trigger>
        <Tabs.Trigger value="planets">Planets</Tabs.Trigger>
        <Tabs.Trigger value="starships">Starships</Tabs.Trigger>
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
