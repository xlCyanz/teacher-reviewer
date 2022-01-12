import Footer from "@components/footer";
import Navigation from "@components/navigation";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const MainLayout = ({ children }: Props) => (
  <div className="flex flex-col w-screen h-screen font-sans overflow-x-hidden">
    <div id="__header__">
      <Navigation />
    </div>
    <div id="__children__" className="flex-1">
      {children}
    </div>
    <div id="__footer__">
      <Footer />
    </div>
  </div>
);

export default MainLayout;
