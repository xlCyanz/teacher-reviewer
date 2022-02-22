import { IComment } from "@types";
import { TimeSince } from "@utils";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import CommentDeleteButton from "../comment-delete-button";

const allowsId = [
  "6205ecaf92ccf80c2063cc4a",
  "6203301ddc30fe384b48c1e0",
];

const CommentCard = ({
  _id, updatedAt, createdAt, body, userId: user,
}: IComment) => {
  const { data: session } = useSession();

  const timesince = TimeSince(updatedAt || createdAt, "es");
  const username = user?.name.split(" ");

  const canDelete = useMemo(() => {
    switch (session?.user.id) {
      case user._id:
      case allowsId[0]:
      case allowsId[1]:
        return true;
      default:
        return false;
    }
  }, [session?.user.id, user._id]);

  return (
    <div className="bg-default-color dark:bg-gray-800 col-span-1 p-4 rounded-lg h-full">
      <p className="text-xs mb-2 font-semibold tracking-wide text-gray-50 uppercase">
        {timesince}
      </p>
      <p className="mb-4 text-md text-gray-100 font-medium md:text-md border-l-4 pl-2 dark:border-default-color py-1">
        {body}
      </p>
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <div className="flex justify-center items-center w-10 h-10 font-semibold text-lg text-default-color rounded-full bg-gray-100">
            {username[0].slice(0, 2)}
          </div>
          <div>
            <div className="font-semibold text-gray-200">
              {`${username[0]} ${username[1]}`}
            </div>
            <p className="text-sm font-medium leading-4 text-gray-300">
              Usuario
            </p>
          </div>
        </div>
        {canDelete && <CommentDeleteButton commentId={_id} body={body} />}
      </div>
    </div>
  );
};

export default CommentCard;
