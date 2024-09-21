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
