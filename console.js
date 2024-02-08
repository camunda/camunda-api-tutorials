import request from "request";
import { getAccessToken } from "./auth.js";

async function listClients() {
  const accessToken = await getAccessToken();

  const consoleApiUrl = process.env.CONSOLE_API_URL;
  const clusterId = process.env.CLUSTER_ID;
  const url = `${consoleApiUrl}/clusters/${clusterId}/clients`;

  // get clients from API
  var options = {
    method: "GET",
    url,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`
    }
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
    const results = JSON.parse(response.body);
    results.forEach(x =>
      console.log(`name is ${x.name} and id is ${x.clientId}`)
    );
  });
  // emit clients to output
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

// These functions are aliased to specific command names for terseness
export default {
  list: listClients,
  add: addClient,
  view: viewClient,
  delete: deleteClient
};
