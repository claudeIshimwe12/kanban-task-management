import { isPlatformBrowser } from "@angular/common";
import { Component, Inject, OnInit, PLATFORM_ID } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent implements OnInit {
  switchedToDarkMode = false;
  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const body = document.querySelector("body");

      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        body?.classList.add("dark");

        if (localStorage.getItem("theme") == "dark") {
          body?.classList.add("dark");
        } else {
          body?.classList.remove("dark");
        }
      }
    }
  }

  toggleOff() {
    const body = document.querySelector("body");

    localStorage.removeItem("theme");
    body?.classList.remove("dark");
  }
  toggleOn() {
    const body = document.querySelector("body");
    localStorage.setItem("theme", "dark");
    body?.classList.add("dark");
  }
}
