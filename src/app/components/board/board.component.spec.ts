import { ComponentFixture, TestBed } from "@angular/core/testing";

import { BoardComponent } from "./board.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { provideMockStore } from "@ngrx/store/testing";

describe("BoardComponent", () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardComponent],
      imports: [HttpClientTestingModule], // Include HttpClientTestingModule here
      providers: [provideMockStore({})], // provideMockStore is a provider
    }).compileComponents();

    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it("should be created", () => {
    expect(component).toBeTruthy();
  });
});
