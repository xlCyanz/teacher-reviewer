import { gql } from "apollo-server-micro";

const typeDefs = gql`
  type Query {
    Hello: String
  }
`;

export default typeDefs;
