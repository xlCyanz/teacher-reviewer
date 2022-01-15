/* eslint-disable consistent-return */
import Cors from "micro-cors";
import { ApolloServer } from "apollo-server-micro";
import typeDefs from "../../graphql/schemas";
import resolvers from "../../graphql/resolvers";

const cors = Cors();
const apolloServer = new ApolloServer({ typeDefs, resolvers });
const startServer = apolloServer.start();

export default cors(async (req: any, res: any) => {
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }
  await startServer;
  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
});

export const config = {
  api: { bodyParser: false },
};
