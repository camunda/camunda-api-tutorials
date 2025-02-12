import axios from "axios";
import { getAccessToken } from "../auth.js";

const authorizationConfiguration = {
  clientId: process.env.ZEEBE_CLIENT_ID,
  clientSecret: process.env.ZEEBE_CLIENT_SECRET,
  audience: process.env.ZEEBE_AUDIENCE
};

async function getUser() {
    console.log("User key:", userKey);
}

async function createGroup([groupName]) {
    console.log(
      `Group added! Name: ${newGroup.name}. Key: ${newGroup.groupKey}.`
    );
}

async function assignUser([groupKey, userKey]) {
    console.log(`Group assigned to ${assignee}.`);
}

async function retrieveGroup([groupKey]) {
    results.forEach(x => console.log(`Name: ${x.name}; ID: ${x.assignedMemberKeys
    }`));
}

async function deleteGroup([groupKey]) {
      console.log("Group deleted!");
}

// These functions are aliased to specific command names for terseness.
//   The name of each property translates to a method that can be called by the CLI.
//   e.g. if we export a function named `assign`, you can run `npm run cli camunda8 get`.

export default {
  get: getUser,
  create: createGroup,
  assign: assignUser,
  retrieve: retrieveGroup,
  delete: deleteGroup
};
