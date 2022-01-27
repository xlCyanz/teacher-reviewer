import { gql } from "apollo-server-micro";

const typeDefs = gql`
  type User {
    name: String
    email: String
    password: String
  }

  type Rating {
    scoreClarity: Int
    scoreAssistance: Int
    scoreTakeClassAgain: Int
  }

  type Teacher {
    name: String
    area: String
    rating: Rating
  }

  type Comment {
    id: ID
    userId: User
    teacherId: Teacher
    createdAt: String
    updatedAt: String
    body: String
  }

  type Query {
    teachers: [Teacher]
    teacher(name: String!): Teacher
    teachersByArea(area: String!): [Teacher]
    comments(teacherName: String!): [Comment]
    user(email: String!): User
    users: [User]
  }

  input inputTeacher {
    name: String
    area: String
  }

  input inputVote {
    userId: ID
    scoreClarity: Int
    scoreAssistance: Int
    scoreTakeClassAgain: Int
  }

  input inputComment {
    teacherId: ID
    userId: ID
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
    updateUser(name: String!, newUser: inputUser!): User
    deleteUser(name: String!): Boolean
  }
`;

export default typeDefs;
