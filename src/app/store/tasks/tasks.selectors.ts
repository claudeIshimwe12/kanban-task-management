import { createSelector, createFeatureSelector } from "@ngrx/store";
import { AppState } from "../../models/state/app.state.interface";
import { BoardState } from "../../models/state/boards.state.interface";

const selectBoardsState = createFeatureSelector<AppState, BoardState>("boards");

export const selectAllBoards = createSelector(
  selectBoardsState,
  (state) => state.boards,
);
export const selectActiveBoard = createSelector(
  selectBoardsState,
  (state) => state.activeBoard,
);
export const selectLoader = createSelector(
  selectBoardsState,
  (state) => state.loading,
);
