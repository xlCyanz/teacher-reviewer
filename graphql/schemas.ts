import { gql } from "apollo-server-micro";

const typeDefs = gql`
  type Hello {
    saludo: String
  }
`;

export default typeDefs;
