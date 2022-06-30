import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import { excludeGraphQLFetch } from "apollo-link-sentry";
import env from "./env";

Sentry.init({
  dsn: env.SENTRY_DSN,
  integrations: [new BrowserTracing({ traceFetch: false })],
  tracesSampleRate: 1.0,
  beforeBreadcrumb: excludeGraphQLFetch,
});

export default Sentry;
