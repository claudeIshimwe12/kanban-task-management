import { createSelector, createFeatureSelector } from "@ngrx/store";
import { AppState } from "../../models/state/app.state.interface";
import { BoardState } from "../../models/state/boards.state.interface";

const selectInvoicesState = createFeatureSelector<AppState, BoardState>(
  "boards",
);

export const selectAllInvoices = createSelector(
  selectInvoicesState,
  (state) => state.boards,
);
