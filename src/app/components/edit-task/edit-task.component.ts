import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Board } from "../../models/data/board.interface";
import { Observable } from "rxjs";
import { select, Store } from "@ngrx/store";
import { Task } from "../../models/data/task.interface";
import { AppState } from "../../models/state/app.state.interface";
import {
  selectActiveBoard,
  selectActiveTask,
} from "../../store/tasks/tasks.selectors";
import { selectConfirmDeleteToggler } from "../../store/ui/ui.selectors";
import * as UIActions from "../../store/ui/ui.actions";
import * as BoardActions from "../../store/tasks/tasks.actions";

@Component({
  selector: "app-edit-task",
  templateUrl: "./edit-task.component.html",
  styleUrls: ["./edit-task.component.scss"],
})
export class EditTaskComponent implements OnInit {
  taskForm!: FormGroup;
  boards: Board[] = [];
  task$!: Observable<Task>;
  activeBoard$!: Observable<Board>;
  toggleConfirmDelete$!: Observable<boolean>;
  task!: Task;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
  ) {
    this.task$ = this.store.pipe(select(selectActiveTask));
    this.activeBoard$ = this.store.pipe(select(selectActiveBoard));
    this.toggleConfirmDelete$ = this.store.pipe(
      select(selectConfirmDeleteToggler),
    );
    this.taskForm = this.createForm();
  }

  ngOnInit(): void {
    this.task$.subscribe((task) => {
      if (task) {
        this.task = task;
        this.patchFormValues(task);
      }
    });
  }

  private createForm() {
    return this.fb.group({
      title: ["", Validators.required],
      description: [""],
      status: [""],
      subtasks: this.fb.array([]),
    });
  }

  private patchFormValues(task: Task) {
    this.taskForm.patchValue({
      title: task.title,
      description: task.description,
      status: task.status,
    });

    this.subtasks.clear();

    task.subtasks.forEach((subtask) => {
      this.subtasks.push(this.fb.control(subtask.title, Validators.required));
    });
  }

  get subtasks() {
    return this.taskForm.get("subtasks") as FormArray;
  }

  addSubtask() {
    this.subtasks.push(this.fb.control("", Validators.required));
  }

  removeSubtask(index: number) {
    this.subtasks.removeAt(index);
  }

  onSubmit() {
    if (this.taskForm.invalid) {
      this.markAllFieldsAsTouched(this.taskForm);
      return;
    }

    const task: Task = {
      title: this.taskForm.value.title,
      description: this.taskForm.value.description,
      status: this.taskForm.value.status,
      subtasks: this.taskForm.value.subtasks.map((title: string) => ({
        title,
        isCompleted: false,
      })),
    };

    this.store.dispatch(
      BoardActions.editTask({ title: this.task.title, task }),
    );
    this.store.dispatch(UIActions.toggleEditTaskModalOff());
    this.store.dispatch(UIActions.toggleConfirmDeleteOff());

    this.taskForm.reset();
  }

  onModalClick(event: MouseEvent) {
    event.stopPropagation();
    this.store.dispatch(UIActions.toggleEditTaskModalOff());
    this.store.dispatch(UIActions.toggleConfirmDeleteOff());
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
