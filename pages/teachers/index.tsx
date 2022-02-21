/* eslint-disable jsx-a11y/label-has-associated-control */
import _ from "lodash";
import Head from "next/head";
import Link from "next/link";
import { ITeacher } from "@types";
import { MainLayout } from "@layouts";
import { Pagination, TeacherCard } from "@components";
import { TeacherContext } from "@contexts";
import { Children, useMemo, useState } from "react";

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

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(12);

  const [searcher, setSearcher] = useState<string>("");
  const [filterArea, setFilterArea] = useState<string>("");
  const [sort, setSort] = useState<"filter-asc" | "filter-desc" | string>();

  const firstPageIndex = (currentPage - 1) * pageSize;
  const lastPageIndex = firstPageIndex + pageSize;

  const sortArray = (data: ITeacher[], type: "filter-asc" | "filter-desc" | string) => {
    const dataSort = data.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
    if (type === "filter-asc") return dataSort;
    if (type === "filter-desc") return dataSort.reverse();
    return data;
  };

  const teachersFiltered = useMemo(() => {
    const searchedTeachers: ITeacher[] = Object.values(_.pickBy(teachers, (value) => {
      return value?.name.toLowerCase().includes(searcher?.toLowerCase());
    }));

    const filteredByArea: ITeacher[] = Object.values(_.pickBy(searchedTeachers, (value) => {
      return value?.area.toLowerCase().includes(filterArea?.toLowerCase());
    }));

    setCurrentPage(1);
    if (sort) return sortArray(filteredByArea, sort);
    return filteredByArea;
  }, [filterArea, searcher, sort, teachers]);

  return (
    <>
      <Head>
        <title>Teacher Reviewer - Teachers</title>
        <meta name="description" content="Teacher Reviewer" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <MainLayout>
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-10">
          <div className="flex flex-col lg:flex-row gap-2 lg:justify-between items-center">
            <div className="flex justify-end lg:order-last w-full">
              <input
                placeholder="Enter the teacher's name..."
                required
                onChange={({ target }) => setSearcher(target.value)}
                type="text"
                className="text-sm appearance-none dark:bg-gray-800 border-2 border-gray-400 dark:border-gray-800 dark:text-gray-100 dark:focus:border-default-color focus:border-default-color rounded focus:outline-none focus:ring-0 w-full sm:w-72"
              />
            </div>
            <form className="flex flex-col w-full sm:flex-row gap-2">
              <div>
                <label className="sr-only">
                  Area
                </label>
                <select onChange={({ target }) => setFilterArea(target.value)} className="text-sm appearance-none dark:bg-gray-800 border-2 border-gray-400 dark:border-gray-800 dark:text-gray-100 dark:focus:border-default-color focus:border-default-color rounded focus:outline-none focus:ring-0 w-full sm:w-72">
                  <option value="">Area</option>
                  {Children.toArray(_.map(areas, (area) => (
                    <option value={area}>{area}</option>
                  )))}
                </select>
              </div>

              <div className="sm:ml-4">
                <label className="sr-only">
                  Orden
                </label>

                <select onChange={({ target }) => setSort(target.value)} className="text-sm appearance-none dark:bg-gray-800 border-2 border-gray-400 dark:border-gray-800 dark:text-gray-100 dark:focus:border-default-color focus:border-default-color rounded focus:outline-none focus:ring-0 w-full sm:w-72">
                  <option value="">Orden</option>
                  <option value="filter-asc">Ascendente por nombre</option>
                  <option value="filter-desc">Descendente por nombre</option>
                </select>
              </div>
            </form>
          </div>
          <div className="grid gap-6 py-6 sm:grid-cols-2 lg:grid-cols-3">
            {Children.toArray(_.map(
              teachersFiltered.slice(firstPageIndex, lastPageIndex),
              (teacher) => (
                <Link href={`teachers/${teacher.name}`} passHref>
                  <a>
                    <TeacherCard name={teacher?.name} area={teacher?.area} />
                  </a>
                </Link>
              ),
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalCount={teachersFiltered?.length || 0}
            pageSize={pageSize}
            changeCurrentPage={(page) => setCurrentPage(page)}
          />
        </div>
      </MainLayout>
    </>
  );
};

export default TeacherPage;
