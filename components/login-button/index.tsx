import { signIn } from "next-auth/react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import GoogleIcon from "../icons/google-icon";

const LoginButton = () => {
  return (
    <Menu as="div" className="relative text-left lg:bg-transparent p-2 rounded">
      <Menu.Button>
        <div
          className="flex items-center justify-center py-2 px-4 font-medium text-default-color rounded shadow-md bg-gray-100 hover:bg-white"
          aria-label="Sign in"
          title="Sign in"
        >
          Sign in
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
        <Menu.Items className="absolute z-20 w-48 right-0 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  type="button"
                  onClick={() => signIn("google", { callbackUrl: "http://localhost:3000" })}
                  className={`${
                    active ? "bg-default-color text-white" : "text-gray-900"
                  } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                >
                  <GoogleIcon
                    className="w-5 h-5 mr-2"
                    aria-hidden="true"
                  />
                  Login With Google
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>

  );
};

export default LoginButton;
