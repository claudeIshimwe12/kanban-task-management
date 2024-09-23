import { Component, Input, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Board } from "../../models/data/board.interface";
import { Observable } from "rxjs";
import { select, Store } from "@ngrx/store";
import { AppState } from "../../models/state/app.state.interface";
import { selectActiveBoard } from "../../store/tasks/tasks.selectors";
import { selectConfirmDeleteToggler } from "../../store/ui/ui.selectors";
import * as UIActions from "../../store/ui/ui.actions";
import * as BoardActions from "../../store/tasks/tasks.actions";

@Component({
  selector: "app-board-modal",
  templateUrl: "./board-modal.component.html",
  styleUrl: "./board-modal.component.scss",
})
export class BoardModalComponent implements OnInit {
  @Input({ required: true }) type = "";
  boardForm!: FormGroup;
  boards: Board[] = [];
  activeBoard$!: Observable<Board>;
  toggleConfirmDelete$!: Observable<boolean>;
  board!: Board;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
  ) {
    this.activeBoard$ = this.store.pipe(select(selectActiveBoard));
    this.toggleConfirmDelete$ = this.store.pipe(
      select(selectConfirmDeleteToggler),
    );
    this.boardForm = this.createForm();
  }

  ngOnInit(): void {
    if (this.type === "edit") {
      this.activeBoard$.subscribe((board) => {
        if (board) {
          this.board = board;
          this.patchFormValues(board);
        }
      });
    }
  }

  private createForm() {
    return this.fb.group({
      name: ["", Validators.required],

      columns: this.fb.array([]),
    });
  }

  private patchFormValues(board: Board) {
    this.boardForm.patchValue({
      name: board.name,
    });

    this.columns.clear();

    board.columns.forEach((column) => {
      this.columns.push(this.fb.control(column.name, Validators.required));
    });
  }

  get columns() {
    return this.boardForm.get("columns") as FormArray;
  }

  addSubtask() {
    this.columns.push(this.fb.control("", Validators.required));
  }

  removeSubtask(index: number) {
    this.columns.removeAt(index);
  }

  onSubmit() {
    if (this.boardForm.invalid) {
      this.markAllFieldsAsTouched(this.boardForm);
      return;
    }

    const board: Board = {
      name: this.boardForm.value.name,
      columns: this.boardForm.value.columns.map((name: string) => ({
        name,
        tasks: [],
      })),
    };

    if (this.type === "edit") {
      this.store.dispatch(BoardActions.editBoard({ board }));
    } else if (this.type === "add") {
      this.store.dispatch(BoardActions.createBoard({ board }));
      // this.store.dispatch(BoardActions.addNewTask({ task }));
      // this.store.dispatch(UIActions.toggleAddTaskModalOff());
    }
    // this.store.dispatch(UIActions.toggleEditTaskModalOff());
    // this.store.dispatch(UIActions.toggleConfirmDeleteOff());

    this.boardForm.reset();
  }

  onModalClick(event: MouseEvent) {
    event.stopPropagation();
    this.store.dispatch(UIActions.toggleAddNewBoardOff());
    this.store.dispatch(UIActions.toggleEditBoardOff());
  }

  onFormClick(event: MouseEvent) {
    event.stopPropagation();
  }

  markAllFieldsAsTouched(formGroup: FormGroup | FormArray): void {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);

      if (control instanceof FormGroup || control instanceof FormArray) {
        this.markAllFieldsAsTouched(control);
      } else {
        control?.markAsTouched({ onlySelf: true });
      }
    });
  }
}
