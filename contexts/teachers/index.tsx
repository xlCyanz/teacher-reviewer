/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/ban-types */
import { gql } from "@apollo/client";
import { Teacher } from "@types";
import client from "apollo-client";
import React, {
  createContext, ReactNode, useEffect, useMemo, useState,
} from "react";

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

  useEffect(() => {
    const fetch = async () => {
      const QUERY = gql`
        query {
          teachers {
            name
            area
          }
        }
      `;

      const { data } = await client.query({
        query: QUERY,
      });

      setTeachers(data?.teachers);
    };

    fetch();
  }, []);

  const values = useMemo(() => ({ teachers }), [teachers]);

  return (
    <TeacherContext.Provider value={values}>
      {children}
    </TeacherContext.Provider>
  );
};

export { Provider, useContext };
