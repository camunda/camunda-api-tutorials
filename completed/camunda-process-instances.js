import axios from "axios";
import { getAccessToken } from "../auth.js";

// An action that deploys one or more resources (e.g. processes, decision models, or forms). This is an atomic call, i.e. either all resources are deployed or none of them are.
async function deployResources() {
  console.log("deploying resources");
}

// An action that creates and starts an instance of the specified process.
async function createInstance() {
  console.log(`creating process instance`);
}

// An action that gets the process instance by the process instance key.
async function viewInstance([processInstanceKey]) {

  // Every request needs an access token.
  const accessToken = await getAccessToken(authorizationConfiguration);

  // These settings come from your .env file.
  const camundaApiUrl = process.env.CAMUNDA_REST_ADDRESS;

  // This is the API endpoint to get a specific role.
  const url = `${camundaApiUrl}/processinstances/${processInstanceKey}`;

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
      const results = response.data;
  
      // Emit role to output.
      console.log(
        `Process instance name: ${results.processDefinitionName
        }; State: ${
          results.state
        };`
      );
    } catch (error) {
      // Emit an error from the server.
      console.error(error.message);
    }
}

// These functions are aliased to specific command names for terseness.
//   The name of each property translates to a method that can be called by the CLI.
//   e.g. if we export a function named `list`, you can run `npm run cli zeebe get`.

export default {
  deploy: deployResources,
  create: createInstance,
  view: viewInstance
};
