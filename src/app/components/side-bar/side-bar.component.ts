import { isPlatformBrowser } from "@angular/common";
import {
  Component,
  EventEmitter,
  Inject,
  OnInit,
  Output,
  PLATFORM_ID,
} from "@angular/core";

@Component({
  selector: "app-side-bar",
  templateUrl: "./side-bar.component.html",
  styleUrl: "./side-bar.component.scss",
})
export class SideBarComponent implements OnInit {
  isDark!: boolean;
  @Output() toggle: EventEmitter<boolean> = new EventEmitter();

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

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
}
