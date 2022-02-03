export const addTypeNameArr = (arr: any[], typename: string) => {
  const result = arr.map((elem: any) => ({
    ...elem,
    __typename: typename,
  }));

  return result;
};

//  we're already in produccion
export const addTypeNameSingle = (obj: any, typename: string) => ({
  ...obj,
  __typename: typename,
});

export default {
  addTypeNameArr,
  addTypeNameSingle,
};
