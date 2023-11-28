import { Bars } from "react-loader-spinner";
import JobCard from "./JobCard";

const JobCards = ({ jobs, loading }) => {
  return (
    <div>
      {loading ? (
        <Bars
          height={80}
          width={80}
          color="#4440da"
          ariaLabel="bars-loading"
          wrapperClass="mx-auto min-h-[300px] flex items-center justify-center"
          visible={true}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job}></JobCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobCards;
