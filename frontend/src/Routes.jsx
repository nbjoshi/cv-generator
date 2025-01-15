import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import App from "./App";

const routes = [
  {
    path: "/",
    element: <Home />,
    children: [
      { path: "/signup", element: <Signup /> },
      { path: "/login", element: <Login /> },
      { path: "/menu", element: <App /> },
    ],
  },
];

export default routes;
