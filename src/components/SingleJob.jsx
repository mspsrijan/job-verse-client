import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Bars } from "react-loader-spinner";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../providers/AuthProvider";

const MySwal = withReactContent(Swal);

const SingleJob = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const [jobDetails, setJobDetails] = useState("");
  const { user } = useContext(AuthContext);
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosSecure.get(`/job/${id}`);
        setJobDetails(res.data);

        if (user) {
          const response = await axiosSecure.get(
            `/applied-jobs?email=${user.email}`
          );
          const appliedJobs = response.data.map((job) => job.jobId);
          setHasApplied(appliedJobs.includes(res.data._id));
        }
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };

    fetchData();
  }, [axiosSecure, id, user]);

  const {
    _id,
    title,
    category,
    salaryRange,
    description,
    photoUrl,
    applicationDeadline,
    applicants,
    recruiterName,
    recruiterEmail,
  } = jobDetails;

  const applicationDeadlineDate = new Date(
    applicationDeadline
  ).toLocaleDateString();

  if (!user) {
    return (
      <Bars
        height="80"
        width="80"
        color="#4440da"
        ariaLabel="bars-loading"
        wrapperClass="mx-auto min-h-[400px] md:min-h-[500px] flex items-center justify-center"
        visible={true}
      />
    );
  }

  const isRecruiter = user.email === recruiterEmail;
  const isDeadlineOver = new Date(applicationDeadline) < new Date();

  const hasUserApplied = async () => {
    if (user) {
      const response = await axiosSecure.get(
        `/applied-jobs?email=${user.email}`
      );
      const appliedJobs = response.data.map((job) => job.jobId);
      return appliedJobs.includes(_id);
    }
    return false;
  };

  const handleApply = async () => {
    const userHasApplied = await hasUserApplied();

    if (userHasApplied) {
      return;
    }

    MySwal.fire({
      title: '<div class="font-montserrat">Submit Application</div>',
      html: (
        <div className="text-left font-montserrat text-base flex flex-col gap-2">
          <p>
            Name: <span className="font-medium">{user?.displayName}</span>
          </p>
          <p>
            Email: <span className="font-medium">{user?.email}</span>
          </p>
          <label htmlFor="resumeLink">Resume Link:</label>
          <input
            type="text"
            id="resumeLink"
            placeholder="Enter your resume link"
            className="block w-full py-3 px-4 border border-slate-300 rounded-full text-sm focus:border-customBlue focus:outline-none"
          />
        </div>
      ),
      customClass: {
        confirmButton: "btn btn-sm font-montserrat",
        cancelButton: "btn btn-sm btn-outline font-montserrat",
      },
      showCancelButton: true,
      confirmButtonText: "Submit Application",
      preConfirm: async () => {
        const resumeLink = document.getElementById("resumeLink").value;

        const jobApplication = {
          jobId: _id,
          title,
          category,
          applicantName: user.displayName,
          applicantEmail: user.email,
          resumeLink,
        };
        try {
          await axiosSecure
            .post("/job-applications", jobApplication)
            .then((res) => {
              if (res.data.insertedId) {
                MySwal.fire({
                  position: "center",
                  icon: "success",
                  title: "Submission Success!",
                  showConfirmButton: false,
                  timer: 1500,
                  iconColor: "#4440DA",
                });
              }
            });
        } catch (error) {
          MySwal.fire({
            position: "center",
            icon: "error",
            title: "Submission failed. Please try again.",
            showConfirmButton: false,
            timer: 1500,
            iconColor: "#4440DA",
          });
        }
      },
    });
  };

  return (
    <div>
      <section className="flex flex-col lg:flex-row gap-8 lg:gap-16">
        <div className="w-full lg:w-1/2">
          <img src={photoUrl} alt={title} />
        </div>
        <div className="flex flex-col">
          <p className="text-sm uppercase font-medium tracking-widest">
            {category}
          </p>
          <h3>{title}</h3>
          <h6 className="mt-3 mb-4 font-medium">{salaryRange} USD</h6>
          <p className="mt-3 text-medium">
            Number of Applicants:
            <span className="font-semibold"> {applicants}</span>
          </p>
          <p className="mt-3">
            Application Deadline:{" "}
            <span className="font-semibold">{applicationDeadlineDate}</span>
          </p>

          <p className="mt-3">Posted by: {recruiterName}</p>
          {isRecruiter || (
            <button
              className={`btn mt-8 ${
                isDeadlineOver
                  ? "!bg-black/60 !border-black/60 cursor-not-allowed"
                  : hasApplied
                  ? "cursor-not-allowed"
                  : ""
              }`}
              onClick={handleApply}
              disabled={isDeadlineOver || hasApplied}
            >
              {isDeadlineOver
                ? "Deadline Over"
                : hasApplied
                ? "Already Applied"
                : "Apply for the Job"}
            </button>
          )}
        </div>
      </section>
      <section className="pt-0">
        <h5 className="mb-4">Job Description</h5>
        <p>{description}</p>
      </section>
    </div>
  );
};

export default SingleJob;
