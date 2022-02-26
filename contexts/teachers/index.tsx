/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  createContext, ReactNode, useEffect, useMemo, useState,
} from "react";
import teachersFromLocal from "../../public/teachers.json";

interface IProvider {
  children: ReactNode;
}

interface ITeacherContext {
  id?: string;
  name?: string;
  area?: string;
  comments?: number;
  votes?: number;
}

const TeacherContext = createContext<ITeacherContext[]>([]);

const useContext = () => React.useContext(TeacherContext);

const Provider = ({ children }: IProvider) => {
  const [teachers, setTeachers] = useState<ITeacherContext[]>([]);

  // @ts-ignore
  useEffect(() => setTeachers(teachersFromLocal), []);

  const values = useMemo(() => (teachers), [teachers]);

  return (
    <TeacherContext.Provider value={values}>
      {children}
    </TeacherContext.Provider>
  );
};

export { Provider, useContext };
