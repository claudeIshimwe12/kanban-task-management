import { CUSTOM_ELEMENTS_SCHEMA, NgModule, isDevMode } from "@angular/core";
import {
  BrowserModule,
  provideClientHydration,
} from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavComponent } from "./components/nav/nav.component";
import { SideBarComponent } from "./components/side-bar/side-bar.component";
import { StoreModule } from "@ngrx/store";
import { boardsReducer } from "./store/tasks/tasks.reducers";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { UIReducer } from "./store/ui/ui.reducers";
import { provideHttpClient } from "@angular/common/http";
import { EffectsModule } from "@ngrx/effects";
import { BoardsEffects } from "./store/tasks/tasks.effects";
import { BoardComponent } from "./components/board/board.component";
import { MainComponent } from "./components/main/main.component";
import { ColumnComponent } from "./components/column/column.component";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { ModalComponent } from "./components/modal/modal.component";
import { FilterTasksPipe } from "./pipes/filter.pipe";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EditTaskComponent } from "./components/edit-task/edit-task.component";
import { ConfirmDeleteModalComponent } from "./components/confirm-delete-modal/confirm-delete-modal.component";
import { BoardModalComponent } from "./components/board-modal/board-modal.component";
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    SideBarComponent,
    BoardComponent,
    MainComponent,
    ColumnComponent,
    ModalComponent,
    FilterTasksPipe,
    EditTaskComponent,
    ConfirmDeleteModalComponent,
    BoardModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forRoot({ boards: boardsReducer, ui: UIReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
      connectInZone: true, // If set to true, the connection is established within the Angular zone
    }),
    EffectsModule.forRoot([BoardsEffects]),
  ],
  providers: [provideClientHydration(), provideHttpClient()],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
