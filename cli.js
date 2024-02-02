const args = process.argv.slice(2); // The first two elements are the node executable and file path
if (args.length > 0) {
  switch (args[0]) {
    case "list":
      listClients();
      break;
    case "add":
      addClient(args[1]);
      break;
    case "view":
      viewClient(args[1]);
      break;
    case "delete":
      deleteClient(args[1]);
      break;
    default:
      console.error("Invalid arguments.");
      break;
  }
} else {
  console.log("No arguments provided.");
}

function listClients() {
  console.log("listing clients");
}

function addClient(clientName) {
  console.log("adding client:", clientName);
}

function viewClient(clientId) {
  console.log("viewing client:", clientId);
}

function deleteClient(clientId) {
  console.log("deleting client:", clientId);
}
