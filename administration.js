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

  // Configure the API call.
  var options = {
    method: "GET",
    url,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`
    }
  };

  try {
    // Call the clients endpoint.
    const response = await axios(options);

    // Process the results from the API call.
    const results = response.data;

    // Emit clients to output.
    results.forEach(x => console.log(`Name: ${x.name}; ID: ${x.clientId}`));
  } catch (error) {
    // Emit an error from the server.
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

  // This is the API endpoint to add a new client to a cluster.
  const url = `${administrationApiUrl}/clusters/${clusterId}/clients`;

  // Configure the API call.
  var options = {
    method: "POST",
    url,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`
    },
    data: {
      // The body contains information about the new client.
      clientName: clientName
    }
  };

  try {
    // Call the add endpoint.
    const response = await axios(options);

    // Process the results from the API call.
    const newClient = response.data;

    // Emit new client to output.
    //  NOTE: In real life, you probably want to capture the
    //    `clientSecret` property from the response, since it can't be displayed again.
    console.log(
      `Client added! Name: ${newClient.name}. ID: ${newClient.clientId}.`
    );
  } catch (error) {
    // Emit an error from the server.
    console.error(error.message);
  }
}

// An action that views one client.
async function viewClient([clientId]) {
  // Every request needs an access token.
  const accessToken = await getAccessToken();

  // These settings come from your .env file.
  const administrationApiUrl = process.env.ADMINISTRATION_API_URL;
  const clusterId = process.env.CLUSTER_ID;

  // This is the API endpoint to view a single client within a cluster.
  const url = `${administrationApiUrl}/clusters/${clusterId}/clients/${clientId}`;

  // Call the client endpoint.
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
    const clientResponse = response.data;

    // Emit the client details.
    console.log("Client:", clientResponse);
  } catch (error) {
    // Emit an error from the server.
    console.error(error.message);
  }
}

// An action that deletes a client.
async function deleteClient([clientId]) {
  // Every request needs an access token.
  const accessToken = await getAccessToken();

  // These settings come from your .env file.
  const administrationApiUrl = process.env.ADMINISTRATION_API_URL;
  const clusterId = process.env.CLUSTER_ID;

  // This is the API endpoint to delete a client from a cluster.
  const url = `${administrationApiUrl}/clusters/${clusterId}/clients/${clientId}`;

  // Configure the API call.
  var options = {
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
      console.log(`Client ${clientId} was deleted!`);
    } else {
      // Emit an unexpected error message.
      console.error("Unable to delete client!");
    }
  } catch (error) {
    // Emit an error from the server.
    console.error(error.message);
  }
}

// These functions are aliased to specific command names for terseness.
//   The name of each property translates to a method that can be called by the CLI.
//   e.g. if we export a function named `list`, you can run `npm run cli admin list`.
export default {
  list: listClients,
  add: addClient,
  view: viewClient,
  delete: deleteClient
};
