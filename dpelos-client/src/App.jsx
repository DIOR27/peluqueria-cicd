// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Appointments from "./pages/dashboard/Appointments";
import Settings from "./pages/dashboard/Settings";
import Page from "./pages/dashboard/Page";
import Clients from "./pages/dashboard/Clients";
import Services from "./pages/dashboard/Services";
import Specialists from "./pages/dashboard/Specialists";
import Schedule from "./pages/Schedule";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/dashboard/Profile";
import "./App.css";
import ProtectedRoute from "./components/dashboard/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/panel",
    // Component: Page,
    element: (
      <ProtectedRoute>
        <Page />
      </ProtectedRoute>
    ),
    children: [
      { index: true, Component: Appointments },
      { path: "configuraciones", Component: Settings },
      { path: "clientes", Component: Clients },
      { path: "servicios", Component: Services },
      { path: "especialistas", Component: Specialists },
      { path: "perfil", Component: Profile },
    ],
  },
  {
    path: "/agendar",
    element: <Schedule />,
  },
  {
    path: "/ingresar",
    element: <Login />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
