import { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useParams } from "react-router-dom";

const SingleJob = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const [jobDetails, setJobDetails] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosSecure.get(`/job/${id}`);
        setJobDetails(response.data);
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };

    fetchData();
  }, [axiosSecure, id]);

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

  return (
    <div>
      <p>{title}</p>
      <p>{category}</p>
      <p>{salaryRange}</p>
      <p>{description}</p>
      <p>{photoUrl}</p>
      <p>{applicants}</p>
      <p>{applicationDeadline}</p>
      <p>{recruiterEmail}</p>
      <p>{recruiterName}</p>
    </div>
  );
};

export default SingleJob;
