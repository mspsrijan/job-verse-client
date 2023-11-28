import { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import useAxiosPublic from "../hooks/useAxiosPublic";
import JobCards from "./JobCards";

const JobsTabs = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    setLoading(true);
    axiosPublic.get("/jobs").then((res) => {
      setJobs(res.data);
      setLoading(false);
    });
  }, [axiosPublic]);

  const tabCategories = [
    "All Jobs",
    "On-site",
    "Remote",
    "Hybrid",
    "Part-time",
  ];

  const getTabClassName = (index) =>
    `py-2 px-4 text-center font-medium uppercase cursor-pointer ${
      tabIndex === index
        ? "border-b-2 border-customBlue text-customBlue dark:text-blue-500 dark:border-blue-500 outline-none"
        : "hover:text-blue-500"
    }`;

  return (
    <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
      <TabList className="flex flex-wrap justify-center gap-2">
        {tabCategories.map((category, index) => (
          <Tab key={index} className={getTabClassName(index)}>
            {category}
          </Tab>
        ))}
      </TabList>

      {tabCategories.map((category, index) => (
        <TabPanel key={index} className="mt-8">
          <JobCards
            key={index}
            jobs={
              index === 0
                ? jobs
                : jobs.filter((job) => job.category === category)
            }
            loading={loading}
          />
        </TabPanel>
      ))}
    </Tabs>
  );
};

export default JobsTabs;
