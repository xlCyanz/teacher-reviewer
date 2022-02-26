import Link from "next/link";
import { AcademicCapIcon } from "@heroicons/react/outline";

const Footer = () => (
  <div className="px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
    <div className="grid gap-16 row-gap-10 mb-8 lg:grid-cols-6">
      <div className="md:max-w-md lg:col-span-2">
        <Link href="/" passHref>
          <a
            aria-label="Teacher Reviewer"
            title="Teacher Reviewer"
            className="inline-flex items-center"
          >
            <AcademicCapIcon className="w-8 text-gray-100 dark:text-default-color" />
            <span className="ml-2 text-xl font-bold tracking-wide text-gray-100 uppercase">
              Teacher Reviewer
            </span>
          </a>
        </Link>
        <div className="mt-4 lg:max-w-sm text-justify">
          <p className="text-sm text-gray-100">
            Es una aplicación dedicada a gestionar los votos de los alumnos
            hacia los profesores.
          </p>
          <p className="mt-4 text-sm text-gray-100">
            Califica a ese maestro que te pareció el mejor del mundo.
            Para que otros tenga la misma oportunidad que tu.
          </p>
        </div>
      </div>
    </div>
    <div className="flex flex-col justify-between pt-5 pb-10 border-t sm:flex-row">
      <p className="text-md text-gray-100 flex-1">
        © Copyright
        {" "}
        {new Date().getFullYear()}
        {" "}
        <span className="font-medium text-default-color">Teacher Reviewer</span>
        . Todos los derechos reservados a sus respectivos desarrolladores.
      </p>
      <p className="text-md text-gray-100">
        Por
        {" "}
        <Link href="https://github.com/HegerAriasSantos" passHref>
          <a className="font-semibold hover:text-default-color">Heger</a>
        </Link>
        {" "}
        y
        {" "}
        <Link href="https://github.com/xlCyanz" passHref>
          <a className="font-semibold hover:text-default-color">Johan</a>
        </Link>
      </p>
    </div>
  </div>
);

export default Footer;
