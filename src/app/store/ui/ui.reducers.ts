import { createReducer, on } from "@ngrx/store";
import * as UIActions from "./ui.actions";
import { UIState } from "../../models/state/ui.state.interface";
export const initialState: UIState = {
  showSideBar: false,
  showModal: false,
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
);
