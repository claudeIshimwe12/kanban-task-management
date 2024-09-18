import { BoardState } from "./boards.state.interface";
import { UIState } from "./ui.state.interface";

export interface AppState {
  ui: UIState;
  boards: BoardState;
}
