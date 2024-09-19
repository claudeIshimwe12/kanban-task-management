import { createReducer, on } from "@ngrx/store";
import * as BoardActions from "./tasks.actions";
import { BoardState } from "../../models/state/boards.state.interface";

export const initialState: BoardState = {
  boards: [],
  loading: false,
  activeBoard: { name: "", columns: [] },
  activeTask: { title: "", description: "", subtasks: [], status: "" },
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
  on(BoardActions.clickOnTask, (state, { task }) => ({
    ...state,
    activeTask: task,
  })),
  on(BoardActions.completeSubtask, (state, { taskTitle, subtaskTitle }) => {
    const updatedBoards = state.boards.map((board) => {
      if (board.name === state.activeBoard.name) {
        const updatedColumns = board.columns.map((column) => {
          const updatedTasks = column.tasks.map((task) => {
            if (task.title === taskTitle) {
              const updatedSubtasks = task.subtasks.map((subtask) => {
                if (subtask.title === subtaskTitle) {
                  return { ...subtask, isCompleted: !subtask.isCompleted };
                }
                return subtask;
              });

              if (state.activeTask && state.activeTask.title === taskTitle) {
                return { ...task, subtasks: updatedSubtasks };
              }

              return { ...task, subtasks: updatedSubtasks };
            }
            return task;
          });

          return { ...column, tasks: updatedTasks };
        });

        return { ...board, columns: updatedColumns };
      }

      return board;
    });

    const updatedActiveBoard = updatedBoards.find(
      (board) => board.name === state.activeBoard.name,
    );

    const updatedActiveTask =
      updatedActiveBoard?.columns
        .flatMap((column) => column.tasks)
        .find((task) => task.title === state.activeTask?.title) ||
      state.activeTask;

    return {
      ...state,
      boards: updatedBoards,
      activeBoard: updatedActiveBoard || state.activeBoard,
      activeTask: updatedActiveTask,
    };
  }),
);
