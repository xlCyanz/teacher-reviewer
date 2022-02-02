/* eslint-disable @typescript-eslint/no-explicit-any */
const replaceJSX = (str: string, replacement: any): Array<unknown> => {
  const result: Array<unknown> = [];

  const keys: Array<string> = Object.keys(replacement);

  const getRegExp = () => {
    const regexp: Array<string> = [];
    keys.forEach((key) => regexp.push(`{${key}}`));
    return new RegExp(regexp.join("|"));
  };

  str.split(getRegExp()).forEach((item, i) => result.push(item, replacement[`${keys[i]}`]));

  return result;
};

export default replaceJSX;
