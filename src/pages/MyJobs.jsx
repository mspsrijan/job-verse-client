import { useState, useEffect, useMemo, useContext } from "react";
import { useTable, useGlobalFilter } from "react-table";
import { Link } from "react-router-dom";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      axiosSecure.get(`/my-jobs?email=${user.email}`).then((res) => {
        setJobs(res.data);
      });
    }
  }, [axiosSecure, user]);

  const handleDeletejob = (jobId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4440DA",
      cancelButtonColor: "#23232E",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/job/${jobId}`);

        const remainingJobs = jobs.filter((job) => job._id !== jobId);
        setJobs(remainingJobs);

        if (res.data.deletedCount > 0) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: `Job has been deleted`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };

  const columns = useMemo(
    () => [
      { Header: "#", accessor: (row, index) => index + 1 },
      { Header: "Title", accessor: "title", colSpan: 2 },
      { Header: "Category", accessor: "category" },
      {
        Header: "Salary Range",
        accessor: "salaryRange",
        Cell: ({ value }) => `${value} USD`,
      },
      { Header: "Application Deadline", accessor: "applicationDeadline" },
      { Header: "Applicants", accessor: "applicants" },
      {
        Header: "Actions",
        accessor: "_id",
        Cell: ({ value }) => (
          <>
            <Link to={`/job/${value}`}>
              <button className="btn btn-sm btn-outline text-xs mx-1 !px-2">
                <FaEye />
              </button>
            </Link>
            <Link to={`/update-job/${value}`}>
              <button className="btn btn-sm btn-outline text-xs mx-1 !px-2">
                <FaEdit />
              </button>
            </Link>
            <button
              className="btn btn-sm btn-outline text-xs mx-1 !px-2"
              onClick={() => handleDeletejob(value)}
            >
              <FaTrash />
            </button>
          </>
        ),
      },
    ],
    []
  );

  const data = useMemo(() => jobs, [jobs]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable({ columns, data }, useGlobalFilter);

  const { globalFilter } = state;

  return (
    <section className="text-center">
      <div className="max-w-5xl mx-auto space-y-4">
        <h3>
          Manage Your <span>Job </span>Listings
        </h3>
        <p className="text-lg w-3/4 mx-auto">
          Review, Edit, and Track Your Posted Jobs Effortlessly
        </p>

        {jobs.length > 0 ? (
          <div className="pt-8 max-w-[360px] md:max-w-[450px] mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-customBlue dark:text-blue-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="search"
                className="block w-full py-[14px] px-8 border rounded-full text-sm border-customBlue focus:shadow-md focus:outline-none dark:bg-slate-800 dark:border-slate-500 dark:focus:border-blue-500"
                placeholder="Search by title"
                value={(globalFilter || "").trim()}
                onChange={(e) => setGlobalFilter(e.target.value)}
              />
            </div>
          </div>
        ) : (
          <p className="text-lg">You haven't posted any jobs yet.</p>
        )}
      </div>

      {jobs.length > 0 && (
        <div className="overflow-x-auto mt-10">
          <table
            {...getTableProps()}
            className="w-full table-auto border border-slate-200 dark:border-slate-700 divide-y divide-slate-200 dark:divide-slate-700"
          >
            <thead>
              {headerGroups.map((headerGroup, index) => (
                <tr key={index} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      key={column.id}
                      {...column.getHeaderProps()}
                      className="px-2 md:px-4 lg:px-6 py-2 md:py-4 lg:py-6 text-center font-semibold"
                    >
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row, index) => {
                prepareRow(row);
                return (
                  <tr
                    key={index}
                    {...row.getRowProps()}
                    className={
                      index % 2 === 0 ? "bg-slate-100 dark:bg-slate-900" : ""
                    }
                  >
                    {row.cells.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        {...cell.getCellProps()}
                        className="px-2 md:px-4 lg:px-6 py-2 md:py-4 lg:py-6"
                      >
                        {cell.column.id === "applicationDeadline"
                          ? new Date(cell.value).toLocaleDateString()
                          : cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default MyJobs;
