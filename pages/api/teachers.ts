import fs from "fs";
import { connection } from "@utils";
import { ResponseFuncs, ITeacher } from "@types";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs;
  const handleCase: ResponseFuncs = {
    GET: async () => {
      const { modelTeacher } = await connection();
      const teachersFromDB: ITeacher[] = await modelTeacher.find({});
      const teachers = fs.readFileSync("./public/teachers.json");

      if (JSON.stringify(teachersFromDB) !== JSON.stringify(teachers)) {
        fs.writeFileSync("./public/teachers.json", JSON.stringify(teachersFromDB));
      }

      return res.status(200).json({});
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
