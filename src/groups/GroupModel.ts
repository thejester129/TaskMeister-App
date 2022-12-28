import { v4 as uuidv4 } from "uuid";
export default class GroupModel {
  public id: string;
  name: string;
  members: string[];

  constructor(id: string | null, name: string, members: string[] = []) {
    this.id = id ?? uuidv4();
    this.name = name;
    this.members = members;
  }

  static fromJson(json: any): GroupModel {
    return new GroupModel(json.id, json.name, json.members);
  }

  toJson() {
    return {
      id: this.id,
      name: this.name,
      members: this.members,
    };
  }
}
