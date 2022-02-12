/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-props-no-spreading */
import _ from "lodash";
import Head from "next/head";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Children } from "react";
import { useRouter } from "next/router";
import { MainLayout } from "@layouts";
import { useSession } from "next-auth/react";
import { gql, useQuery } from "@apollo/client";
import { CommentButton, VoteButton, CommentCard } from "@components";
import {
  AnnotationIcon,
  ClockIcon,
  RewindIcon,
  SpeakerphoneIcon,
} from "@heroicons/react/outline";

const query = gql`
  query GetTeacherName ($teacherName: String!) {
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
    comments(teacherName: $teacherName){
      _id
      body
      createdAt
      updatedAt
      userId {
        name
        image
      }
    }
  }
`;

const TeacherPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { loading, error, data } = useQuery(
    query,
    { variables: { teacherName: `${router?.query?.name}` } },
  );

  const MySwal = withReactContent(Swal);

  if (error) {
    MySwal.fire({
      title: `Uups...`,
      text: "El profesor al que intentas buscar no existe en nuestros registros.",
      icon: "error",
    }).then(() => router.push("/teachers"));
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center bg-gray-100 dark:bg-gray-900 h-screen w-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-l-2 border-default-color" />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>
          {`Teacher Reviewer - ${data?.teacher?.name}`}
        </title>
        <meta name="description" content="Teacher Reviewer" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <MainLayout>
        <main className="relative bg-default-color dark:bg-gray-900 dark:mb-0 pb-16">
          <div className="relative py-10 sm:py-12 px-4 sm:px-0 text-center h-full max-w-2xl sm:mx-auto sm:max-w-xl md:max-w-2xl">
            <h2 className="mb-4 text-center text-5xl font-bold tracking-tight text-white lg:text-6xl sm:leading-none">
              {`Prof. ${data?.teacher?.name || ""}`}
            </h2>
            <p className="max-w-md text-lg pb-6 sm:pb-4 font-medium dark:sm:pb-5 tracking-wide text-gray-100 dark:text-default-color sm:mx-auto">
              {data?.teacher?.area}
            </p>
          </div>
          <div className="px-4 py-16 mx-auto sm:max-w-xl bg-white dark:bg-gray-900 rounded-md md:max-w-full lg:max-w-screen-xl md:px-16 lg:px-10 lg:py-20">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="text-center">
                <div className="flex items-center justify-center w-10 h-10 mx-auto mb-3 rounded-full bg-gray-200 dark:bg-default-color sm:w-12 sm:h-12">
                  <AnnotationIcon className="w-6 h-6 sm:w-8 sm:h-8 text-default-color dark:text-gray-100" />
                </div>
                <h6 className="text-4xl font-bold text-default-color">
                  {data?.comments?.length || 0}
                </h6>
                <p className="mb-2 font-bold text-md dark:text-gray-100">
                  Comentarios
                </p>
                <p className="text-gray-700 dark:text-gray-600">
                  Encuentra los comentarios debajo de esta seccion.
                </p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-10 h-10 mx-auto mb-3 rounded-full bg-gray-200 dark:bg-default-color sm:w-12 sm:h-12">
                  <ClockIcon className="w-6 h-6 sm:w-8 sm:h-8 text-default-color dark:text-gray-100" />
                </div>
                <h6 className="text-4xl font-bold text-default-color">
                  {`${data?.teacher?.rating?.scoreAssistance || 0}%`}
                </h6>
                <p className="mb-2 font-bold text-md dark:text-gray-100">
                  Asistencia
                </p>
                <p className="text-gray-700 dark:text-gray-600">
                  ¿El profesor es responsable en asistir en
                  el horario establecido a las reuniones?
                </p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-10 h-10 mx-auto mb-3 rounded-full bg-gray-200 dark:bg-default-color sm:w-12 sm:h-12">
                  <RewindIcon className="w-6 h-6 sm:w-8 sm:h-8 text-default-color dark:text-gray-100" />
                </div>
                <h6 className="text-4xl font-bold text-default-color">
                  {`${data?.teacher?.rating?.scoreTakeClassAgain || 0}%`}
                </h6>
                <p className="mb-2 font-bold text-md dark:text-gray-100">
                  Volver a tomar clases
                </p>
                <p className="text-gray-700 dark:text-gray-600">
                  ¿Volverias a tomar clases con este profesor?
                </p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-10 h-10 mx-auto mb-3 rounded-full bg-gray-200 dark:bg-default-color sm:w-12 sm:h-12">
                  <SpeakerphoneIcon className="w-6 h-6 sm:w-8 sm:h-8 text-default-color dark:text-gray-100" />
                </div>
                <h6 className="text-4xl font-bold text-default-color">
                  {`${data?.teacher?.rating?.scoreClarity || 0}%`}
                </h6>
                <p className="mb-2 font-bold text-md dark:text-gray-100">
                  Claridad
                </p>
                <p className="text-gray-700 dark:text-gray-600">
                  Claridad y calidad del profesor al exponer correctamente un tema.
                </p>
              </div>
            </div>
            {status === "authenticated" && (
              <div className="flex justify-center items-center gap-4 my-6">
                <VoteButton userId={session?.user?.id} teacherId={`${data?.teacher?._id}`} />
                <CommentButton userId={session?.user?.id} teacherId={`${data?.teacher?._id}`} />
              </div>
            )}
            {data?.comments?.length >= 1 && (
              <div className="py-10 sm:py-20 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl">
                <h2 className="mb-4 text-3xl font-bold tracking-tight sm:leading-none text-gray-900 dark:text-gray-100">
                  Comentarios
                </h2>
                <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
                  {Children.toArray(_.map(data?.comments, (comment) => (
                    <CommentCard {...comment} />
                  )))}
                </div>
              </div>
            )}
          </div>
        </main>
      </MainLayout>
    </>
  );
};

export default TeacherPage;
