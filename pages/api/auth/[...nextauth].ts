import NextAuth from "next-auth";
import clientPromise from "lib/mongo";
import GoogleProvider from "next-auth/providers/google";
import { gql } from "@apollo/client";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import client from "apollo-client";

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
const GOOGLE_SECRET_ID = process.env.NEXT_PUBLIC_GOOGLE_SECRET_ID;
const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET;

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: `${GOOGLE_CLIENT_ID}`,
      clientSecret: `${GOOGLE_SECRET_ID}`,
    }),
  ],
  secret: JWT_SECRET,
  jwt: {
    secret: JWT_SECRET,
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 1 * 24 * 60 * 60,
  },
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    session: async ({ session }) => {
      const { user, expires } = session;

      const query = gql`
        query GetUser($email: String!) {
          user (email: $email) {
            _id
          }
        }
      `;

      const { data } = await client.query({
        query,
        variables: {
          email: session?.user?.email,
        },
      });

      return {
        expires,
        user: {
          id: data?.user?._id,
          ...user,
        },
      };
    },
  },
  debug: process.env.NODE_ENV === "development",
});
