import axios from "axios";
import { getAccessToken } from "./auth.js";

// Editor's note: nothing below this will exist when they start the tutorial.

// An action that lists all clients.
async function listClients() {
  // Every request needs an access token.
  const accessToken = await getAccessToken();

  // These settings come from your .env file.
  const administrationApiUrl = process.env.ADMINISTRATION_API_URL;
  const clusterId = process.env.CLUSTER_ID;

  // This is the API endpoint to list all clients within a cluster.
  const url = `${administrationApiUrl}/clusters/${clusterId}/clients`;

  // Call the clients endpoint.
  var options = {
    method: "GET",
    url,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`
    }
  };
  try {
    const response = await axios(options);

    // Process the results from the API call.
    const results = response.data;

    // Emit clients to output.
    results.forEach(x => console.log(`Name: ${x.name}; ID: ${x.clientId}`));
  } catch (error) {
    console.error(error.message);
  }
}

// An action that adds a new client.
async function addClient([clientName]) {
  // Every request needs an access token.
  const accessToken = await getAccessToken();

  // These settings come from your .env file.
  const administrationApiUrl = process.env.ADMINISTRATION_API_URL;
  const clusterId = process.env.CLUSTER_ID;

  // This is the API endpoint to list all clients within a cluster.
  const url = `${administrationApiUrl}/clusters/${clusterId}/clients`;

  // Call the clients endpoint.
  var options = {
    method: "POST",
    url,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`
    },
    data: {
      clientName: clientName
    }
  };

  try {
    const response = await axios(options);

    // Process the results from the API call.
    const newClient = response.data;

    // Emit clients to output.
    //  NOTE: In real life, you probably want to capture the
    //    `clientId` and `clientSecret` properties from the response.
    console.log(
      `Client added! Name: ${newClient.name}. ID: ${newClient.clientId}.`
    );
  } catch (error) {
    console.error(error.message);
  }
}

async function viewClient([clientId]) {
  const accessToken = await getAccessToken();

  const administrationApiUrl = process.env.ADMINISTRATION_API_URL;
  const clusterId = process.env.CLUSTER_ID;

  const url = `${administrationApiUrl}/clusters/${clusterId}/clients/${clientId}`;

  var options = {
    method: "GET",
    url,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`
    },
    data: {
      clientId: clientId
    }
  };

  try {
    const response = await axios(options);

    const clientResponse = response.data;

    console.log("Client:", clientResponse);
  } catch (error) {
    console.error(error.message);
  }
}

async function deleteClient([clientId]) {
  const accessToken = await getAccessToken();

  const administrationApiUrl = process.env.ADMINISTRATION_API_URL;
  const clusterId = process.env.CLUSTER_ID;

  const url = `${administrationApiUrl}/clusters/${clusterId}/clients/${clientId}`;

  var options = {
    method: "DELETE",
    url,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`
    }
  };
  try {
    const response = await axios(options);

    if (response.status === 204) {
      console.log(`Client ${clientId} was deleted!`);
    } else {
      console.error("Unable to delete client!");
    }
  } catch (error) {
    console.error(error.message);
  }
}

// These functions are aliased to specific command names for terseness.
//   The name of each property translates to a method that can be called by the CLI.
//   e.g. i🥹f we export a function named `list`, you can run `npm run cli administration list`.
export default {
  list: listClients,
  add: addClient,
  view: viewClient,
  delete: deleteClient
};
