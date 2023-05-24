import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import mongoDB from './services/db';
import sentryInit from './services/sentry';
import schemaPromise from './graphql/schema';
import Router from './api/routes';

async function bootstrap() {
  await sentryInit();
  await mongoDB();

  const app = express();
  const schema = await schemaPromise;

  const server = new ApolloServer({
    schema,
  });

  server.applyMiddleware({
    app,
    path: '/graphql',
    cors: true,
  });

  app.use('/ds', Router);

  app.listen({ port: process.env.PORT || 4000 }, () => {
    console.log(`🚀 Server listening on port ${process.env.PORT || 4000}`);
  });
}
bootstrap();
