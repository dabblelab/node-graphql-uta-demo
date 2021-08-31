
const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer,  ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');
const express = require('express');
const http = require('http')
const fs = require('fs');
const path = require('path');
const { connectToDB } = require('./db')

const resolvers  = require('./graphql/resolvers');
const typeDefs = fs.readFileSync(
  path.join(__dirname, 'graphql/schema.graphql'),
  'utf-8'
)
async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer }), ApolloServerPluginLandingPageGraphQLPlayground()],
  });

  await connectToDB();
  await server.start();
  server.applyMiddleware({ app });
  await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer(typeDefs, resolvers);
