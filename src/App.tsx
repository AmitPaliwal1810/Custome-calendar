import { Outlet, RouteObject, createBrowserRouter } from "react-router-dom";
import { Calendar, Home } from "./pages";

const GlobalProvider = () => {
  return <Outlet />;
};

const Routes: RouteObject = {
  path: "/",
  children: [
    {
      path: "/",
      Component: Home,
    },
    {
      path: "/calendar",
      Component: Calendar,
    },
  ],
};

export const App = createBrowserRouter([
  {
    path: "/",
    Component: GlobalProvider,
    children: [Routes],
  },
]);
