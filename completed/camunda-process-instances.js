import axios from "axios";
import { getAccessToken } from "../auth.js";

// An action that deploys one or more resources (e.g. processes, decision models, or forms). This is an atomic call, i.e. either all resources are deployed or none of them are.
async function deployResources() {

    // Every request needs an access token.
    const accessToken = await getAccessToken(authorizationConfiguration);

    // These settings come from your .env file.
    const camundaApiUrl = process.env.CAMUNDA_REST_ADDRESS;

    // This is the API endpoint.
    const url = `${camundaApiUrl}/deployments`;

  // Configure the API call.
  const options = {
    method: "POST",
    url,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`
    },
    data: {
      // The body contains information about the new role -- resources and tenantId?
    }
  };

  try {
    const response = await axios(options);

    // Emit new role to output.
    console.log(`deploying resources`);
  } catch (error) {
    // Emit an error from the server.
    console.error(error.message);
  }
}

```mynotes
------myboundary
Content-Disposition: form-data; name="tenantId"
Content-Type: text/plain
myCustomTenant
------myboundary
Content-Disposition: form-data; name="resource"; filename="file1.txt"
Content-Type: text/plain
[file content goes there]
------myboundary
Content-Disposition: form-data; name="resource"; filename="file2.png"
Content-Type: image/png
[file content goes there]
------myboundary

var https = require('follow-redirects').https;
var fs = require('fs');

var options = {
  'method': 'POST',
  'hostname': 'localhost',
  'port': 8080,
  'path': '/v2/deployments',
  'headers': {
    'Content-Type': 'multipart/form-data',
    'Accept': 'application/json'
  },
  'maxRedirects': 20
};

var req = https.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function (chunk) {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });

  res.on("error", function (error) {
    console.error(error);
  });
});


```

// An action that creates and starts an instance of the specified process.
async function createInstance() {

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
      // The body contains information about the new role -- what do I need to include?
    }
  };

  try {
    const response = await axios(options);

    // Emit new role to output.
    console.log(`creating process instance`);
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
