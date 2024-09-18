import { Subtask } from "./subtask.interface";
export interface Task {
  description: string;
  status: string;
  subtasks: Subtask[];
}
