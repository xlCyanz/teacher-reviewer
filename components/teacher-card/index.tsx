import { AnnotationIcon, ThumbUpIcon } from "@heroicons/react/outline";

interface Props {
  name: string;
  area: string;
  votes: number;
  comments: number;
}

const TeacherCard = ({
  name, area, votes, comments,
}: Props) => {
  return (
    <div className="col-span-1 bg-default-color shadow-md hover:ring-2 ring-default-color dark:bg-gray-800 transition-colors duration-200 px-5 rounded h-full">
      <div className="flex flex-col py-5 h-full">
        <div className="flex-1">
          <p className="text-2xl font-bold leading-6 text-gray-100 dark:text-gray-200 mb-2">
            {name}
          </p>
          <p className="mb-4 text-gray-300 dark:text-gray-200 font-medium">
            {area}
          </p>
        </div>
        <div className="flex space-x-4">
          <div className="flex items-center text-gray-100 dark:text-gray-200">
            <div className="mr-2">
              <ThumbUpIcon className="w-6 h-6" />
            </div>
            <p className="font-semibold">{votes}</p>
          </div>
          <div className="flex items-center text-gray-100 dark:text-gray-200">
            <div className="mr-2">
              <AnnotationIcon className="w-6 h-6" />
            </div>
            <p className="font-semibold">{comments}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherCard;
