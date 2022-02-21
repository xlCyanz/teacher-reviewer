import { ApolloClient, InMemoryCache } from "@apollo/client";

const GRAPH_URL = process.env.NEXT_PUBLIC_GRAPH_URL;

if (!GRAPH_URL) {
  throw new Error("Please add your Graph URL to .env.local");
}

const client = new ApolloClient({
  uri: GRAPH_URL as string,
  cache: new InMemoryCache(),
});

export default client;
