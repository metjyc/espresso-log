import { createBrowserRouter } from "react-router-dom";
import AppShell from "./components/AppShell/Appshell";
import Home from "./pages/Home";
import Brew from "./pages/Brew";
import Logs from "./pages/Logs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppShell />,
    children: [
      { index: true, element: <Home /> },
      { path: "brew", element: <Brew /> },
      { path: "logs", element: <Logs /> },
    ],
  },
]);

export default router;
