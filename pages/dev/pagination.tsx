/* eslint-disable jsx-a11y/label-has-associated-control */
import _ from "lodash";
import { TeacherContext } from "@contexts";
import { useEffect, useState } from "react";
import { ITeacher } from "@types";

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

const Pagination = () => {
  const { teachers } = TeacherContext.useContext();

  const [teachersFiltered, setTeacherFiltered] = useState<ITeacher[]>([]);
  const [searcher, setSearcher] = useState<string>("");
  const [filterArea, setFilterArea] = useState<string>("");
  const [sort, setSort] = useState<"filter-asc" | "filter-desc" | string>();

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
    <div className="w-screen h-screen bg-blue-200">
      <div className="flex flex-col gap-2 px-12 pt-12 bg-blue-200">
        <div className="sm:items-center sm:flex sm:justify-between">
          <div className="flex space-x-1 sm:justify-end sm:order-last">
            <input
              placeholder="Enter the teacher's name..."
              required
              onChange={({ target }) => setSearcher(target.value)}
              type="text"
              className="text-sm appearance-none border-gray-100 focus:border-default-color rounded w-64 focus:outline-none"
            />
          </div>
          <form className="flex mt-2 sm:mt-0">
            <div>
              <label className="sr-only">
                Area
              </label>
              <select onChange={({ target }) => setFilterArea(target.value)} className="text-sm appearance-none border-gray-100 focus:border-default-color rounded">
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

              <select onChange={({ target }) => setSort(`${target.value}`)} className="text-sm appearance-none border-gray-100 focus:border-default-color rounded">
                <option value="">Sort</option>
                <option value="filter-asc">Name, A-Z</option>
                <option value="filter-desc">Name, Z-A</option>
              </select>
            </div>
          </form>
        </div>
        <div className="grid grid-cols-6 gap-2 mb-12">
          {_.map(teachersFiltered, (teacher) => (
            <div key={teacher?._id} className="bg-white text-gray-900 p-2 rounded flex flex-col">
              <span className="flex-1">{teacher?.name}</span>
              <span className="text-sm text-default-color font-medium">{teacher?.area}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pagination;
