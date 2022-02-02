import _ from "lodash";
import Head from "next/head";
import Link from "next/link";
import { ITeacher } from "@types";
import { MainLayout } from "@layouts";
import { usePagination } from "@hooks";
import { TeacherContext } from "@contexts";
import { useEffect, useState } from "react";
import { AdjustmentsIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";

const TeacherPage = () => {
  const { teachers } = TeacherContext.useContext();

  const [teachersFiltered, setTeacherFiltered] = useState<ITeacher[]>([]);
  const [searcher, setSearcher] = useState<string>("");

  const {
    currentPage,
    firstIndex,
    lastIndex,
    pageNumbers,
    changeCurrentPage,
    changeToNextPage,
    changeToPreviusPage,
  } = usePagination({ dataLength: teachers?.length, limitPerPage: 18 });

  useEffect(() => {
    setTeacherFiltered(Object.values(
      _.pickBy(teachers, (value) => value?.name.toLowerCase().includes(
        searcher?.toLowerCase(),
      )),
    ));
  }, [searcher, teachers]);

  return (
    <>
      <Head>
        <title>Teacher Reviewer - Teachers</title>
        <meta name="description" content="Teacher Reviewer" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <MainLayout>
        <div className=" px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
            <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
              <span className="relative inline-block">
                <AdjustmentsIcon className="absolute -top-4 left-12 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block" />
                <span className="relative">Bienvenido a la seccion de profesores</span>
              </span>
            </h2>
            <form className="flex flex-col items-center w-full py-8 md:flex-row md:px-16">
              <input
                placeholder="Enter the teacher's name..."
                required
                onChange={({ target }) => setSearcher(target.value)}
                type="text"
                className="flex-grow w-full bg-deep-purple-accent-700 placeholder:text-gray-100 placeholder:font-medium placeholder:text-md p-5 mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
              />
            </form>
          </div>
          <div className="grid gap-10 mx-auto py-6 sm:row-gap-10  sm:grid-cols-2 lg:grid-cols-3">
            {teachersFiltered?.length >= 1 && (
              _.map(teachersFiltered?.slice(firstIndex, lastIndex), (teacher) => (
                <Link href={`teachers/${teacher.name}`} passHref>
                  <a>
                    <div className="relative p-px overflow-hidden transition duration-300 transform border rounded shadow-sm hover:scale-105 group hover:shadow-xl">
                      <div className="absolute bottom-0 left-0 w-full h-1 duration-300 origin-left transform scale-x-0 bg-deep-purple-accent-400 dark:bg-gray-800 group-hover:scale-x-100" />
                      <div className="absolute bottom-0 left-0 w-1 h-full duration-300 origin-bottom transform scale-y-0 bg-deep-purple-accent-400 dark:bg-gray-800 group-hover:scale-y-100" />
                      <div className="absolute top-0 left-0 w-full h-1 duration-300 origin-right transform scale-x-0 bg-deep-purple-accent-400 dark:bg-gray-800 group-hover:scale-x-100" />
                      <div className="absolute bottom-0 right-0 w-1 h-full duration-300 origin-top transform scale-y-0 bg-deep-purple-accent-400 dark:bg-gray-800 group-hover:scale-y-100" />
                      <div className="relative p-5 bg-white rounded-sm">
                        <div className="flex flex-col mb-2 lg:items-center lg:flex-row">
                          <p className="font-semibold leading-5">{teacher.name}</p>
                        </div>
                        <p className="mb-2 text-sm text-gray-900">{teacher.area}</p>
                      </div>
                    </div>
                  </a>
                </Link>
              ))
            )}
          </div>
          <nav className=" flex justify-center align-center rounded-md shadow-sm -space-x-px gap-2" aria-label="Pagination">
            <button
              type="button"
              onClick={changeToPreviusPage}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-200 "
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            {_.map(pageNumbers, (page) => (
              <button
                key={`pagination-${page}`}
                type="button"
                aria-current={page === currentPage ? "page" : "false"}
                onClick={() => changeCurrentPage(page)}
                className={`z-10 hidden sm:flex ${
                  page === currentPage
                    ? "bg-indigo-50 border-indigo-500 rounded text-indigo-600"
                    : "bg-white border-gray-300 text-gray-500 hover:bg-gray-200"
                } relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
              >
                {page}
              </button>
            ))}
            <button
              type="button"
              onClick={changeToNextPage}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-200"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </MainLayout>
    </>
  );
};

export default TeacherPage;
