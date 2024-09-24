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
import { selectConfirmDeleteToggler } from "../../store/ui/ui.selectors";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrl: "./modal.component.scss",
})
export class ModalComponent {
  task$!: Observable<Task>;
  activeBoard$!: Observable<Board>;
  toggleConfirmDelete$!: Observable<boolean>;
  isModalOpen = false;
  constructor(private store: Store<AppState>) {
    this.task$ = this.store.pipe(select(selectActiveTask));
    this.activeBoard$ = this.store.pipe(select(selectActiveBoard));
    this.toggleConfirmDelete$ = this.store.pipe(
      select(selectConfirmDeleteToggler),
    );
  }
  toggleModal(event: MouseEvent) {
    event.stopPropagation();
    this.store.dispatch(UIActions.toggleModal());
    this.store.dispatch(UIActions.toggleConfirmDeleteOff());
  }
  onClick(event: MouseEvent) {
    event.stopPropagation();
    this.isModalOpen = false;
  }

  onCompleteSubtask(taskTitle: string, subtaskTitle: string) {
    this.store.dispatch(completeSubtask({ taskTitle, subtaskTitle }));
  }

  onChangeTaskStatus(event: Event, task: Task): void {
    const taskStatus = (event.target as HTMLSelectElement).value;

    if (taskStatus !== task.status) {
      this.store.dispatch(changeTaskStatus({ taskStatus, task }));
      // this.store.dispatch(UIActions.toggleModal());
    }
  }
  toggleConfirmDeleteModal(event: MouseEvent) {
    event.stopPropagation();
    // this.store.dispatch(UIActions.toggleConfirmDeleteOn());
    this.isModalOpen = !this.isModalOpen;
  }
  onEditTask(event: MouseEvent) {
    event.stopPropagation();
    this.store.dispatch(UIActions.toggleEditTaskModalOn());
  }
  onDeleteTask(event: MouseEvent) {
    event.stopPropagation();
    this.store.dispatch(UIActions.openDeleteTaskModal());
    this.store.dispatch(UIActions.toggleModal());
  }
}
