import GoogleIcon from "@components/icons/GoogleIcon";
import Head from "next/head";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";

const Login = () => {
  const [form, setForm] = useState({
    name: "",
    password: "",
    passwordRepeat: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.password !== form.passwordRepeat) {
      setError("Las contraseñas no son iguales");
      return;
    }
    setError("");
  };

  return (
    <>
      <Head>
        <title>Teacher Reviewer - Login</title>
        <meta name="description" content="Teacher Reviewer" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <div className="flex items-center justify-center w-screen h-screen bg-gray-100 dark:bg-gray-900 font-sans">
        <div className="p-5 sm:p-10 m-5 sm:m-10 text-left rounded-lg bg-white shadow-lg">
          <h3 className="text-2xl font-bold text-center">Iniciar Sesion</h3>
          <button
            type="button"
            className="flex items-center justify-center w-full my-3 h-12 px-6 font-medium tracking-wide transition duration-200 rounded shadow-md bg-red-400 hover:bg-red-700 dark:bg-gray-900 dark:hover:bg-gray-800 focus:shadow-outline focus:outline-none"
          >
            <div className="flex items-center gap-2">
              <div className="font-semibold text-white">Login with Google</div>
              <GoogleIcon className="w-6 bg-white p-1 rounded-full" />
            </div>
          </button>

          <div className="flex items-center w-full mb-5">
            <hr className="flex-1 border-gray-400 dark:border-gray-500" />
            <div className="px-3 text-sm text-gray-400 dark:text-gray-500 sm:text-sm">
              o
            </div>
            <hr className="flex-1 border-gray-400 dark:border-gray-500" />
          </div>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="mt-4">
              <div>
                <label htmlFor="Name">
                  <span className="font-semibold">Nombre</span>
                  <input
                    type="text"
                    placeholder="Ej: HegerA"
                    className="w-full px-4 py-2 border-2 border-gray-300 focus:border-2 focus:border-blue-600 rounded-md focus:outline-none focus:ring-0"
                    autoComplete="username"
                    name="name"
                    id="Name"
                    value={form.name}
                    onChange={(e) => handleChange(e)}
                  />
                </label>
              </div>
              <div className="mt-4">
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
                    className="w-full px-4 py-2 border-2 border-gray-300 focus:border-2 focus:border-blue-600 rounded-md focus:outline-none focus:ring-0"
                  />
                </label>
              </div>

              {error.length > 0 && (
                <span className="text-xs text-red-400">{error}</span>
              )}
              <button
                type="submit"
                className="flex items-center justify-center w-full my-3 h-10 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-blue-400 hover:bg-blue-700 dark:bg-gray-900 dark:hover:bg-gray-700 focus:shadow-outline focus:outline-none"
              >
                Iniciar sesión
              </button>
              <div className="mt-6 text-grey-dark">
                Aun no tienes una cuenta?
                {" "}
                <Link href="/register" passHref>
                  <span className="cursor-pointer text-blue-600 hover:underline">
                    Registrarse
                  </span>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
