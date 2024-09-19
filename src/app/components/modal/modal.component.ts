import { Component } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { AppState } from "../../models/state/app.state.interface";
import * as UIActions from "../../store/ui/ui.actions";
import { Observable } from "rxjs";
import { Task } from "../../models/data/task.interface";
import { selectActiveTask } from "../../store/tasks/tasks.selectors";
import { completeSubtask } from "../../store/tasks/tasks.actions";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrl: "./modal.component.scss",
})
export class ModalComponent {
  task$!: Observable<Task>;
  constructor(private store: Store<AppState>) {
    this.task$ = this.store.pipe(select(selectActiveTask));
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
}
