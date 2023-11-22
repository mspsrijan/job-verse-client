import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import Error from "../pages/Error";
import Home from "../pages/Home";
import AllJobs from "../pages/AllJobs";
import Blogs from "../pages/Blogs";
import Profile from "../pages/Profile";
import PostAjob from "../pages/PostAjob";
import AppliedJobs from "../pages/AppliedJobs";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/registration",
        element: <Registration></Registration>,
      },
      {
        path: "/all-jobs",
        element: <AllJobs></AllJobs>,
      },
      {
        path: "/profile",
        element: <Profile></Profile>,
      },
      {
        path: "/applied-jobs",
        element: <AppliedJobs></AppliedJobs>,
      },
      {
        path: "/post-a-job",
        element: <PostAjob></PostAjob>,
      },
      {
        path: "/blogs",
        element: <Blogs></Blogs>,
      },
    ],
  },
]);

export default routes;
