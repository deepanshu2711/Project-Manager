import { Organization } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type OrgState = {
  org: Organization[] | null;
};

const initialState: OrgState = {
  org: null,
};

export const orgSlice = createSlice({
  name: "organization",
  initialState,
  reducers: {
    setOrganizations(state, action: PayloadAction<Organization[]>) {
      state.org = action.payload;
    },

    addOrganization(state, action: PayloadAction<Organization>) {
      if (state.org) {
        state.org.push(action.payload);
      } else {
        state.org = [action.payload];
      }
    },

    removeOrganization(state, action: PayloadAction<string>) {
      if (state.org) {
        state.org = state.org.filter((org) => org._id !== action.payload);
      }
    },

    //TODO: Update organization and clear all organizations
  },
});

export const { setOrganizations, addOrganization, removeOrganization } =
  orgSlice.actions;
export default orgSlice.reducer;
