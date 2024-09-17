import { Component } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { AppState } from "../../models/state/app.state.interface";
import * as UIActions from "../../store/ui/ui.actions";
import { Observable } from "rxjs";
import { selectSideBarToggler } from "../../store/ui/ui.selectors";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrl: "./nav.component.scss",
})
export class NavComponent {
  toggleSideBar$!: Observable<boolean>;
  constructor(private store: Store<AppState>) {
    this.toggleSideBar$ = this.store.pipe(select(selectSideBarToggler));
  }
  toggleSideBar() {
    this.store.dispatch(UIActions.toggleSideBar());
  }
}
