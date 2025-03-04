import { AuthorizationCode } from "simple-oauth2";

// This function can be used by callers to retrieve a token prior to their API calls.
/**
 * @param {Object} config - A configuration object for authorizing the API client.
 * @param {string} config.clientId - The client ID for the API client.
 * @param {string} config.clientSecret - The client secret for the API client.
 * @param {string} config.audience - The audience associated with the target API.
 * @returns {string}
 */
export async function getAccessToken(config) {
  try {
    const client = configureAuthorizationClient(config);
    const tokenParams = getTokenParams(config);

    const result = await client.getToken(tokenParams);
    const accessToken = client.createToken(result);

    // Return the actual token that can be passed as an Authorization header in each request.
    return accessToken.token.token.access_token;
  } catch (error) {
    throw new Error(error.message);
  }
}

// Configure our authorization request.
/**
 * @param {Object} config - A configuration object for authorizing the API client.
 * @param {string} config.clientId - The client ID for the API client.
 * @param {string} config.clientSecret - The client secret for the API client.
 * @returns {Object} A configured authorization client.
 */
function configureAuthorizationClient({ clientId, clientSecret }) {
  const config = {
    client: {
      id: clientId,
      secret: clientSecret
    },
    auth: {
      // This is the URL for our auth server.
      tokenHost:
        process.env.ZEEBE_AUTHORIZATION_SERVER_URL ||
        "https://login.cloud.camunda.io/oauth/token"
    },
    options: {
      authorizationMethod: "body"
    }
  };
  return new AuthorizationCode(config);
}

// Define additional parameters for the authorization request.
/**
 * @param {Object} config - A configuration object for authorizing the API client.
 * @param {string} config.audience - The audience associated with the target API.
 * @returns {Object} Token parameters for the authorization request.
 */
function getTokenParams({ audience }) {
  return {
    // This audience is specific to the Camunda API we are calling.
    audience
  };
}
