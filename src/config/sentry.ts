import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import env from "./env";

Sentry.init({
  dsn: env.SENTRY_DSN,
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
});

export default Sentry;
