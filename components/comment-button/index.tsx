import { FC } from "react";

// Import packages.
import Swal from "sweetalert2";
import client from "apollo-client";
import withReactContent from "sweetalert2-react-content";
import { gql } from "@apollo/client";
import { AnnotationIcon } from "@heroicons/react/outline";

// Import modules.
import { DefaultColorContext } from "@contexts";

interface ICommentButtonProps {
    userId: string | undefined;
    teacherId: string | undefined;
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

const CommentButton: FC<ICommentButtonProps> = ({ userId, teacherId }) => {
  const { color } = DefaultColorContext.useContext();

  const MySwal = withReactContent(Swal);

  const handleComment = async () => {
    const { value: body } = await MySwal.fire({
      title: "¿Que piensas acerca del profesor/a?",
      icon: "question",
      input: "textarea",
      inputPlaceholder: "Escribe el comentario aqui...",
      inputValidator: (value) => {
        if (!value) return "Necesitas escribir el comentario!";
        if (value.length > 150) return "Solamente se permite 150 caracteres!";
        return null;
      },
      inputAttributes: {
        "aria-label": "Escribe el comentario aqui",
      },
      showCancelButton: true,
      confirmButtonColor: `${color}`,
      cancelButtonText: "Cancelar",
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
          text: "Tu comentario se guardo en nuestros registros.",
          confirmButtonColor: `${color}`,
        }).then(() => {
          if (typeof window !== "undefined") {
            window.location.reload();
          }
        });
      } catch (err) {
        // console.log(JSON.stringify(err, null, 2));
        MySwal.fire({
          title: "Uups...",
          icon: "error",
          text: "Contacta a un administrador, este error es super raro.",
          confirmButtonColor: `${color}`,
        });
      }
    }
  };

  return (
    <button type="button" onClick={handleComment} className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-gray-50 transition-all duration-200 hover:border-2 border-default-color rounded shadow-md md:w-auto bg-default-color focus:shadow-outline focus:outline-none">
      <div className="flex items-center">
        <div className="mr-2 font-semibold text-gray-50">
          Deja un comentario
        </div>
        <AnnotationIcon className="w-6 h-6" />
      </div>
    </button>
  );
};

export default CommentButton;
