import _ from "lodash";
import { FC, SVGProps } from "react";
import {
  AcademicCapIcon,
  AdjustmentsIcon,
  AnnotationIcon,
  BanIcon,
  CursorClickIcon,
  DeviceMobileIcon,
  FilterIcon,
  GlobeAltIcon,
  IdentificationIcon,
  MoonIcon,
  SearchIcon,
  TemplateIcon,
  ThumbUpIcon,
} from "@heroicons/react/outline";

interface IFeatures {
    title: string;
    subtitle: string;
    icon: FC<SVGProps<SVGSVGElement>>;
    offers: {
        title: string;
        icon: FC<SVGProps<SVGSVGElement>>;
    }[]
}

const Features = () => {
  const features: IFeatures[] = [
    {
      title: "Our website",
      subtitle: "We chose to make this website to learn and offer the best to the user.",
      icon: GlobeAltIcon,
      offers: [
        { title: "Simple design", icon: TemplateIcon },
        { title: "Dark mode", icon: MoonIcon },
        { title: "Responsive design", icon: DeviceMobileIcon },
        { title: "Customizable design color.", icon: AdjustmentsIcon },
      ],
    },
    {
      title: "Teachers",
      subtitle: "The easiest way to search for the teacher you selected.",
      icon: AcademicCapIcon,
      offers: [
        { title: "Search engine", icon: SearchIcon },
        { title: "Powerful filter", icon: FilterIcon },
        { title: "Comments", icon: AnnotationIcon },
        { title: "Votes", icon: ThumbUpIcon },
      ],
    },
    {
      title: "Authentication",
      subtitle: "Long forms are very tiresome, that's why we offer you a better way.",
      icon: IdentificationIcon,
      offers: [
        { title: "Click login", icon: CursorClickIcon },
        { title: "Without forms", icon: BanIcon },
      ],
    },
  ];

  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="flex flex-col mb-6 lg:flex-row md:mb-10">
        <div className="lg:w-1/2">
          <h2 className="max-w-md mb-6 font-sans text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-none xl:max-w-lg">
            To be the best we must offer better things.
          </h2>
        </div>
        <div className="lg:w-1/2">
          <p className="text-base text-gray-700 dark:text-gray-300 md:text-lg">
            We have some features that differentiate us from other
            reviewers and that you should know.
          </p>
        </div>
      </div>
      <div className="grid gap-8 row-gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {_.map(features, ({
          title, subtitle, icon: Icon, offers,
        }) => (
          <div key={title}>
            <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gray-300">
              <Icon className="w-8 h-8 text-default-color" />
            </div>
            <h6 className="mb-2 font-semibold leading-5 text-gray-900 dark:text-gray-100">{title}</h6>
            <p className="mb-3 text-sm text-gray-900 dark:text-gray-300">
              {subtitle}
            </p>
            <ul className="mb-4 -ml-1 space-y-2">
              {_.map(offers, (offer) => (
                <li className="flex items-center gap-1" key={offer?.title}>
                  <offer.icon className="w-6 h-6 mt-px text-default-color" />
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{offer?.title}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
