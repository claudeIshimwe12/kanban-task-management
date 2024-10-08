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
  on(BoardActions.changeTaskStatus, (state, { taskStatus, task }) => {
    const updatedBoards = state.boards.map((board) => {
      if (board.name === state.activeBoard.name) {
        const updatedColumns = board.columns.map((column) => {
          if (column.tasks.some((t) => t.title === task.title)) {
            const updatedTasks = column.tasks.filter(
              (t) => t.title !== task.title,
            );
            return { ...column, tasks: updatedTasks };
          }

          return column;
        });

        const targetColumn = updatedColumns.find(
          (col) => col.name === taskStatus,
        );
        if (targetColumn) {
          const updatedTargetColumn = {
            ...targetColumn,
            tasks: [...targetColumn.tasks, { ...task, status: taskStatus }],
          };

          const finalUpdatedColumns = updatedColumns.map((col) =>
            col.name === taskStatus ? updatedTargetColumn : col,
          );

          return { ...board, columns: finalUpdatedColumns };
        }

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
        .find((t) => t.title === task.title) || state.activeTask;

    return {
      ...state,
      boards: updatedBoards,
      activeBoard: updatedActiveBoard || state.activeBoard,
      activeTask: updatedActiveTask,
    };
  }),
  on(BoardActions.editTask, (state, { title, task }) => {
    const updatedActiveTask = { ...task };

    const updatedActiveBoard = {
      ...state.activeBoard,
      columns: state.activeBoard.columns.map((column) => {
        if (
          column.name === state.activeTask.status &&
          state.activeTask.status === task.status
        ) {
          return {
            ...column,
            tasks: column.tasks.map((t) =>
              t.title === title ? { ...t, ...task } : t,
            ),
          };
        }

        if (column.name === state.activeTask.status) {
          return {
            ...column,
            tasks: column.tasks.filter((t) => t.title !== title),
          };
        }

        if (column.name === task.status) {
          return {
            ...column,
            tasks: [...column.tasks, { ...task }],
          };
        }

        return column;
      }),
    };

    const updatedBoards = state.boards.map((board) =>
      board.name === state.activeBoard.name
        ? {
            ...board,
            columns: board.columns.map((column) => {
              if (
                column.name === state.activeTask.status &&
                state.activeTask.status === task.status
              ) {
                return {
                  ...column,
                  tasks: column.tasks.map((t) =>
                    t.title === title ? { ...t, ...task } : t,
                  ),
                };
              }

              if (column.name === state.activeTask.status) {
                return {
                  ...column,
                  tasks: column.tasks.filter((t) => t.title !== title),
                };
              }

              if (column.name === task.status) {
                return {
                  ...column,
                  tasks: [...column.tasks, { ...task }],
                };
              }

              return column;
            }),
          }
        : board,
    );

    return {
      ...state,
      activeTask: updatedActiveTask,
      activeBoard: updatedActiveBoard,
      boards: updatedBoards,
    };
  }),

  on(BoardActions.deleteTask, (state) => {
    const updatedActiveBoard = {
      ...state.activeBoard,
      columns: state.activeBoard.columns.map((column) => ({
        ...column,
        tasks: column.tasks.filter((t) => t.title !== state.activeTask.title),
      })),
    };

    const updatedBoards = state.boards.map((board) =>
      board.name === state.activeBoard.name
        ? {
            ...board,
            columns: board.columns.map((column) => ({
              ...column,
              tasks: column.tasks.filter(
                (t) => t.title !== state.activeTask.title,
              ),
            })),
          }
        : board,
    );

    const updatedActiveTask = {
      title: "",
      description: "",
      status: "",
      subtasks: [],
    };

    return {
      ...state,
      activeTask: updatedActiveTask,
      activeBoard: updatedActiveBoard,
      boards: updatedBoards,
    };
  }),

  on(BoardActions.addNewTask, (state, { task }) => {
    const updatedActiveBoard = {
      ...state.activeBoard,
      columns: state.activeBoard.columns.map((column) =>
        column.name === task.status
          ? { ...column, tasks: [...column.tasks, task] }
          : column,
      ),
    };

    const updatedBoards = state.boards.map((board) =>
      board.name === state.activeBoard.name
        ? {
            ...board,
            columns: board.columns.map((column) =>
              column.name === task.status
                ? { ...column, tasks: [...column.tasks, task] }
                : column,
            ),
          }
        : board,
    );

    return {
      ...state,
      activeBoard: updatedActiveBoard,
      boards: updatedBoards,
      activeTask: task,
    };
  }),
  on(BoardActions.createBoard, (state, { board }) => {
    const boardExists = state.boards.some(
      (existingBoard) => existingBoard.name === board.name,
    );

    if (boardExists) {
      return state;
    }

    const updatedBoards = [...state.boards, board];

    return {
      ...state,
      boards: updatedBoards,
      activeBoard: board,
    };
  }),

  on(BoardActions.editBoard, (state, { board }) => {
    const updatedBoards = state.boards.map((existingBoard) => {
      if (existingBoard.name !== board.name) {
        return existingBoard;
      }
      const updatedColumns = board.columns.map((newColumn) => {
        const existingColumn = existingBoard.columns.find(
          (col) => col.name === newColumn.name,
        );

        if (existingColumn) {
          return {
            ...newColumn,
            tasks: existingColumn.tasks,
          };
        }

        return newColumn;
      });

      const finalColumns = updatedColumns.filter((newColumn) =>
        board.columns.some((col) => col.name === newColumn.name),
      );

      return {
        ...existingBoard,
        name: board.name,
        columns: finalColumns,
      };
    });

    const updatedActiveBoard =
      state.activeBoard.name === board.name
        ? {
            ...state.activeBoard,
            name: board.name,
            columns:
              updatedBoards.find((b) => b.name === board.name)?.columns ||
              state.activeBoard.columns,
          }
        : state.activeBoard;

    return {
      ...state,
      boards: updatedBoards,
      activeBoard: updatedActiveBoard,
    };
  }),
  on(BoardActions.deleteBoard, (state) => {
    const updatedBoards = state.boards.filter(
      (board) => board.name !== state.activeBoard.name,
    );

    return {
      ...state,
      boards: updatedBoards,
      activeBoard: state.boards[1],
    };
  }),
);
