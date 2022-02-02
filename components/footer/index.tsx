import Link from "next/link";
import { AcademicCapIcon } from "@heroicons/react/outline";

const Footer = () => (
  <div className="px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
    <div className="grid gap-16 row-gap-10 mb-8 lg:grid-cols-6">
      <div className="md:max-w-md lg:col-span-2">
        <Link href="/" passHref>
          <a
            aria-label="Teacher Reviewer"
            title="Teacher Reviewer"
            className="inline-flex items-center"
          >
            <AcademicCapIcon className="w-8 text-gray-100 dark:text-default-color" />
            <span className="ml-2 text-xl font-bold tracking-wide text-gray-100 uppercase">
              Teacher Reviewer
            </span>
          </a>
        </Link>
        <div className="mt-4 lg:max-w-sm">
          <p className="text-sm text-justify text-gray-100">
            It is an application dedicated to managing
            student grades towards teachers, divided into sections.
          </p>
          <p className="mt-4 text-sm text-gray-100">
            Rate that teacher who seemed to you the best in the world.
          </p>
        </div>
      </div>
      <div className="hidden grid-cols-2 gap-5 row-gap-8 lg:col-span-4 md:grid-cols-4">
        <div>
          <p className="font-semibold tracking-wide text-gray-800">
            Category
          </p>
          <ul className="mt-2 space-y-2">
            <li>
              <Link href="/" passHref>
                <a
                  className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
                >
                  References
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div className="flex flex-col justify-between pt-5 pb-10 border-t sm:flex-row">
      <p className="text-md text-gray-100">
        © Copyright
        {" "}
        {new Date().getFullYear()}
        {" "}
        Teacher Reviewer. All rights reserved.
      </p>
    </div>
  </div>
);

export default Footer;
