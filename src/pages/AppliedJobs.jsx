import { useState, useEffect, useMemo, useContext, useRef } from "react";
import { useTable, useGlobalFilter } from "react-table";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import generatePDF from "react-to-pdf";
import { Bars } from "react-loader-spinner";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../providers/AuthProvider";

const AppliedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const pdfRef = useRef();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      setLoading(true);
      axiosSecure.get(`/applied-jobs?email=${user.email}`).then((res) => {
        setJobs(res.data);
        setLoading(false);
      });
    }
  }, [axiosSecure, user]);

  const columns = useMemo(
    () => [
      { Header: "#", accessor: (row, index) => index + 1 },
      { Header: "Title", accessor: "title", colSpan: 2 },
      { Header: "Category", accessor: "category" },
      {
        Header: "Resume Link",
        accessor: "resumeLink",
        Cell: ({ value }) => (
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            {value}
          </a>
        ),
      },
      {
        Header: "Actions",
        accessor: "jobId",
        Cell: ({ value }) => (
          <>
            <Link to={`/job/${value}`}>
              <button className="btn btn-sm btn-outline text-xs">
                View Details
              </button>
            </Link>
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
    <section>
      <Helmet>
        <title>JobVerse | Applied Jobs</title>
      </Helmet>
      <div className="max-w-5xl mx-auto space-y-4 text-center">
        <h3>
          Your Job Journey:<span> Applied Jobs</span>
        </h3>
        <p className="text-lg w-3/4 mx-auto">
          Track and manage your job applications in one place. The Applied Jobs
          page is your personalized dashboard, giving you insights into the
          status of your applications, interview schedules, and more. Stay
          organized and informed as you navigate your career journey with
          JobVerse.
        </p>
      </div>

      {loading ? (
        <Bars
          height={80}
          width={80}
          color="#4440da"
          ariaLabel="bars-loading"
          wrapperClass="mx-auto min-h-[300px] flex items-center justify-center"
          visible={true}
        />
      ) : jobs.length > 0 ? (
        <div className="mt-10">
          <div className="pt-8 pb-8 max-w-[360px] md:max-w-[450px] mx-auto ">
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
              <select
                id="search"
                className="block w-full py-[14px] px-8 border rounded-full text-sm border-customBlue focus:shadow-md focus:outline-none bg-transparent dark:bg-slate-800 dark:border-slate-500 dark:focus:border-blue-500"
                value={globalFilter || ""}
                onChange={(e) => setGlobalFilter(e.target.value)}
              >
                <option value="">Filter by category</option>
                <option value="On-site">On-site</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Part-time">Part-time</option>
                <option value="">Show all</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            {rows.length > 0 ? (
              <table
                ref={pdfRef}
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
                          className="px-2 md:px-4 lg:px-6 py-2 md:py-4 lg:py-6 text-left font-semibold"
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
                          index % 2 === 0
                            ? "bg-slate-100 dark:bg-slate-900"
                            : ""
                        }
                      >
                        {row.cells.map((cell, cellIndex) => (
                          <td
                            key={cellIndex}
                            {...cell.getCellProps()}
                            className="px-2 md:px-4 lg:px-6 py-2 md:py-4 lg:py-6"
                          >
                            {cell.render("Cell")}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <p className="text-lg font-medium mt-4 text-center">
                No jobs found.
              </p>
            )}
          </div>
          <div className="mt-8 mb-4">
            <button
              onClick={() =>
                generatePDF(pdfRef, { filename: "Applied-Jobs.pdf" })
              }
              className="btn btn-sm btn-outline"
            >
              Download Summary
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-10 flex flex-col gap-6 justify-center items-center">
          <p className="text-lg font-medium mt-4">
            You haven't applied to any jobs yet.
          </p>
          <Link to="/all-jobs">
            <button className="btn btn-outline">View All Jobs</button>
          </Link>
        </div>
      )}
    </section>
  );
};

export default AppliedJobs;
