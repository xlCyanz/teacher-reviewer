/* eslint-disable react/jsx-props-no-spreading */
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { ApolloProvider } from "@apollo/client";
import client from "apollo-client";

import "../styles/globals.css";
import { TeacherContext } from "contexts";

const Application = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => (
  <SessionProvider session={session}>
    <ApolloProvider client={client}>
      <TeacherContext.Provider>
        <Component {...pageProps} />
      </TeacherContext.Provider>
    </ApolloProvider>
  </SessionProvider>
);
export default Application;
