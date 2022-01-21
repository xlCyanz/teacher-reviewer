import { DeviceMobileIcon } from "@heroicons/react/outline";
import { ComponentProps, ComponentType } from "react";

interface FeaturesTabs {
    title: string;
    subtitle: string;
    icon: ComponentType<ComponentProps<"svg">>;
}

const Features = () => {
  const features: FeaturesTabs[] = [
    {
      title: "Responsive design",
      subtitle: "You can access from any device that supports the pag.",
      icon: DeviceMobileIcon,
    },
  ];

  return (
    <div className="mx-auto mt-14 sm:max-w-xl md:max-w-full lg:max-w-screen-xl" id="features">
      <div className="max-w-xl mb-10 sm:mx-auto">
        <h2 className="font-sans text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl text-center">
          Features
        </h2>
      </div>
      <div className="grid gap-12 row-gap-8 md:grid-cols-2 lg:grid-cols-3 m-4 sm:m-12">
        {features.map(({ title, subtitle, icon: Icon }) => (
          <div className="flex" key={`feature-${title}`}>
            <div className="mr-4">
              <div className="flex items-center justify-center w-10 h-10 mb-3 rounded-full bg-indigo-50">
                <Icon className="w-6 h-6 text-deep-purple-accent-400" />
              </div>
            </div>
            <div>
              <h6 className="mb-2 font-semibold leading-5">{title}</h6>
              <p className="text-sm text-gray-900">
                {subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
