import { FC, useState } from "react";

// Import packages.
import Link from "next/link";
import { ExternalLinkIcon, XIcon } from "@heroicons/react/outline";

// Import modules.
import { Icon } from "@types";

interface IBannerProps {
  message: string;
  icon: Icon;
  link?: string;
}

const Banner: FC<IBannerProps> = ({ message, icon: IconElement, link }) => {
  const [show, setShow] = useState(true);

  if (!show) return null;

  return (
    <div className="bg-default-color rounded-md">
      <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between flex-wrap">
          <div className="flex-1 flex items-center">
            <span className="flex p-2 rounded-lg bg-gray-900 bg-opacity-50">
              <IconElement className="h-6 w-6 text-gray-50" />
            </span>
            <p className="ml-3 font-medium text-gray-50">
              {message}
            </p>
          </div>
          {link && (
            <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
              <Link href={link} passHref>
                <a className="-mr-1 flex p-2 rounded-md text-gray-50 hover:bg-gray-50 hover:text-default-color focus:outline-none focus:ring-2 focus:ring-gray-50 sm:-mr-2">
                  <ExternalLinkIcon className="h-6 w-6" />
                </a>
              </Link>
            </div>
          )}
          <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
            <button type="button" onClick={() => setShow(false)} className="-mr-1 flex p-2 rounded-md text-gray-50 hover:bg-gray-50 hover:text-default-color focus:outline-none focus:ring-2 focus:ring-gray-50 sm:-mr-2">
              <span className="sr-only">Dismiss</span>
              <XIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

Banner.defaultProps = {
  link: "",
};

export default Banner;
