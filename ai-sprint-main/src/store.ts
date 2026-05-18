import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import projectsReducer from "./features/projects/projectsSlice";
import taskReducer from "./features/tasks/tasksSlice";
import modalReducer from "./features/modal/modalSlice";
import invitationReducer from "./features/invitation/invitationSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectsReducer,
    modal: modalReducer,
    task: taskReducer,
    invite: invitationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
