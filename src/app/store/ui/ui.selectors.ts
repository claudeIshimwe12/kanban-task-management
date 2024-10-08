import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UIState } from "../../models/state/ui.state.interface";
import { AppState } from "../../models/state/app.state.interface";

const selectUIState = createFeatureSelector<AppState, UIState>("ui");

export const selectSideBarToggler = createSelector(
  selectUIState,
  (state) => state.showSideBar,
);
export const selectModalToggler = createSelector(
  selectUIState,
  (state) => state.showModal,
);
export const selectConfirmDeleteToggler = createSelector(
  selectUIState,
  (state) => state.toggleConfirmDeleteTask,
);
export const selectToggleEditModal = createSelector(
  selectUIState,
  (state) => state.toggleEditTaskModal,
);
export const selectIsConfirmDeleteModalOpen = createSelector(
  selectUIState,
  (state) => state.isConfirmDeleteModalOpen,
);
export const selectToggleAddNewTaskModal = createSelector(
  selectUIState,
  (state) => state.toggleAddTaskModal,
);
export const selectToggleAddBoardModal = createSelector(
  selectUIState,
  (state) => state.toggleAddBoardModal,
);
export const selectToggleEditBoardModal = createSelector(
  selectUIState,
  (state) => state.toggleEditBoardModal,
);

export const selectConfirmModifyBoard = createSelector(
  selectUIState,
  (state) => state.openDeleteBoardModal,
);
export const selectConfirmDeleteTask = createSelector(
  selectUIState,
  (state) => state.openDeleteTaskModal,
);
