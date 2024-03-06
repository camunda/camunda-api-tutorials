import axios from "axios";
import { getAccessToken } from "./auth.js";

async function listClients() {
  console.log("listing clients");
}

async function addClient([clientName]) {
  console.log(`adding client ${clientName}`);
}

async function viewClient([clientId]) {
  console.log(`viewing client ${clientId}`);
}

async function deleteClient([clientId]) {
  console.log(`deleting client ${clientId}`);
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
