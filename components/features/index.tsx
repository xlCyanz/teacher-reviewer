/* eslint-disable react/jsx-props-no-spreading */
import { Children } from "react";
import { IFeatures } from "@types";
import {
  BanIcon,
  MoonIcon,
  SearchIcon,
  FilterIcon,
  ThumbUpIcon,
  TemplateIcon,
  GlobeAltIcon,
  AnnotationIcon,
  AcademicCapIcon,
  CursorClickIcon,
  DeviceMobileIcon,
  IdentificationIcon,
} from "@heroicons/react/outline";

import FeatureCard from "../feature-card";

const features: IFeatures[] = [
  {
    title: "Nuestra pagina",
    subtitle: "Escogimos crear esta pagina para ofrecer a los usuarios lo mejor.",
    icon: GlobeAltIcon,
    offers: [
      { title: "Diseño simple", icon: TemplateIcon },
      { title: "Modo nocturno", icon: MoonIcon },
      { title: "Diseño responsivo", icon: DeviceMobileIcon },
    ],
  },
  {
    title: "Profesores",
    subtitle: "La manera mas facil de buscar al profesor que seleccionaste.",
    icon: AcademicCapIcon,
    offers: [
      { title: "Motor de busqueda", icon: SearchIcon },
      { title: "Filtro", icon: FilterIcon },
      { title: "Comentarios", icon: AnnotationIcon },
      { title: "Votos", icon: ThumbUpIcon },
    ],
  },
  {
    title: "Autenticacion",
    subtitle: "Los formularios de registros son tan... largos, por eso te ofrecemos una mejor manera.",
    icon: IdentificationIcon,
    offers: [
      { title: "Con un solo click inicias sesion", icon: CursorClickIcon },
      { title: "Sin formularios", icon: BanIcon },
    ],
  },
];

const Features = () => {
  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="flex flex-col mb-6 lg:flex-row md:mb-10">
        <div className="lg:w-1/2">
          <h2 className="max-w-md mb-6 font-sans text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-none xl:max-w-lg">
            Para ser los mejores debemos ofrecer mejores cosas.
          </h2>
        </div>
        <div className="lg:w-1/2">
          <p className="text-base text-gray-700 dark:text-gray-300 md:text-lg">
            Tenemos algunas características que nos diferencian de
            otros reviewers y que debes conocer.
          </p>
        </div>
      </div>
      <section className="grid gap-8 row-gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {Children.toArray(features.map((feature) => (
          <FeatureCard {...feature} />
        )))}
      </section>
    </div>
  );
};

export default Features;
