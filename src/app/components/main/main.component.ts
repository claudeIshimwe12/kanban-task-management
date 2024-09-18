import { Component } from "@angular/core";
import { AppState } from "../../models/state/app.state.interface";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Board } from "../../models/data/board.interface";
import { selectSideBarToggler } from "../../store/ui/ui.selectors";
import {
  selectActiveBoard,
  selectLoader,
} from "../../store/tasks/tasks.selectors";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrl: "./main.component.scss",
})
export class MainComponent {
  toggleSideBar$!: Observable<boolean>;
  // boards$!: Observable<Board[]>;
  isLoading!: Observable<boolean>;
  activeBoard$: Observable<Board>;

  constructor(private store: Store<AppState>) {
    this.toggleSideBar$ = this.store.pipe(select(selectSideBarToggler));
    // this.boards$ = this.store.pipe(select(selectAllBoards));
    this.isLoading = this.store.pipe(select(selectLoader));
    this.activeBoard$ = this.store.pipe(select(selectActiveBoard));
  }
}
