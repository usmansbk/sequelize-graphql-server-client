import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { ApolloProvider } from "@apollo/client";
import Sentry from "config/sentry";
import i18n from "config/i18n";
import client from "api/graphql/client";

function App() {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <ApolloProvider client={client}>
        <h1>Hello</h1>
      </ApolloProvider>
      <Toaster />
    </Suspense>
  );
}

export default Sentry.withErrorBoundary(App, {
  fallback: i18n.t("Something went wrong"),
});
