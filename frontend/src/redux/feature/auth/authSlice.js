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

export const signup = createAsyncThunk(
    "auth/signup",
    async (credentials, thunkApi) => {
        try {
            const res = await authApi.signup(credentials);
            if (!res) return thunkApi.rejectWithValue("Signup failed");
            return res;
        } catch (error) {
            return thunkApi.rejectWithValue(error);
        }
    }
)

const state = {
    isLogging: false,
    isAuth: false,
    error: null,
}
const authSlice = createSlice({
    name: 'auth',
    initialState: state,
    reducers: {
        resetError: (state, action) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state, action) => {
                state.isLogging = true;
                state.error = null;
                state.isAuth = false;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLogging = false;
                state.error = null;
                state.isAuth = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLogging = false;
                state.error = action.payload;
                state.isAuth = false;
            })
            .addCase(signup.pending, (state, action) => {
                state.isLogging = true;
                state.error = null;
                state.isAuth = false;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.isLogging = false;
                state.error = null;
                state.isAuth = true;
            })
            .addCase(signup.rejected, (state, action) => {
                state.isLogging = false;
                state.error = action.payload;
                state.isAuth = false;
            })
    }
})

export const { resetError } = authSlice.actions;
export default authSlice.reducer;