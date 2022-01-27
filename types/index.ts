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

export interface Vote {
  userId: string;
  teacherId: string
  scoreClarity: number;
  scoreAssistance: number;
  scoreTakeClassAgain: number;
}

export interface Teacher {
  _id?: string;
  name: string;
  area: string;
  rating :{
    scoreClarity: number;
    scoreAssistance: number;
    scoreTakeClassAgain: number;
  };
}

export interface Comment {
  _id?: string;
  userId: string;
  teacherId: string;
  updatedAt?: string;
  createdAt: string;
  body: string;
}

export interface User {
  _id?: string;
  name: string;
  email: string;
  image?: string;
}
