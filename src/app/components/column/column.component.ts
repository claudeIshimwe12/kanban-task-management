import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Column } from "../../models/data/column.interface";
import { CdkDragDrop } from "@angular/cdk/drag-drop";
import { Task } from "../../models/data/task.interface";
import { ChangeDetectorRef } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../../models/state/app.state.interface";
import * as UIActions from "../../store/ui/ui.actions";
import * as BoardActions from "../../store/tasks/tasks.actions";
@Component({
  selector: "app-column",
  templateUrl: "./column.component.html",
  styleUrl: "./column.component.scss",
})
export class ColumnComponent {
  @Input({ required: true }) column!: Column;
  @Input() connectedColumns: string[] = [];
  @Output() dropTask = new EventEmitter<CdkDragDrop<Task[]>>();
  constructor(
    private cd: ChangeDetectorRef,
    private store: Store<AppState>,
  ) {}
  drop(event: CdkDragDrop<Task[]>) {
    this.dropTask.emit(event);
    this.cd.detectChanges();
  }

  onTaskClick(task: Task) {
    this.store.dispatch(UIActions.toggleModal());
    this.store.dispatch(BoardActions.clickOnTask({ task }));
  }
}
