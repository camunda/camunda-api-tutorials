import axios from "axios";
import { getAccessToken } from "./auth.js";

// Editor's note: nothing below this will exist when they start the tutorial.

// An action that lists all clients.
async function listClients() {
  // Every request needs an access token.
  const accessToken = await getAccessToken();

  // These settings come from your .env file.
  const consoleApiUrl = process.env.CONSOLE_API_URL;
  const clusterId = process.env.CLUSTER_ID;

  // This is the API endpoint to list all clients within a cluster.
  const url = `${consoleApiUrl}/clusters/${clusterId}/clients`;

  // Call the clients endpoint.
  var options = {
    method: "GET",
    url,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`
    }
  };
  const response = await axios(options);

  // Process the results from the API call.
  console.log(response.data);
  const results = response.data;

  // Emit clients to output.
  results.forEach(x =>
    console.log(`name is ${x.name} and id is ${x.clientId}`)
  );
}

// An action that adds a new client.
async function addClient([clientName]) {
  // Every request needs an access token.
  const accessToken = await getAccessToken();

  // These settings come from your .env file.
  const consoleApiUrl = process.env.CONSOLE_API_URL;
  const clusterId = process.env.CLUSTER_ID;

  // This is the API endpoint to list all clients within a cluster.
  const url = `${consoleApiUrl}/clusters/${clusterId}/clients`;

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
  const response = await axios(options);

  // Process the results from the API call.
  console.log(response.data);
  const newClient = response.data;

  // Emit clients to output.
  //  NOTE: In real life, you probably want to capture the
  //    `clientId` and `clientSecret` properties from the response.
  console.log(
    `New client name is ${newClient.name}. Permissions are ${newClient.permissions}.`
  );
}

async function viewClient([clientId]) {
  
  const accessToken = await getAccessToken();

  const consoleApiUrl = process.env.CONSOLE_API_URL;
  const clusterId = process.env.CLUSTER_ID;
  const clientId = process.env.CONSOLE_CLIENT_ID;

  const url = `${consoleApiUrl}/clusters/${clusterId}/clients/${clientId}`;

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
    const response = await axios(options);
  
    console.log(response.data);
    const clientId = response.data;
  
  console.log("viewing client:", clientId);
}

async function deleteClient([clientId]) {

    const accessToken = await getAccessToken();
  
    const consoleApiUrl = process.env.CONSOLE_API_URL;
    const clusterId = process.env.CLUSTER_ID;
    const clientId = process.env.CONSOLE_CLIENT_ID;
  
    const url = `${consoleApiUrl}/clusters/${clusterId}/clients/${clientId}`;
  
    var options = {
      method: "DELETE",
      url,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      data: {
        clientId: clientId
      }
    };
    const response = await axios(options);
  
    console.log(response.data);
    const cliendId = response.data;

  console.log("deleting client:", clientId);
}

// These functions are aliased to specific command names for terseness.
//   The name of each property translates to a method that can be called by the CLI.
//   e.g. i🥹f we export a function named `list`, you can run `npm run cli console list`.
export default {
  list: listClients,
  add: addClient,
  view: viewClient,
  delete: deleteClient
};
