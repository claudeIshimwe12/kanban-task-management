import { Component, Input } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { AppState } from "../../models/state/app.state.interface";
import { Observable } from "rxjs";
import { selectActiveBoard } from "../../store/tasks/tasks.selectors";
import * as TasksActions from "../../store/tasks/tasks.actions";
import { Board } from "../../models/data/board.interface";

@Component({
  selector: "app-board",
  templateUrl: "./board.component.html",
  styleUrl: "./board.component.scss",
})
export class BoardComponent {
  @Input({ required: true }) title!: string;
  activeBoard$: Observable<Board>;
  constructor(private store: Store<AppState>) {
    this.activeBoard$ = this.store.pipe(select(selectActiveBoard));
  }

  handleBoardClick(title: string) {
    this.store.dispatch(TasksActions.changeBoard({ title }));
  }
}
