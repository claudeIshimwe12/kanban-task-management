import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, of } from "rxjs";
import { Board } from "../models/data/board.interface";

@Injectable({
  providedIn: "root",
})
export class TasksService {
  url = "assets/data.json";
  constructor(private http: HttpClient) {}

  getData(): Observable<Board[]> {
    return this.http.get<Board[]>(this.url).pipe(
      catchError((err) => {
        console.log("An Error Occured", err);
        throw new Error("Something went wrong ");
      }),
    );
  }
}
