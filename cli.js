// Configure environment variables based on .env file
import "dotenv/config";

import admin from "./administration.js";
import optimize from "./optimize.js";
import zeebe from "./zeebe.js";
import modeler from "./modeler.js";
import camunda8 from "./camunda-8.js";

// All API objects accessible to the CLI app are included here.
//   The name of each property translates to an API object that can be called by the CLI.
//   e.g. if we export a property named `admin`, you can run `npm run cli admin <action>`.
const APIs = { admin, optimize, zeebe, modeler, camunda8 };

// Parse the arguments passed into the CLI, and direct a specific action to a specific API object.
//   Example: `npm run cli administration list` will find the arguments `administration` and `list`,
//   and call the `list` method on the `administration` API object.
// The first two elements are the node executable and file path.
const args = process.argv.slice(2);
if (args.length > 0) {
  // The first remaining argument is the name of the API object (e.g. `administration`).
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
