import { NextApiRequest, NextApiResponse } from "next";

export interface ITabs {
  name: string;
  href: string;
}

export interface ResponseFuncs {
  GET?: (request: NextApiRequest, response: NextApiResponse) => Promise<void>;
  POST?: (request: NextApiRequest, response: NextApiResponse) => Promise<void>;
  PUT?: (request: NextApiRequest, response: NextApiResponse) => Promise<void>;
  DELETE?: (request: NextApiRequest, response: NextApiResponse) => Promise<void>;
}

export interface IVote {
  userId: string;
  teacherId: string
  scoreClarity: number;
  scoreAssistance: number;
  scoreTakeClassAgain: number;
}

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  image?: string;
}

export interface ITeacher {
  _id?: string;
  name: string;
  area: string;
  rating?: {
    scoreClarity: number;
    scoreAssistance: number;
    scoreTakeClassAgain: number;
  };
  _v?: string;
}

export interface IComment {
  _id?: string;
  userId: IUser;
  teacherId: ITeacher;
  updatedAt?: string;
  createdAt: string;
  body: string;
}
