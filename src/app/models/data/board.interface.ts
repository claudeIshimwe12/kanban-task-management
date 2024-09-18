import { Column } from "./column.interface";

export interface Board {
  name: string;
  columns: Column[];
}
