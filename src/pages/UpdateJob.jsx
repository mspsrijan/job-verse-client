import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { Bars } from "react-loader-spinner";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";
import weAreHiring from "../assets/we-are-hiring.jpg";
import { useParams } from "react-router-dom";

const UpdateJob = () => {
  const { id } = useParams();
  const [jobDetails, setJobDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [isPermittedUser, setIsPermittedUser] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    jobDetails.applicationDeadline
      ? new Date(jobDetails.applicationDeadline)
      : new Date()
  );
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axiosSecure.get(`/job/${id}`);
        setJobDetails(res.data);
        setLoading(false);

        if (
          user?.email &&
          res.data.recruiterEmail &&
          user.email === res.data.recruiterEmail
        ) {
          setIsPermittedUser(true);
        }

        if (res.data.applicationDeadline) {
          setSelectedDate(new Date(res.data.applicationDeadline));
        }
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };

    fetchData();
  }, [axiosSecure, id, user?.email]);

  const {
    _id,
    title,
    category,
    salaryRange,
    description,
    photoUrl,
    applicants,
  } = jobDetails;

  const handleUpdateJob = (e) => {
    e.preventDefault();

    const selectedDateWithTime = new Date(selectedDate);
    selectedDateWithTime.setUTCHours(23, 59, 0, 0);

    let title = e.target.title.value;
    let category = e.target.category.value;
    let salaryRange = e.target.salaryRange.value;
    let description = e.target.description.value;
    let photoUrl = e.target.photoUrl.value;
    let applicationDeadline = selectedDateWithTime;
    let applicants = parseInt(e.target.applicants.value, 10);

    const newjob = {
      title,
      category,
      salaryRange,
      description,
      photoUrl,
      applicationDeadline,
      applicants,
    };

    axiosSecure.patch(`/job/${_id}`, newjob).then((res) => {
      if (res.data.modifiedCount) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Job updated successfully!",
          showConfirmButton: false,
          timer: 1500,
          iconColor: "#4440DA",
        });
      }
    });
  };

  return (
    <section>
      <Helmet>
        <title>JobVerse | Update Job</title>
      </Helmet>
      {loading ? (
        <Bars
          height={80}
          width={80}
          color="#4440da"
          ariaLabel="bars-loading"
          wrapperClass="mx-auto min-h-[300px] flex items-center justify-center"
          visible={true}
        />
      ) : isPermittedUser ? (
        <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-16">
          <div className="md:w-2/3 lg:w-1/2 flex justify-center">
            <div className="w-full max-w-lg p-6 border border-slate-100 rounded-xl shadow-sm dark:bg-slate-800 dark:border-slate-800">
              <div className="text-center">
                <h4 className="">Update Job Post</h4>
                <p className="mt-2 text-sm text-slate-800 dark:text-slate-400">
                  Craft Your Perfect Job Listing and Attract Top Talent
                </p>
              </div>

              <div className="mt-8">
                <form onSubmit={handleUpdateJob}>
                  <div className="grid gap-y-4">
                    <div>
                      <label htmlFor="title" className="block text-sm mb-2">
                        Job Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        id="title"
                        defaultValue={title}
                        className="block w-full py-3 px-4 border border-slate-300 rounded-full text-sm focus:border-customBlue focus:outline-none dark:bg-slate-800 dark:border-slate-700 dark:focus:border-customBlue"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="category" className="block text-sm mb-2">
                        Category
                      </label>
                      <select
                        id="category"
                        defaultValue={category}
                        className="block w-full py-3 px-4 bg-white border border-slate-300 rounded-full text-sm focus:border-customBlue focus:outline-none dark:bg-slate-800 dark:border-slate-700 dark:focus:border-customBlue"
                      >
                        <option value="On-site">On-site</option>
                        <option value="Remote">Remote</option>
                        <option value="Hybrid">Hybrid</option>
                        <option value="Part-time">Part-time</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="salaryRange"
                        className="block text-sm mb-2"
                      >
                        Salary Range
                      </label>
                      <input
                        type="text"
                        name="salaryRange"
                        id="salaryRange"
                        defaultValue={salaryRange}
                        className="block w-full py-3 px-4 border border-slate-300 rounded-full text-sm focus:border-customBlue focus:outline-none dark:bg-slate-800 dark:border-slate-700 dark:focus:border-customBlue"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="description"
                        className="block text-sm mb-2"
                      >
                        Job Description
                      </label>
                      <textarea
                        id="description"
                        rows="4"
                        defaultValue={description}
                        className="block w-full py-3 px-4 border border-slate-300 rounded-lg text-sm focus:border-customBlue focus:outline-none dark:bg-slate-800 dark:border-slate-700 dark:focus:border-customBlue"
                        required
                      ></textarea>
                    </div>

                    <div>
                      <label htmlFor="photoUrl" className="block text-sm mb-2">
                        Job photo URL
                      </label>
                      <input
                        type="text"
                        name="photoUrl"
                        id="photoUrl"
                        defaultValue={photoUrl}
                        className="block w-full py-3 px-4 border border-slate-300 rounded-full text-sm focus:border-customBlue focus:outline-none dark:bg-slate-800 dark:border-slate-700 dark:focus:border-customBlue"
                        required
                      />
                    </div>

                    <div className="flex gap-2">
                      <div>
                        <label className="block text-sm mb-2">
                          Application Deadline
                        </label>
                        <DatePicker
                          selected={selectedDate}
                          onChange={(date) => setSelectedDate(date)}
                          dateFormat="MM/dd/yyyy"
                          className="w-full py-3 px-4 border border-slate-300 rounded-full text-sm focus:border-customBlue focus:outline-none dark:bg-slate-800 dark:border-slate-700 dark:focus:border-customBlue"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="applicants"
                          className="block text-sm mb-2"
                        >
                          Job Applicants
                        </label>
                        <input
                          type="number"
                          min="0"
                          name="applicants"
                          id="applicants"
                          defaultValue={applicants}
                          className="block w-full py-3 px-4 border border-slate-300 rounded-full text-sm focus:border-customBlue focus:outline-none dark:bg-slate-800 dark:border-slate-700 dark:focus:border-customBlue"
                          required
                        />
                      </div>
                    </div>

                    <button type="submit" className="mt-4 w-full btn !py-2.5">
                      Update Job
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="max-w-[600px] md:w-1/3 lg:w-1/2">
            <img src={weAreHiring} alt="" />
          </div>
        </div>
      ) : (
        <section className="max-w-4xl min-h-[250px] text-center flex flex-col justify-center">
          <p className="text-2xl">
            Sorry, you do not have permission to edit this job.
          </p>
        </section>
      )}
    </section>
  );
};

export default UpdateJob;
