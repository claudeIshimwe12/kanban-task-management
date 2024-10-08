import { isPlatformBrowser } from "@angular/common";
import { Component, Inject, OnInit, PLATFORM_ID } from "@angular/core";
import { AppState } from "./models/state/app.state.interface";
import { select, Store } from "@ngrx/store";
import * as UIActions from "../app/store/ui/ui.actions";
import * as BoardActions from "../app/store/tasks/tasks.actions";
import { Observable } from "rxjs";
import {
  selectConfirmDeleteTask,
  selectConfirmModifyBoard,
  selectModalToggler,
  selectToggleAddBoardModal,
  selectToggleAddNewTaskModal,
  selectToggleEditBoardModal,
  selectToggleEditModal,
} from "./store/ui/ui.selectors";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent implements OnInit {
  toggleModal$!: Observable<boolean>;
  toggleEditTaskModal$!: Observable<boolean>;
  toggleAddTaskModal$!: Observable<boolean>;
  toggleBoardModal$!: Observable<boolean>;
  toggleEditBoardModal$!: Observable<boolean>;
  toggleDeleteBoardConfirmation$!: Observable<boolean>;
  confirmDeleteTaskModal$!: Observable<boolean>;
  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private store: Store<AppState>,
  ) {}

  isModalOpen = false;

  ngOnInit(): void {
    this.store.dispatch(BoardActions.loadBoards());
    this.toggleModal$ = this.store.pipe(select(selectModalToggler));
    this.toggleAddTaskModal$ = this.store.pipe(
      select(selectToggleAddNewTaskModal),
    );
    this.toggleEditTaskModal$ = this.store.pipe(select(selectToggleEditModal));
    this.toggleBoardModal$ = this.store.pipe(select(selectToggleAddBoardModal));
    this.toggleEditBoardModal$ = this.store.pipe(
      select(selectToggleEditBoardModal),
    );
    this.toggleDeleteBoardConfirmation$ = this.store.pipe(
      select(selectConfirmModifyBoard),
    );
    this.confirmDeleteTaskModal$ = this.store.pipe(
      select(selectConfirmDeleteTask),
    );
    if (isPlatformBrowser(this.platformId)) {
      const body = document.querySelector("body");

      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        if (localStorage.getItem("theme")) {
          if (localStorage.getItem("theme") == "dark") {
            body?.classList.add("dark");
          } else {
            body?.classList.remove("dark");
          }
        } else {
          body?.classList.add("dark");
          localStorage.setItem("theme", "dark");
        }
      } else {
        if (localStorage.getItem("theme") == "dark") {
          body?.classList.add("dark");
        } else {
          body?.classList.remove("dark");
        }
      }
    }
  }

  toggleTheme() {
    const body = document.querySelector("body");
    const theme = localStorage.getItem("theme");

    if (theme) {
      if (theme == "dark") {
        localStorage.setItem("theme", "light");
        body?.classList.remove("dark");
      } else if (theme == "light") {
        localStorage.setItem("theme", "dark");
        body?.classList.add("dark");
      }
    }
  }

  toggleSideBar() {
    this.store.dispatch(UIActions.toggleSideBar());
  }
}
