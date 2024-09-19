import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Column } from "../../models/data/column.interface";
import { CdkDragDrop } from "@angular/cdk/drag-drop";
import { Task } from "../../models/data/task.interface";
import { ChangeDetectorRef } from "@angular/core";
@Component({
  selector: "app-column",
  templateUrl: "./column.component.html",
  styleUrl: "./column.component.scss",
})
export class ColumnComponent {
  @Input({ required: true }) column!: Column;
  @Input() connectedColumns: string[] = [];
  @Output() dropTask = new EventEmitter<CdkDragDrop<Task[]>>();
  constructor(private cd: ChangeDetectorRef) {}
  drop(event: CdkDragDrop<Task[]>) {
    this.dropTask.emit(event);
    this.cd.detectChanges();
  }
}
