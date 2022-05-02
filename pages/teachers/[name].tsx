/* eslint-disable react/jsx-props-no-spreading */
import { useMemo, useState } from "react";

// Import packages.
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { gql, useQuery } from "@apollo/client";
import {
  ClockIcon,
  RewindIcon,
  AnnotationIcon,
  SpeakerphoneIcon,
} from "@heroicons/react/outline";

// Import modules.
import { MainLayout } from "@layouts";
import { IComment, IDetails } from "@types";
import {
  VoteButton,
  Pagination,
  CommentCard,
  DetailsCard,
  CommentButton,
} from "@components";

const query = gql`
  query GetTeacherData ($teacherName: String!, $userId: ID) {
    teacher(name: $teacherName) {
      _id
      name
      area
      rating {
        scoreClarity
        scoreAssistance
        scoreTakeClassAgain
      }
    }
    comments(teacherName: $teacherName) {
      _id
      body
      createdAt
      updatedAt
      userId {
        _id
        name
        image
      }
    }
    checkUserVote(userId: $userId, teacherName: $teacherName)
  }
`;

const TeacherPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { loading, error, data } = useQuery(
    query,
    {
      variables: {
        teacherName: router?.query.name || "",
        userId: session?.user?.id || null,
      },
    },
  );

  const MySwal = withReactContent(Swal);

  const [pageSize] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);

  const firstPageIndex = (currentPage - 1) * pageSize;
  const lastPageIndex = firstPageIndex + pageSize;

  const checkUserComment = useMemo(() => {
    const result = data?.comments?.find((comment: IComment) => {
      return comment.userId._id === session?.user?.id;
    });

    if (result) return true;
    return null;
  }, [data, session]);

  const details: IDetails[] = [
    {
      title: "Comentarios",
      subtitle: "Encuentra los comentarios debajo de esta seccion.",
      icon: AnnotationIcon,
      percentage: data?.comments?.length,
    },
    {
      title: "Asistencia",
      subtitle: "¿El profesor es responsable en asistir en el horario establecido a las reuniones?",
      icon: ClockIcon,
      percentage: `${data?.teacher?.rating?.scoreAssistance || 0}%`,
    },
    {
      title: "Volver a tomar clases",
      subtitle: "¿Volverias a tomar clases con este profesor?",
      icon: RewindIcon,
      percentage: `${data?.teacher?.rating?.scoreTakeClassAgain || 0}%`,
    },
    {
      title: "Claridad",
      subtitle: "Claridad y calidad del profesor al exponer correctamente un tema.",
      icon: SpeakerphoneIcon,
      percentage: `${data?.teacher?.rating?.scoreClarity || 0}%`,
    },
  ];

  if (error) {
    // console.log(JSON.stringify(error, null, 2));
    MySwal.fire({
      title: `Uups...`,
      text: "El profesor al que intentas buscar no existe en nuestros registros.",
      icon: "error",
    }).then(() => router.push("/teachers"));
  }

  if (loading) {
    return (
      <MainLayout title="Cargando...">
        <div className="flex flex-col gap-4 justify-center items-center bg-gray-100 dark:bg-gray-900 h-screen w-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-l-2 border-default-color" />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout title={`Teacher Reviewer - ${data?.teacher?.name}`}>
      <main className="relative bg-default-color dark:bg-gray-900 dark:mb-0 pb-16">
        <div className="relative py-10 sm:py-12 px-4 sm:px-0 text-center h-full max-w-2xl sm:mx-auto sm:max-w-xl md:max-w-2xl">
          <h2 className="mb-4 text-center text-5xl font-bold tracking-tight text-gray-50 lg:text-6xl sm:leading-none">
            {`Prof. ${data?.teacher?.name || ""}`}
          </h2>
          <p className="max-w-md text-lg pb-6 sm:pb-4 font-medium dark:sm:pb-5 tracking-wide text-gray-100 dark:text-default-color sm:mx-auto">
            {data?.teacher?.area}
          </p>
        </div>
        <div className="px-4 py-16 mx-auto sm:max-w-xl bg-white dark:bg-gray-900 rounded-md md:max-w-full lg:max-w-screen-xl md:px-16 lg:px-10 lg:py-20">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {details.map((detail) => (
              <DetailsCard key={detail.title} {...detail} />
            ))}
          </div>
          {status === "authenticated" && (
          <div className="flex justify-center items-center gap-4 my-6">
            {!data?.checkUserVote && (
              <VoteButton
                userId={session?.user?.id}
                teacherId={data?.teacher?._id}
              />
            )}
            {!checkUserComment && (
              <CommentButton
                userId={session?.user?.id}
                teacherId={data?.teacher?._id}
              />
            )}
          </div>
          )}
          {data?.comments?.length >= 1 && (
          <div className="py-10 sm:py-20 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:leading-none text-gray-900 dark:text-gray-100">
              Comentarios
            </h2>
            <div className="grid gap-4 grid-cols-1">
              {data?.comments?.slice(firstPageIndex, lastPageIndex).map((comment: IComment) => (
                <CommentCard key={comment._id} {...comment} />
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              totalCount={data?.comments?.length || 0}
              pageSize={pageSize}
              changeCurrentPage={(page) => setCurrentPage(page)}
            />
          </div>
          )}
        </div>
      </main>
    </MainLayout>
  );
};

export default TeacherPage;
