import { gql } from "apollo-server-micro";

const typeDefs = gql`
  scalar Date

  type User {
    _id: String
    name: String
    email: String
    image: String
  }

  type Vote {
    _id: ID
    userId: ID
    teacherId: ID
    scoreClarity: Int
    scoreAssistance: Int
    scoreTakeClassAgain: Int
  }

  type Rating {
    scoreClarity: Int
    scoreAssistance: Int
    scoreTakeClassAgain: Int
  }
  union teacherResult =  Rating | Teacher

  type Teacher {
    _id: ID
    name: String
    area: String
    rating: Rating
  }

  type Comment {
    _id: ID
    userId: User
    teacherId: Teacher
    createdAt: Date
    updatedAt: Date
    body: String
  }

  type Query {
    # Teachers
    teachers: [Teacher]
    teacher(name: String!): Teacher
    teachersByArea(area: String!): [Teacher]

    # Comments
    comments(teacherName: String!): [Comment]

    # Users
    user(email: String!): User
    users: [User]

    # Votes
    vote(id: ID): Vote
    checkUserVote(userId: ID, teacherName: String): Boolean
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
  }

  type Mutation {
    # Teacher
    addTeacher(newTeacher: inputTeacher!): Teacher
    updateTeacher(teacherName: String!, newTeacher: inputTeacher!): Teacher
    deleteTeacher(teacherName: String!): Boolean
    voteForTeacher(vote: inputVote!): Boolean

    # Comment
    addComment(comment: inputComment!): Comment
    updateComment(newComment: inputComment!, userId: String!): Comment
    deleteComment(id: ID!): Boolean

    # User
    updateUser(name: String!, newUser: inputUser!): User
    deleteUser(name: String!): Boolean
  }
`;

export default typeDefs;
