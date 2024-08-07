import axios from "axios";
import { getAccessToken } from "../auth.js";

async function createProject([projectName, adminEmail]) {
    console.log(
      `Project added! Name: ${newProject.name}. ID: ${newProject.id}.`
    );
};

async function viewProject([projectId]) {
    console.log("Project:", project);
}

async function deleteProject([projectId]) {
      console.log(`Project ${projectId} was deleted!`);
    }

// These functions are aliased to specific command names for terseness.
//   The name of each property translates to a method that can be called by the CLI.
//   e.g. if we export a function named `create`, you can run `npm run cli modeler create`.
export default {
  create: createProject,
  view: viewProject,
  delete: deleteProject
};