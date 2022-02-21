/* eslint-disable react/jsx-props-no-spreading */
import client from "apollo-client";
import type { AppProps } from "next/app";
import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { ApolloProvider } from "@apollo/client";
import { DefaultColorContext, TeacherContext, ThemeContext } from "@contexts";

import "../styles/globals.css";

interface ContextsProps {
  children: ReactNode;
}

const Contexts = ({ children }: ContextsProps) => (
  <TeacherContext.Provider>
    <DefaultColorContext.Provider>
      <ThemeContext.Provider>
        {children}
      </ThemeContext.Provider>
    </DefaultColorContext.Provider>
  </TeacherContext.Provider>
);

const Application = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => (
  <SessionProvider session={session}>
    <ApolloProvider client={client}>
      <Contexts>
        <Component {...pageProps} />
      </Contexts>
    </ApolloProvider>
  </SessionProvider>
);
export default Application;
