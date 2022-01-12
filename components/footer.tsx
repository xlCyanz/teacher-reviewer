import { AcademicCapIcon } from "@heroicons/react/outline";

const Footer = () => (
  <div className="relative mt-16 bg-deep-purple-accent-400 dark:bg-gray-900">
    <svg
      className="absolute dark:hidden top-0 w-full h-6 -mt-5 sm:-mt-10 sm:h-16 text-deep-purple-accent-400"
      preserveAspectRatio="none"
      viewBox="0 0 1440 54"
    >
      <path
        fill="currentColor"
        d="M0 22L120 16.7C240 11 480 1.00001 720 0.700012C960 1.00001 1200 11 1320 16.7L1440 22V54H1320C1200 54 960 54 720 54C480 54 240 54 120 54H0V22Z"
      />
    </svg>
    <div className="px-4 pt-12 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
      <div className="grid gap-16 row-gap-10 mb-8 lg:grid-cols-6">
        <div className="md:max-w-md lg:col-span-2">
          <div className="inline-flex items-center">
            <AcademicCapIcon className="w-8 text-gray-100 dark:text-deep-purple-accent-400" />
            <span className="ml-2 text-xl font-bold tracking-wide text-gray-100 uppercase">
              Teacher Reviewer
            </span>
          </div>
          <div className="mt-4 lg:max-w-sm">
            <p className="text-sm text-deep-purple-50">
              It is an application dedicated to managing student grades towards teachers,
              divided into sections.
            </p>
            <p className="mt-4 text-sm text-deep-purple-50">
              Rate that teacher who seemed to you the best in the world.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5 row-gap-8 lg:col-span-4 md:grid-cols-4">
          <div>
            <p className="font-semibold tracking-wide text-gray-100">
              Most voted Areas
            </p>
            <ul className="mt-2 space-y-2">
              {[1, 2, 3].map((value) => (
                <li key={value}>
                  <span className="transition-colors duration-300 text-gray-300 cursor-pointer hover:text-white dark:hover:text-deep-purple-accent-400">
                    News
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-semibold tracking-wide text-gray-100">
              Most voted Teachers
            </p>
            <ul className="mt-2 space-y-2">
              {[1, 2, 3].map((value) => (
                <li key={value}>
                  <span className="transition-colors duration-300 text-gray-300 cursor-pointer hover:text-white dark:hover:text-deep-purple-accent-400">
                    News
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between pt-5 pb-10 border-t border-gray-100 dark:border-gray-100 sm:flex-row">
        <p className="text-sm text-gray-100">
          © Copyright 2020 Teacher Reviewer. All rights reserved.
        </p>
      </div>
    </div>
  </div>
);

export default Footer;
