import AppLayout from "layouts/AppLayout";
import RootLayout from "layouts/RootLayout";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
  Outlet,
} from "react-router-dom";
import { useAuthState } from "api/graphql/hooks/auth";
import routes from "./routes";

function Authenticated() {
  const location = useLocation();
  const { isLoggedIn } = useAuthState();

  if (!isLoggedIn) {
    return <Navigate to={routes.login} state={{ from: location }} replace />;
  }

  return <AppLayout />;
}

function Unauthenticated() {
  const location = useLocation();
  const { isLoggedIn } = useAuthState();

  if (isLoggedIn) {
    return <Navigate to={routes.home} state={{ from: location }} replace />;
  }

  return <Outlet />;
}

function Pages() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route element={<Unauthenticated />}>
            <Route path={routes.login} element={<h1>Login</h1>} />
            <Route path={routes.register} element={<h1>Register</h1>} />
            <Route
              path={routes.forgotPassword}
              element={<h1>Forgot Password</h1>}
            />
            <Route
              path={routes.resetPassword}
              element={<h1>Reset Password</h1>}
            />
          </Route>
          <Route path={routes.home} element={<Authenticated />}>
            <Route index element={<h1>Main App</h1>} />
          </Route>
          <Route path={routes.verifyEmail} element={<h1>Verify Email</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Pages;
