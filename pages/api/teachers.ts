import { connection } from "@utils";
import { NextApiRequest, NextApiResponse } from "next";
import {
  ResponseFuncs, ITeacher, IComment, IVote,
} from "@types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs;

  const { name } = req.query;
  const handleCase: ResponseFuncs = {
    GET: async () => {
      const { modelTeacher } = await connection();

      if (name) {
        const teacher: ITeacher = await modelTeacher.findOne({ name });
        res.status(200).send(teacher);
      } else {
        const teachers: ITeacher[] = await modelTeacher.find();
        res.status(200).send(teachers);
      }
    },
    POST: async () => {
      const { modelTeacher, modelComment, modelVote } = await connection();
      const teachers: ITeacher[] = await modelTeacher.find();

      const format = [];

      for (let index = 0; index < teachers.length; index += 1) {
        const teacher = teachers[index];

        // eslint-disable-next-line no-await-in-loop
        const votes: IVote[] = await modelVote.find({ teacherId: teacher?._id });
        // eslint-disable-next-line no-await-in-loop
        const comments: IComment[] = await modelComment.find({ teacherId: teacher?._id });

        format.push({
          id: teacher._id,
          name: teacher.name,
          area: teacher.area,
          votes: votes.length,
          comments: comments.length,
        });
      }

      res.status(200).send(format);
    },
  };

  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: "No response for this request" });
};

export const config = {
  api: {
    externalResolver: true,
  },
};

export default handler;
