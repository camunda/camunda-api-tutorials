import axios from "axios";
import { getAccessToken } from "./auth.js";

async function listDashboards([collectionId]) {
  const optimizeAudience = process.env.OPTIMIZE_AUDIENCE;
  const accessToken = await getAccessToken("components", optimizeAudience);

  const optimizeApiUrl = process.env.OPTIMIZE_BASE_URL;
  // This is the API endpoint to list your existing dashboard IDs
  const url = `${optimizeApiUrl}/api/public/dashboard?collectionId=${collectionId}`;

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
    const results = response.data;

    results.forEach(x => console.log(`ID: ${x.id}`));
  } catch (error) {
    // Emit an error from the server.
    console.error(error.message);
  }
}

async function deleteDashboard([dashboardId]) {
  console.log(`deleting dashboard ${dashboardId}`);

  const optimizeAudience = process.env.OPTIMIZE_AUDIENCE;
  const accessToken = await getAccessToken("components", optimizeAudience);
  const optimizeApiUrl = process.env.OPTIMIZE_API_URL;

  const url = `${optimizeApiUrl}/public/dashboard/${dashboardId}`;

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
      console.log(`Dashboard ${clientId} was deleted!`);
    } else {
      // Emit an unexpected error message.
      console.error("Unable to delete dashboard!");
    }
  } catch (error) {
    // Emit an error from the server.
    console.error(error.message);
  }
}

// These functions are aliased to specific command names for terseness.
//   The name of each property translates to a method that can be called by the CLI.
//   e.g. if we export a function named `list`, you can run `npm run cli optimize list`.

export default {
  list: listDashboards,
  delete: deleteDashboard
};
