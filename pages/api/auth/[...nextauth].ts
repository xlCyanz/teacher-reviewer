import NextAuth from "next-auth";
import clientPromise from "lib/mongo";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";

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
    session: async ({ session, user }) => {
      const query = { id: user?.id, ...session };
      return query;
    },
    jwt: async ({ token, user }) => {
      const query = {
        ...token,
      };
      if (user) query.id = user?.id;
      return query;
    },
  },
  debug: process.env.NODE_ENV === "development",
});
