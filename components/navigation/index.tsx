import _ from "lodash";
import Link from "next/link";
import { ITabs } from "@types";
import { useSession } from "next-auth/react";
import { Children, useState } from "react";
import {
  AcademicCapIcon,
  MenuIcon,
  XIcon,
} from "@heroicons/react/outline";
import dynamic from "next/dynamic";
import LoginButton from "../login-button";
import NavProfile from "../nav-profile";

const DynamicToggleThemeWithNoSSR = dynamic(() => import("../toggle-theme"), { ssr: false });

const Navigation = () => {
  const { data: session } = useSession();

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const tabs: ITabs[] = [
    { name: "Profesores", href: "/teachers" },
  ];

  return (
    <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
      <div className="flex relative items-center justify-between">
        <Link href="/" passHref>
          <a
            aria-label="Teacher Reviewer"
            title="Teacher Reviewer"
            className="inline-flex items-center hover:cursor-pointer"
          >
            <AcademicCapIcon className="w-8 text-gray-100" />
            <span className="ml-2 text-xl font-bold tracking-wide text-gray-100 uppercase">
              Teacher Reviewer
            </span>
          </a>
        </Link>
        <ul className="hidden lg:flex items-center">
          {Children.toArray(_.map(tabs, (tab) => (
            <li>
              <Link href={tab?.href} passHref>
                <a
                  aria-label={tab?.name}
                  title={tab?.name}
                  className="flex items-center justify-center py-2 px-4 font-medium text-gray-100 hover:bg-gray-100 dark:hover:bg-default-color dark:hover:text-gray-100 hover:text-default-color rounded"
                >
                  {tab?.name}
                </a>
              </Link>
            </li>
          )))}
          {session ? (
            <NavProfile />
          ) : (
            <LoginButton />
          )}
          <DynamicToggleThemeWithNoSSR />
        </ul>
        <div className="lg:hidden z-50">
          <button
            type="button"
            aria-label="Open Menu"
            title="Open Menu"
            className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50"
            onClick={() => setIsMenuOpen(true)}
          >
            <MenuIcon className="w-6 text-gray-100" />
          </button>
          {isMenuOpen && (
            <div className="absolute top-0 left-0 w-full">
              <div className="p-5 bg-white dark:bg-gray-900 rounded shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <Link href="/" passHref>
                      <a
                        aria-label="Teacher Reviewer"
                        title="Teacher Reviewer"
                        className="inline-flex items-center"
                      >
                        <AcademicCapIcon className="w-12 text-default-color" />
                        <span className="ml-2 text-xl font-bold tracking-wide text-gray-900 dark:text-gray-100 uppercase">
                          Teacher Reviewer
                        </span>
                      </a>
                    </Link>
                  </div>
                  <div>
                    <button
                      type="button"
                      aria-label="Close Menu"
                      title="Close Menu"
                      className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <XIcon className="w-6 text-default-color" />
                    </button>
                  </div>
                </div>
                <nav>
                  <ul className="space-y-4">
                    {_.map(tabs, (tab) => (
                      <li key={`navigation-tab-${tab?.name}`}>
                        <Link href={tab?.href} passHref>
                          <a
                            aria-label={tab?.name}
                            title={tab?.name}
                            className="font-medium tracking-wide text-gray-900 dark:text-gray-100 transition-colors duration-200 hover:text-default-color"
                          >
                            {tab?.name}
                          </a>
                        </Link>
                      </li>
                    ))}
                    <li>
                      <DynamicToggleThemeWithNoSSR />
                    </li>
                    {session ? (
                      <NavProfile />
                    ) : (
                      <LoginButton />
                    )}
                  </ul>
                </nav>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  //
  );
};

export default Navigation;
