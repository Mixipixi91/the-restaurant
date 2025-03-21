import { createBrowserRouter } from "react-router";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Kontakt from "./pages/kontakt";
import BookingPage from "./pages/BookingPage";
import { Admin } from "./pages/admin";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <div>Page Not Found</div>,
    children: [
      { path: "/", element: <Home /> },
      { path: "/kontakt", element: <Kontakt /> },
      {
        path: "/booking",
        element: <BookingPage />
    },
    {path: "/booking/user/admin", element: <Admin />},
    ],
  },
]);


