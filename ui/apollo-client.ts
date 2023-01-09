import {
  ApolloClient,
  ApolloLink,
  DefaultOptions,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';

export const cache = new InMemoryCache();

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
};
function startApollo() {
  const DS_HOST =
    process.env.NODE_ENV === 'production' ? '10n1.tikalk.dev' : 'localhost';
  const DS_PORT = process.env.NODE_ENV === 'production' ? '' : '4000';
  const DS_PATH = '/graphql';

  const httpLink = new HttpLink({
    uri: `//${DS_HOST}:${DS_PORT}${DS_PATH}`,
  });

  const cleanTypeName = new ApolloLink((operation, forward) => {
    if (operation.variables) {
      const omitTypename = (key, value) =>
        key === '__typename' ? undefined : value;
      // eslint-disable-next-line no-param-reassign
      operation.variables = JSON.parse(
        JSON.stringify(operation.variables),
        omitTypename,
      );
    }
    return forward(operation).map((data) => {
      return data;
    });
  });

  const client = new ApolloClient({
    link: ApolloLink.from([cleanTypeName, httpLink]),
    cache,
    defaultOptions,
  });
  return client;
}

export default startApollo();
