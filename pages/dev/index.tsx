import { DefaultColor } from "contexts";

const Dev = () => {
  const { color, changeColor } = DefaultColor.useContext();

  const changeToYellow = () => changeColor("#FFFF00");
  const changeToRed = () => changeColor("#FF0000");
  const changeToBlue = () => changeColor("0000FF");
  const changeToGreen = () => changeColor("#008000");

  return (
    <div className="bg-gray-900 w-screen h-screen flex flex-col justify-center items-center text-2xl">
      <span className="text-default-color">{color}</span>

      <div className="mt-20 flex flex-col gap-2 text-white">
        <button className="px-4 py-2 bg-yellow-500" type="button" onClick={changeToYellow}>Amarillo</button>
        <button className="px-4 py-2 bg-red-500" type="button" onClick={changeToRed}>Rojo</button>
        <button className="px-4 py-2 bg-blue-500" type="button" onClick={changeToBlue}>Azul</button>
        <button className="px-4 py-2 bg-green-500" type="button" onClick={changeToGreen}>Verde</button>
      </div>
    </div>
  );
};

export default Dev;
