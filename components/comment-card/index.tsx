import { IComment } from "@types";
import { TimeSince } from "@utils";

const CommentCard = ({
  _id, updatedAt, createdAt, body, userId: user,
}: IComment) => {
  return (
    <div key={_id} className="p-8 bg-white border rounded shadow-xl">
      <p className="mb-3 text-xs font-semibold tracking-wide uppercase">
        <span className="text-deep-purple-accent-400 hover:text-deep-purple-800">
          {`${TimeSince(updatedAt || createdAt || "")}`}
        </span>
      </p>
      <p className="mb-5 text-gray-700">
        {body}
      </p>
      <div className="flex items-center">
        <div className="bg-deep-purple-accent-400 flex-shrink-0 w-10 h-10 flex justify-center items-center rounded-full shadow-sm mr-3">
          <span className="font-semibold text-lg text-gray-100">{user?.name.slice(0, 2)}</span>
        </div>
        <div>
          <h1 className="font-semibold text-gray-800 transition-colors duration-200 hover:text-deep-purple-accent-400">
            {user?.name}
          </h1>
          <p className="text-sm font-medium leading-4 text-gray-600">
            Usuario
          </p>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
