import { getValue, storeValue } from "./asyncStorage";
import storageKeys from "./storageKeys";
import { v4 as uuidv4 } from "uuid";

export default async (): Promise<string> => {
  const value = await getValue(storageKeys.USER_ID);
  if (value) return value;
  const newId = "user-" + uuidv4();
  storeValue(storageKeys.USER_ID, newId);
  return newId;
};
