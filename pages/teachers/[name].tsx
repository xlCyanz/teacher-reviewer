import Head from "next/head";
import MainLayout from "@components/main-layout";
import {
  AnnotationIcon, ClockIcon, RewindIcon, SpeakerphoneIcon,
} from "@heroicons/react/outline";
import { GetServerSideProps } from "next";

interface Props {
    teacher: {
      name: string;
      area: string;
      rating: {
        clarity: number,
        assistance: number,
        takeClassAgain: number,
      }
    },
    comments: [{
      body: string;
      createdAt: Date;
      user: {
        name: string
      }
    }]
}

const Teacher = ({ teacher, comments }: Props) => (
  <>
    <Head>
      <title>
        Teacher Reviewer -
        {" "}
        {teacher?.name}
      </title>
      <meta name="description" content="Teacher Reviewer" />
      <link rel="icon" href="/favicon.png" />
    </Head>

    <div className="bg-deep-purple-accent-700">

      <MainLayout>
        <main className="relative bg-deep-purple-accent-700 dark:bg-deep-purple-accent-400 dark:mb-0">
          <div className="relative py-10 sm:py-12 px-4 sm:px-0 text-center h-full max-w-2xl sm:mx-auto sm:max-w-xl md:max-w-2xl">
            <h2 className="mb-4 font-sans text-center text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl sm:leading-none">
              {`Prof. ${teacher?.name}`}
            </h2>
            <p className="max-w-md text-md pb-6 sm:pb-4 dark:sm:pb-5 tracking-wide text-gray-100 sm:mx-auto">
              {teacher?.area}
            </p>
          </div>
          <div className="px-4 py-16 mx-auto sm:max-w-xl bg-white dark:bg-gray-900 rounded-md md:max-w-full lg:max-w-screen-xl md:px-16 lg:px-10 lg:py-20">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="text-center">
                <div className="flex items-center justify-center w-10 h-10 mx-auto mb-3 rounded-full bg-gray-200 dark:bg-deep-purple-400 sm:w-12 sm:h-12">
                  <AnnotationIcon className="w-6 h-6 sm:w-8 sm:h-8 text-deep-purple-accent-400 dark:text-gray-100" />
                </div>
                <h6 className="text-4xl font-bold text-deep-purple-accent-400">
                  0
                </h6>
                <p className="mb-2 font-bold text-md dark:text-gray-100">Comments</p>
                <p className="text-gray-700 dark:text-gray-600">
                  Comments can be found below.
                </p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-10 h-10 mx-auto mb-3 rounded-full bg-gray-200 dark:bg-deep-purple-400 sm:w-12 sm:h-12">
                  <ClockIcon className="w-6 h-6 sm:w-8 sm:h-8 text-deep-purple-accent-400 dark:text-gray-100" />
                </div>
                <h6 className="text-4xl font-bold text-deep-purple-accent-400">
                  0%
                </h6>
                <p className="mb-2 font-bold text-md dark:text-gray-100">
                  Assistance
                </p>
                <p className="text-gray-700 dark:text-gray-600">
                  Teacher attendance at meetings.
                </p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-10 h-10 mx-auto mb-3 rounded-full bg-gray-200 dark:bg-deep-purple-400 sm:w-12 sm:h-12">
                  <RewindIcon className="w-6 h-6 sm:w-8 sm:h-8 text-deep-purple-accent-400 dark:text-gray-100" />
                </div>
                <h6 className="text-4xl font-bold text-deep-purple-accent-400">
                  0%
                </h6>
                <p className="mb-2 font-bold text-md dark:text-gray-100">Take classes again.</p>
                <p className="text-gray-700 dark:text-gray-600">
                  Would you take classes with this teacher again?
                </p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-10 h-10 mx-auto mb-3 rounded-full bg-gray-200 dark:bg-deep-purple-400 sm:w-12 sm:h-12">
                  <SpeakerphoneIcon className="w-6 h-6 sm:w-8 sm:h-8 text-deep-purple-accent-400 dark:text-gray-100" />
                </div>
                <h6 className="text-4xl font-bold text-deep-purple-accent-400">
                  0%
                </h6>
                <p className="mb-2 font-bold text-md dark:text-gray-100">Clarity</p>
                <p className="text-gray-700 dark:text-gray-600">
                  The clarity of the teacher when explaining topics.
                </p>
              </div>
            </div>
            <div className="py-10 sm:py-20 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl">
              <h2 className="mb-4 font-sans text-3xl font-bold tracking-tight sm:leading-none text-gray-900 dark:text-gray-100">Comentarios</h2>
              <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                {comments.map((comment) => (
                  <div key={comment?.body} className="p-8 bg-white border rounded shadow-xl">
                    <p className="mb-3 text-xs font-semibold tracking-wide uppercase">
                      <span className="text-deep-purple-accent-400 hover:text-deep-purple-800">
                        {`Hace tiempo - (${comment?.createdAt})`}
                      </span>
                    </p>
                    <p className="mb-5 text-gray-700">
                      {comment?.body}
                    </p>
                    <div className="flex items-center">
                      <div className="bg-deep-purple-accent-400 flex-shrink-0 w-10 h-10 flex justify-center items-center rounded-full shadow-sm mr-3">
                        <span className="font-semibold text-lg text-gray-100">Va</span>
                      </div>
                      <div>
                        <h1 className="font-semibold text-gray-800 transition-colors duration-200 hover:text-deep-purple-accent-400">
                          Vasile Melinte
                        </h1>
                        <p className="text-sm font-medium leading-4 text-gray-600">
                          Usuario
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </MainLayout>
    </div>
  </>
);

export const getServerSideProps: GetServerSideProps = async () => {
  const teacher = {
    votes: [
      {
        scoreAssitance: 5,
        scoreClassAgain: 1,
        scoreClarity: 5,
      },
      {
        scoreAssitance: 2,
        scoreClassAgain: 5,
        scoreClarity: 5,
      },
      {
        scoreAssitance: 3,
        scoreClassAgain: 5,
        scoreClarity: 5,
      },
    ],
    name: "Santo Figueroa",
    area: "Form. Humanistica en Etica y Valores",
  };

  const comments = [
    {
      body: "Sportacus andrew weatherall goose Refined gentlemen super mario.",
      createdAt: Date.now(),
      user: {
        name: "Andrew Larkin",
      },
    },
  ];

  return {
    props: {
      teacher,
      comments,
    },
  };
};

export default Teacher;
