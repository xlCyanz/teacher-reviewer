import { FC } from "react";

// Import packages.
import Link from "next/link";
import { AnnotationIcon, ArrowRightIcon, ThumbUpIcon } from "@heroicons/react/outline";

interface ITeacherCardProps {
  name: string;
  area: string;
  votes: number;
  comments: number;
}

const TeacherCard: FC<ITeacherCardProps> = ({
  name, area, votes, comments,
}) => {
  return (
    <div className="col-span-2 bg-default-color shadow-md dark:bg-gray-800 px-5 rounded">
      <div className="flex flex-col py-5 h-full">
        <div className="flex-1">
          <p className="text-2xl font-bold leading-6 text-gray-100 dark:text-gray-200 mb-2">
            {name}
          </p>
          <p className="mb-4 text-gray-200 dark:text-gray-200 font-medium">
            {area}
          </p>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-row space-x-4">
            <div className="flex items-center text-gray-100 dark:text-gray-200">
              <ThumbUpIcon className="w-6 h-6 mr-2" />
              <span className="font-semibold">{votes}</span>
            </div>
            <div className="flex items-center text-gray-100 dark:text-gray-200">
              <AnnotationIcon className="w-6 h-6 mr-2" />
              <span className="font-semibold">{comments}</span>
            </div>
          </div>
          <Link href={`teachers/${name}`} passHref>
            <a className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-default-color dark:text-default-color bg-gray-100 rounded-md">
              Opiniones
              <ArrowRightIcon className="ml-2 -mr-1 w-4 h-4" />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TeacherCard;
