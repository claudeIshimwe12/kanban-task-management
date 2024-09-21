import { createReducer, on } from "@ngrx/store";
import * as UIActions from "./ui.actions";
import { UIState } from "../../models/state/ui.state.interface";
export const initialState: UIState = {
  showSideBar: false,
  showModal: false,
  toggleConfirmDeleteTask: false,
  isConfirmDeleteModalOpen: false,
  toggleEditTaskModal: false,
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
);
