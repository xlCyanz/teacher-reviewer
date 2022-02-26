import { Fragment } from "react";
import { LogoutIcon } from "@heroicons/react/outline";
import { Menu, Transition } from "@headlessui/react";
import { signOut, useSession } from "next-auth/react";

const NavProfile = () => {
  const { data: session } = useSession();

  const username = session?.user?.name?.split(" ")[0];
  const lastname = session?.user?.name?.split(" ")[2] || session?.user?.name?.split(" ")[1];

  return (
    <Menu as="div" className="relative text-left bg-default-color lg:bg-transparent p-2 rounded">
      <Menu.Button>
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="bg-gray-100 flex-shrink-0 w-10 h-10 flex justify-center items-center rounded-full shadow-sm">
            <span className="font-semibold text-lg text-default-color">{`${username?.slice(0, 2)}`}</span>
          </div>
          <div>
            <h1 className="font-semibold text-gray-100 transition-colors duration-200">
              {`${username} ${lastname}`}
            </h1>
            <p className="text-sm text-left font-medium leading-4 text-gray-300">
              Usuario
            </p>
          </div>
        </div>
      </Menu.Button>
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
                    active ? "bg-default-color text-gray-50" : "text-gray-900"
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
  );
};

export default NavProfile;
