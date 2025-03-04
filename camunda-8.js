import axios from "axios";
import { getAccessToken } from "./auth.js";

// An action that lists all roles.
async function listRoles() {
  console.log("listing roles");
}

// An action that creates a role.
async function createRole([roleName]) {
  console.log(`adding role ${roleName}`);
}

// An action that retrieves a role.
async function getRole([roleKey]) {
  console.log(`viewing role ${roleKey}`);
}

// An action that deletes a role.
async function deleteRole([roleKey]) {
  console.log(`deleting role ${roleKey}`);
}

// These functions are aliased to specific command names for terseness.
//   The name of each property translates to a method that can be called by the CLI.
//   e.g. if we export a function named `list`, you can run `npm run cli zeebe get`.

export default {
  list: listRoles,
  create: createRole,
  view: getRole,
  delete: deleteRole
};
