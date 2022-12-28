import { BASE_URI } from "../env";
import GroupModel from "./groups/GroupModel";

export async function fetchUserGroups(userId: string): Promise<GroupModel[]> {
  let result;
  console.log(userId);
  try {
    result = await fetch(BASE_URI + `/user/${userId}/groups`);
  } catch (e) {
    console.log(e);
  }
  const json = await result?.json();
  console.log(json);
  return json ?? [];
}

export async function createGroup(group: GroupModel, userId: string) {
  group.members.push(userId);
  fetch(BASE_URI + `/user/${userId}/groups`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(group.toJson()),
  });
}
