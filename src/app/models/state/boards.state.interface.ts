import { Board } from "../data/board.interface";

export interface BoardState {
  boards: Board[];
  activeBoard: string;
  loading: boolean;
  error: string;
}
