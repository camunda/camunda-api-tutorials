import axios from "axios";
import { getAccessToken } from "./auth.js";

const authorizationConfiguration = {
  clientId: process.env.CAMUNDA_CLIENT_ID,
  clientSecret: process.env.CAMUNDA_CLIENT_SECRET,
  // These settings come from your .env file. Note that CAMUNDA_TOKEN_AUDIENCE
  // is represented by ZEEBE_TOKEN_AUDIENCE in the Console UI.
  audience: process.env.CAMUNDA_TOKEN_AUDIENCE
};

// An action that lists all roles.
async function listRoles() {
  const accessToken = await getAccessToken(authorizationConfiguration);
  const camundaApiUrl = process.env.CAMUNDA_REST_ADDRESS;

  const url = `${camundaApiUrl}/roles/search`;

  try {
    const response = await axios.post(url, {}, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`
      }
    });

    const results = response.data;
    results.items.forEach(x =>
      console.log(`Role Name: ${x.name}; Key: ${x.key}`)
    );
  } catch (error) {
    console.error(`Error listing roles: ${error.message}`);
  }
}

// An action that creates a role.
async function createRole([roleName]) {
  const accessToken = await getAccessToken(authorizationConfiguration);
  const camundaApiUrl = process.env.CAMUNDA_REST_ADDRESS;

  const url = `${camundaApiUrl}/roles`;

  try {
    const response = await axios.post(
      url,
      { name: roleName },
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

    const newRole = response.data;
    console.log(`Role added! Name: ${roleName}. Key: ${newRole.roleKey}.`);
  } catch (error) {
    console.error(`Error creating role: ${error.message}`);
  }
}

// An action that retrieves a role.
async function getRole([roleKey]) {
  const accessToken = await getAccessToken(authorizationConfiguration);
  const camundaApiUrl = process.env.CAMUNDA_REST_ADDRESS;

  const url = `${camundaApiUrl}/roles/${roleKey}`;

  try {
    const response = await axios.get(url, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`
      }
    });

    const role = response.data;
    console.log(`Role Name: ${role.name}; Key: ${role.key}`);
  } catch (error) {
    console.error(`Error retrieving role: ${error.message}`);
  }
}

// An action that deletes a role.
async function deleteRole([roleKey]) {
  const accessToken = await getAccessToken(authorizationConfiguration);
  const camundaApiUrl = process.env.CAMUNDA_REST_ADDRESS;

  const url = `${camundaApiUrl}/roles/${roleKey}`;

  try {
    const response = await axios.delete(url, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`
      }
    });

    if (response.status === 204) {
      console.log("Role deleted!");
    } else {
      console.error("Unexpected response when deleting role.");
    }
  } catch (error) {
    console.error(`Error deleting role: ${error.message}`);
  }
}

// Export CLI aliases
export default {
  list: listRoles,
  create: createRole,
  view: getRole,
  delete: deleteRole
};
