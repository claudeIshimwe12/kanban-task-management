import { createReducer, on } from "@ngrx/store";
import * as BoardActions from "./tasks.actions";
import { BoardState } from "../../models/state/boards.state.interface";

export const initialState: BoardState = {
  boards: [],
  loading: false,
  error: "",
};

export const boardsReducer = createReducer(
  initialState,
  on(BoardActions.loadBoards, (state) => ({ ...state, isLoading: true })),
  on(BoardActions.loadBoardsSuccess, (state, { boards }) => ({
    ...state,
    boards,
    isLoading: false,
  })),
  on(BoardActions.loadBoardsFailure, (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
  })),
);
