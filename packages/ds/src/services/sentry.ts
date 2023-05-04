import * as Sentry from '@sentry/node';

export default async () => {
  Sentry.init({
    dsn:
      'https://baf201991dd4488282eaa3c505cfa1e2@o575983.ingest.sentry.io/5730638',
    tracesSampleRate: 1.0,
  });
};
