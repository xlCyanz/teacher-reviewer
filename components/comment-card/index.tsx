import { IComment } from "@types";
import { TimeSince } from "@utils";

const CommentCard = ({
  updatedAt, createdAt, body, userId: user,
}: IComment) => {
  const timesince = TimeSince(updatedAt || createdAt, "es");
  const username = user?.name.split(" ");

  return (
    <div className="p-8 bg-white dark:bg-default-color rounded shadow-xl">
      <p className="mb-3 text-xs font-semibold tracking-wide uppercase">
        <span className="text-default-color dark:text-gray-100">
          {timesince}
        </span>
      </p>
      <p className="mb-5 text-gray-700 dark:text-gray-100">
        {body}
      </p>
      <div className="flex items-center">
        <div className="bg-default-color dark:bg-gray-100 flex-shrink-0 w-10 h-10 flex justify-center items-center rounded-full shadow-sm mr-3">
          <span className="font-semibold text-lg text-gray-100 dark:text-default-color">{username[0].slice(0, 2)}</span>
        </div>
        <div>
          <h1 className="font-semibold text-gray-900 dark:text-gray-100">
            {`${username[0]} ${username[1]}`}
          </h1>
          <p className="text-sm font-medium leading-4 text-gray-600 dark:text-gray-300">
            Usuario
          </p>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
