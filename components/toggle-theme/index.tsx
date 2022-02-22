import { ThemeContext } from "@contexts";
import { MoonIcon, SunIcon } from "@heroicons/react/outline";

const ToggleTheme = () => {
  const { theme, changeTheme } = ThemeContext.useContext();

  if (theme === "dark") {
    return (
      <button type="button" onClick={() => changeTheme("light")} className="flex flex-row gap-2 bg-white p-2 rounded-md lg:rounded-full">
        <MoonIcon className="w-6 text-gray-800" />
        <span className="block lg:hidden">Modo Nocturno</span>
      </button>
    );
  }

  if (theme === "light") {
    return (
      <button type="button" onClick={() => changeTheme("dark")} className="flex flex-row gap-2 bg-default-color lg:bg-white p-2 rounded-md lg:rounded-full">
        <SunIcon className="w-6 text-yellow-600 lg:text-yellow-800" />
        <span className="text-gray-50 font-medium block lg:hidden">Modo Diurno</span>
      </button>
    );
  }

  return null;
};

export default ToggleTheme;
