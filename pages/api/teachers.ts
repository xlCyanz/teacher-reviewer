import _ from "lodash";
import fs from "fs";
import { connection } from "@utils";
import { NextApiRequest, NextApiResponse } from "next";
import {
  ResponseFuncs, ITeacher, IComment, IVote,
} from "@types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs;
  const handleCase: ResponseFuncs = {
    POST: async () => {
      const { modelTeacher, modelComment, modelVote } = await connection();
      const teachersFromDB: ITeacher[] = await modelTeacher.find();

      const format = [];

      for (let index = 0; index < teachersFromDB.length; index += 1) {
        const teacher = _.omit(teachersFromDB[index], ["__v"]);

        // eslint-disable-next-line no-await-in-loop
        const votes: IVote[] = await modelVote.find({ teacherId: teacher?._id });
        // eslint-disable-next-line no-await-in-loop
        const comments: IComment[] = await modelComment.find({ teacherId: teacher?._id });

        format.push({
          teacher,
          votes: votes.length,
          comments: comments.length,
        });
      }

      fs.writeFileSync("./public/teachers.json", JSON.stringify(format));
      res.status(200).send({});
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
