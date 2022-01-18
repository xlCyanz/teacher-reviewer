import GoogleIcon from "@components/icons/GoogleIcon";
import Head from "next/head";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
  };

  return (
    <>
      <Head>
        <title>Teacher Reviewer - Register</title>
        <meta name="description" content="Teacher Reviewer" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <div className="flex items-center justify-center w-screen h-screen bg-gray-100 dark:bg-gray-900 font-sans overflow-hidden md:overflow-auto">
        <div className="p-5 sm:p-10 m-5 sm:m-10 text-left rounded-lg bg-white shadow-lg">
          <h3 className="text-2xl font-bold text-center">Bienvenid@</h3>
          <button
            type="button"
            className="flex items-center justify-center w-full my-3 h-12 px-6 font-medium tracking-wide transition duration-200 rounded shadow-md bg-red-400 hover:bg-red-700 dark:bg-gray-900 dark:hover:bg-gray-800 focus:shadow-outline focus:outline-none"
          >
            <div className="flex items-center gap-2">
              <div className="font-semibold text-white">
                Register with Google
              </div>
              <GoogleIcon className="w-6 bg-white p-1 rounded-full" />
            </div>
          </button>
          <div className="flex items-center w-full mb-5">
            <hr className="flex-1 border-gray-400 dark:border-gray-500" />
            <div className="px-3 text-sm text-gray-400 dark:text-gray-500 sm:text-sm">o</div>
            <hr className="flex-1 border-gray-400 dark:border-gray-500" />
          </div>
          <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-2">
            <div>
              <label htmlFor="Name">
                <span className="font-semibold">Nombre</span>
                <input
                  type="text"
                  placeholder="Ej: HegerA"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  autoComplete="username"
                  name="name"
                  id="Name"
                  value={form.name}
                  onChange={(e) => handleChange(e)}
                />
              </label>
            </div>
            <div>
              <label htmlFor="Password">
                <span className="font-semibold">Contraseña</span>
                <input
                  value={form.password}
                  onChange={(e) => handleChange(e)}
                  type="password"
                  name="password"
                  placeholder="*****************"
                  autoComplete="current-password"
                  id="Password"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </label>
            </div>
            <div>
              <label htmlFor="Password">
                <span className="font-semibold">
                  Confirmar Contraseña
                </span>
                <input
                  value={form.password}
                  onChange={(e) => handleChange(e)}
                  type="password"
                  name="password"
                  placeholder="*****************"
                  autoComplete="current-password"
                  id="Password"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </label>
            </div>

            {error.length > 0 && (
            <span className="text-xs text-red-400">
              {error}
            </span>
            )}
            <button
              type="submit"
              className="flex items-center justify-center w-full my-3 h-10 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-blue-400 hover:bg-blue-700 dark:bg-gray-900 dark:hover:bg-gray-700 focus:shadow-outline focus:outline-none"
            >
              Registrarse
            </button>
          </form>
          <div className="text-grey-dark">
            ¿Ya tienes una cuenta?
            {" "}
            <Link href="/login" passHref>
              <a className="cursor-pointer text-blue-600 hover:underline">
                Iniciar sesion
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
