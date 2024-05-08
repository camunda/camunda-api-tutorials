import axios from "axios";
import { getAccessToken } from "./auth.js";

// An action that retrieves a file.
async function retrieveFile([fileId]) {
    const modelerAudience = process.env.MODELER_AUDIENCE;
    const accessToken = await getAccessToken("components", modelerAudience);

    const url = `process.env.MODELER_AUDIENCE/files/${fileId}`;

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

    results.forEach(x => console.log(`File retrieved! ID: ${id}. Name: ${name}`));
  } catch (error) {
    // Emit an error from the server.
    console.error(error.message);
  }
}

async function deleteFile([fileId]) {
    console.log(`deleting file ${fileId}`);
  
    const modelerAudience = process.env.MODELER_AUDIENCE;
    const accessToken = await getAccessToken("components", modelerAudience);

    const url = `process.env.MODELER_AUDIENCE/files/${fileId}`;
  
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
        console.log(`File ${fileId} was deleted!`);
      } else {
        // Emit an unexpected error message.
        console.error("Unable to delete file!");
      }
    } catch (error) {
      // Emit an error from the server.
      console.error(error.message);
    }
  }

export default {
    retrieve: retrieveFile,
    delete: deleteFile
  };