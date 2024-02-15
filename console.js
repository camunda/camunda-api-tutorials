import axios from "axios";
import { getAccessToken } from "./auth.js";

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

async function addClient([clientName]) {
  console.log("adding client:", clientName);
}

function viewClient([clientId]) {
  console.log("viewing client:", clientId);
}

function deleteClient([clientId]) {
  console.log("deleting client:", clientId);
}

// These functions are aliased to specific command names for terseness.
//   The name of each property translates to a method that can be called by the CLI.
//   e.g. if we export a function named `list`, you can run `npm run cli console list`.
export default {
  list: listClients,
  add: addClient,
  view: viewClient,
  delete: deleteClient
};
