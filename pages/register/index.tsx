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

      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="px-10 py-10 mx-10 mt-10 text-left rounded-lg bg-white shadow-lg lg:w-[30%] ">
          <h3 className="text-2xl font-bold text-center">Bienvenid@</h3>
          <div className="flex items-center justify-center">
            <button
              type="button"
              className="w-full max-w-xs mt-5 font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-200 ease-in-out focus:outline-none hover:shadow focus:shadow-outline"
            >
              <div className="bg-white p-2 rounded-full">
                <svg className="w-4" viewBox="0 0 533.5 544.3">
                  <path
                    d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                    fill="#4285f4"
                  />
                  <path
                    d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                    fill="#34a853"
                  />
                  <path
                    d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                    fill="#fbbc04"
                  />
                  <path
                    d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                    fill="#ea4335"
                  />
                </svg>
              </div>
              <span className="ml-4">Registrate con Google</span>
            </button>
          </div>
          <div className="my-4 border-b text-center">
            <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
              O
            </div>
          </div>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="mt-4">
              <div>
                <label htmlFor="Name">
                  Nombre
                  <input
                    type="text"
                    placeholder="Nombre"
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
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
                  Contraseña
                  <input
                    value={form.password}
                    onChange={(e) => handleChange(e)}
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    autoComplete="current-password"
                    id="Password"
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </label>
              </div>
              <div className="mt-4">
                <label htmlFor="Password">
                  Confirmar Contraseña
                  <input
                    value={form.password}
                    onChange={(e) => handleChange(e)}
                    type="password"
                    name="password"
                    placeholder="Confirmar Contraseña"
                    autoComplete="current-password"
                    id="Password"
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </label>
              </div>

              {error.length > 0 && (
                <span className="text-xs text-red-400">
                  {error}
                </span>
              )}
              <div className="flex">
                <button
                  type="submit"
                  className="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
                >
                  Registrarse
                </button>
              </div>
              <div className="mt-6 text-grey-dark">
                Ya tienes una cuenta?
                {" "}
                <Link href="/login" passHref>
                  <span className="cursor-pointer text-blue-600 hover:underline">
                    Iniciar sesion
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

export default Register;
