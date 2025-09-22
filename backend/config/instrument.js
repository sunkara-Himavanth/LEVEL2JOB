// backend/config/instrument.js

// Use `import` instead of `require`
import * as Sentry from "@sentry/node";
import { nodeProfilingIntegration } from "@sentry/profiling-node";

Sentry.init({
  dsn: "https://7d60e64173d3b114640d67603d6cb3c5@o4510053802901504.ingest.us.sentry.io/4510053808996352",
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
  integrations: [
    nodeProfilingIntegration(),
    // Correctly add the mongoose integration to the array
    Sentry.mongooseIntegration(),
  ],
});