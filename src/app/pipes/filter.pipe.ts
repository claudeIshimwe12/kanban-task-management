import { Pipe, PipeTransform } from "@angular/core";
import { Subtask } from "../models/data/subtask.interface";

@Pipe({
  name: "filterTasks",
})
export class FilterTasksPipe implements PipeTransform {
  transform(tasks: Subtask[], completed: boolean): Subtask[] {
    return tasks.filter((task) => task.isCompleted === completed);
  }
}
