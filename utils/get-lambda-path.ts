import { join } from "path";

/**
 * Get the path to the lambda function
 */
export const getLambdaPath = (moduleName: string, lambdaName: string) => {
  return join(__dirname, "../src/lambdas", moduleName, lambdaName, "index.ts");
};
