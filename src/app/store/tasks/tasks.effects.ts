import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { TasksService } from "../../services/tasks.service";
import * as BoardActions from "./tasks.actions";
import { catchError, map, mergeMap, of } from "rxjs";
@Injectable()
export class BoardsEffects {
  loadBoards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.loadBoards),
      mergeMap(() =>
        this.tasksService.getData().pipe(
          map((boards) => BoardActions.loadBoardsSuccess({ boards })),
          catchError((error) =>
            of(BoardActions.loadBoardsFailure({ error: error.message })),
          ),
        ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private tasksService: TasksService,
  ) {}
}
