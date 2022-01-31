import { ApolloClient, InMemoryCache } from "@apollo/client";

const GRAPH_URL = process.env.NEXT_PUBLIC_GRAPH_URL;

const client = new ApolloClient({
  uri: GRAPH_URL as string,
  cache: new InMemoryCache(),
});

export default client;
