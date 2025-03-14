import axios from "axios";
import { getAccessToken } from "./auth.js";

const authorizationConfiguration = {
  clientId: process.env.CAMUNDA_CLIENT_ID,
  clientSecret: process.env.CAMUNDA_CLIENT_SECRET,
    // These settings come from your .env file. Note that CAMUNDA_TOKEN_AUDIENCE is represented by ZEEBE_TOKEN_AUDIENCE.
  audience: process.env.CAMUNDA_TOKEN_AUDIENCE
};

// An action that lists all roles.
async function listRoles() {
  // Every request needs an access token.
  const accessToken = await getAccessToken(authorizationConfiguration);

  // These settings come from your .env file. Note that CAMUNDA_REST_ADDRESS is represented by ZEEBE_REST_ADDRESS.
  const camundaApiUrl = process.env.CAMUNDA_REST_ADDRESS;

  // This is the API endpoint to query roles.
  const url = `${camundaApiUrl}/roles/search`;

  // Configure the API call.
  const options = {
    method: "POST",
    url,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`
    },
    // No filtering/paging/sorting, we want all roles.
    data: {}
  };

  try {
    // Call the endpoint.
    const response = await axios(options);

    // Process the results from the API call.
    const results = response.data;

    // Emit roles to output.
    results.items.forEach(x =>
      console.log(`Role Name: ${x.name}; key: ${x.key}`)
    );
  } catch (error) {
    // Emit an error from the server.
    console.error(error.message);
  }
}

// An action that creates a role.
async function createRole([roleName]) {
  // Every request needs an access token.
  const accessToken = await getAccessToken(authorizationConfiguration);

  // These settings come from your .env file.
  const camundaApiUrl = process.env.CAMUNDA_REST_ADDRESS;

  // This is the API endpoint to add a new client to a cluster.
  const url = `${camundaApiUrl}/roles`;

  // Configure the API call.
  const options = {
    method: "POST",
    url,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`
    },
    data: {
      // The body contains information about the new role.
      name: roleName
    }
  };

  try {
    const response = await axios(options);

    // Process the results from the API call.
    const newRole = response.data;

    // Emit new role to output.
    console.log(`Role added! Name: ${roleName}. Key: ${newRole.roleKey}.`);
  } catch (error) {
    // Emit an error from the server.
    console.error(error.message);
  }
}

// An action that retrieves a role.
async function getRole([roleKey]) {
  // Every request needs an access token.
  const accessToken = await getAccessToken(authorizationConfiguration);

  // These settings come from your .env file.
  const camundaApiUrl = process.env.CAMUNDA_REST_ADDRESS;

  // This is the API endpoint to get a specific role.
  const url = `${camundaApiUrl}/roles/${roleKey}`;

  // Configure the API call.
  const options = {
    method: "GET",
    url,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`
    }
  };

  try {
    // Call the endpoint.
    const response = await axios(options);

    // Process the results from the API call.
    const results = response.data;

    // Emit role to output.
    console.log(
      `Role Name: ${results.name}; Key: ${
        results.key
      };`
    );
  } catch (error) {
    // Emit an error from the server.
    console.error(error.message);
  }
}

// An action that deletes a role.
async function deleteRole([roleKey]) {
  const accessToken = await getAccessToken(authorizationConfiguration);

  const camundaApiUrl = process.env.CAMUNDA_REST_ADDRESS;

  const url = `${camundaApiUrl}/roles/${roleKey}`;

  // Configure the API call.
  const options = {
    method: "DELETE",
    url,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`
    }
  };

  try {
    // Call the delete endpoint.
    const response = await axios(options);

    // Process the results from the API call.
    if (response.status === 204) {
      console.log("Role deleted!");
    } else {
      // Emit an unexpected error message.
      console.error("Unable to delete this role!");
    }
  } catch (error) {
    // Emit an error from the server.
    console.error(error.message);
  }
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
