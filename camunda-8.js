import axios from "axios";
import { getAccessToken } from "./auth.js";

// --------------------------------------------------------------------
// Template for Camunda 8 API tutorial
// --------------------------------------------------------------------

// List all roles
async function listRoles() {
  // TODO: implement API call to list roles
  console.log("listing roles");
}

// Create a role
async function createRole([roleName]) {
  // TODO: implement API call to create a role
  console.log(`adding role ${roleName}`);
}

// Retrieve a role
async function getRole([roleKey]) {
  // TODO: implement API call to retrieve a role
  console.log(`viewing role ${roleKey}`);
}

// Delete a role
async function deleteRole([roleKey]) {
  // TODO: implement API call to delete a role
  console.log(`deleting role ${roleKey}`);
}

// Export functions for CLI usage
export default {
  list: listRoles,
  create: createRole,
  view: getRole,
  delete: deleteRole
};
