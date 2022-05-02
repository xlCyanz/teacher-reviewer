import { FC } from "react";

// Import modules.
import { IFeatures } from "@types";

const FeatureCard: FC<IFeatures> = ({
  icon: IconElement, title, subtitle, offers,
}) => {
  return (
    <div>
      <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-default-color">
        <IconElement className="w-8 h-8 text-gray-100" />
      </div>
      <h6 className="mb-2 font-semibold leading-5 text-gray-900 dark:text-gray-100">
        {title}
      </h6>
      <p className="mb-3 text-sm text-gray-900 dark:text-gray-300">
        {subtitle}
      </p>
      <ul className="mb-4 -ml-1 space-y-2">
        {offers.map((offer) => (
          <li className="flex items-center gap-1" key={offer?.title}>
            <offer.icon className="w-6 h-6 mt-px text-default-color" />
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{offer?.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeatureCard;
