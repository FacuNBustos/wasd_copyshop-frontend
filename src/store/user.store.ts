import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./index";

interface userState {
    id: string
    role: string,
};

const initialState: userState = {
    id: "",
    role: ""
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        changeId: (state, action: PayloadAction<string>) => {
            state.id = action.payload
        },
        changeRole: (state, action: PayloadAction<string>) => {
            state.role = action.payload
        }
    }
});

export const { changeId, changeRole } = userSlice.actions;

export const selectRole = (state: RootState) => state.user.role;
export const selectId = (state: RootState) => state.user.id;

export default userSlice.reducer;