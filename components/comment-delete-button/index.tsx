import Swal from "sweetalert2";
import client from "apollo-client";
import withReactContent from "sweetalert2-react-content";
import { gql } from "@apollo/client";
import { TrashIcon } from "@heroicons/react/outline";

interface Props {
    commentId: string | undefined;
    body: string | undefined;
}

const QUERY_COMMENT = gql`
    mutation DeleteComment($commentId: ID!) {
        deleteComment(id: $commentId)
    }
`;

const CommentDeleteButton = ({ commentId, body }: Props) => {
  const MySwal = withReactContent(Swal);

  const handleDelete = async () => {
    const { value } = await MySwal.fire({
      title: "¿Estas seguro que deseas borrar este comentario?",
      text: `"${body}"`,
      icon: "question",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
    });

    if (value) {
      try {
        const { data } = await client.mutate({
          mutation: QUERY_COMMENT,
          variables: {
            commentId,
          },
        });

        if (data?.deleteComment) {
          MySwal.fire({
            title: "¡Comentario borrado!",
            icon: "success",
            text: "Este comentario ya no se encuentra en nuestros registros.",
          }).then(() => {
            if (typeof window !== "undefined") {
              window.location.reload();
            }
          });
        } else throw new Error();
      } catch (err) {
        MySwal.fire({
          title: "Uups...",
          icon: "error",
          text: "Se ha producido un error al intentar borrar el comentario, reinicia la pagina y vuelve a intentar. Si el error continua contacta al administrador la pagina.",
        });
      }
    }
  };

  return (
    <button type="button" className="flex items-center" onClick={handleDelete}>
      <TrashIcon className="w-6 h-6 text-gray-100" />
    </button>
  );
};

export default CommentDeleteButton;
