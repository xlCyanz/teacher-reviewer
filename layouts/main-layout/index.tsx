import { ReactNode } from "react";
import { Navigation, Footer } from "@components";

interface Props {
  children: ReactNode;
}

const MainLayout = ({ children }: Props) => (
  <div className="flex flex-col w-screen h-screen font-sans overflow-x-hidden">
    <div id="__header__">
      <Navigation />
    </div>
    <div id="__children__" className="flex-1 dark:bg-gray-400">
      {children}
    </div>
    <div id="__footer__">
      <Footer />
    </div>
  </div>
);

export default MainLayout;
