import { ReactNode } from "react";
import { Navigation, Footer } from "@components";

interface Props {
  children: ReactNode;
}

const MainLayout = ({ children }: Props) => (
  <div className="flex flex-col w-screen h-screen overflow-x-hidden">
    <div className="bg-default-color dark:bg-gray-900">
      <Navigation />
    </div>
    <div className="flex-1 dark:bg-gray-900">
      {children}
    </div>
    <div className="bg-default-color dark:bg-gray-900">
      <Footer />
    </div>
  </div>
);

export default MainLayout;
