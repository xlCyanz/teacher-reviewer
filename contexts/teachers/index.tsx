/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/ban-types */
import React, {
  createContext, ReactNode, useEffect, useMemo, useState,
} from "react";
import { ITeacher } from "@types";
import teachersFromLocal from "../../public/teachers.json";

interface IProvider {
  children: ReactNode;
}

interface ITeacherContext {
    teachers: ITeacher[];
}

const TeacherContext = createContext<ITeacherContext>({
  teachers: [],
});

const useContext = () => React.useContext(TeacherContext);

const Provider = ({ children }: IProvider) => {
  const [teachers, setTeachers] = useState<ITeacher[]>([]);

  useEffect(() => setTeachers(teachersFromLocal), []);

  const values = useMemo(() => ({ teachers }), [teachers]);

  return (
    <TeacherContext.Provider value={values}>
      {children}
    </TeacherContext.Provider>
  );
};

export { Provider, useContext };
