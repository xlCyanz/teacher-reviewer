import mongoose, { Schema, connect } from "mongoose";

const MONGO_URI = process.env.NEXT_PUBLIC_MONGO_URI;

if (!MONGO_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

const connection = async () => {
  const conn = await connect(`${MONGO_URI}`)
    .catch((err: string) => console.error(err));

  const Teacher = new Schema({
    name: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    area: String,
  });

  const Vote = new Schema({
    teacherId: {
      type: Schema.Types.ObjectId,
      ref: "Teacher",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    scoreClarity: {
      type: Number,
      default: 0,
    },
    scoreAssistance: {
      type: Number,
      default: 0,
    },
    scoreTakeClassAgain: {
      type: Number,
      default: 0,
    },
  });

  const User = new Schema({
    name: String,
    email: String,
    password: String,
    createdAt: {
      type: Date,
      default: new Date(),
    },
  });

  const Comment = new Schema({
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    teacherId: {
      type: Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
    updatedAt: Date,
    body: String,
  });

  const modelTeacher = mongoose.models.Teacher || mongoose.model("Teacher", Teacher);
  const modelUser = mongoose.models.User || mongoose.model("User", User);
  const modelComment = mongoose.models.Comment || mongoose.model("Comment", Comment);
  const modelVote = mongoose.models.Vote || mongoose.model("Vote", Vote);

  return {
    conn,
    modelTeacher,
    modelUser,
    modelComment,
    modelVote,
  };
};

export default connection;
