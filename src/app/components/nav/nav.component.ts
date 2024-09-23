import { Component } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { AppState } from "../../models/state/app.state.interface";
import * as UIActions from "../../store/ui/ui.actions";
import { Observable } from "rxjs";
import { selectSideBarToggler } from "../../store/ui/ui.selectors";
import { Board } from "../../models/data/board.interface";
import { selectActiveBoard } from "../../store/tasks/tasks.selectors";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrl: "./nav.component.scss",
})
export class NavComponent {
  activeBoard$!: Observable<Board>;
  toggleSideBar$!: Observable<boolean>;
  constructor(private store: Store<AppState>) {
    this.toggleSideBar$ = this.store.pipe(select(selectSideBarToggler));
    this.activeBoard$ = this.store.pipe(select(selectActiveBoard));
  }
  toggleSideBar() {
    this.store.dispatch(UIActions.toggleSideBar());
  }
  toggleAddNewTask() {
    this.store.dispatch(UIActions.toggleAddTaskModalOn());
  }
}
