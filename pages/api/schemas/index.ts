import { gql } from "apollo-server-micro";

const typeDefs = gql`
  type Teacher {
    id: ID
    name: String
    area: String
    rating: Rating
  }
  type teacherId {
    id: String
  }
  union teacherComment = teacherId | Teacher
  type Rating {
    clarity: Int
    puntuality: Int
    takeClass: Int
  }
  type Comment {
    id: ID
    userId: String
    teacherId: teacherComment
    createdAt: String
    updatedAt: String
    body: String
  }
  type Query {
    teachers: [Teacher]
    comments(teacherId: ID!): [Comment]
    teacher(id: ID!): Teacher
    teachersByArea(area: String!): [Teacher]
  }
  input inputTeacher {
    name: String
    area: String
  }
  input inputRating {
    clarity: Int
    puntuality: Int
    takeClass: Int
  }
  input inputComment {
    id: ID
    userId: String
    teacher: String
    userName: String
    body: String
  }
  type Mutation {
    addTeacher(newTeacher: inputTeacher!): Teacher
    updateTeacherRating(newRating: inputRating!, teacherId: ID!): Teacher
    addComment: Comment
    updateComment(newComment: inputComment!, userId: String!): Comment
    deleteComment(id: ID!): String
  }
`;

export default typeDefs;
