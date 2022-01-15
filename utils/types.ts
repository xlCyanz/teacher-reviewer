import { NextApiRequest, NextApiResponse } from "next";

export interface PropertyTabs {
  name: string;
  href: string;
}

export interface ResponseFuncs {
  GET?: (request: NextApiRequest, response: NextApiResponse) => Promise<void>;
  POST?: (request: NextApiRequest, response: NextApiResponse) => Promise<void>;
  PUT?: (request: NextApiRequest, response: NextApiResponse) => Promise<void>;
  DELETE?: (request: NextApiRequest, response: NextApiResponse) => Promise<void>;
}
