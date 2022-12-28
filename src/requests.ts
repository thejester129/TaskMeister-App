import { BASE_URI } from "../env";
import GroupModel from "./groups/GroupModel";
import WeeklyTaskModel from "./weekly_task_list/WeeklyTaskModel";

export async function fetchUserGroups(userId: string): Promise<GroupModel[]> {
  let result;
  try {
    result = await fetch(BASE_URI + `/user/${userId}/groups`);
  } catch (e) {
    console.log(e);
  }
  const json = await result?.json();
  console.log(json);
  return json ?? [];
}

export async function fetchWeeklyTasks(
  userId: string
): Promise<WeeklyTaskModel[]> {
  let result;
  try {
    result = await fetch(BASE_URI + `/user/${userId}/weekly-tasks`);
  } catch (e) {
    console.log(e);
  }
  const json = await result?.json();
  console.log(json);
  return json ?? [];
}

export async function createGroup(group: GroupModel, userId: string) {
  group.members.push(userId);
  fetch(BASE_URI + `/group`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(group.toJson()),
  });
}

export async function joinGroup(groupId: string, userId: string) {
  fetch(BASE_URI + `/group/${groupId}/user/${userId}`, {
    method: "POST",
  });
}

export async function completeTask(taskId: string, userId: string) {
  fetch(BASE_URI + `/user/${userId}/weekly-tasks/${taskId}`, {
    method: "POST",
  });
}

export async function uncompleteTask(taskId: string, userId: string) {
  fetch(BASE_URI + `/user/${userId}/weekly-tasks/${taskId}`, {
    method: "DELETE",
  });
}
