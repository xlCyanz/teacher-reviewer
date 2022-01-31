/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/ban-types */
import { Teacher } from "@types";
import _ from "lodash";
import React, {
  createContext, ReactNode, useCallback, useEffect, useMemo, useState,
} from "react";
import teachersFromLocal from "../../public/teachers.json";

interface ITeacherContext {
    teachers: Teacher[];
    findTeacherByName: Function;
    findTeacherById: Function;
}

interface ProviderProps {
    children: ReactNode
}

const TeacherContext = createContext<ITeacherContext>({
  teachers: [],
  findTeacherByName: () => {},
  findTeacherById: () => {},
});

const useContext = () => React.useContext(TeacherContext);

const Provider = ({ children }: ProviderProps) => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  useEffect(() => setTeachers(teachersFromLocal), []);

  /**
   *  Returns a teacher depending on the name.
   *
   * @param {string} name
   * @returns {Teacher} Teacher
   */
  const findTeacherByName = useCallback((name: string) => Object.values(
    _.pickBy(teachers || [], (value) => value?.name.toLowerCase().includes(
      name.toLowerCase(),
    )),
  ), [teachers]);

  /**
   *  Returns a teacher depending on the id.
   *
   * @param {string} name
   * @returns {Teacher} Teacher
   */
  const findTeacherById = useCallback((id: string) => Object.values(
    _.pickBy(teachers || [], (value) => value?._id?.toLowerCase().includes(
      id.toLowerCase(),
    )),
  ), [teachers]);

  const values = useMemo(
    () => ({ teachers, findTeacherByName, findTeacherById }),
    [findTeacherByName, findTeacherById, teachers],
  );

  return (
    <TeacherContext.Provider value={values}>
      {children}
    </TeacherContext.Provider>
  );
};

export { Provider, useContext };
