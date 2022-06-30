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
import Login from "./auth/EmailLogin";
import SignUp from "./auth/SignUp/SignUpForm";
import EmailVerification from "./auth/EmailVerification";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword";
import DeleteAccount from "./auth/DeleteAccount";
import Home from "./home";

const authRoutes = [
  {
    path: routes.login,
    element: <Login />,
  },
  {
    path: routes.register,
    element: <SignUp />,
  },
  {
    path: routes.forgotPassword,
    element: <ForgotPassword />,
  },
  {
    path: routes.resetPassword,
    element: <ResetPassword />,
  },
];

// const mainRoutes = [];

const publicRoutes = [
  {
    path: routes.verifyEmail,
    element: <EmailVerification />,
  },
  {
    path: routes.deleteAccount,
    element: <DeleteAccount />,
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

export default function Pages() {
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
            <Route index element={<Home />} />
            {/* {mainRoutes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))} */}
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
