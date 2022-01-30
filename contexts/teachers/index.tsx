/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/ban-types */
import { Teacher } from "@types";
import React, {
  createContext, ReactNode, useEffect, useMemo, useState,
} from "react";
import teachersFromLocal from "../../public/teachers.json";

interface ITeacherContext {
    teachers: Teacher[];
}

interface ProviderProps {
    children: ReactNode
}

const TeacherContext = createContext<ITeacherContext>({
  teachers: [],
});

const useContext = () => React.useContext(TeacherContext);

const Provider = ({ children }: ProviderProps) => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  useEffect(() => setTeachers(teachersFromLocal), []);

  const values = useMemo(() => ({ teachers }), [teachers]);

  return (
    <TeacherContext.Provider value={values}>
      {children}
    </TeacherContext.Provider>
  );
};

export { Provider, useContext };
