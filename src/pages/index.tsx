import AppLayout from "layouts/AppLayout";
import RootLayout from "layouts/RootLayout";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useAuthState } from "api/graphql/hooks/auth";
import routes from "./routes";

function Authenticated({ children }: { children: JSX.Element }) {
  const location = useLocation();
  const { isLoggedIn } = useAuthState();

  if (!isLoggedIn) {
    return <Navigate to={routes.login} state={{ from: location }} replace />;
  }

  return children;
}

function Pages() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="login" element={<h1>Login</h1>} />
          <Route
            path={routes.home}
            element={
              <Authenticated>
                <AppLayout />
              </Authenticated>
            }
          >
            <Route index element={<h1>Main App</h1>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Pages;
