import mongoose, { Schema } from "mongoose";

const DATABASE_URL = process.env.NEXT_PUBLIC_DATABASE_URL;

const connection = async () => {
  const conn = await mongoose
    .connect(`${DATABASE_URL}`)
    .catch((err: string) => console.error(err));

  const Teacher = new Schema({
    name: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    area: String,
    votes: [
      {
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
      },
    ],
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

  const Comments = new Schema({
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

  delete mongoose.models.User;
  const modelUser = mongoose.model("User", User);

  const modelComments = mongoose.models.Comments || mongoose.model("Comments", Comments);

  return {
    conn,
    modelTeacher,
    modelUser,
    modelComments,
  };
};

export default connection;
