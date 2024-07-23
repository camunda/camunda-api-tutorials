import axios from "axios";
import { getAccessToken } from "./auth.js";

async function assignUser([userTaskKey, assignee]) {
    console.log(`User task assigned to ${assignee}.`);
}

async function unassignUser([userTaskKey]) {
    console.log("User task has been unassigned!");
}

// These functions are aliased to specific command names for terseness.
//   The name of each property translates to a method that can be called by the CLI.
//   e.g. if we export a function named `assign`, you can run `npm run cli zeebe assign`.

export default {
    assign: assignUser,
    unassign: unassignUser
  };