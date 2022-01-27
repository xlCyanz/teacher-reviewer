/* eslint-disable react/jsx-props-no-spreading */
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

import "../styles/globals.css";

const Application = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => (
  <SessionProvider session={session}>
    <Component {...pageProps} />
  </SessionProvider>
);
export default Application;
