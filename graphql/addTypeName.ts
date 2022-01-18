export const addTypeNameArr = (arr: any[], typename: string) => {
  const result = arr.map((elem: any) => ({
    ...elem,
    __typename: typename,
  }));

  return result;
};

export const addTypeNameSingle = (obj: any, typename: string) => ({
  ...obj,
  __typename: typename,
});

export default {
  addTypeNameArr,
  addTypeNameSingle,
};
