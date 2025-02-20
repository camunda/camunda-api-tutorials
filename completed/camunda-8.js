import axios from "axios";
import { getAccessToken } from "../auth.js";

const authorizationConfiguration = {
  clientId: process.env.ZEEBE_CLIENT_ID,
  clientSecret: process.env.ZEEBE_CLIENT_SECRET,
  audience: process.env.ZEEBE_AUDIENCE
};

// Retrieves the current authenticated user key.
async function getUser() {
  const accessToken = await getAccessToken(authorizationConfiguration);

  const camundaApiUrl = process.env.ZEEBE_BASE_URL;
  // This is the API endpoint to retrieve the current authenticated user key.
  const url = `${camundaApiUrl}/authentication/me`;

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
    const userKey = response.data;

    // Emit the user key to output.
    console.log("User key:", userKey);
  } catch (error) {
    // Emit an error from the server.
    console.error(error.message);
  }
}

// An action that creates a group.
async function createGroup([groupName]) {
  // Every request needs an access token.
  const accessToken = await getAccessToken(authorizationConfiguration);

  // These settings come from your .env file.
  const camundaApiUrl = process.env.ZEEBE_BASE_URL;

  // This is the API endpoint to add a new client to a cluster.
  const url = `${camundaApiUrl}/groups`;

  // Configure the API call.
  const options = {
    method: "POST",
    url,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`
    },
    data: {
      // The body contains information about the new group.
      groupName : groupName
    }
  };

  try {
    const response = await axios(options);

    // Process the results from the API call.
    const newGroup = response.data;

    // Emit new group to output.
    console.log(
      `Group added! Name: ${newGroup.name}. Key: ${newGroup.groupKey}.`
    );
  } catch (error) {
    // Emit an error from the server.
    console.error(error.message);
  }
}

// An action that assigns a user to a group by a key.
async function assignUser([groupKey, userKey]) {
  // Every request needs an access token.
  const accessToken = await getAccessToken(authorizationConfiguration);

  // These settings come from your .env file.
  const camundaApiUrl = process.env.ZEEBE_BASE_URL;

  // This is the API endpoint to assign a user to a group.
  const url = `${camundaApiUrl}/groups/${groupKey}/users/${userKey}`;

  // Configure the API call.
  const options = {
    method: "POST",
    url,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`
    },
  };

  try {
    // Call the add endpoint.
    const response = await axios(options);

    // Process the results from the API call.
  if (response.status === 204) {
    console.log(`Group assigned to ${userKey}.`);
  } else {
    // Emit an unexpected error message.
    console.error("Unable to assign this user!");
  }
  } catch (error) {
    // Emit an error from the server.
    console.error(error.message);
  }
}

// An action that retrieves assigned member keys within a group.
async function retrieveGroup([groupKey]) {
  // Every request needs an access token.
  const accessToken = await getAccessToken(authorizationConfiguration);

  // These settings come from your .env file.
  const camundaApiUrl = process.env.ZEEBE_BASE_URL;

  // This is the API endpoint to list all assigned member keys within a group.
  const url = `${camundaApiUrl}/groups/${groupKey}`;

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

    // Emit clients to output.
    results.forEach(x => console.log(`Name: ${x.name}; ID: ${x.assignedMemberKeys
    }`));
// Not sure how to format the above -- is forEach needed??
  } catch (error) {
    // Emit an error from the server.
    console.error(error.message);
  }
}

// An action to delete a group.
async function deleteGroup([groupKey]) {
  const accessToken = await getAccessToken(authorizationConfiguration);

  const camundaApiUrl = process.env.ZEEBE_BASE_URL;

  const url = `${camundaApiUrl}/groups/${groupKey}`;

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
      console.log("Group deleted!");
    } else {
      // Emit an unexpected error message.
      console.error("Unable to delete this group!");
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
  get: getUser,
  create: createGroup,
  assign: assignUser,
  retrieve: retrieveGroup,
  delete: deleteGroup
};
