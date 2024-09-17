import { isPlatformBrowser } from "@angular/common";
import { Component, Inject, OnInit, PLATFORM_ID } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit(): void {
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
}
