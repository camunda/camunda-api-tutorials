import { ClientCredentials } from "simple-oauth2";

/**
 * Retrieve an access token for Camunda API calls using Client Credentials.
 *
 * @param {Object} config - A configuration object for authorizing the API client.
 * @param {string} config.clientId - The client ID for the API client.
 * @param {string} config.clientSecret - The client secret for the API client.
 * @param {string} config.audience - The audience associated with the target API.
 * @returns {Promise<string>} - A valid access token to use in API requests.
 */
export async function getAccessToken(config) {
  try {
    const client = configureAuthorizationClient(config);
    const tokenParams = getTokenParams(config);

    const result = await client.getToken(tokenParams);

    // Return the actual token that can be passed as an Authorization header in each request.
    return result.token.access_token;
  } catch (error) {
    throw new Error(`Failed to fetch access token: ${error.message}`);
  }
}

/**
 * Configure the OAuth2 client for authorization.
 *
 * @param {Object} param0
 * @param {string} param0.clientId
 * @param {string} param0.clientSecret
 * @returns {ClientCredentials} A configured authorization client.
 */
function configureAuthorizationClient({ clientId, clientSecret }) {
  const config = {
    client: {
      id: clientId,
      secret: clientSecret
    },
    auth: {
      // Default Camunda SaaS token URL; override with ZEEBE_AUTHORIZATION_SERVER_URL if self-managed.
      tokenHost:
        process.env.ZEEBE_AUTHORIZATION_SERVER_URL ||
        "https://login.cloud.camunda.io/oauth/token"
    },
    options: {
      authorizationMethod: "body"
    }
  };

  return new ClientCredentials(config);
}

/**
 * Define additional parameters for the token request.
 *
 * @param {Object} param0
 * @param {string} param0.audience - The audience associated with the target API.
 * @returns {Object} Token parameters for the authorization request.
 */
function getTokenParams({ audience }) {
  return {
    audience
  };
}
