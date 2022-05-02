import { FC } from "react";

// Import modules.
import { Icon } from "@types";

interface IDetailsCardProps {
    title: string;
    subtitle: string;
    icon: Icon;
    percentage: string;
}

const DetailsCard: FC<IDetailsCardProps> = ({
  title, subtitle, icon: IconElement, percentage,
}) => {
  return (
    <div className="text-center">
      <div className="flex items-center justify-center w-10 h-10 mx-auto mb-3 rounded-full bg-default-color sm:w-12 sm:h-12">
        <IconElement className="w-6 h-6 sm:w-8 sm:h-8 text-gray-100" />
      </div>
      <h6 className="text-4xl font-bold text-default-color">
        {percentage || 0}
      </h6>
      <p className="mb-2 font-bold text-md dark:text-gray-100">
        {title}
      </p>
      <p className="text-gray-800 dark:text-gray-500">
        {subtitle}
      </p>
    </div>
  );
};

export default DetailsCard;
