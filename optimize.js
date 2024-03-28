import axios from "axios";
import { getAccessToken } from "./auth.js";

async function viewDashboard([dashboardId]) {

const accessToken = await getAccessToken();
const optimizeApiUrl = process.env.OPTIMIZE_API_URL;
const collectionId = process.env.OPTIMIZE_COLLECTION_ID;

// This is the API endpoint to view your existing dashboard IDs
const url = `${optimizeApiUrl}/public/dashboard?collectionId=${collectionId}`;

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
      const clientResponse = response.data;
  
      // Emit the dashboard details.
      console.log("Dashboard:", clientResponse);
    } catch (error) {
      // Emit an error from the server.
      console.error(error.message);
    }
  }

async function deleteDashboard([dashboardId]) {
  console.log(`deleting dashboard ${dashboardId}`);

  const accessToken = await getAccessToken();
  const optimizeApiUrl = process.env.OPTIMIZE_API_URL;
  const dashboardId = process.env.OPTIMIZE_DASHBOARD_ID;

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
//   e.g. if we export a function named `list`, you can run `npm run cli admin list`.

export default {
  view: viewDashboard,
  delete: deleteDashboard
};