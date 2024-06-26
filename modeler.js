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

// A function that adds a new collaborator to a project
async function addCollaborator([collaboratorEmail, projectId, role]) {
  // Every request needs an access token.
  const accessToken = await getAccessToken(authorizationConfiguration);

  // These settings come from your .env file.
  const modelerApiUrl = process.env.MODELER_BASE_URL;

  // This is the API endpoint to add a new collaborator.
  const url = `${modelerApiUrl}/collaborators`;

  // Configure the API call.
  const options = {
    method: "PUT",
    url,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`
    },
    data: {
      // The body contains information about the new collaborator.
      collaboratorEmail: collaboratorEmail,
      projectId: projectId,
      role: role
    }
  };

  try {
    // Call the endpoint.
    const response = await axios(options);

    // Process the results from the API call.
    const newCollaborator = response.data;

    // Emit new collaborator to output.
    console.log(
      `Collaborator added! Email: ${newCollaborator.email}. Role: ${newCollaborator.role}.`
    );
  } catch (error) {
    // Emit an error from the server.
    console.error(error.message);
  }
}

// A function that searches for collaborators.
async function findCollaborator([]) {
  // Every request needs an access token.
  const accessToken = await getAccessToken(authorizationConfiguration);

  // These settings come from your .env file.
  const modelerApiUrl = process.env.MODELER_BASE_URL;

  // This is the API endpoint to search for a collaborator.
  const url = `${modelerApiUrl}/collaborators/search`;

  // Configure the API call.
  const options = {
    method: "POST",
    url,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`
    },
    data: {
      // The body contains information about the collaborator you're searchiing for.
      collaboratorEmail: collaboratorEmail
    }
  };

  try {
    // Call the endpoint.
    const response = await axios(options);

    // Process the results from the API call.
    const collaboratorEmail = response.data;

    // Emit collaborator to output.
    console.log(
      `Collaborator found! Email: ${collaboratorEmail.email}.`
    );
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
  add: addCollaborator,
  find: findCollaborator
};
