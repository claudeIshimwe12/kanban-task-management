import { createAction } from "@ngrx/store";

export const toggleSideBar = createAction("[Sidebar Component] Open Side Bar");
export const toggleModal = createAction("[Column Component] Open Modal");
export const toggleConfirmDeleteOn = createAction(
  "[Modal Component] Toggle Confirm Delete Task On",
);
export const toggleConfirmDeleteOff = createAction(
  "[Modal Component] Toggle Confirm Delete Task Off",
);
export const toggleEditTaskModalOn = createAction(
  "[Column Component] Toggle Edit Task Modal On",
);
export const toggleEditTaskModalOff = createAction(
  "[Column Component] Toggle Edit Task Modal Off",
);
export const toggleConfirmDeleteModal = createAction(
  "[Column Component] Toggle Confirm Delete Modal",
);
export const toggleAddTaskModalOn = createAction(
  "[Nav Component] Toggle Add New Task Modal On",
);
export const toggleAddTaskModalOff = createAction(
  "[Nav Component] Toggle Add New Task Modal Off",
);
export const toggleAddNewBoardOn = createAction(
  "[SideBar Component] Toggle Add New Board Modal On",
);
export const toggleAddNewBoardOff = createAction(
  "[SideBar Component] Toggle Add New Board Modal Off",
);
export const toggleEditBoardOn = createAction(
  "[Main Component] Toggle Edit Board Modal On",
);
export const toggleEditBoardOff = createAction(
  "[Main Component] Toggle Edit Board Modal Off",
);
