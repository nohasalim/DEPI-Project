// import { createSlice } from "@reduxjs/toolkit";
// import { addingTask, editingTask,deletingTask } from "./tasksActions";
// import type { TaskDetails } from "../../types/task.types";

// interface TaskState {
//   tasks: TaskDetails[];
//   isLoading: boolean;
//   isSuccess: boolean;
//   errorMsg: string | null;
// }

// const initialState: TaskState = {
//   tasks: [],
//   isLoading: false,
//   isSuccess: false,
//   errorMsg: null,
// };

// const taskAddingSlice = createSlice({
//   name: "task",
//   initialState,
//   reducers: {
//     resetTaskState: (state) => {
//       state.isLoading = false;
//       state.isSuccess = false;
//       state.errorMsg = null;
//     },
//     setTasks: (state, action) => {
//       state.tasks = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // ADD TASK

//       .addCase(addingTask.pending, (state) => {
//         state.isLoading = true;
//         state.errorMsg = null;
//       })
//       .addCase(addingTask.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isSuccess = true;

//         // add new task directly
//         state.tasks.unshift(action.payload);
//       })
//       .addCase(addingTask.rejected, (state, action) => {
//         state.isLoading = false;
//         state.errorMsg = action.payload as string;
//       })
//       .addCase(editingTask.pending, (state) => {
//         state.isLoading = true;
//         state.errorMsg = null;
//       })
//       .addCase(editingTask.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isSuccess = true;
//         // update edited task directly
//         state.tasks = state.tasks.map((task) =>
//           task._id === action.payload._id
//             ? action.payload
//             : task
//         );
//       })
//       .addCase(editingTask.rejected, (state, action) => {
//         state.isLoading = false;
//         state.errorMsg = action.payload as string;
//       });
//   },
// });

// export const { resetTaskState, setTasks } = taskAddingSlice.actions;
// export default taskAddingSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import {
  addingTask,
  editingTask,
  deletingTask,
} from "./tasksActions";

import type { TaskDetails } from "../../types/task.types";

interface TaskState {
  tasks: TaskDetails[];
  isLoading: boolean;
  isSuccess: boolean;
  errorMsg: string | null;
}

const initialState: TaskState = {
  tasks: [],
  isLoading: false,
  isSuccess: false,
  errorMsg: null,
};

const taskAddingSlice = createSlice({
  name: "task",
  initialState,

  reducers: {
    resetTaskState: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errorMsg = null;
    },

    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder

      // ======================
      // ADD TASK
      // ======================

      .addCase(addingTask.pending, (state) => {
        state.isLoading = true;
        state.errorMsg = null;
      })

      .addCase(addingTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        state.tasks.unshift(action.payload);
      })

      .addCase(addingTask.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMsg = action.payload as string;
      })

      // ======================
      // EDIT TASK
      // ======================

      .addCase(editingTask.pending, (state) => {
        state.isLoading = true;
        state.errorMsg = null;
      })

      .addCase(editingTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        state.tasks = state.tasks.map((task) =>
          task._id === action.payload._id
            ? action.payload
            : task
        );
      })

      .addCase(editingTask.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMsg = action.payload as string;
      })

      // ======================
      // DELETE TASK
      // ======================

      .addCase(deletingTask.pending, (state) => {
        state.isLoading = true;
        state.errorMsg = null;
      })

      .addCase(deletingTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        state.tasks = state.tasks.filter(
          (task) => task._id !== action.payload
        );
      })

      .addCase(deletingTask.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMsg = action.payload as string;
      });
  },
});

export const { resetTaskState, setTasks } =
  taskAddingSlice.actions;

export default taskAddingSlice.reducer;