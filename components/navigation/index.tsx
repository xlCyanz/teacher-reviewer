import Link from "next/link";
import { useState } from "react";
import { PropertyTabs } from "@utils";
import { AcademicCapIcon, MenuIcon, XIcon } from "@heroicons/react/outline";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const tabsLeft: PropertyTabs[] = [
    { name: "Teachers", href: "/" },
    { name: "Areas", href: "/" },
  ];

  return (
    <div className="px-4 py-5 bg-deep-purple-accent-700 dark:bg-gray-900 w-full md:px-24 lg:px-8">
      <div className="relative flex justify-between items-center">
        <div>
          <ul className="items-center hidden space-x-3 lg:flex">
            {tabsLeft.map((tab) => (
              <Link key={`navigation-tab-${tab?.name}`} href={tab?.href} passHref>
                <a className="cursor-pointer font-medium tracking-wide text-white py-2 px-4 rounded-md transition-colors duration-200 hover:text-deep-purple-accent-400 hover:bg-white">
                  {tab?.name}
                </a>
              </Link>
            ))}
          </ul>
        </div>
        <Link href="/" passHref>
          <a className="flex flex-row items-center lg:mx-auto cursor-pointer">
            <AcademicCapIcon className="w-8 text-white dark:text-deep-purple-accent-400" />
            <span className="ml-2 text-xl font-bold tracking-wide text-white uppercase">
              Teacher Reviewer
            </span>
          </a>
        </Link>

        <div>
          <ul className="items-center hidden space-x-3 lg:flex">
            <Link href="/login" passHref>
              <a className="cursor-pointer font-medium tracking-wide py-2 px-4 text-white transition-colors duration-200 rounded-md hover:text-deep-purple-accent-400 hover:bg-white">
                Sign In
              </a>
            </Link>
            <Link href="/register" passHref>
              <a className="items-center justify-center py-2 px-4 font-medium tracking-wide text-deep-purple-accent-700 cursor-pointer transition duration-200 rounded-md shadow-md bg-gray-100 hover:bg-white focus:shadow-outline focus:outline-none">
                Sign up
              </a>
            </Link>
          </ul>
        </div>

        <div className="ml-auto lg:hidden">
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
            <div className="absolute z-50 top-0 left-0 w-full">
              <div className="p-5 bg-gray-100 dark:bg-gray-900 rounded shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <div className="inline-flex items-center">
                    <AcademicCapIcon className="w-8 text-deep-purple-accent-400" />
                    <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 dark:text-gray-100 uppercase">
                      Teacher Reviewer
                    </span>
                  </div>
                  <div>
                    <button
                      type="button"
                      aria-label="Close Menu"
                      title="Close Menu"
                      className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <XIcon className="w-6 text-gray-800 dark:text-gray-100" />
                    </button>
                  </div>
                </div>
                <nav>
                  <ul className="space-y-4">
                    {tabsLeft.map((tab) => (
                      <Link key={`navigation-tab-${tab?.name}`} href={tab?.href} passHref>
                        <a className="font-medium tracking-wide text-gray-700 dark:text-gray-100 transition-colors duration-200 hover:text-deep-purple-accent-400">
                          {tab?.name}
                        </a>
                      </Link>
                    ))}
                    <Link href="/login" passHref>
                      <a className="font-medium tracking-wide text-gray-700 dark:text-gray-100 transition-colors duration-200 hover:text-deep-purple-accent-400">
                        Sign in
                      </a>
                    </Link>
                    <Link href="/register" passHref>
                      <a className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none">
                        Sign up
                      </a>
                    </Link>
                  </ul>
                </nav>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
