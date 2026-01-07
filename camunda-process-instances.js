import path from "path";
import fs from "fs";
import axios from "axios";
import FormData from "form-data";
import { getAccessToken } from "./auth.js";

// Template for Camunda 8 process instance tutorial.

// An action that deploys one or more resources (e.g. processes, decision models, or forms).
async function deployResources() {
  console.log("deploying resources");
}

// An action that creates and starts an instance of the specified process.
async function createInstance() {
  console.log("creating process instance");
}

// An action that gets the process instance by the process instance key.
async function viewInstance() {
  console.log("obtaining process instance");
}

// These functions are aliased to specific command names for terseness.
//   The name of each property translates to a method that can be called by the CLI.
//   e.g. if we export a function named `list`, you can run `npm run cli processInstances get`.

export default {
  deploy: deployResources,
  create: createInstance,
  view: viewInstance
};
