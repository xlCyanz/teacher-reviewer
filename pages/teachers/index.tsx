/* eslint-disable jsx-a11y/label-has-associated-control */
import _ from "lodash";
import Head from "next/head";
import Link from "next/link";
import { ITeacher } from "@types";
import { MainLayout } from "@layouts";
import { TeacherCard } from "@components";
import { usePagination } from "@hooks";
import { Language, TeacherContext } from "@contexts";
import { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";

const areas = [
  "Multimedia",
  "Form. Humanistica en Etica y Valores",
  "Redes",
  "Seguridad en Informática",
  "Mecatrónica",
  "Cocurriculares",
  "Ciencias Básicas",
  "ILS",
  "Software",
  "Ciencias de Datos",
];

const TeacherPage = () => {
  const { teachers } = TeacherContext.useContext();
  const text = Language.useContext();
  console.log(text);
  const [teachersFiltered, setTeacherFiltered] = useState<ITeacher[]>([]);
  const [searcher, setSearcher] = useState<string>("");
  const [filterArea, setFilterArea] = useState<string>("");
  const [sort, setSort] = useState<"filter-asc" | "filter-desc" | string>();

  const {
    currentPage,
    firstIndex,
    lastIndex,
    pageNumbers,
    changeCurrentPage,
    changeToNextPage,
    changeToPreviusPage,
  } = usePagination({ dataLength: teachersFiltered?.length, limitPerPage: 12 });

  const sortArray = (data: ITeacher[], type: "filter-asc" | "filter-desc" | string) => {
    const dataSort = data.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
    if (type === "filter-asc") return dataSort;
    if (type === "filter-desc") return dataSort.reverse();
    return data;
  };

  useEffect(() => {
    const searchedTeachers: ITeacher[] = Object.values(_.pickBy(teachers, (value) => {
      return value?.name.toLowerCase().includes(searcher?.toLowerCase());
    }));

    const filteredByArea: ITeacher[] = Object.values(_.pickBy(searchedTeachers, (value) => {
      return value?.area.toLowerCase().includes(filterArea?.toLowerCase());
    }));

    if (sort) setTeacherFiltered(sortArray(filteredByArea, sort));
    else setTeacherFiltered(filteredByArea);
  }, [filterArea, searcher, sort, teachers]);

  return (
    <>
      <Head>
        <title>Teacher Reviewer - Teachers</title>
        <meta name="description" content="Teacher Reviewer" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <MainLayout>
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-18">
          <div className="flex flex-col lg:flex-row gap-2 justify-between items-center">
            <div className="flex space-x-1 sm:justify-end sm:order-last">
              <input
                placeholder="Enter the teacher's name..."
                required
                onChange={({ target }) => setSearcher(target.value)}
                type="text"
                className="text-sm appearance-none border-2 border-gray-200 focus:border-default-color rounded focus:outline-none focus:ring-0 w-64"
              />
            </div>
            <form className="flex flex-col sm:flex-row gap-2">
              <div>
                <label className="sr-only">
                  Area
                </label>
                <select onChange={({ target }) => setFilterArea(target.value)} className="text-sm appearance-none border-2 border-gray-200 focus:border-default-color rounded focus:outline-none focus:ring-0">
                  <option value="">Area</option>
                  {_.map(areas, (area) => (
                    <option key={area} value={area}>{area}</option>
                  ))}
                </select>
              </div>

              <div className="ml-4">
                <label className="sr-only">
                  Sort
                </label>

                <select onChange={({ target }) => setSort(target.value)} className="text-sm appearance-none border-2 border-gray-200 focus:border-default-color rounded focus:outline-none focus:ring-0">
                  <option value="">Sort</option>
                  <option value="filter-asc">Name, A-Z</option>
                  <option value="filter-desc">Name, Z-A</option>
                </select>
              </div>
            </form>
          </div>
          <div className="grid gap-10 mx-auto py-6 sm:row-gap-10  sm:grid-cols-2 lg:grid-cols-3">
            {teachersFiltered?.length >= 1 && (
              _.map(teachersFiltered?.slice(firstIndex, lastIndex), (teacher) => (
                <Link href={`teachers/${teacher.name}`} passHref>
                  <a>
                    <TeacherCard name={teacher?.name} area={teacher?.area} />
                  </a>
                </Link>
              ))
            )}
          </div>
          <nav className="flex justify-center align-center mt-6 rounded-md -space-x-px gap-2" aria-label="Pagination">
            <button
              type="button"
              onClick={changeToPreviusPage}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md bg-white text-sm font-medium text-gray-500 hover:bg-default-color hover:text-gray-100"
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
                    ? "bg-default-color border-default-color rounded text-gray-100"
                    : "bg-white text-gray-500 hover:bg-default-color hover:text-gray-100"
                } relative inline-flex items-center px-4 py-2 text-sm font-medium`}
              >
                {page}
              </button>
            ))}
            <button
              type="button"
              onClick={changeToNextPage}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md bg-white text-sm font-medium text-gray-500 hover:bg-default-color hover:text-gray-100"
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
