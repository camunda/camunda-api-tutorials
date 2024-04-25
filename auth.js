import { AuthorizationCode } from "simple-oauth2";

const adminConfiguration = {
  // These credentials come from your .env file.
  clientID: process.env.ADMINISTRATION_CLIENT_ID,
  clientSecret: process.env.ADMINISTRATION_CLIENT_SECRET
};

const componentConfiguration = {
  // These credentials come from your .env file.
  clientID: process.env.COMPONENTS_CLIENT_ID,
  clientSecret: process.env.COMPONENTS_CLIENT_SECRET
};

// Configure our authorization request.
function configureAuthorizationClient(targetApi) {
  const configSource =
    targetApi === "administration"
      ? adminConfiguration
      : componentConfiguration;

  const config = {
    client: {
      id: configSource.clientID,
      secret: configSource.clientSecret
    },
    auth: {
      // This is the URL for our auth server.
      tokenHost: "https://login.cloud.camunda.io/oauth/token"
    },
    options: {
      authorizationMethod: "body"
    }
  };
  return new AuthorizationCode(config);
}

// Define additional parameters for the authorization request.
function getTokenParams(audience) {
  return {
    // This audience is specific to the Camunda API we are calling.
    audience
  };
}

// This function can be used by callers to retrieve a token prior to their API calls.
/**
 *
 * @param {"administration" | "components"} targetApi Use "administration" for only the administration API; "components" for all other component APIs.
 * @param {string} audience The `audience` required by the target API.
 * @returns
 */
export async function getAccessToken(targetApi, audience) {
  if (targetApi !== "administration" && targetApi !== "components") {
    throw new Error(
      "Unexpected targetApi value. Expecing 'administration' or 'components'."
    );
  }

  try {
    const client = configureAuthorizationClient(targetApi);
    const tokenParams = getTokenParams(audience);

    const result = await client.getToken(tokenParams);
    const accessToken = client.createToken(result);

    // Return the actual token that can be passed as an Authorization header in each request.
    return accessToken.token.token.access_token;
  } catch (error) {
    throw new Error(error.message);
  }
}
