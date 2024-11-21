import axios from "axios";
import { getAccessToken } from "../auth.js";

async function deployResources([]) {
      console.log(`Resources deployed.`);
  }

async function createProcessInstance([]) {
      console.log("Process instance created!");
}

async function viewProcessInstance([processInstanceKey]) {
      console.log("Process instance:", processInstance);
  }

// These functions are aliased to specific command names for terseness.
//   The name of each property translates to a method that can be called by the CLI.
//   e.g. if we export a function named `assign`, you can run `npm run cli zeebe deploy`.

export default {
  deploy: deployResources,
  create: createProcessInstance,
  view: viewProcessInstance
};
