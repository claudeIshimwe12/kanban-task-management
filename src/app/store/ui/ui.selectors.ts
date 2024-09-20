import { createFeatureSelector, createSelector } from "@ngrx/store";
// import { AppState } from "../../models/app-state.interface";
// import { UIState } from "../../models/ui-state.interface";
// import { AppState } from "../../models/state/app.state.interface";
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
