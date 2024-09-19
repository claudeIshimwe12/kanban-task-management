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
import { CdkDragDrop } from "@angular/cdk/drag-drop";
import { moveTask } from "../../store/tasks/tasks.actions";
import { Task } from "../../models/data/task.interface";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrl: "./main.component.scss",
})
export class MainComponent {
  toggleSideBar$!: Observable<boolean>;
  isLoading!: Observable<boolean>;
  activeBoard$: Observable<Board>;

  constructor(private store: Store<AppState>) {
    this.toggleSideBar$ = this.store.pipe(select(selectSideBarToggler));
    this.isLoading = this.store.pipe(select(selectLoader));
    this.activeBoard$ = this.store.pipe(select(selectActiveBoard));
  }

  drop(event: CdkDragDrop<Task[]>, board: Board) {
    if (event.previousContainer !== event.container) {
      const previousColumnId = board.columns.findIndex(
        (column) => column.tasks === event.previousContainer.data,
      );
      const currentColumnId = board.columns.findIndex(
        (column) => column.tasks === event.container.data,
      );

      this.store.dispatch(
        moveTask({
          previousColumnId,
          currentColumnId,
          previousIndex: event.previousIndex,
          currentIndex: event.currentIndex,
        }),
      );
    }
  }

  getConnectedLists(board: Board) {
    return board.columns.map((_, index) => `cdk-drop-list-${index}`);
  }
}
