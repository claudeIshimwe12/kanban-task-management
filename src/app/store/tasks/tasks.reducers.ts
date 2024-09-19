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

  on(BoardActions.loadBoards, (state) => ({
    ...state,
    loading: true,
  })),

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
    activeBoard:
      state.boards.find((b) => b.name === title) || state.activeBoard,
  })),

  on(
    BoardActions.moveTask,
    (
      state,
      { previousColumnId, currentColumnId, previousIndex, currentIndex },
    ) => {
      const activeBoard = { ...state.activeBoard };
      const previousColumn = activeBoard.columns[previousColumnId];
      const currentColumn = activeBoard.columns[currentColumnId];

      if (!previousColumn || !currentColumn) {
        return state;
      }

      const taskToMove = previousColumn.tasks[previousIndex];

      const updatedPreviousColumnTasks = previousColumn.tasks.filter(
        (_, index) => index !== previousIndex,
      );

      const updatedCurrentColumnTasks = [
        ...currentColumn.tasks.slice(0, currentIndex),
        taskToMove,
        ...currentColumn.tasks.slice(currentIndex),
      ];

      const updatedColumns = activeBoard.columns.map((column, index) => {
        if (index === previousColumnId) {
          return { ...column, tasks: updatedPreviousColumnTasks };
        } else if (index === currentColumnId) {
          return { ...column, tasks: updatedCurrentColumnTasks };
        }
        return column;
      });

      const updatedActiveBoard = {
        ...activeBoard,
        columns: updatedColumns,
      };

      const updatedBoards = state.boards.map((board) =>
        board.name === updatedActiveBoard.name ? updatedActiveBoard : board,
      );

      return {
        ...state,
        boards: updatedBoards,
        activeBoard: updatedActiveBoard,
      };
    },
  ),
);
