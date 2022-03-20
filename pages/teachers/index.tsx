/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import _ from "lodash";
import dynamic from "next/dynamic";
import { MainLayout } from "@layouts";
import { TeacherContext } from "@contexts";
import { ExclamationIcon } from "@heroicons/react/outline";
import { Banner, Pagination } from "@components";
import { Children, useMemo, useState } from "react";

type TSort = "filter-asc" | "filter-desc" | string;
type TeacherFormat = {
  id: string;
  name: string;
  area: string;
  comments: number;
  votes: number;
}

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

const DynamicTeacherCard = dynamic(() => import("../../components/teacher-card"), { ssr: false });

const TeacherPage = () => {
  const teachers = TeacherContext.useContext();

  const [pageSize] = useState(12);
  const [sort, setSort] = useState<TSort>();
  const [searcher, setSearcher] = useState("");
  const [filterArea, setFilterArea] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const firstPageIndex = (currentPage - 1) * pageSize;
  const lastPageIndex = firstPageIndex + pageSize;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sortArray = (data: any[], type: TSort) => {
    const dataSorted = data.sort((a, b) => a.name.toLowerCase().localeCompare(
      b.name.toLowerCase(),
    ));

    if (type === "filter-asc") return dataSorted;
    if (type === "filter-desc") return dataSorted.reverse();

    return dataSorted;
  };

  const teachersFiltered = useMemo(() => {
    const searchedTeachers = Object.values(_.pickBy(teachers, (value: TeacherFormat) => {
      return value?.name?.toLowerCase().includes(searcher?.toLowerCase());
    }));

    const filteredByArea = Object.values(_.pickBy(searchedTeachers, (value: TeacherFormat) => {
      return value?.area?.toLowerCase().includes(filterArea?.toLowerCase());
    }));

    setCurrentPage(1);
    if (sort) return sortArray(filteredByArea, sort);

    return filteredByArea;
  }, [filterArea, searcher, sort, teachers]);

  return (
    <MainLayout title="Teacher Reviewer - Profesores">
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-10">
        <div className="py-4">
          <Banner
            message="Los profesores actualmente estan desactualizados. Ayudanos recomendando profesores faltantes."
            icon={ExclamationIcon}
            link="https://forms.gle/XqtdvxWpyhzTdhwi8"
          />
        </div>
        <div className="flex flex-col lg:flex-row gap-2 lg:justify-between items-center">
          <form className="flex flex-col w-full sm:flex-row gap-2">
            <div className="flex justify-end lg:order-last w-full">
              <input
                type="text"
                required
                onChange={({ target }) => setSearcher(target.value)}
                placeholder="Ingresa el nombre del profesor..."
                className="text-sm appearance-none dark:bg-gray-800 border-2 border-gray-400 dark:border-gray-800 dark:text-gray-100 dark:focus:border-default-color focus:border-default-color rounded focus:outline-none focus:ring-0 w-full lg:w-72"
              />
            </div>
            <div>
              <label className="sr-only">
                Area
              </label>
              <select onChange={({ target }) => setFilterArea(target.value)} className="text-sm appearance-none dark:bg-gray-800 border-2 border-gray-400 dark:border-gray-800 dark:text-gray-100 dark:focus:border-default-color focus:border-default-color rounded focus:outline-none focus:ring-0 w-full lg:w-72">
                <option value="">Area</option>
                {Children.toArray(_.map(areas, (area) => (
                  <option value={area}>{area}</option>
                )))}
              </select>
            </div>
            <div>
              <label className="sr-only">
                Orden
              </label>
              <select onChange={({ target }) => setSort(target.value)} className="text-sm appearance-none dark:bg-gray-800 border-2 border-gray-400 dark:border-gray-800 dark:text-gray-100 dark:focus:border-default-color focus:border-default-color rounded focus:outline-none focus:ring-0 w-full lg:w-72">
                <option value="">Orden</option>
                <option value="filter-asc">Ascendente por nombre</option>
                <option value="filter-desc">Descendente por nombre</option>
              </select>
            </div>
          </form>
        </div>
        <div className="grid gap-6 py-6 sm:grid-cols-2 lg:grid-cols-4">
          {Children.toArray(_.map(
            teachersFiltered?.slice(firstPageIndex, lastPageIndex),
            (value) => (
              <DynamicTeacherCard {...value} />
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
  );
};

export default TeacherPage;
