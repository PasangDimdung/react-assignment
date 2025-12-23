import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Expenses from "./pages/Expenses";
import Weather from "./pages/Weather";
import NotFound from "./pages/NotFound";
import { ExpenseProvider } from "./context/ExpenseContext";
import { WeatherProvider } from "./context/WeatherContext";

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
        element: 
        (
          <ExpenseProvider>
            <Expenses />
          </ExpenseProvider>
        ),
      },
      {
        path: "weather",
        element: 
        (
          <WeatherProvider>
            <Weather />
          </WeatherProvider>
        ),
      },
      {
        path: "*",
        element: <NotFound />
      }
    ]
  }
]);