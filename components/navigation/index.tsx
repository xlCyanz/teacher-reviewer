import Link from "next/link";
import { PropertyTabs } from "@types";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import {
  AcademicCapIcon,
  LogoutIcon,
  MenuIcon,
  XIcon,
} from "@heroicons/react/outline";

const Navigation = () => {
  const { data: session } = useSession();

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

        {session ? (
          <Menu as="div" className="hidden lg:inline-block relative text-left">
            <div>
              <Menu.Button>
                <div className="lg:flex items-center hidden gap-2 cursor-pointer">
                  <div className="bg-gray-100 flex-shrink-0 w-10 h-10 flex justify-center items-center rounded-full shadow-sm">
                    <span className="font-semibold text-lg text-deep-purple-accent-700">{session?.user?.name?.slice(0, 2)}</span>
                  </div>
                  <div>
                    <h1 className="font-semibold text-gray-100 transition-colors duration-200">
                      {session?.user?.name}
                    </h1>
                    <p className="text-sm text-left font-medium leading-4 text-gray-300">
                      Usuario
                    </p>
                  </div>
                </div>
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute z-20 w-40 right-0 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        type="button"
                        onClick={() => signOut()}
                        className={`${
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      >
                        <LogoutIcon
                          className="w-5 h-5 mr-2"
                          aria-hidden="true"
                        />
                        Cerrar Sesion
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        ) : (
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
        )}

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
                    <div className="flex flex-col gap-2">
                      {tabsLeft.map((tab) => (
                        <Link key={`navigation-tab-${tab?.name}`} href={tab?.href} passHref>
                          <a className="font-medium tracking-wide text-gray-700 dark:text-gray-100 transition-colors duration-200 hover:text-deep-purple-accent-400">
                            {tab?.name}
                          </a>
                        </Link>
                      ))}
                      {!session && (
                        <Link href="/login" passHref>
                          <a className="font-medium tracking-wide text-gray-700 dark:text-gray-100 transition-colors duration-200 hover:text-deep-purple-accent-400">
                            Sign in
                          </a>
                        </Link>
                      )}
                    </div>
                    {session ? (
                      <Menu as="div" className="lg:hidden inline-block relative text-left">
                        <div>
                          <Menu.Button>
                            <div className="flex items-center">
                              <div className="bg-deep-purple-accent-400 flex-shrink-0 w-10 h-10 flex justify-center items-center rounded-full shadow-sm mr-3">
                                <span className="font-semibold text-lg text-gray-100">{session?.user?.name?.slice(0, 2)}</span>
                              </div>
                              <div>
                                <h1 className="font-semibold text-gray-800 transition-colors duration-200 hover:text-deep-purple-accent-400">
                                  {session?.user?.name}
                                </h1>
                                <p className="text-sm text-left font-medium leading-4 text-gray-600">
                                  Usuario
                                </p>
                              </div>
                            </div>
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute z-20 w-40 right-0 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="px-1 py-1">
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    type="button"
                                    onClick={() => signOut()}
                                    className={`${
                                      active ? "bg-violet-500 text-white" : "text-gray-900"
                                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                  >
                                    <LogoutIcon
                                      className="w-5 h-5 mr-2"
                                      aria-hidden="true"
                                    />
                                    Cerrar Sesion
                                  </button>
                                )}
                              </Menu.Item>
                            </div>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    ) : (
                      <Link href="/register" passHref>
                        <a className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none">
                          Sign up
                        </a>
                      </Link>
                    )}
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
