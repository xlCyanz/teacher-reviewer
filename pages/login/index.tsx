import Head from "next/head";
import { signIn } from "next-auth/react";
import { GoogleIcon } from "@components";

const LoginPage = () => (
  <>
    <Head>
      <title>Teacher Reviewer - Login</title>
      <meta name="description" content="Teacher Reviewer" />
      <link rel="icon" href="/favicon.png" />
    </Head>

    <div className="flex items-center justify-center w-screen h-screen bg-gray-100 dark:bg-gray-900 font-sans">
      <div className="p-5 sm:p-10 m-5 sm:m-10 w-96 text-left rounded-lg bg-white shadow-lg">
        <h3 className="text-2xl font-bold text-center">Iniciar Sesion</h3>
        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "http://localhost:3000" })}
          className="flex items-center justify-center w-full my-3 h-12 px-6 font-medium tracking-wide transition duration-200 rounded shadow-md bg-red-400 hover:bg-red-700 dark:bg-gray-900 dark:hover:bg-gray-800 focus:shadow-outline focus:outline-none"
        >
          <div className="flex items-center gap-2">
            <div className="font-semibold text-white">Login with Google</div>
            <GoogleIcon className="w-6 bg-white p-1 rounded-full" />
          </div>
        </button>
        <div className="mt-6 text-grey-dark">
          Proximamente mas opciones...
        </div>
      </div>
    </div>
  </>
);

export default LoginPage;
