import { v4 as uuidv4 } from "uuid";
export default class WeeklyTaskModel {
  public id: string;
  name: string;
  complete: boolean;

  constructor(id: string | null, name: string, complete = false) {
    this.id = id ?? uuidv4();
    this.name = name;
    this.complete = complete;
  }

  static fromJson(json: any): WeeklyTaskModel {
    return new WeeklyTaskModel(json.id, json.name, json.complete);
  }

  toJson() {
    return {
      id: this.id,
      name: this.name,
      complete: this.complete,
    };
  }
}
