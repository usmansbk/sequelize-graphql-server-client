import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { ApolloProvider } from "@apollo/client";
import { CssBaseline } from "@mui/material";
import Sentry from "config/sentry";
import i18n from "config/i18n";
import client from "api/graphql/client";
import Pages from "pages";

function App() {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <CssBaseline />
      <ApolloProvider client={client}>
        <Pages />
        <Toaster />
      </ApolloProvider>
    </Suspense>
  );
}

export default Sentry.withErrorBoundary(App, {
  fallback: i18n.t("Something went wrong"),
});
