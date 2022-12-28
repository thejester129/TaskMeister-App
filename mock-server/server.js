const express = require("express");
const app = express();
app.use(express.json());
const port = 3029;

let storedUserGroupMap = {};
let storedGroupLookup = {};

app.get("/user/:userId/groups", (req, res) => {
  const userGroups = storedUserGroupMap[req.params.userId];
  let groupsToSend = [];
  userGroups?.forEach((groupId) =>
    groupsToSend.push(storedGroupLookup[groupId])
  );

  console.log("Returning: " + JSON.stringify(groupsToSend));
  res.send(groupsToSend);
});

app.post("/user/:userId/groups", (req, res) => {
  const userId = req.params.userId;
  const group = req.body;

  storedUserGroupMap[userId] = storedUserGroupMap[userId]
    ? [...storedUserGroupMap[userId], group.id]
    : [group.id];

  storedGroupLookup[group.id] = group;

  res.sendStatus(200);
  console.log("Added group " + JSON.stringify(group));
  console.log(JSON.stringify(storedUserGroupMap));
  console.log(JSON.stringify(storedGroupLookup));
});

app.listen(port, () => {
  console.log(`Mock server listening on port ${port}`);
});
