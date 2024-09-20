import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ModalComponent } from "./modal.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { provideMockStore } from "@ngrx/store/testing";

describe("ModalComponent", () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalComponent],
      imports: [HttpClientTestingModule], // Include HttpClientTestingModule here
      providers: [provideMockStore({})], // provideMockStore is a provider
    }).compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should be created", () => {
    expect(component).toBeTruthy();
  });
});
