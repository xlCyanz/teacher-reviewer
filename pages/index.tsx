import _ from "lodash";
import Head from "next/head";
import Link from "next/link";
import { ITeacher } from "@types";
import { Features } from "@components";
import { replaceJSX } from "@utils";
import { MainLayout } from "@layouts";
import { TeacherContext } from "@contexts";
import { Children, useEffect, useState } from "react";
import type { NextPage } from "next";

const textStyled = (title: string) => (
  <span key={title} className="relative inline-block px-2">
    <div className="absolute inset-0 transform -skew-x-12 bg-white dark:bg-default-color" />
    <span className="relative text-default-color dark:text-gray-100">
      {title}
    </span>
  </span>
);

const Home: NextPage = () => {
  const { teachers } = TeacherContext.useContext();

  const [teachersFiltered, setTeacherFiltered] = useState<ITeacher[]>([]);
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
        <div className="relative bg-default-color dark:bg-gray-900">
          <div className="absolute inset-x-0 bottom-0">
            <svg
              viewBox="0 0 224 12"
              fill="currentColor"
              className="w-full -mb-1 text-gray-50 dark:text-gray-900"
              preserveAspectRatio="none"
            >
              <path d="M0,0 C48.8902582,6.27314026 86.2235915,9.40971039 112,9.40971039 C137.776408,9.40971039 175.109742,6.27314026 224,0 L224,12.0441132 L0,12.0441132 L0,0 Z" />
            </svg>
          </div>
          <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-10">
            <div className="relative max-w-2xl sm:mx-auto sm:max-w-xl md:max-w-2xl sm:text-center">
              <h2 className="mb-8 text-center text-5xl font-bold tracking-tight text-white lg:text-7xl sm:leading-none">
                {replaceJSX("Vota y comenta sobre tus {teachers}", {
                  teachers: textStyled("profesores"),
                })}
              </h2>
              <form onSubmit={(e) => e.preventDefault()} className="flex relative flex-col items-center mb-4 md:px-12">
                <input
                  placeholder="Ingresa el nombre del profesor/a..."
                  onChange={({ target }) => setSearcher(target.value)}
                  required
                  type="text"
                  className="w-full py-5 px-6 text-default-color dark:text-gray-100 font-medium placeholder:text-default-color dark:placeholder:text-gray-100 border-0 rounded bg-white dark:bg-default-color dark:focus:border-gray-100 focus:outline-none focus:shadow-outline focus:ring-0"
                />
                {teachersFiltered?.length >= 1 && (
                <div className="flex flex-col gap-2 w-full mt-4">
                  {Children.toArray(_.map(teachersFiltered, (teacher) => (
                    <Link key={teacher?._id} href={`teachers/${teacher.name}`} passHref>
                      <a className="flex flex-col justify-center cursor-pointer shadow-lg w-full items-center bg-white hover:border-2 dark:border-default-color rounded py-4 px-6">
                        {teacher?.name}
                        <span className="text-sm font-medium text-default-color">{teacher?.area}</span>
                      </a>
                    </Link>
                  )))}
                </div>
                )}
              </form>
              <p className="max-w-md text-xs pb-6 sm:pb-4 dark:sm:pb-5 tracking-wide text-gray-100 sm:text-sm sm:mx-auto md:mb-16">
                Acabas de seleccionar un profesor/a y quieres saber mas sobre el/ella.
                Introduzca su nombre en el campo de arriba.
              </p>
            </div>
          </div>
        </div>

        <Features />
      </MainLayout>
    </>
  );
};

export default Home;
