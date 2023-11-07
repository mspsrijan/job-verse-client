import { createBrowserRouter } from "react-router-dom";
import App from "../App";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: "Error",
    children: [
      {
        path: "/",
        element: "Home",
      },
    ],
  },
]);

export default routes;
