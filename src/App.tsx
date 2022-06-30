import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import Sentry from "config/sentry";
import i18n from "config/i18n";

function App() {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <h1>Hello</h1>
      <Toaster />
    </Suspense>
  );
}

export default Sentry.withErrorBoundary(App, {
  fallback: i18n.t("Something went wrong"),
});
