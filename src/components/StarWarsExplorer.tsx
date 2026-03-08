import { useState } from "react";
import { Tabs } from "@chakra-ui/react";
import { PeopleTab } from "@/components/tabs/PeopleTab";
import { PlanetsTab } from "@/components/tabs/PlanetsTab";
import { StarshipsTab } from "@/components/tabs/StarshipsTab";

type TabValue = "people" | "planets" | "starships";

export function StarWarsExplorer() {
  const [activeTab, setActiveTab] = useState<TabValue>("people");

  return (
    <Tabs.Root
      value={activeTab}
      paddingX={4}
      onValueChange={(details) => setActiveTab(details.value as TabValue)}
    >
      <Tabs.List>
        <Tabs.Trigger value="people">People</Tabs.Trigger>
        <Tabs.Trigger value="planets">Planets</Tabs.Trigger>
        <Tabs.Trigger value="starships">Starships</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="people">
        {activeTab === "people" && <PeopleTab />}
      </Tabs.Content>
      <Tabs.Content value="planets">
        {activeTab === "planets" && <PlanetsTab />}
      </Tabs.Content>
      <Tabs.Content value="starships">
        {activeTab === "starships" && <StarshipsTab />}
      </Tabs.Content>
    </Tabs.Root>
  );
}
