import { createAction, props } from "@ngrx/store";
import { Board } from "../../models/data/board.interface";

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
