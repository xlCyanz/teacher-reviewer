import Swal from "sweetalert2";
import client from "apollo-client";
import withReactContent from "sweetalert2-react-content";
import { gql } from "@apollo/client";
import { AnnotationIcon } from "@heroicons/react/outline";

interface Props {
    userId: string;
    teacherId: string;
}

const QUERY_COMMENT = gql`
    mutation Comment($teacherId: ID!, $userId: ID!, $body: String!) {
        addComment(comment: {
            teacherId: $teacherId,
            userId: $userId,
            body: $body
        }) {
        _id
        }
    }
`;

const CommentButton = ({ userId, teacherId }: Props) => {
  const MySwal = withReactContent(Swal);

  const comment = async () => {
    const { value: body } = await Swal.fire({
      title: "¿Que piensas acerca del profesor?",
      icon: "question",
      input: "textarea",
      inputPlaceholder: "Type your comment here...",
      inputValidator: (value) => {
        if (!value) return "You need to type something!";
        if (value.length > 150) return "Only 150 characters are allowed!";
        return null;
      },
      inputAttributes: {
        "aria-label": "Type your comment here",
      },
      showCancelButton: true,
    });

    if (body) {
      try {
        await client.mutate({
          mutation: QUERY_COMMENT,
          variables: {
            userId,
            teacherId,
            body,
          },
        });
        MySwal.fire({
          title: "Guardado",
          icon: "success",
          text: "Tu comentario se guardo en nuestros registros. (Muchas veces tarda en reflejarse el comentario)",
        }).then(() => {
          if (typeof window !== "undefined") window.location.reload();
        });
      } catch {
        MySwal.fire({
          title: "Uups...",
          icon: "error",
          text: "Contacta a un administrador, este error es super raro.",
        });
      }
    }
  };

  return (
    <button type="button" onClick={comment} className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md md:w-auto bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none">
      <div className="flex items-center">
        <div className="mr-2 font-semibold text-white">
          Leave a comment
        </div>
        <AnnotationIcon className="w-6 h-6" />
      </div>
    </button>
  );
};

export default CommentButton;
