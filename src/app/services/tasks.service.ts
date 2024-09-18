import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, delay, map, Observable, of, retry } from "rxjs";
import { Board } from "../models/data/board.interface";

@Injectable({
  providedIn: "root",
})
export class TasksService {
  url = "asset/data.json";
  constructor(private http: HttpClient) {}

  getData(): Observable<Board[]> {
    return this.http.get<{ boards: Board[] }>(this.url).pipe(
      delay(500),
      retry(3),
      map((res) => res.boards),
      catchError((err) => {
        console.log("An Error Occured", err);
        throw new Error("Something went wrong ");
      }),
    );
  }
}
