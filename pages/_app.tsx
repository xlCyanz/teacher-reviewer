/* eslint-disable react/jsx-props-no-spreading */
import { FC, ReactNode } from "react";

// Import packages.
import client from "apollo-client";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { SessionProvider } from "next-auth/react";

// Import modules.
import { DefaultColorContext, TeacherContext, ThemeContext } from "@contexts";

import "../styles/globals.css";

const Contexts: FC<{ children: ReactNode }> = ({ children }) => (
  <TeacherContext.Provider>
    <DefaultColorContext.Provider>
      <ThemeContext.Provider>
        {children}
      </ThemeContext.Provider>
    </DefaultColorContext.Provider>
  </TeacherContext.Provider>
);

const Application: FC<AppProps> = ({ Component, pageProps: { session, ...pageProps } }) => (
  <SessionProvider session={session}>
    <ApolloProvider client={client}>
      <Contexts>
        <Component {...pageProps} />
      </Contexts>
    </ApolloProvider>
  </SessionProvider>
);
export default Application;
