import { Subtask } from "./subtask.interface";
export interface Task {
  title: string;
  description: string;
  status: string;
  subtasks: Subtask[];
}
