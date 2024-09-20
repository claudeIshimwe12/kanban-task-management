import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MainComponent } from "./main.component";
import { provideMockStore } from "@ngrx/store/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("MainComponent", () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainComponent],
      imports: [HttpClientTestingModule], // Include HttpClientTestingModule here
      providers: [provideMockStore({})], // provideMockStore is a provider
    }).compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should be created", () => {
    expect(component).toBeTruthy();
  });
});
