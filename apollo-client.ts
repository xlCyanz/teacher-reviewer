import { ApolloClient, InMemoryCache } from "@apollo/client";

const { GRAPH_URL } = process.env;

const client = new ApolloClient({
  uri: GRAPH_URL as string,
  cache: new InMemoryCache(),
});

export default client;
