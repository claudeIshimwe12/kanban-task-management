import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ColumnComponent } from "./column.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { provideMockStore } from "@ngrx/store/testing";

describe("ColumnComponent", () => {
  let component: ColumnComponent;
  let fixture: ComponentFixture<ColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ColumnComponent],
      imports: [HttpClientTestingModule], // Include HttpClientTestingModule here
      providers: [provideMockStore({})], // provideMockStore is a provider
    }).compileComponents();

    fixture = TestBed.createComponent(ColumnComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it("should be created", () => {
    expect(component).toBeTruthy();
  });
});
