import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import Error from "../pages/Error";
import Blogs from "../pages/Blogs";
import AllJobs from "../pages/AllJobs";
import AppliedJobs from "../pages/AppliedJobs";
import PostAjob from "../pages/PostAjob";
import MyJobs from "../pages/MyJobs";
import PrivateRoutes from "./PrivateRoutes";
import SingleJob from "../components/SingleJob";

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
        path: "/job/:id",
        element: (
          <PrivateRoutes>
            <SingleJob></SingleJob>
          </PrivateRoutes>
        ),
      },
      {
        path: "/applied-jobs",
        element: (
          <PrivateRoutes>
            <AppliedJobs></AppliedJobs>
          </PrivateRoutes>
        ),
      },
      {
        path: "/my-jobs",
        element: (
          <PrivateRoutes>
            <MyJobs></MyJobs>
          </PrivateRoutes>
        ),
      },
      {
        path: "/post-a-job",
        element: (
          <PrivateRoutes>
            <PostAjob></PostAjob>
          </PrivateRoutes>
        ),
      },
      {
        path: "/blogs",
        element: <Blogs></Blogs>,
      },
    ],
  },
]);

export default routes;
