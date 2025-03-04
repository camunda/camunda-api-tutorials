import axios from "axios";
import { getAccessToken } from "./auth.js";

const authorizationConfiguration = {
  clientId: process.env.MODELER_CLIENT_ID,
  clientSecret: process.env.MODELER_CLIENT_SECRET,
  audience: process.env.MODELER_AUDIENCE
};

// An action that creates a new project.
async function createProject([projectName, adminEmail]) {
  // Every request needs an access token.
  const accessToken = await getAccessToken(authorizationConfiguration);

  // These settings come from your .env file.
  const modelerApiUrl = process.env.MODELER_BASE_URL;

  // Step 1: Create a new project.

  // This is the API endpoint to create a new project.
  const projectUrl = `${modelerApiUrl}/projects`;

  // Configure the API call.
  const projectOptions = {
    method: "POST",
    url: projectUrl,
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
    // Call the add project endpoint.
    const response = await axios(projectOptions);

    // Capture data from the new project.
    const newProject = response.data;

    console.log(
      `Project added! Name: ${newProject.name}. ID: ${newProject.id}.`
    );

    // Step 2: Add a collaborator to the project.

    // This is the API endpoint to add a collaborator to a project.
    const collaboratorUrl = `${modelerApiUrl}/collaborators`;

    // Configure the API call.
    const collaboratorOptions = {
      method: "PUT",
      url: collaboratorUrl,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      data: {
        // The body contains information about the project and collaborator.
        email: adminEmail,
        projectId: newProject.id,
        role: "project_admin"
      }
    };

    // Call the add collaborator endpoint.
    const collaboratorResponse = await axios(collaboratorOptions);

    if (collaboratorResponse.status === 204) {
      console.log(`Collaborator added! Email: ${adminEmail}.`);
    } else {
      console.error("Unable to add collaborator!");
    }
  } catch (error) {
    // Emit an error from the server.
    console.error(error.message);
  }
}

// An action to view details of a project.
async function viewProject([projectId]) {
  // Every request needs an access token.
  const accessToken = await getAccessToken(authorizationConfiguration);

  // These settings come from your .env file.
  const modelerApiUrl = process.env.MODELER_BASE_URL;

  // This is the API endpoint to retrieve details of a project.
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
    // Call the endpoint.
    const response = await axios(options);

    // Process the results from the API call.
    const project = response.data;

    // Emit the project to output.
    console.log("Project:", project);
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
  const modelerApiUrl = process.env.MODELER_BASE_URL;

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
