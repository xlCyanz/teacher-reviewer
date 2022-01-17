/* eslint-disable new-cap */
import connection from "../../../utils/connection";

interface Rating {
  clarity: number;
  puntuality: number;
  takeClass: number;
}
interface Teacher {
  id: string;
  name: string;
  area: string;
  rating: Rating;
}
interface Comment {
  id?: string;
  userId?: string;
  teacherId?: string;
  userName?: string;
  updatedAt?: string;
  createdAt?: string;
  body?: string;
}

let db: any;

(async () => {
  db = await connection();
})();

const resolvers = {
  Query: {
    teachers: async () => {
      const teachers: Array<Teacher> = await db.modelTeacher.find();
      return teachers;
    },
    comments: async (_: unknown, { teacherId }: { teacherId: string }) => {
      const comments: Array<Comment> = await db.modelComments
        .find()
        .populate({ path: "teacherId" });
      console.log(comments);
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
      { newRating, teacherId }: { newRating: Rating; teacherId: string }
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
    addComment: async (_: any, { comment }: { comment: any }) => {
      const commentExample: Comment = {
        teacherId: "61e21114aaf5ac5b9985e52f",
        body: "prueba",
      };
      const Model = db.modelComments;
      const com = new Model(commentExample);
      await com.save();
    },
    updateComment: (
      _: any,
      { newComment, userId }: { newComment: any; userId: any }
    ) => {},
    deleteComment: (_: any, { id }: { id: string }) => {},
  },
};
export default resolvers;
