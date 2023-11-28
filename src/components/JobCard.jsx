import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../providers/AuthProvider";

const JobCard = ({ job }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    _id,
    title,
    category,
    salaryRange,
    postedDate,
    applicationDeadline,
    applicants,
    recruiterName,
  } = job;

  const formattedPostedDate = postedDate
    ? new Date(postedDate).toLocaleDateString()
    : new Date().toLocaleDateString();

  const formattedApplicationDeadline = new Date(
    applicationDeadline
  ).toLocaleDateString();

  const handleViewDetails = () => {
    if (user) {
      navigate(`/job/${_id}`);
    } else {
      Swal.fire({
        title: "Login Required",
        text: "Please login to view job details.",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Login",
        confirmButtonColor: "#4440DA",
        cancelButtonColor: "#23232E",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: `/job/${_id}` } });
        }
      });
    }
  };

  return (
    <div className="bg-white dark:bg-customBlack text-left p-10 rounded-lg flex flex-col gap-1 border border-slate-100 dark:border-slate-800 shadow-sm">
      <p className="text-sm uppercase font-medium tracking-widest text-customBlue dark:text-blue-500">
        {category}
      </p>
      <h6 className="text-2xl font-semibold mb-4">{title}</h6>

      <div className="border-t border-b border-slate-200 dark:border-slate-700 py-2 flex-grow">
        <p className="text-sm">Salary Range: {salaryRange}</p>
        <p className="text-sm">Posted by: {recruiterName}</p>
        <p className="text-sm">Posted on: {formattedPostedDate}</p>
        <p className="text-sm">Deadline: {formattedApplicationDeadline}</p>
        <p className="text-sm">No. of Applicants: {applicants}</p>
      </div>

      <button
        className="mt-6 btn btn-sm btn-outline text-sm self-start"
        onClick={handleViewDetails}
      >
        View Details
      </button>
    </div>
  );
};

export default JobCard;
