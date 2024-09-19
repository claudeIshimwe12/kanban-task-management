import { Board } from "../data/board.interface";
import { Task } from "../data/task.interface";

export interface BoardState {
  boards: Board[];
  activeBoard: Board;
  activeTask: Task;
  loading: boolean;
  error: string;
}
