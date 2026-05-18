import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  type ModalDataMap,
  type OpenModalPayload,
} from "../../types/modal.types";

interface ModalState {
  isOpen: boolean;
  componentName: keyof ModalDataMap | null;
  data: ModalDataMap[keyof ModalDataMap] | null;
}

const initialState: ModalState = {
  isOpen: false,
  componentName: null,
  data: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<OpenModalPayload>) => {
      state.isOpen = true;
      state.componentName = action.payload.name;
      state.data = "data" in action.payload ? action.payload.data : null;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.componentName = null;
      state.data = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
