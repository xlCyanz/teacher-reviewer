import { gql } from "apollo-server-micro";

const typeDefs = gql`
  type User {
    _id: String
    name: String
    password: String
    token: String
  }

  type Rating {
    scoreClarity: Int
    scoreAssistance: Int
    scoreTakeClassAgain: Int
  }

  type Teacher {
    _id: String
    name: String
    area: String
    rating: Rating
  }

  type Comment {
    _id: ID
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
    user(name: String!): User
    users: [User]
  }

  input inputTeacher {
    name: String
    area: String
  }
  

  input inputVote {
    userId: ID
    teacherId: ID
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
    deleteTeacher(teacherName: String!): Boolean
    voteForTeacher(vote: inputVote!): Vote
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
