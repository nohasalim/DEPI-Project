import { createSlice } from "@reduxjs/toolkit";
import { inviteTeamMember } from "./invitationActions";

interface InvitationState {
  isloading: boolean;
  isSuccess: boolean;
  errorMsg: string | null;
}

const initialState: InvitationState = {
  isloading: false,
  isSuccess: false,
  errorMsg: null,
};

const invitationSlice = createSlice({
  name: "invitation",
  initialState,
  reducers: {
    resetInvitationState: (state) => {
      state.isloading = false;
      state.isSuccess = false;
      state.errorMsg = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(inviteTeamMember.pending, (state) => {
        state.isloading = true;
        state.errorMsg = null;
      })
      .addCase(inviteTeamMember.fulfilled, (state) => {
        state.isloading = false;
        state.isSuccess = true;
      })
      .addCase(inviteTeamMember.rejected, (state, action) => {
        state.isloading = false;
        state.errorMsg = action.payload as string;
      });
  },
});

export const { resetInvitationState } = invitationSlice.actions;
export default invitationSlice.reducer;
