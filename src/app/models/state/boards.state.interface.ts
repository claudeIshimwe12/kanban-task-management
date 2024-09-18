import { Board } from "../data/board.interface";

export interface BoardState {
  boards: Board[];
  activeBoard: Board;

  loading: boolean;
  error: string;
}
