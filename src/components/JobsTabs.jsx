import { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

const JobsTabs = () => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <section className="flex justify-center items-center">
      <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList className="flex space-x-4">
          <Tab
            className={`py-2 px-4 text-center font-medium uppercase cursor-pointer ${
              tabIndex === 0
                ? "border-b-2 border-customBlue text-customBlue outline-none"
                : "hover:text-blue-500"
            }`}
          >
            All Jobs
          </Tab>
          <Tab
            className={`py-2 px-4 text-center font-medium uppercase cursor-pointer ${
              tabIndex === 1
                ? "border-b-2 border-customBlue text-customBlue outline-none"
                : "hover:text-blue-500"
            }`}
          >
            On-Site
          </Tab>
          <Tab
            className={`py-2 px-4 text-center font-medium uppercase cursor-pointer ${
              tabIndex === 2
                ? "border-b-2 border-customBlue text-customBlue outline-none"
                : "hover:text-blue-500"
            }`}
          >
            Remote
          </Tab>
          <Tab
            className={`py-2 px-4 text-center font-medium uppercase cursor-pointer ${
              tabIndex === 3
                ? "border-b-2 border-customBlue text-customBlue outline-none"
                : "hover:text-blue-500"
            }`}
          >
            Hybrid
          </Tab>
        </TabList>

        <TabPanel>
          <p>Content for Tab 1</p>
        </TabPanel>
        <TabPanel>
          <p>Content for Tab 2</p>
        </TabPanel>
        <TabPanel>
          <p>Content for Tab 3</p>
        </TabPanel>
        <TabPanel>
          <p>Content for Tab 4</p>
        </TabPanel>
      </Tabs>
    </section>
  );
};

export default JobsTabs;
