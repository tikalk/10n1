/* eslint-disable react/jsx-props-no-spreading */
import { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { ApolloProvider } from '@apollo/client';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import { useEffect } from 'react';
import client from '../apollo-client';
import { AuthProvider } from '../hooks/useAuth';
import '../assets/css/now-ui-kit.min.css';
import 'react-toastify/dist/ReactToastify.css';

Sentry.init({
  dsn: 'https://baf201991dd4488282eaa3c505cfa1e2@o575983.ingest.sentry.io/5730638',
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const protocol =
      typeof window !== 'undefined' && window.location.protocol
        ? window.location.protocol
        : '';
    const hostname =
      typeof window !== 'undefined' && window.location.hostname
        ? window.location.hostname
        : '';
    if (
      process.env.NODE_ENV === 'production' &&
      (protocol !== 'https:' || hostname !== '10n1.tikalk.dev')
    ) {
      window.location.assign(`https://10n1.tikalk.dev`);
    }
  }, []);
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ApolloProvider>
  );
}
