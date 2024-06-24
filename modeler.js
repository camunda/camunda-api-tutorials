import axios from "axios";
import { getAccessToken } from "./auth.js";

const authorizationConfiguration = {
  clientId: process.env.MODELER_CLIENT_ID,
  clientSecret: process.env.MODELER_CLIENT_SECRET,
  audience: process.env.MODELER_AUDIENCE
};

// An action that creates a new project.
async function createProject([projectName]) {
  // Every request needs an access token.
  const accessToken = await getAccessToken(authorizationConfiguration);

  // These settings come from your .env file.
  const modelerApiUrl = process.env.MODELER_BASE_URL;

  // This is the API endpoint to create a new project.
  const url = `${modelerApiUrl}/projects`;

  // Configure the API call.
  const options = {
    method: "POST",
    url,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`
    },
    data: {
      // The body contains information about the new project.
      name: projectName
    }
  };

  try {
    // Call the add endpoint.
    const response = await axios(options);

    // Process the results from the API call.
    const newProject = response.data;

    console.log(
      `Project added! Name: ${newProject.name}. ID: ${newProject.id}.`
    );
  } catch (error) {
    // Emit an error from the server.
    console.error(error.message);
  }
}

// An action that views one project.
async function viewProject([projectId]) {
  // Every request needs an access token.
  const accessToken = await getAccessToken(authorizationConfiguration);

  // These settings come from your .env file.
  const modelerApiUrl = process.env.MODELER_API_URL;

  // This is the API endpoint to view a single project.
  const url = `${modelerApiUrl}/projects/${projectId}`;

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
    const response = await axios(options);

    // Process the results from the API call.
    const id = response.data;

    // Emit the project details.
    console.log("Project:", id);
  } catch (error) {
    // Emit an error from the server.
    console.error(error.message);
  }
}

// An action that deletes a project.
async function deleteProject([projectId]) {
  // Every request needs an access token.
  const accessToken = await getAccessToken(authorizationConfiguration);

  // These settings come from your .env file.
  const modelerApiUrl = process.env.MODELER_API_URL;

  // This is the API endpoint to delete a project.
  const url = `${modelerApiUrl}/projects/${projectId}`;

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
      console.log(`Project ${projectId} was deleted!`);
    } else {
      // Emit an unexpected error message.
      console.error("Unable to delete project!");
    }
  } catch (error) {
    // Emit an error from the server.
    console.error(error.message);
  }
}

// These functions are aliased to specific command names for terseness.
//   The name of each property translates to a method that can be called by the CLI.
//   e.g. if we export a function named `create`, you can run `npm run cli modeler create`.
export default {
  create: createProject,
  view: viewProject,
  delete: deleteProject
};
