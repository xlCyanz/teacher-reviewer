interface Props {
    name: string;
    area: string;
}

const TeacherCard = ({ name, area }: Props) => {
  return (
    <div className="relative p-px overflow-hidden transition duration-300 transform border dark:border-0 rounded shadow-sm hover:scale-105 group hover:shadow-xl">
      <div className="absolute bottom-0 left-0 w-full h-1 duration-300 origin-left transform scale-x-0 bg-default-color group-hover:scale-x-100" />
      <div className="absolute bottom-0 left-0 w-1 h-full duration-300 origin-bottom transform scale-y-0 bg-default-color group-hover:scale-y-100" />
      <div className="absolute top-0 left-0 w-full h-1 duration-300 origin-right transform scale-x-0 bg-default-color group-hover:scale-x-100" />
      <div className="absolute bottom-0 right-0 w-1 h-full duration-300 origin-top transform scale-y-0 bg-default-color group-hover:scale-y-100" />
      <div className="relative p-5 bg-white rounded-sm">
        <div className="flex flex-col mb-2 lg:items-center lg:flex-row">
          <p className="font-semibold leading-5">{name}</p>
        </div>
        <p className="mb-2 text-sm text-gray-900">{area}</p>
      </div>
    </div>
  );
};

export default TeacherCard;
