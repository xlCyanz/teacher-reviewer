/* eslint-disable import/prefer-default-export */
const getEnvironmentVariable = (environmentVariable: string): string => {
  const unvalidatedEnvironmentVariable = process.env[environmentVariable];

  if (!unvalidatedEnvironmentVariable) {
    throw new Error(`Couldn't find environment variable: ${environmentVariable}`);
  } else {
    return unvalidatedEnvironmentVariable;
  }
};

export const config = {
  databaseUrl: getEnvironmentVariable("DATABASE_URL"),
  graphqlUrl: getEnvironmentVariable("GRAPH_URL"),
};
