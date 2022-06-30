import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import AppLayout from "layouts/AppLayout";
import RootLayout from "layouts/RootLayout";
import PublicLayout from "layouts/PublicLayout";
import { useAuthState } from "api/graphql/hooks/app";
import routes from "./routes";

const authRoutes = [
  {
    path: routes.login,
    element: <h1>Login</h1>,
  },
  {
    path: routes.register,
    element: <h1>Register</h1>,
  },
  {
    path: routes.forgotPassword,
    element: <h1>Forgot Password</h1>,
  },
  {
    path: routes.resetPassword,
    element: <h1>Reset Password</h1>,
  },
];

const publicRoutes = [
  {
    path: routes.verifyEmail,
    element: <h1>Verify Email</h1>,
  },
];

function Protected() {
  const location = useLocation();
  const { isLoggedIn } = useAuthState();

  if (!isLoggedIn) {
    return <Navigate to={routes.login} state={{ from: location }} replace />;
  }

  return <AppLayout />;
}

function Auth() {
  const location = useLocation();
  const { isLoggedIn } = useAuthState();

  if (isLoggedIn) {
    return <Navigate to={routes.home} state={{ from: location }} replace />;
  }

  return <PublicLayout />;
}

function Pages() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route element={<Auth />}>
            {authRoutes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Route>
          <Route path={routes.home} element={<Protected />}>
            <Route index element={<h1>Main App</h1>} />
          </Route>
          <Route element={<PublicLayout />}>
            {publicRoutes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Pages;
