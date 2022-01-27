import { connection } from "@utils";
import { getRating } from "graphql/utils";
import { Teacher, Vote, User, Comment } from "types";

const resolvers = {
  Query: {
    teachers: async () => {
      const { modelTeacher } = await connection();
      const teachers: Teacher[] = await modelTeacher.find();
      return teachers;
    },
    comments: async (_: never, { teacherName }: { teacherName: string }) => {
      const { modelComments } = await connection();
      const { modelTeacher } = await connection();
      const teacher: Teacher = await modelTeacher.findOne({name: teacherName});
      const comments: Array<Comment> = await modelComments.find({
        teacherId: teacher._id,
      }).populate("userId").populate("teacherId");
      console.log(comments);
      return comments;
    },
    teacher: async (_: never, { name }: { name: string }) => {
      const { modelTeacher } = await connection();
      const teacher: Teacher = await modelTeacher.findOne({ name });
      console.log(teacher._id)
      const {scoreAssistance,scoreTakeClassAgain, scoreClarity} = getRating(teacher.votes)
      const teacherWithoutVotes = {
        _id: teacher._id,
        name: teacher.name,
        area: teacher.area,
        rating: {scoreAssistance,scoreTakeClassAgain, scoreClarity},
      }
      return teacherWithoutVotes;
    },
    teachersByArea: async (_: never, { area }: { area: string }) => {
      const { modelTeacher } = await connection();
      const teachers: Teacher[] = await modelTeacher.find({ area });
      return teachers;
    },
    users: async () => {
      const { modelUser } = await connection();
      const users: User[] = await modelUser.find({});
      return users;
    },
    user: async (_: never, { name }: { name: string }) => {
      const { modelUser } = await connection();
      const user: User = await modelUser.findOne({ name });
      return user;
    },
  },

  Mutation: {
    addTeacher: async (_: never, { newTeacher }: { newTeacher: Teacher }) => {
      const { modelTeacher } = await connection();
      const teacher = await modelTeacher.create(newTeacher);
      return teacher;
    },
    updateTeacher: async (
      _: never,
      { teacherName, newTeacher }: { teacherName: string, newTeacher: Teacher },
    ) => {
      const { modelTeacher } = await connection();
      const TeacherUpdated: Teacher = await modelTeacher.findOneAndUpdate({
        name: teacherName,
      }, newTeacher);
      return TeacherUpdated;
    },
    voteForTeacher: async (
      _: never,
      {
        vote,
        teacherName,
      }: { vote: Vote; teacherName: string },
    ) => {
      const { modelTeacher } = await connection();
      const teacherUpdated = await modelTeacher.updateOne(
        { name: teacherName },
        { $push: { votes: vote } },
      );

      return teacherUpdated;
    },
    deleteTeacher: async (_: never, { teacherName }: { teacherName: string }) => {
      const { modelTeacher } = await connection();
      try {
        await modelTeacher.deleteOne({ name: teacherName });
        return true;
      } catch (error) {
        return false;
      }
    },
    addComment: async (_: never, { comment }: { comment: Comment }) => {
      const { modelComments } = await connection();
      const newComment = await modelComments.create(comment);
      return newComment;
    },
    updateComment: async (
      _: never,
      { newComment, id }: { newComment: string; id:string },
    ) => {
      const { modelComments } = await connection();
      const CommentUpdated = await modelComments.findOne({ id });
      CommentUpdated.body = newComment;
      CommentUpdated.updatedAt = new Date().toLocaleString();
      CommentUpdated.save();
      return CommentUpdated;
    },
    deleteComment: async (_: never, { id }: { id: string }) => {
      const { modelComments } = await connection();
      const CommentDeleted: Comment = await modelComments.findByIdAndDelete(
        id,
        (_err:never, doc: Comment) => doc,
      );
      return CommentDeleted;
    },

    addUser: async (_:never, { newUser }: { newUser: User }) => {
      const { modelUser } = await connection();
      const user: User = await modelUser.create(newUser);
      return user;
    },
    updateUser: async (_:never, { name, newUser }: { name: string; newUser: User }) => {
      const { modelUser } = await connection();
      const TeacherUpdated: Teacher = await modelUser.findOneAndUpdate({ name }, newUser);
      return TeacherUpdated;
    },
    deleteUser: async (_:never, { name }: { name: string }) => {
      const { modelTeacher } = await connection();
      try {
        await modelTeacher.deleteOne({ name });
        return true;
      } catch (error) {
        return false;
      }
    },
  },
};

export default resolvers;
