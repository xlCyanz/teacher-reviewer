import Head from "next/head";
import { ReactNode } from "react";
import { Navigation, Footer } from "@components";

interface IMainLayoutProps {
  title: string;
  children: ReactNode;
}

const MainLayout = ({ children, title }: IMainLayoutProps) => (
  <>
    <Head>
      <title>{title}</title>
      <meta name="description" content="Teacher Reviewer" />
      <link rel="icon" href="/favicon.png" />
    </Head>

    <div className="flex flex-col w-screen h-screen overflow-x-hidden">
      <header className="bg-default-color dark:bg-gray-900">
        <Navigation />
      </header>
      <main className="flex-1 bg-gray-50 dark:bg-gray-900">
        {children}
      </main>
      <footer className="bg-default-color dark:bg-gray-900">
        <Footer />
      </footer>
    </div>
  </>
);

export default MainLayout;
