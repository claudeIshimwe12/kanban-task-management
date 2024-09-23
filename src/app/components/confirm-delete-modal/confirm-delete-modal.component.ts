import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Board } from "../../models/data/board.interface";
import { Store } from "@ngrx/store";
import { AppState } from "../../models/state/app.state.interface";
import { selectActiveBoard } from "../../store/tasks/tasks.selectors";
import * as UIActions from "../../store/ui/ui.actions";
import * as BoardActions from "../../store/tasks/tasks.actions";

@Component({
  selector: "app-confirm-delete-modal",
  templateUrl: "./confirm-delete-modal.component.html",
  styleUrl: "./confirm-delete-modal.component.scss",
})
export class ConfirmDeleteModalComponent implements OnInit {
  activeBoard$!: Observable<Board>;

  constructor(private store: Store<AppState>) {}
  ngOnInit(): void {
    this.activeBoard$ = this.store.select(selectActiveBoard);
  }
  onBlockPropagation(event: Event) {
    event.stopPropagation();
  }

  onModalClick(event: Event) {
    event.stopPropagation();
    this.store.dispatch(UIActions.toggleConfirmDeleteOff());
    this.store.dispatch(UIActions.toggleModifyBoardOff());
  }
  onDeleteBoard(event: Event) {
    event.stopPropagation();
    this.store.dispatch(BoardActions.deleteBoard());
    this.store.dispatch(UIActions.toggleModifyBoardOff());
    this.store.dispatch(UIActions.toggleConfirmDeleteOff());
  }
  onCancelDelete() {
    this.store.dispatch(UIActions.toggleModifyBoardOff());
    this.store.dispatch(UIActions.toggleConfirmDeleteOff());
  }
}
