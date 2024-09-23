import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
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
export class ColumnComponent implements OnInit {
  @Input({ required: true }) column!: Column;
  @Input() connectedColumns: string[] = [];
  @Output() dropTask = new EventEmitter<CdkDragDrop<Task[]>>();
  color = "#828FA3";
  isModalOpen = false;
  constructor(
    private cd: ChangeDetectorRef,
    private store: Store<AppState>,
  ) {}

  ngOnInit(): void {
    this.color = this.getRandomColor(this.column.name);
  }
  drop(event: CdkDragDrop<Task[]>) {
    this.dropTask.emit(event);
    this.cd.detectChanges();
  }

  onTaskClick(task: Task) {
    this.store.dispatch(UIActions.toggleModal());
    this.store.dispatch(BoardActions.clickOnTask({ task }));
  }

  getRandomColor(str: string) {
    let hash = 0;

    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff;
      color += ("00" + value.toString(16)).slice(-2);
    }

    return color;
  }
}
