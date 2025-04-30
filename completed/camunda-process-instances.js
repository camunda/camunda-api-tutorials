import path from "path";
import fs from "fs";
import axios from "axios";
import FormData from "form-data";
import { getAccessToken } from "../auth.js";

const authorizationConfiguration = {
  clientId: process.env.CAMUNDA_CLIENT_ID,
  clientSecret: process.env.CAMUNDA_CLIENT_SECRET,
  // These settings come from your .env file. Note that CAMUNDA_TOKEN_AUDIENCE is represented by ZEEBE_TOKEN_AUDIENCE in the Console UI.
  audience: process.env.CAMUNDA_TOKEN_AUDIENCE
};

// An action that deploys one or more resources (e.g. processes, decision models, or forms). This is an atomic call, i.e. either all resources are deployed or none of them are.
async function deployResources() {
  // Every request needs an access token.
  const accessToken = await getAccessToken(authorizationConfiguration);

  // These settings come from your .env file.
  const camundaApiUrl = process.env.CAMUNDA_REST_ADDRESS;

  // This is the API endpoint.
  const url = `${camundaApiUrl}/deployments`;

  const formData = new FormData();
  // Read the BPMN file and add it to the form data
  const bpmnFilePath = path.resolve("resources/calculate-sales-tax.bpmn");
  const fileContent = fs.readFileSync(bpmnFilePath);
  formData.append("resources", fileContent, {
    filename: "calculate-sales-tax.bpmn",
    contentType: "application/xml"
  });

  // Configure the API call.
  const options = {
    method: "POST",
    url,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
      ...formData.getHeaders()
    },
    data: formData
  };

  try {
    const response = await axios(options);
    const deployedResources = response.data.deployments;

    // Emit deployed resources
    deployedResources.forEach(x =>
      console.log(
        `Process Definition Key: ${x.processDefinition.processDefinitionKey}; Process Definition Id: ${x.processDefinition.processDefinitionId}`
      )
    );
  } catch (error) {
    // Emit an error from the server.
    console.error(error.message);
  }
}

// An action that creates and starts an instance of the specified process.
async function createInstance([processDefinitionKey]) {
  // Every request needs an access token.
  const accessToken = await getAccessToken(authorizationConfiguration);

  // These settings come from your .env file.
  const camundaApiUrl = process.env.CAMUNDA_REST_ADDRESS;

  // This is the API endpoint.
  const url = `${camundaApiUrl}/process-instances`;

  // Configure the API call.
  const options = {
    method: "POST",
    url,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`
    },
    data: {
      processDefinitionKey: processDefinitionKey,
      variables: {
        total: 90.0
      }
    }
  };

  try {
    const response = await axios(options);
    const processInstance = response.data;

    // Emit new role to output.
    console.log(`Process Instance Key: ${processInstance.processInstanceKey}`);
  } catch (error) {
    // Emit an error from the server.
    console.error(error.message);
  }
}

// An action that gets the process instance by the process instance key.
async function viewInstance([processInstanceKey]) {
  // Every request needs an access token.
  const accessToken = await getAccessToken(authorizationConfiguration);

  // These settings come from your .env file.
  const camundaApiUrl = process.env.CAMUNDA_REST_ADDRESS;

  // This is the API endpoint to get a specific role.
  const url = `${camundaApiUrl}/process-instances/${processInstanceKey}`;

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
      `Process instance name: ${results.processDefinitionName}; State: ${results.state};`
    );
  } catch (error) {
    // Emit an error from the server.
    console.error(error.message);
  }
}

// These functions are aliased to specific command names for terseness.
//   The name of each property translates to a method that can be called by the CLI.
//   e.g. if we export a function named `list`, you can run `npm run cli processInstances get`.

export default {
  deploy: deployResources,
  create: createInstance,
  view: viewInstance
};
