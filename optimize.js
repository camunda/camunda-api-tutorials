import axios from "axios";
import { getAccessToken } from "./auth.js";

async function listDashboards([collectionId]) {
    console.log("listing dashboards");
}

async function deleteDashboard([dashboardId]) {
    console.log(`deleting dashboard ${dashboardId}`);
}

// These functions are aliased to specific command names for terseness.
//   The name of each property translates to a method that can be called by the CLI.
//   e.g. if we export a function named `list`, you can run `npm run cli optimize list`.

export default {
    list: listDashboards,
    delete: deleteDashboard
  };