import _ from "lodash";
import Head from "next/head";
import Link from "next/link";
import { Teacher } from "@types";
import { MainLayout } from "@layouts";
import { TeacherContext } from "contexts";
import { useMemo, useState } from "react";

const TeacherPage = () => {
  const { teachers } = TeacherContext.useContext();

  const [teachersFiltered, setTeacherFiltered] = useState<Teacher[]>([]);
  const [first, setfirst] = useState<string>("");
  useMemo(() => {
    if (first !== "") {
      const filtered = Object.values(
        _.pickBy(teachers, (value) => value?.name.toLowerCase().includes(
          first?.toLowerCase(),
        )),
      );
      setTeacherFiltered(filtered);
    } else setTeacherFiltered([]);
  }, [first, teachers]);

  return (
    <>
      <Head>
        <title>Teacher Reviewer - Teachers</title>
        <meta name="description" content="Teacher Reviewer" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <MainLayout>
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
            <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
              <span className="relative inline-block">
                <svg
                  viewBox="0 0 52 24"
                  fill="currentColor"
                  className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
                >
                  <defs>
                    <pattern
                      id="247432cb-6e6c-4bec-9766-564ed7c230dc"
                      x="0"
                      y="0"
                      width=".135"
                      height=".30"
                    >
                      <circle cx="1" cy="1" r=".7" />
                    </pattern>
                  </defs>
                  <rect
                    fill="url(#247432cb-6e6c-4bec-9766-564ed7c230dc)"
                    width="52"
                    height="24"
                  />
                </svg>
                <span className="relative">Welcome</span>
              </span>
              {" "}
              our talented team of professionals
            </h2>
            <form className="flex flex-col items-center w-full mb-4 py-8 md:flex-row md:px-16">
              <input
                placeholder="Enter the teacher's name..."
                required
                onChange={({ target }) => setfirst(target.value)}
                type="text"
                className="flex-grow w-full py-4 px-6 mb-3 text-black font-medium transition text-center placeholder:text-deep-purple-400 dark:placeholder:text-gray-300 duration-200 border-2 rounded appearance-none md:mr-2 md:mb-0 bg-white dark:bg-gray-900 focus:border-gray-800 dark:focus:border-gray-100 focus:outline-none focus:shadow-outline"
              />
            </form>
          </div>
          <div className="grid gap-10 mx-auto py-24 sm:row-gap-10  sm:grid-cols-2 lg:grid-cols-3">
            {teachersFiltered.length >= 1 ? (
              teachersFiltered.map((teacher) => (
                <Link href={`teacher/${teacher.name}`} passHref>
                  <a>
                    <div className="relative p-px overflow-hidden transition duration-300 transform border rounded shadow-sm hover:scale-105 group hover:shadow-xl">
                      <div className="absolute bottom-0 left-0 w-full h-1 duration-300 origin-left transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100" />
                      <div className="absolute bottom-0 left-0 w-1 h-full duration-300 origin-bottom transform scale-y-0 bg-deep-purple-accent-400 group-hover:scale-y-100" />
                      <div className="absolute top-0 left-0 w-full h-1 duration-300 origin-right transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100" />
                      <div className="absolute bottom-0 right-0 w-1 h-full duration-300 origin-top transform scale-y-0 bg-deep-purple-accent-400 group-hover:scale-y-100" />
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
            ) : (
              teachers.map((teacher) => (
                <Link href={`teacher/${teacher.name}`} passHref>
                  <a>
                    <div className="relative p-px overflow-hidden transition duration-300 transform border rounded shadow-sm hover:scale-105 group hover:shadow-xl">
                      <div className="absolute bottom-0 left-0 w-full h-1 duration-300 origin-left transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100" />
                      <div className="absolute bottom-0 left-0 w-1 h-full duration-300 origin-bottom transform scale-y-0 bg-deep-purple-accent-400 group-hover:scale-y-100" />
                      <div className="absolute top-0 left-0 w-full h-1 duration-300 origin-right transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100" />
                      <div className="absolute bottom-0 right-0 w-1 h-full duration-300 origin-top transform scale-y-0 bg-deep-purple-accent-400 group-hover:scale-y-100" />
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
        </div>
      </MainLayout>
    </>
  );
};

export default TeacherPage;
