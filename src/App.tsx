import { Suspense } from "react";
import { ApolloProvider } from "@apollo/client";
import { LinearProgress } from "@mui/material";
import Sentry from "config/sentry";
import i18n from "config/i18n";
import client from "api/graphql/client";
import Pages from "pages";

function App() {
  return (
    <Suspense fallback={<LinearProgress />}>
      <ApolloProvider client={client}>
        <Pages />
      </ApolloProvider>
    </Suspense>
  );
}

export default Sentry.withErrorBoundary(App, {
  fallback: i18n.t("Something went wrong"),
});
