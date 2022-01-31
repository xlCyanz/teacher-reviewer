import _ from "lodash";
import { Teacher } from "@types";
import { TeacherContext } from "contexts";
import { useMemo, useState } from "react";

const Dev = () => {
  const { teachers } = TeacherContext.useContext();

  const [teachersFiltered, setTeacherFiltered] = useState<Teacher[]>();
  const [first, setfirst] = useState<string>("");

  useMemo(() => {
    if (first !== "") {
      const filtered = Object.values(
        _.pickBy(teachers, (value) => value?.name.toLowerCase().includes(
          first?.toLowerCase(),
        )),
      ).slice(0, 5);

      setTeacherFiltered(filtered);
    } else setTeacherFiltered([]);
  }, [first, teachers]);

  return (
    <div className="bg-gray-800 h-screen w-screen p-8 px-36">
      <form className="flex flex-col items-center w-full mb-4">
        <input
          placeholder="Email"
          onChange={({ target }) => setfirst(target.value)}
          required
          type="text"
          className="flex-grow w-full h-12 px-4 mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
        />
      </form>
      {_.map(teachersFiltered, (teacher) => (
        <div key={teacher?._id} className="flex justify-center items-center text-lg w-full h-12 px-4 mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0">
          {teacher?.name}
        </div>
      ))}
    </div>
  );
};

export default Dev;
