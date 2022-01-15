import connection from "@utils/connection";
import { ResponseFuncs } from "@utils/types";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs;
  const catcher = (error: Error) => res.status(400).send(error);

  const handleCase: ResponseFuncs = {
    GET: async (request: NextApiRequest, response: NextApiResponse) => {
      const { modelTeacher } = await connection();

      response.json(await modelTeacher.find().catch(catcher));
    },
    // POST: async (request: NextApiRequest, response: NextApiResponse) => {
    //   const { modelTeacher } = await connection();

    //   TeachersJson?.teachers?.map(async (teacher) => {
    //     const { Profesor, Area } = _.pick(teacher, ["Profesor", "Area"]);

    //     const data = {
    //       name: Profesor,
    //       area: Area,
    //     };

    //     if (!await modelTeacher.findOne({ name: Profesor }).catch(catcher)) {
    //       await modelTeacher.create(data).catch(catcher);
    //     }

    //     response.json({ success: true });
    //   });
    // },
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
