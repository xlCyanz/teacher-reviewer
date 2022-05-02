import { FC } from "react";

// Import packages.
import Swal from "sweetalert2";
import client from "apollo-client";
import withReactContent from "sweetalert2-react-content";
import { gql } from "@apollo/client";
import { ThumbUpIcon } from "@heroicons/react/outline";

// Import modules.
import { DefaultColorContext } from "@contexts";

interface IVoteButtonProps {
    userId: string | undefined;
    teacherId: string | undefined;
}

const QUERY_VOTE = gql`
  mutation GetData ($userId: ID!, $teacherId: ID!, $clarity: Int!, $assistance: Int!, $takeclassagain: Int!) {
    voteForTeacher(
      vote: { 
        userId: $userId,
        teacherId: $teacherId,
        scoreClarity: $clarity,
        scoreAssistance: $assistance,
        scoreTakeClassAgain: $takeclassagain,
      }
    )
  }
`;

const VoteButton: FC<IVoteButtonProps> = ({ userId, teacherId }) => {
  const { color } = DefaultColorContext.useContext();
  const MySwal = withReactContent(Swal);

  const vote = async () => {
    const inputOptions = new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          1: "1",
          2: "2",
          3: "3",
          4: "4",
          5: "5",
        });
      }, 500);
    });

    const handleError = (value: string) => {
      if (!value) return "Necesitas votar o saltar!";
      return null;
    };

    const config = {
      inputValidator: handleError,
      confirmButtonColor: `${color}`,
      showCancelButton: true,
      cancelButtonText: "Saltar",
    };

    const { value: assistance } = await MySwal.fire({
      title: "¿El profesor/a asistió correctamente a las reuniones?",
      icon: "question",
      input: "radio",
      inputOptions,
      ...config,
    });

    const { value: takeclassagain } = await MySwal.fire({
      title: "¿Volverías a tomar clase con este profesor/a?",
      icon: "question",
      input: "radio",
      inputOptions,
      ...config,
    });

    const { value: clarity } = await MySwal.fire({
      title: "Califica la claridad del profesor al exponer un tema.",
      icon: "question",
      input: "radio",
      inputOptions,
      ...config,
    });

    if (assistance || clarity || takeclassagain) {
      try {
        await client.mutate({
          mutation: QUERY_VOTE,
          variables: {
            userId,
            teacherId,
            assistance: Number(assistance) || 0,
            clarity: Number(clarity) || 0,
            takeclassagain: Number(takeclassagain) || 0,
          },
        });

        MySwal.fire({
          title: "Votado",
          icon: "success",
          text: "Tu voto se guardo en nuestros registros.",
          confirmButtonColor: `${color}`,
        });
      } catch (err) {
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
    <button type="button" onClick={vote} className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-gray-50 transition-all duration-200 hover:border-2 border-default-color rounded shadow-md md:w-auto bg-default-color focus:shadow-outline focus:outline-none">
      <div className="flex items-center">
        <div className="mr-2 font-semibold text-gray-50">
          Deja tu voto
        </div>
        <ThumbUpIcon className="w-6 h-6" />
      </div>
    </button>
  );
};

export default VoteButton;
