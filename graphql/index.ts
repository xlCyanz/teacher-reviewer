import { gql } from "apollo-server-micro";
import connection from "../utils/connection";

interface Vote {
  userName: string;
  scoreClarity: number;
  scoreAssistance: number;
  scoreTakeClassAgain: number;
}
interface Teacher {
  id: string;
  name: string;
  area: string;
  rating: Array<Vote>;
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
interface User {
  name: string;
  password:string;
  token:string;
}

let db: any;

(async () => {
  db = await connection();
})();

const TeacherModel = db.modelTeachers;
const CommentModel = db.modelComments;
const UserModel = db.modelUser;

const typeDefs = gql`
  type Teacher {
    name: String
    area: String
    rating: [Vote]
  }

  type Vote {
    userName: String
    scoreClarity: Int
    scoreAssistance: Int
    scoreTakeClassAgain: Int
  }

  type Comment {
    id: ID
    userName: String
    teacherName: teacherComment
    createdAt: String
    updatedAt: String
    body: String
  }

  type User {
    name: String
    password: String
    token: String
  }

  type Query {
    teachers: [Teacher]
    comments(teacherName: String!): [Comment]
    teacher(name: String!): Teacher
    teachersByArea(area: String!): [Teacher]
    User(name: String!): User
  }

  input inputTeacher {
    name: String
    area: String
  }

  input inputVote {
    userName: String
    scoreClarity: Int
    scoreAssistance: Int
    scoreTakeClassAgain: Int
  }

  input inputComment {
    teacherName: String
    userName: String
    body: String
  }
  input inputUser {
    name: String
    password: String
    token: String
  }

  type Mutation {
    # teacher
    addTeacher(newTeacher: inputTeacher!): Teacher
    updateTeacher(teacherName: String!, newTeacher: inputTeacher!): Teacher
    voteForTeacher(teacherName: String!, vote: inputVote!): Teacher
    deleteTeacher(teacherName: String!): Boolean
    # comment
    addComment(comment: inputComment!): Comment
    updateComment(newComment: inputComment!, userId: String!): Comment
    deleteComment(id: ID!): String
    # User
    addUser(newUser: inputUser!): User
    updateUser(userName: String!, newUser: inputUser!): User
    deleteUser(UserName: String!): Boolean
  }
`;

const resolvers = {
  Query: {
    teachers: async () => {
      const teachers: Array<Teacher> = await TeacherModel.find();
      return teachers;
    },
    comments: async (_: never, { teacherName }: { teacherName: string }) => {
      const comments: Array<Comment> = await CommentModel.find({
        teacherName,
      });
      return comments;
    },
    teacher: async (_: never, { name }: { name: string }) => {
      const teacher: Teacher = await TeacherModel.find({ name });
      return teacher;
    },
    teachersByArea: async (_: never, { area }: { area: string }) => {
      const teachers: Array<Teacher> = await TeacherModel.find({ area });
      return teachers;
    },
  },

  Mutation: {
    addTeacher: async (_: never, { teacher }: { teacher: Teacher }) => {
      const newTeacher = new TeacherModel(teacher);
      await newTeacher.save();
      return newTeacher;
    },
    updateTeacherRating: async (
      _: never,
      { teacherName, newTeacher }: { newTeacher: Teacher; teacherName: string },
    ) => {
      const TeacherUpdated: Teacher = await TeacherModel.findOneAndUpdate({
        name: teacherName,
      }, newTeacher, (_err:never, doc: Teacher) => doc);
      return TeacherUpdated;
    },
    voteForTeacher: async (
      _: never,
      {
        vote,
        teacherName,
      }: { vote: Vote; teacherName: string },
    ) => {
      const teacher = await TeacherModel.find({
        name: teacherName,
      });
      teacher.rating = [...teacher.rating, vote];
      teacher.save();
      return teacher;
    },
    deleteTeacher: async (_: never, { teacherName }: {teacherName:string}) => {
      const teacherDeleted: Teacher = await TeacherModel.findOneAndDelete({
        name: teacherName,
      }, (_err:never, doc: Teacher) => doc);
      return teacherDeleted;
    },
    addComment: async (_: never, { comment }: { comment: Comment }) => {
      const commentExample: Comment = comment;
      const newComment = new CommentModel(commentExample);
      await newComment.save();
    },
    updateComment: async (
      _: never,
      { newComment, id }: { newComment: string; id:string },
    ) => {
      const CommentUpdated = await CommentModel.findOne({ id });
      CommentUpdated.body = newComment;
      CommentUpdated.updatedAt = new Date().toLocaleString();
      CommentUpdated.save();
      return CommentUpdated;
    },
    deleteComment: async (_: never, { id }: { id: string }) => {
      const CommentDeleted: Comment = await CommentModel.findByIdAndDelete(
        id,
        (_err:never, doc: Comment) => doc,
      );
      return CommentDeleted;
    },
    addUser: async (_:never, { newUser }: {newUser:User})=>{},
    updateUser: async (_:never, { userName, newUser }: {userName:string; newUser:User})=>{},
    deleteUser: async (_:never, { userName }: {userName:string})=>{},
  },
};
export default { typeDefs, resolvers };
