import { createReducer, on } from "@ngrx/store";
import * as BoardActions from "./tasks.actions";
import { BoardState } from "../../models/state/boards.state.interface";

export const initialState: BoardState = {
  boards: [],
  loading: false,

  activeBoard: { name: "", columns: [] },
  error: "",
};

export const boardsReducer = createReducer(
  initialState,
  on(BoardActions.loadBoards, (state) => ({ ...state, loading: true })),
  on(BoardActions.loadBoardsSuccess, (state, { boards }) => ({
    ...state,
    boards,
    activeBoard: boards[0],
    loading: false,
  })),
  on(BoardActions.loadBoardsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(BoardActions.changeBoard, (state, { title }) => ({
    ...state,
    activeBoard: state.boards.filter((b) => b.name === title)[0],
  })),
);
