import axios from "axios";
import { getAccessToken } from "./auth.js";

const authorizationConfiguration = {
  clientId: process.env.MODELER_CLIENT_ID,
  clientSecret: process.env.MODELER_CLIENT_SECRET,
  audience: process.env.MODELER_AUDIENCE
};

// An action that creates a file.
async function createFile([fileName]) {
    const accessToken = await getAccessToken(authorizationConfiguration);

    const ModelerBaseUrl = process.env.MODELER_BASE_URL;

    const url = `${ModelerBaseUrl}/files` ;

  // Configure the API call.
  const options = {
    method: "POST",
    url,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`
    },
    data: {
      // The body contains information about the new file.
      fileName: fileName
    }
  };

  try {
    // Call the add endpoint.
    const response = await axios(options);

    // Process the results from the API call.
    const newFile = response.data;

    console.log(
      `Client added! Name: ${newFile.name}. ID: ${newFile.projectId}.`
    );
  } catch (error) {
    // Emit an error from the server.
    console.error(error.message);
  }
}

async function deleteFile([fileId]) {
    console.log(`deleting file ${fileId}`);

    const accessToken = await getAccessToken(authorizationConfiguration);
    
    const ModelerBaseUrl = process.env.MODELER_BASE_URL;
    const url = `${ModelerBaseUrl}/files/${fileId}`;
  
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
    create: createFile,
    delete: deleteFile
  };