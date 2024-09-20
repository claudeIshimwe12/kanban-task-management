import { createAction, props } from "@ngrx/store";
import { Board } from "../../models/data/board.interface";
import { Task } from "../../models/data/task.interface";

export const loadBoards = createAction("[App Component] Load Boards");
export const loadBoardsSuccess = createAction(
  "[App Component] Load Boards Success",
  props<{ boards: Board[] }>(),
);
export const loadBoardsFailure = createAction(
  "[App Component] Load Boards Failure",
  props<{ error: string }>(),
);

export const changeBoard = createAction(
  "[Side Bar Component] Change Active Board",
  props<{ title: string }>(),
);
export const moveTask = createAction(
  "[Board] Move Task",
  props<{
    previousColumnId: number;
    currentColumnId: number;
    previousIndex: number;
    currentIndex: number;
  }>(),
);

export const clickOnTask = createAction(
  "[Main Component] Click Task",
  props<{ task: Task }>(),
);

// Action to complete a subtask
export const completeSubtask = createAction(
  "[Main Component] Complete Subtask",
  props<{ taskTitle: string; subtaskTitle: string }>(),
);
export const changeTaskStatus = createAction(
  "[Main Component] Change Task Status",
  props<{ taskStatus: string; task: Task }>(),
);
