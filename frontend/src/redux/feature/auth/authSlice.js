import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authApi from "./authApi";

export const login = createAsyncThunk(
    "auth/login",
    async (credentials, thunkApi) => {
        try {
            const res = await authApi.login(credentials);
            if (!res) return thunkApi.rejectWithValue("Login failed");
            return res;
        } catch (error) {
            return thunkApi.rejectWithValue(error);
        }
    }
)

const state = {
    isLogging: false,
    isAuth: false,
    loginError: null
}
const authSlice = createSlice({
    name: 'auth',
    initialState: state,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state, action) => {
                state.isLogging = true;
                state.loginError = null;
                state.isAuth = false;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLogging = false;
                state.loginError = null;
                state.isAuth = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLogging = false;
                state.loginError = action.payload;
                state.isAuth = false;
            })
    }
})

export const { } = authSlice.actions;
export default authSlice.reducer;