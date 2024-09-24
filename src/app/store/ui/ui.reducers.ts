import { createReducer, on } from "@ngrx/store";
import * as UIActions from "./ui.actions";
import { UIState } from "../../models/state/ui.state.interface";
export const initialState: UIState = {
  showSideBar: false,
  showModal: false,
  toggleConfirmDeleteTask: false,
  isConfirmDeleteModalOpen: false,
  toggleEditTaskModal: false,
  toggleAddTaskModal: false,
  toggleAddBoardModal: false,
  toggleEditBoardModal: false,
  openDeleteBoardModal: false,
  openDeleteTaskModal: false,
};

export const UIReducer = createReducer(
  initialState,
  on(
    UIActions.toggleSideBar,
    (state): UIState => ({
      ...state,
      showSideBar: !state.showSideBar,
    }),
  ),
  on(
    UIActions.toggleModal,
    (state): UIState => ({
      ...state,
      showModal: !state.showModal,
    }),
  ),
  on(
    UIActions.toggleConfirmDeleteOn,
    (state): UIState => ({
      ...state,
      toggleConfirmDeleteTask: true,
    }),
  ),
  on(
    UIActions.toggleConfirmDeleteOff,
    (state): UIState => ({
      ...state,
      toggleConfirmDeleteTask: false,
    }),
  ),
  on(UIActions.toggleEditTaskModalOn, (state) => ({
    ...state,
    toggleEditTaskModal: true,
  })),
  on(UIActions.toggleEditTaskModalOff, (state) => ({
    ...state,
    toggleEditTaskModal: false,
  })),
  on(UIActions.toggleConfirmDeleteModal, (state) => ({
    ...state,
    isConfirmDeleteModalOpen: !state.isConfirmDeleteModalOpen,
  })),
  on(UIActions.toggleAddTaskModalOn, (state) => ({
    ...state,
    toggleAddTaskModal: true,
  })),
  on(UIActions.toggleAddTaskModalOff, (state) => ({
    ...state,
    toggleAddTaskModal: false,
  })),
  on(UIActions.toggleAddNewBoardOn, (state) => ({
    ...state,
    toggleAddBoardModal: true,
  })),
  on(UIActions.toggleAddNewBoardOff, (state) => ({
    ...state,
    toggleAddBoardModal: false,
  })),
  on(UIActions.toggleEditBoardOn, (state) => ({
    ...state,
    toggleEditBoardModal: true,
  })),
  on(UIActions.toggleEditBoardOff, (state) => ({
    ...state,
    toggleEditBoardModal: false,
  })),
  on(UIActions.toggleModifyBoardOn, (state) => ({
    ...state,
    openDeleteBoardModal: true,
  })),
  on(UIActions.toggleModifyBoardOff, (state) => ({
    ...state,
    openDeleteBoardModal: false,
  })),
  on(UIActions.openDeleteTaskModal, (state) => ({
    ...state,
    openDeleteTaskModal: true,
  })),
  on(UIActions.closeDeleteTaskModal, (state) => ({
    ...state,
    openDeleteTaskModal: false,
  })),
);
