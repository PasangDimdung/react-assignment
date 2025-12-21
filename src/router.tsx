import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Expenses from "./pages/Expenses";
import Weather from "./pages/Weather";

export const router = createBrowserRouter([
   {
    path:"/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
         {
        path: "expenses",
        element: <Expenses />
      },
      {
        path: "weather",
        element: <Weather />
      }
    ]
  }
]);