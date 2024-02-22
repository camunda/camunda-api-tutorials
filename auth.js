import { AuthorizationCode } from "simple-oauth2";

// These credentials come from your .env file.
const clientID = process.env.ADMINISTRATION_CLIENT_ID;
const clientSecret = process.env.ADMINISTRATION_CLIENT_SECRET;

// Configure our authorization request.
const config = {
  client: {
    id: clientID,
    secret: clientSecret
  },
  auth: {
    // This is the URL for our auth server.
    tokenHost: "https://login.cloud.camunda.io/oauth/token"
  },
  options: {
    authorizationMethod: "body"
  }
};
const client = new AuthorizationCode(config);

// Define additional parameters for the authorization request.
const tokenParams = {
  // This audience is specific to the Camunda API we are calling.
  audience: "api.cloud.camunda.io"
};

// This function can be used by callers to retrieve a token prior to their API calls.
export async function getAccessToken() {
  try {
    const result = await client.getToken(tokenParams);
    const accessToken = client.createToken(result);
    // Return the actual token that can be passed as an Authorization header in each request.
    return accessToken.token.token.access_token;
  } catch (error) {
    throw new Error(error.message);
  }
}
