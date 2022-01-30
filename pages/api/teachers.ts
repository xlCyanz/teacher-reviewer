import { connection } from "@utils";
import { ResponseFuncs } from "@types";
import { NextApiRequest, NextApiResponse } from "next";
import teachers from "../../public/teachers.json";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs;
  const catcher = (error: Error) => res.status(400).json({ error });
  const { id } = req.query;

  const handleCase: ResponseFuncs = {
    POST: async (request: NextApiRequest, response: NextApiResponse) => {
      return response.json(teachers);
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
