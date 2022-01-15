const resolvers = {
  Query: {
    teachers: () => {
      const teachers = [
        {
          id: "id",
          name: "name",
          area: "area",
          rating: {
            clarity: 0,
            puntuality: 0,
            takeClass: 0,
          },
        },
        {
          id: "id",
          name: "name",
          area: "area",
          rating: {
            clarity: 0,
            puntuality: 0,
            takeClass: 0,
          },
        },
        {
          id: "id",
          name: "name",
          area: "area",
          rating: {
            clarity: 0,
            puntuality: 0,
            takeClass: 0,
          },
        },
      ];
      return teachers;
    },
    comments: (_: unknown, { teacherId }: { teacherId: string }) => {
      const comments = [
        {
          id: "id",
          userId: "userId",
          teacherId: "TeacherID",
          userName: "Nombre de usuario",
          body: "mensaje",
        },
        {
          id: "id",
          userId: "userId",
          teacherId: "TeacherID",
          userName: "Nombre de usuario",
          body: "mensaje",
        },
      ];
      return comments;
    },
    teacher: (_: any, { id }: { id: string }) => {
      const teacher = {
        id: "id",
        name: "name",
        area: "area",
        rating: {
          clarity: 0,
          puntuality: 0,
          takeClass: 0,
        },
      };
      return teacher;
    },
    teachersByArea: (_: any, { area }: { area: string }) => {
      const teachers = [
        {
          id: "id",
          name: "name",
          area: "area",
          rating: {
            clarity: 0,
            puntuality: 0,
            takeClass: 0,
          },
        },
        {
          id: "id",
          name: "name",
          area: "area",
          rating: {
            clarity: 0,
            puntuality: 0,
            takeClass: 0,
          },
        },
        {
          id: "id",
          name: "name",
          area: "area",
          rating: {
            clarity: 0,
            puntuality: 0,
            takeClass: 0,
          },
        },
      ];
      return teachers;
    },
  },

  Mutation: {
    addTeacher: (
      _: any,
      { teacher: { id, name, area, rating } }: { teacher: any }
    ) => {
      const result = {
        id,
        name,
        area,
        rating,
      };
      return result;
    },
    updateTeacherRating: (
      _: any,
      { newRating, teacherId }: { newRating: any; teacherId: any }
    ) => {
      const teacher = {
        id: "id",
        name: "name",
        area: "area",
        rating: {
          clarity: 0,
          puntuality: 0,
          takeClass: 0,
        },
      };
      return teacher;
    },
    addComment: (_: any, { comment }: { comment: any }) => {},
    updateComment: (
      _: any,
      { newComment, userId }: { newComment: any; userId: any }
    ) => {},
    deleteComment: (_: any, { id }: { id: string }) => {},
  },
};
export default resolvers;
