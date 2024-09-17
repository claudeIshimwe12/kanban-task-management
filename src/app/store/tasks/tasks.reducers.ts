import { createReducer, on } from "@ngrx/store";
import { increment, decrement, reset } from "./tasks.actions";

export const initialState = 0;

export const counterReducer = createReducer(
  initialState,
  on(increment, (state): number => state + 1),
  on(decrement, (state): number => state - 1),
  on(reset, (): number => 0),
);
