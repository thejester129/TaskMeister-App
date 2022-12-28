const express = require("express");
const app = express();
app.use(express.json());
const port = 3029;

let storedUserGroupMap = {};
let storedGroupLookup = {
  test: { id: "test", name: "Test group", members: [] },
};

app.get("/user/:userId/groups", (req, res) => {
  const userGroups = storedUserGroupMap[req.params.userId];
  let groupsToSend = [];
  userGroups?.forEach((groupId) =>
    groupsToSend.push(storedGroupLookup[groupId])
  );

  console.log("Returning: " + JSON.stringify(groupsToSend));
  res.send(groupsToSend);
});

app.post("/group/:groupId/add-user/:userId", (req, res) => {
  const groupId = req.params.groupId;
  const userId = req.params.userId;

  storedUserGroupMap[userId] = storedUserGroupMap[userId]
    ? [...storedUserGroupMap[userId], groupId]
    : [groupId];

  storedGroupLookup[groupId]?.push(userId);

  res.sendStatus(200);
  console.log("Added user " + userId);
});

app.post("/group", (req, res) => {
  const group = req.body;
  console.log(JSON.stringify(group));
  const userId = group.members[0];

  storedUserGroupMap[userId] = storedUserGroupMap[userId]
    ? [...storedUserGroupMap[userId], group.id]
    : [group.id];

  storedGroupLookup[group.id] = group;

  res.sendStatus(200);
  console.log("Added group " + JSON.stringify(group));
});

app.listen(port, () => {
  console.log(`Mock server listening on port ${port}`);
});
