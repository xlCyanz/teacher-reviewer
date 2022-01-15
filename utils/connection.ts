import mongoose, { Schema } from "mongoose";

const { DATABASE_URL } = process.env;

const connection = async () => {
  const conn = await mongoose.connect(`${DATABASE_URL}`).catch((err) => console.error(err));

  const Teacher = new Schema({
    name: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    area: String,
    status: {
      type: Number,
      enum: [0, 1], // 0 (Inactive) -- 1 (Active)
      default: 1,
    },
    rating: {
      clarity: {
        type: Number,
        default: 0,
      },
      assistance: {
        type: Number,
        default: 0,
      },
      takeClassAgain: {
        type: Number,
        default: 0,
      },
    },
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
    conn, modelTeacher, modelUser, modelComments,
  };
};

export default connection;
