import axios from "axios";
import { getAccessToken } from "../auth.js";

const authorizationConfiguration = {
  clientId: process.env.ZEEBE_CLIENT_ID,
  clientSecret: process.env.ZEEBE_CLIENT_SECRET,
  audience: process.env.ZEEBE_AUDIENCE
};

// An action that deploys one or more resources (processes, decision models, or forms). This is an atomic call, so either all resources are deployed or none of them are.
// REQUIRES DETAILS
async function deployResources([]) {
    // Every request needs an access token.
    const accessToken = await getAccessToken(authorizationConfiguration);

    // These settings come from your .env file.
    const zeebeApiUrl = process.env.ZEEBE_BASE_URL;

    // This is the API endpoint to deploy resources.
    const url = `${zeebeApiUrl}/deployments`;

    // Configure the API call.
    const options = {
      method: "POST",
      url,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`
      },

// REQUIRES DETAILS
      data: {
        // The body contains information about the deployed resources.
        tenantId: tenantId
      }
    };

    try {
      // Call the endpoint.
      const response = await axios(options);

      // Process the results from the API call.
    if (response.status === 204) {
      console.log(`Resources deployed.`);
    } else {
      // Emit an unexpected error message.
      console.error("Unable to deploy resources!");
    }
    } catch (error) {
      // Emit an error from the server.
      console.error(error.message);
    }
  }

// An action that creates and starts an instance of the specified process. The process definition to use to create the instance can be specified using its unique key (as returned by deploy resources).
// REQUIRES DETAILS
async function createProcessInstance([]) {
  const accessToken = await getAccessToken(authorizationConfiguration);

  const zeebeApiUrl = process.env.ZEEBE_BASE_URL;

  const url = `${zeebeApiUrl}/process-instances`;

  // Configure the API call.
  const options = {
    method: "POST",
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
    if (response.status === 204) {
      console.log("Process instance created!");
    } else {
      // Emit an unexpected error message.
      console.error("Unable to create process instance!");
    }
  } catch (error) {
    // Emit an error from the server.
    console.error(error.message);
  }
}

// An action to get the process instance by the process instance key.
async function viewProcessInstance([processInstanceKey]) {
    // Every request needs an access token.
    const accessToken = await getAccessToken(authorizationConfiguration);
  
    const zeebeApiUrl = process.env.ZEEBE_BASE_URL;
  
    const url = `${zeebeApiUrl}/process-instances/${processInstanceKey}`;
  
    // Configure the API call.
    const options = {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`
      }
    };
  
    // REQUIRES DETAILS
    try {
      // Call the endpoint.
      const response = await axios(options);
  
      // Process the results from the API call.
      const  = response.data;
  
      // Emit the project to output.
      console.log("Process instance:", processInstance);
    } catch (error) {
      // Emit an error from the server.
      console.error(error.message);
    }
  }

// These functions are aliased to specific command names for terseness.
//   The name of each property translates to a method that can be called by the CLI.
//   e.g. if we export a function named `deploy`, you can run `npm run cli camunda8 deploy`.

export default {
  deploy: deployResources,
  create: createProcessInstance,
  view: viewProcessInstance
};
