import axios from "axios";
import { getAccessToken } from "../auth.js";

// These functions are aliased to specific command names for terseness.
//   The name of each property translates to a method that can be called by the CLI.
//   e.g. if we export a function named `assign`, you can run `npm run cli camunda8 get`.

export default {
  get: getUser,
  create: createGroup,
  assign: assignUser,
  retrieve: retrieveGroup,
  delete: deleteGroup
};
