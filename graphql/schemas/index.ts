import { gql } from "apollo-server-micro";

// eslint-disable-next-line import/prefer-default-export
const typeDefs = gql`
type Query {
  Hello: String
}
`;

export default typeDefs;
