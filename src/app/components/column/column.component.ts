import { Component, Input } from "@angular/core";
import { Column } from "../../models/data/column.interface";

@Component({
  selector: "app-column",
  templateUrl: "./column.component.html",
  styleUrl: "./column.component.scss",
})
export class ColumnComponent {
  @Input({ required: true }) column!: Column;
}
