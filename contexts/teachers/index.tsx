/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/ban-types */
import _ from "lodash";
import { ITeacher } from "@types";
import React, {
  createContext, ReactNode, useCallback, useEffect, useMemo, useState,
} from "react";
import teachersFromLocal from "../../public/teachers.json";

interface ITeacherContext {
    teachers: ITeacher[];
    findTeacherByName: Function;
    findTeacherById: Function;
}

export interface IProvider {
  children: ReactNode;
}

const TeacherContext = createContext<ITeacherContext>({
  teachers: [],
  findTeacherByName: () => {},
  findTeacherById: () => {},
});

const useContext = () => React.useContext(TeacherContext);

const Provider = ({ children }: IProvider) => {
  const [teachers, setTeachers] = useState<ITeacher[]>([]);

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
