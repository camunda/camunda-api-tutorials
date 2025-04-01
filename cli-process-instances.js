// Configure environment variables based on .env file
import "dotenv/config";

import processinstances from "./camunda-process-instances.js";

// All API objects accessible to the CLI app are included here.
//   The name of the property translates to the Camunda 8 API object that can be called by the CLI.
//   e.g. if we export a property named `processinstances`, you can run `npm run cli processinstances <action>`.
const APIs = { processinstances };

// Parse the arguments passed into the CLI, and direct a specific action to the intermediate Camunda 8 API process instance-related object.
//   Example: `npm run cli processinstances list` will find the arguments `processinstances` and `list`,
//   and call the `list` method on the `processinstances` API object.
// The first two elements are the node executable and file path.
const args = process.argv.slice(2);
if (args.length > 0) {
  // The first remaining argument is the name of the API object (e.g. `processinstances`).
  const apiName = args[0];
  const API = APIs[apiName];
  if (API === undefined) {
    throw new Error("Invalid API name.");
  }

  // The second remaining argument is the name of the action to take (e.g. `list`).
  const actionName = args[1];
  const action = API[actionName];
  if (action === undefined) {
    throw new Error("Invalid action name.");
  }

  // Pass all other remaining arguments into the action method.
  const restOfArgs = args.slice(2);
  await action(restOfArgs);
} else {
  throw new Error("No arguments provided.");
}