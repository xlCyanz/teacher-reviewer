import type { NextPage } from "next";
import Head from "next/head";
import Features from "@components/features";
import replaceJSX from "@utils/replace-jsx";
import MainLayout from "@components/main-layout";

const textStyled = (title: string) => (
  <span key={title} className="relative inline-block px-2">
    <div className="absolute inset-0 transform -skew-x-12 bg-white" />
    <span className="relative text-deep-purple-accent-700 dark:text-deep-purple-accent-400">
      {title}
    </span>
  </span>
);

const Home: NextPage = () => (
  <>
    <Head>
      <title>Teacher Reviewer</title>
      <meta name="description" content="Teacher Reviewer" />
      <link rel="icon" href="/favicon.png" />
    </Head>

    <MainLayout>
      <main className="relative bg-deep-purple-accent-700 dark:bg-deep-purple-accent-400 py-6 sm:py-10 lg:py-12 dark:lg:py-20">
        <div className="absolute inset-x-0 bottom-0 dark:hidden">
          <svg
            viewBox="0 0 224 12"
            fill="currentColor"
            className="w-full -mb-1 text-white"
            preserveAspectRatio="none"
          >
            <path d="M0,0 C48.8902582,6.27314026 86.2235915,9.40971039 112,9.40971039 C137.776408,9.40971039 175.109742,6.27314026 224,0 L224,12.0441132 L0,12.0441132 L0,0 Z" />
          </svg>
        </div>
        <div className="relative px-4 pt-4 sm:pt-12 sm:px-0 h-full max-w-2xl sm:mx-auto sm:max-w-xl md:max-w-2xl sm:text-center">
          <h2 className="mb-8 font-sans text-center text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl sm:leading-none">
            {replaceJSX("Rate and comment about your {teachers}", {
              teachers: textStyled("teachers"),
            })}
          </h2>
          <form className="flex flex-col items-center w-full mb-4 md:flex-row md:px-16">
            <input
              placeholder="Enter the teacher's name..."
              required
              type="text"
              className="flex-grow w-full py-4 px-6 mb-3 text-deep-purple-400 font-medium transition placeholder:text-deep-purple-400 dark:placeholder:text-gray-300 duration-200 border-2 border-transparent rounded appearance-none md:mr-2 md:mb-0 bg-white dark:bg-gray-900 focus:border-gray-800 dark:focus:border-gray-100 focus:outline-none focus:shadow-outline"
            />
          </form>
          <p className="max-w-md text-xs pb-6 sm:pb-4 dark:sm:pb-5 tracking-wide text-gray-100 sm:text-sm sm:mx-auto md:mb-16">
            You have just selected a teacher and you want to know about him.
            Enter his name in the field above.
          </p>
        </div>
      </main>

      {/* Feature's Section */}
      <Features />
    </MainLayout>
  </>
);

export default Home;
