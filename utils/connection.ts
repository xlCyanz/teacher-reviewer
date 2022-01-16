import mongoose, { Schema } from "mongoose";

const { DATABASE_URL } = process.env;

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
    votes: [{
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
    }],
  });

  const User = new Schema({
    name: String,
    password: String,
    createdAt: Date,
  });

  const Comments = new Schema({
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    teacherId: {
      type: Schema.Types.ObjectId,
      ref: "Teacher",
    },
    createdAt: Date,
    updatedAt: Date,
    body: String,
  });

  const modelTeacher = mongoose.models.Teacher || mongoose.model("Teacher", Teacher);
  modelTeacher.createIndexes();

  const modelUser = mongoose.models.User || mongoose.model("User", User);
  const modelComments = mongoose.models.Comments || mongoose.model("Comments", Comments);

  return {
    conn,
    modelTeacher,
    modelUser,
    modelComments,
  };
};

export default connection;
