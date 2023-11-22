import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import Error from "../pages/Error";
import Blogs from "../pages/Blogs";
import AllJobs from "../pages/AllJobs";
import Profile from "../pages/Profile";
import AppliedJobs from "../pages/AppliedJobs";
import PostAjob from "../pages/PostAjob";
import MyJobs from "../pages/MyJobs";

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
        path: "/my-jobs",
        element: <MyJobs></MyJobs>,
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
