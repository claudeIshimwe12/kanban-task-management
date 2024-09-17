import { NgModule } from "@angular/core";
import {
  BrowserModule,
  provideClientHydration,
} from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavComponent } from "./components/nav/nav.component";
import { SideBarComponent } from "./components/side-bar/side-bar.component";

@NgModule({
  declarations: [AppComponent, NavComponent, SideBarComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
