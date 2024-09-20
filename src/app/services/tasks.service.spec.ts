import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { TasksService } from "./tasks.service";
import { Board } from "../models/data/board.interface";

describe("TasksService", () => {
  let service: TasksService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TasksService],
    });

    service = TestBed.inject(TasksService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  describe("getData", () => {
    it("should return boards data on success", () => {
      const mockBoards: Board[] = [
        {
          name: "Platform Launch",
          columns: [
            {
              name: "Todo",
              tasks: [
                {
                  title: "Build UI for onboarding flow",
                  description: "",
                  status: "Todo",
                  subtasks: [
                    { title: "Sign up page", isCompleted: true },
                    { title: "Sign in page", isCompleted: false },
                    { title: "Welcome page", isCompleted: false },
                  ],
                },
              ],
            },
          ],
        },
      ];

      service.getData().subscribe((boards) => {
        expect(boards).toEqual(mockBoards);
      });

      const req = httpMock.expectOne("assets/data.json");
      expect(req.request.method).toBe("GET");
      req.flush({ boards: mockBoards });
    });
  });
});
