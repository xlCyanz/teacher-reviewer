import { gql } from "apollo-server-micro";

const typeDefs = gql`
  type Query {
    teachers: [Teacher]
    comments(teacherId: ID!): [Comment]
    teacher(id: ID!): Teacher
    teachersByArea(area: String!): [Teacher]
  }

  type Teacher {
    id: ID
    name: String
    area: String
    rating: Rating
  }
  type Rating {
    clarity: Number
    puntuality: Number
    takeClass: Number
  }

  type Comment {
    id: ID
    userId: String
    teacherId: String
    userName: String
    body: String
  }

  type Mutation {
    addTeacher(teacher: Teacher!): Teacher
    updateTeacherRating(newRating: Rating!, teacherId: ID!): Teacher
    addComment(comment: Comment!): Comment
    updateComment(newComment: Comment!, userId: String!): Comment
    deleteComment(id: ID!): String
  }
`;

export default typeDefs;
