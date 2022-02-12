import { connection, getRating } from "@utils";
import { ITeacher, IVote, IUser } from "@types";

const resolvers = {
  Query: {
    teachers: async () => {
      const { modelTeacher } = await connection();
      const teachers: ITeacher[] = await modelTeacher.find();
      return teachers;
    },
    comments: async (_: never, { teacherName }: { teacherName: string }) => {
      const { modelComment, modelTeacher } = await connection();

      try {
        const teacher: ITeacher = await modelTeacher.findOne({ name: teacherName });

        const comments: Comment[] = await modelComment.find({
          teacherId: teacher._id,
        }).populate("userId");

        return comments;
      } catch (error) {
        return null;
      }
    },
    teacher: async (_: never, { name }: { name: string }) => {
      const { modelTeacher, modelVote } = await connection();

      try {
        const teacher: ITeacher = await modelTeacher.findOne({ name });
        const votes = await modelVote.find({ teacherId: teacher._id });

        const {
          scoreAssistance,
          scoreTakeClassAgain,
          scoreClarity,
        } = getRating(votes);

        teacher.rating = { scoreAssistance, scoreTakeClassAgain, scoreClarity };
        return teacher;
      } catch (error) {
        return null;
      }
    },
    teachersByArea: async (_: never, { area }: { area: string }) => {
      const { modelTeacher } = await connection();
      const teachers: ITeacher[] = await modelTeacher.find({ area });
      return teachers;
    },
    users: async () => {
      const { modelUser } = await connection();
      const users: IUser[] = await modelUser.find({});
      return users;
    },
    user: async (_: never, { email }: { email: string }) => {
      const { modelUser } = await connection();
      const user: IUser = await modelUser.findOne({ email });
      return user;
    },
  },

  Mutation: {
    addTeacher: async (_: never, { newTeacher }: { newTeacher: ITeacher }) => {
      const { modelTeacher } = await connection();
      const teacher = await modelTeacher.create(newTeacher);
      return teacher;
    },
    updateTeacher: async (
      _: never,
      { teacherName, newTeacher }: { teacherName: string, newTeacher: ITeacher },
    ) => {
      const { modelTeacher } = await connection();
      const TeacherUpdated: ITeacher = await modelTeacher.findOneAndUpdate({
        name: teacherName,
      }, newTeacher);
      return TeacherUpdated;
    },
    voteForTeacher: async (_: never, { vote }: { vote: IVote }) => {
      const { modelVote } = await connection();
      try {
        await modelVote.create(vote);
        return true;
      } catch (error) {
        return false;
      }
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
      const { modelComment } = await connection();
      const newComment = await modelComment.create(comment);
      return newComment;
    },
    updateComment: async (
      _: never,
      { newComment, id }: { newComment: string; id: string },
    ) => {
      const { modelComment } = await connection();

      const query = {
        body: newComment,
        updatedAt: new Date().toLocaleString(),
      };

      try {
        await modelComment.updateOne({ _id: id }, query);
        return true;
      } catch (error) {
        return false;
      }
    },
    deleteComment: async (_: never, { id }: { id: string }) => {
      const { modelComment } = await connection();
      const CommentDeleted: Comment = await modelComment.findByIdAndDelete(id);
      return CommentDeleted;
    },
  },
};

export default resolvers;
