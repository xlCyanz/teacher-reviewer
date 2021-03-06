import { FC, SVGProps } from "react";
import { NextApiRequest, NextApiResponse } from "next";

export type Icon = FC<SVGProps<SVGSVGElement>>;
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

interface ITeacherRating {
  scoreClarity: number;
  scoreAssistance: number;
  scoreTakeClassAgain: number;
}

export interface ITeacher {
  _id?: string;
  name: string;
  area: string;
  rating?: ITeacherRating;
}

export interface IComment {
  _id?: string;
  userId: IUser;
  teacherId: ITeacher;
  updatedAt?: string;
  createdAt: string;
  body: string;
}

export interface IDetails {
  title: string;
  subtitle: string;
  icon: Icon;
  percentage: string;
}

type Offer = {
  title: string;
  icon: Icon;
}
export interface IFeatures {
    title: string;
    subtitle: string;
    icon: Icon
    offers: Offer[]
}
