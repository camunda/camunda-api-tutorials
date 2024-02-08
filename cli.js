import "dotenv/config";
import consoleApi from "./console.js";

const APIs = { console: consoleApi };

const args = process.argv.slice(2); // The first two elements are the node executable and file path
if (args.length > 0) {
  const apiName = args[0];
  const API = APIs[apiName];
  if (API === undefined) {
    throw new Error("Invalid API name.");
  }

  const actionName = args[1];
  const action = API[actionName];
  if (action === undefined) {
    throw new Error("Invalid action name.");
  }

  const restOfArgs = args.slice(2);
  await action(restOfArgs);
} else {
  throw new Error("No arguments provided.");
}
