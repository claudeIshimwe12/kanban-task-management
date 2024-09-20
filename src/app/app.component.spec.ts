import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { StoreModule } from "@ngrx/store";
// import { AppState } from "./models/state/app.state.interface";

import { CUSTOM_ELEMENTS_SCHEMA, PLATFORM_ID } from "@angular/core";

describe("AppComponent", () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  //let store: Store<AppState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}), // mock store for testing
      ],
      declarations: [AppComponent],
      providers: [
        { provide: PLATFORM_ID, useValue: "browser" }, // mock platformId
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    // store = TestBed.inject(Store);

    // Mock selectors
    // spyOn(store, "pipe").and.returnValue(of(false)); // Mock selectModalToggler to return false
  });

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });

  // describe("ngOnInit", () => {
  //   it("should dispatch loadBoards action", () => {
  //     spyOn(store, "dispatch");
  //     component.ngOnInit();
  //     expect(store.dispatch).toHaveBeenCalledWith(BoardActions.loadBoards());
  //   });
  // });

  // it("should toggle theme between dark and light", () => {
  //   spyOn(localStorage, "getItem").and.returnValue("dark");
  //   spyOn(localStorage, "setItem");
  //   spyOn(document, "querySelector").and.returnValue({
  //     classList: { add: jest.fn(), remove: jest.fn() },
  //   } as any);
  //   component.toggleTheme();
  //   expect(localStorage.setItem).toHaveBeenCalledWith("theme", "light");
  //   // expect(document.querySelector().classList.remove).toHaveBeenCalledWith(
  //   //   "dark",
  //   // );
  // });
  //   it("should add dark class and set theme to dark if current theme is light", () => {
  //     spyOn(localStorage, "getItem").and.returnValue("light");
  //     spyOn(localStorage, "setItem");
  //     spyOn(document, "querySelector").and.returnValue({
  //       classList: { add: jest.fn(), remove: jest.fn() },
  //     } as any);
  //     component.toggleTheme();
  //     expect(localStorage.setItem).toHaveBeenCalledWith("theme", "dark");
  //     // expect(document.querySelector().classList.add).toHaveBeenCalledWith(
  //     //   "dark",
  //     // );
  //   });

  // describe("toggleSideBar", () => {
  //   it("should dispatch toggleSideBar action", () => {
  //     spyOn(store, "dispatch");
  //     component.toggleSideBar();
  //     expect(store.dispatch).toHaveBeenCalledWith(UIActions.toggleSideBar());
  //   });
  // });
});
