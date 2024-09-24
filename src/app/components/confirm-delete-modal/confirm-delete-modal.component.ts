import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { Board } from "../../models/data/board.interface";
import { Store } from "@ngrx/store";
import { AppState } from "../../models/state/app.state.interface";
import {
  selectActiveBoard,
  selectActiveTask,
} from "../../store/tasks/tasks.selectors";
import * as UIActions from "../../store/ui/ui.actions";
import * as BoardActions from "../../store/tasks/tasks.actions";
import { Task } from "../../models/data/task.interface";

@Component({
  selector: "app-confirm-delete-modal",
  templateUrl: "./confirm-delete-modal.component.html",
  styleUrl: "./confirm-delete-modal.component.scss",
})
export class ConfirmDeleteModalComponent implements OnInit, OnDestroy {
  @Input({ required: true }) type = "";
  activeBoard$!: Observable<Board>;
  task!: Task;
  private subscription!: Subscription;
  constructor(private store: Store<AppState>) {}
  ngOnInit(): void {
    this.activeBoard$ = this.store.select(selectActiveBoard);
    this.subscription = this.store
      .select(selectActiveTask)
      .subscribe((t) => (this.task = t));
  }
  onBlockPropagation(event: Event) {
    event.stopPropagation();
  }

  onModalClick(event: Event) {
    event.stopPropagation();
    this.store.dispatch(UIActions.toggleConfirmDeleteOff());
    this.store.dispatch(UIActions.toggleModifyBoardOff());
    this.store.dispatch(UIActions.closeDeleteTaskModal());
  }
  onDelete(event: Event) {
    event.stopPropagation();
    if (this.type == "board") {
      this.store.dispatch(BoardActions.deleteBoard());
      this.store.dispatch(UIActions.toggleModifyBoardOff());
      this.store.dispatch(UIActions.toggleConfirmDeleteOff());
    } else if (this.type === "task") {
      this.store.dispatch(BoardActions.deleteTask());
      this.store.dispatch(UIActions.closeDeleteTaskModal());
    }
  }
  onCancelDelete() {
    if (this.type == "board") {
      this.store.dispatch(UIActions.toggleModifyBoardOff());
      this.store.dispatch(UIActions.toggleConfirmDeleteOff());
    } else if (this.type === "task") {
      this.store.dispatch(UIActions.closeDeleteTaskModal());
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
