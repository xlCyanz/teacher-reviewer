/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-use-before-define */
import React, {
  createContext, ReactNode, useMemo, useState,
} from "react";
import teachersFromLocal from "../../public/teachers.json";

interface IProvider {
  children: ReactNode;
}

interface ITeacherContext {
    teachers: any;
}

const TeacherContext = createContext<ITeacherContext>({
  teachers: {
    teacher: [],
  },
});

const useContext = () => React.useContext(TeacherContext);

const Provider = ({ children }: IProvider) => {
  const [teachers] = useState(teachersFromLocal);

  const values = useMemo(() => ({ teachers }), [teachers]);

  return (
    <TeacherContext.Provider value={values}>
      {children}
    </TeacherContext.Provider>
  );
};

export { Provider, useContext };
