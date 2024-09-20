import { Component } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { AppState } from "../../models/state/app.state.interface";
import * as UIActions from "../../store/ui/ui.actions";
import { Observable } from "rxjs";
import { Task } from "../../models/data/task.interface";
import {
  selectActiveBoard,
  selectActiveTask,
} from "../../store/tasks/tasks.selectors";
import {
  changeTaskStatus,
  completeSubtask,
} from "../../store/tasks/tasks.actions";
import { Board } from "../../models/data/board.interface";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrl: "./modal.component.scss",
})
export class ModalComponent {
  task$!: Observable<Task>;
  activeBoard$!: Observable<Board>;
  constructor(private store: Store<AppState>) {
    this.task$ = this.store.pipe(select(selectActiveTask));
    this.activeBoard$ = this.store.pipe(select(selectActiveBoard));
  }
  toggleModal(event: MouseEvent) {
    this.store.dispatch(UIActions.toggleModal());
    event.stopPropagation();
  }
  onClick(event: MouseEvent) {
    event.stopPropagation();
  }

  onCompleteSubtask(taskTitle: string, subtaskTitle: string) {
    this.store.dispatch(completeSubtask({ taskTitle, subtaskTitle }));
  }

  onChangeTaskStatus(event: Event, task: Task): void {
    const taskStatus = (event.target as HTMLSelectElement).value;

    if (taskStatus !== task.status) {
      this.store.dispatch(changeTaskStatus({ taskStatus, task }));
    }
  }
}
