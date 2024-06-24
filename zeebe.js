import axios from "axios";
import { getAccessToken } from "./auth.js";

const authorizationConfiguration = {
  clientId: process.env.ZEEBE_CLIENT_ID,
  clientSecret: process.env.ZEEBE_CLIENT_SECRET,
  audience: process.env.ZEEBE_AUDIENCE
};

// An action that assigns a user task.
async function assignTask([assignee]) {
    // Every request needs an access token.
    const accessToken = await getAccessToken(authorizationConfiguration);
  
    // These settings come from your .env file.
    const ZeebeApiUrl = process.env.ZEEBE_BASE_URL;
    const userTaskKey = process.env.USER_TASK_KEY;
  
    // This is the API endpoint to assign a user task.
    const url = `${ZeebeApiUrl}/user-tasks/${userTaskKey}/assignment`;
  
    // Configure the API call.
    const options = {
      method: "POST",
      url,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      data: {
        // The body contains information about the new assignment.
        assignee: assignee
      }
    };
  
    try {
      // Call the add endpoint.
      const response = await axios(options);
  
      // Process the results from the API call.
    if (response.status === 204) {
      console.log(`User task assigned to ${assignee}.`);
    } else {
      // Emit an unexpected error message.
      console.error("Unable to assign this user!");
    }
    } catch (error) {
      // Emit an error from the server.
      console.error(error.message);
    }
  }

async function unassignUser([assignee]) {
  console.log(`unassigning user ${assignee}`);

  const accessToken = await getAccessToken(authorizationConfiguration);

  const ZeebeApiUrl = process.env.ZEEBE_BASE_URL;
  const userTaskKey = process.env.USER_TASK_KEY;

  const url = `${ZeebeApiUrl}/user-tasks/${userTaskKey}/assignee`;

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
      console.log(`${assignee} was unassigned from this user task!`);
    } else {
      // Emit an unexpected error message.
      console.error("Unable to unassign this user!");
    }
  } catch (error) {
    // Emit an error from the server.
    console.error(error.message);
  }
}

// These functions are aliased to specific command names for terseness.
//   The name of each property translates to a method that can be called by the CLI.
//   e.g. if we export a function named `assign`, you can run `npm run cli zeebe assign`.

export default {
  assign: assignUser,
  unassign: unassignUser
};
