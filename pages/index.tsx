import _ from "lodash";
import Head from "next/head";
import Link from "next/link";
import { Teacher } from "@types";
import { replaceJSX } from "@utils";
import { MainLayout } from "@layouts";
import { TeacherContext } from "contexts";
import { useEffect, useState } from "react";
import type { NextPage } from "next";

const textStyled = (title: string) => (
  <span key={title} className="relative inline-block px-2">
    <div className="absolute inset-0 transform -skew-x-12 bg-white" />
    <span className="relative text-deep-purple-accent-700 dark:text-deep-purple-accent-400">
      {title}
    </span>
  </span>
);

const Home: NextPage = () => {
  const { teachers } = TeacherContext.useContext();

  const [teachersFiltered, setTeacherFiltered] = useState<Teacher[]>([]);
  const [searcher, setSearcher] = useState<string>("");

  useEffect(() => {
    if (searcher !== "") {
      setTeacherFiltered(Object.values(
        _.pickBy(teachers, (value) => value?.name.toLowerCase().includes(
          searcher?.toLowerCase(),
        )),
      ).slice(0, 1));
    } else setTeacherFiltered([]);
  }, [searcher, teachers]);

  return (
    <>
      <Head>
        <title>Teacher Reviewer</title>
        <meta name="description" content="Teacher Reviewer" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <MainLayout>
        <main className="relative bg-deep-purple-accent-700 dark:bg-deep-purple-accent-400 pb-24 pt-8 dark:lg:py-20">
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
          <div className="relative px-4 pt-4 sm:px-0 h-full max-w-2xl sm:mx-auto sm:max-w-xl md:max-w-2xl sm:text-center">
            <h2 className="mb-8 font-sans text-center text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl sm:leading-none">
              {replaceJSX("Rate and comment about your {teachers}", {
                teachers: textStyled("teachers"),
              })}
            </h2>
            <form onSubmit={(e) => e.preventDefault()} className="flex relative flex-col items-center mb-4 md:px-16">
              <input
                placeholder="Enter the teacher's name..."
                onChange={({ target }) => setSearcher(target.value)}
                required
                type="text"
                className="w-full py-4 px-6 text-deep-purple-400 font-medium placeholder:text-deep-purple-400 dark:placeholder:text-gray-300 border-transparent rounded appearance-none bg-white dark:bg-gray-900 dark:focus:border-gray-100 focus:outline-none focus:shadow-outline"
              />
              {teachersFiltered?.length >= 1 && (
                <div className="flex flex-col gap-2 w-full mt-4 top-12">
                  {_.map(teachersFiltered, (teacher) => (
                    <Link href={`teachers/${teacher.name}`} passHref>
                      <a key={teacher?._id} className="flex flex-col justify-center cursor-pointer shadow-lg w-full items-center bg-white rounded py-4 px-6">
                        {teacher?.name}
                        <span className="text-sm font-medium text-deep-purple-accent-700">{teacher?.area}</span>
                      </a>
                    </Link>
                  ))}
                  <Link href="/teachers" passHref>
                    <a>
                      <div className="flex flex-col justify-center shadow-lg w-full items-center bg-white rounded py-4 px-6">
                        Ir a busqueda avanzada
                      </div>
                    </a>
                  </Link>
                </div>
              )}
            </form>
            <p className="max-w-md text-xs pb-6 sm:pb-4 dark:sm:pb-5 tracking-wide text-gray-100 sm:text-sm sm:mx-auto md:mb-16">
              You have just selected a teacher and you want to know about him.
              Enter his name in the field above.
            </p>
          </div>
        </main>
        <div className="py-56" />
      </MainLayout>
    </>
  );
};

export default Home;
