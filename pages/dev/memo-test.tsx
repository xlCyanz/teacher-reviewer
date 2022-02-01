import { useEffect, useMemo, useState } from "react";

const uid = () => {
  const head = Date.now().toString(36);
  const tail = Math.random().toString(36).substring(2);

  return `${head}+${tail}`;
};

const Dev = () => {
  const [first, setFirst] = useState<string>("first");
  const [effect, setEffect] = useState<string>("");

  const memo1 = useMemo(() => `${first} ${uid()}`, [first]);
  const memo2 = useMemo(() => `${uid()}`, []);

  useEffect(() => setEffect(`${first} ${uid()}`), [first]);

  return (
    <div className="bg-gray-900 w-screen h-screen flex flex-col justify-center items-center text-2xl">
      <div className="mb-12 text-white">La prueba de los memos</div>
      <input type="text" onChange={({ target }) => setFirst(target.value)} />
      <div className="flex flex-col bg-white gap-2 rounded mt-12">
        <span>
          Memo1:
          {" "}
          {memo1}
        </span>
        <span>
          Memo2:
          {" "}
          {memo2}
        </span>
        <span>
          Effect:
          {" "}
          {effect}
        </span>
      </div>
    </div>
  );
};

export default Dev;
