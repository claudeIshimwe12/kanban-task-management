import { isPlatformBrowser } from "@angular/common";
import {
  Component,
  EventEmitter,
  Inject,
  OnInit,
  Output,
  PLATFORM_ID,
} from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { selectSideBarToggler } from "../../store/ui/ui.selectors";
import { AppState } from "../../models/state/app.state.interface";
import * as UIActions from "../../store/ui/ui.actions";
import { Board } from "../../models/data/board.interface";
import {
  selectAllBoards,
  selectLoader,
} from "../../store/tasks/tasks.selectors";

@Component({
  selector: "app-side-bar",
  templateUrl: "./side-bar.component.html",
  styleUrl: "./side-bar.component.scss",
})
export class SideBarComponent implements OnInit {
  isDark!: boolean;
  @Output() toggle: EventEmitter<boolean> = new EventEmitter();
  toggleSideBar$!: Observable<boolean>;
  boards$!: Observable<Board[]>;
  isLoading!: Observable<boolean>;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private store: Store<AppState>,
  ) {
    this.toggleSideBar$ = this.store.pipe(select(selectSideBarToggler));
    this.boards$ = this.store.pipe(select(selectAllBoards));
    this.isLoading = this.store.pipe(select(selectLoader));
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const theme = localStorage.getItem("theme");
      this.isDark = theme == "dark";
    }
  }
  toggleDarkMode() {
    this.isDark = !this.isDark;
    this.toggle.emit();
  }

  toggleSideBar() {
    this.store.dispatch(UIActions.toggleSideBar());
  }
}
