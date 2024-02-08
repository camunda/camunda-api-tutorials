import { AuthorizationCode } from "simple-oauth2";

const clientID = process.env.CONSOLE_CLIENT_ID;
const clientSecret = process.env.CONSOLE_CLIENT_SECRET;

const config = {
  client: {
    // TODO: HIDE ME IN A .ENV FILE!!!
    id: clientID,
    secret: clientSecret
  },
  auth: {
    tokenHost: "https://login.cloud.camunda.io/oauth/token"
  },
  options: {
    authorizationMethod: "body"
  }
};

const client = new AuthorizationCode(config);

const tokenParams = {
  audience: "api.cloud.camunda.io"
};

export async function getAccessToken() {
  try {
    const result = await client.getToken(tokenParams);
    const accessToken = client.createToken(result);
    // console.log("Access Token:", accessToken.token.token.access_token);
    return accessToken.token.token.access_token;
  } catch (error) {
    throw new Error(error.message);
  }
}
