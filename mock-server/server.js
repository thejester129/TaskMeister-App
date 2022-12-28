const { uuid } = require("uuid");
const express = require("express");
const app = express();
app.use(express.json());
const port = 3029;

// {groupId, weeklyTasks}
let userDb = {
  ["28644c9b-a354-4b82-ab33-f7a7e99eff12"]: {
    groupIds: ["test"],
    weeklyTasks: [],
  },
};

let groupDb = {
  test: {
    id: "test",
    name: "Test group",
    members: ["28644c9b-a354-4b82-ab33-f7a7e99eff12"],
    tasks: [
      { name: "Wash", quantity: 2 },
      { name: "Hover", quantity: 1 },
    ],
  },
};

// Get Groups
app.get("/user/:userId/groups", (req, res) => {
  const groupIds = userDb[req.params.userId]?.groupIds;
  const groups = groupIds ? groupIds.map((groupId) => groupDb[groupId]) : [];
  console.log("Returning: " + JSON.stringify(groups));
  res.send(groups);
});

// Get Weekly Tasks
app.get("/user/:userId/weekly-tasks", (req, res) => {
  let weeklyTasks = userDb[req.params.userId]?.weeklyTasks ?? [];
  if (!weeklyTasks.length) {
    mockWeeklyAssignment();
    weeklyTasks = userDb[req.params.userId]?.weeklyTasks ?? [];
  }
  console.log("Weekly tasks: " + JSON.stringify(weeklyTasks));
  res.send(weeklyTasks);
});

// Complete task
app.post("/user/:userId/weekly-tasks/:taskId", (req, res) => {
  const taskId = req.params.taskId;
  const task = userDb[req.params.userId]?.weeklyTasks.find(
    (task) => task.id === taskId
  );
  task.complete = true;
  res.sendStatus(200);
  console.log("Completed task " + task.name);
});

// Uncomplete task
app.delete("/user/:userId/weekly-tasks/:taskId", (req, res) => {
  const taskId = req.params.taskId;
  const task = userDb[req.params.userId]?.weeklyTasks.find(
    (task) => task.id === taskId
  );
  task.complete = false;
  res.sendStatus(200);
  console.log("Uncompleted task " + task.name);
});

// Add User to Group
app.post("/group/:groupId/user/:userId", (req, res) => {
  const groupId = req.params.groupId;
  const userId = req.params.userId;

  if (userDb[userId]) {
    userDb[userId].groupIds = [...userDb[userId].groupIds, groupId];
  } else {
    userDb[userId] = { groupIds: [groupId] };
  }

  groupDb[groupId].members.push(userId);

  res.sendStatus(200);
  console.log("Added user " + userId);
});

// Create Group
app.post("/group", (req, res) => {
  const group = req.body;
  console.log(JSON.stringify(group));
  const userId = group.members[0];

  const existingGroupIds = userDb[userId].groupIds ?? [];
  userDb[userId] = [...existingGroupIds, groupId];
  groupDb[group.id] = group;

  res.sendStatus(200);
  console.log("Added group " + JSON.stringify(group));
});

app.listen(port, () => {
  console.log(`Mock server listening on port ${port}`);
});

// Helpers
function mockWeeklyAssignment() {
  console.log("Mocking out weekly tasks");
  Object.values(groupDb)?.forEach((group) => {
    const { members, tasks } = group;
    console.log(JSON.stringify(members));
    console.log(JSON.stringify(tasks));
    if (!tasks || !members) return;
    members.forEach((memberId) => {
      userDb[memberId].weeklyTasks = tasksToWeeklyTasks(tasks);
    });
  });
}

function tasksToWeeklyTasks(tasks) {
  const weeklyTasks = [];
  tasks.forEach((task) => {
    for (var i = 1; i <= task.quantity; i++) {
      weeklyTasks.push(mapGroupTaskToWeeklyTask(task, i));
    }
  });
  return weeklyTasks;
}

function mapGroupTaskToWeeklyTask(groupTask, i) {
  task = { ...groupTask };
  task.completed = false;
  task.id = task.name + i;
  delete task.quantity;
  return task;
}
