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

export const profile = createAsyncThunk(
    "auth/profile",
    async (thunkApi) => {
        try {
            const res = await authApi.profile();
            if (!res) return thunkApi.rejectWithValue();
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
    user: null,
    tokenInvalid: false,
    verifyingToken: true
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
            .addCase(profile.pending, (state, action) => {
                state.verifyingToken = true;
                state.error = null;
                state.isAuth = false;
                state.user = null;
                state.tokenInvalid = false
            })
            .addCase(profile.fulfilled, (state, action) => {
                state.verifyingToken = false;
                state.error = null;
                state.isAuth = true;
                state.user = action.payload;
                state.tokenInvalid = true;
            })
            .addCase(profile.rejected, (state, action) => {
                state.verifyingToken = false;
                state.error = action.payload;
                state.isAuth = false;
                state.user = null;
                state.tokenInvalid = true
            })
    }
})

export const { resetError } = authSlice.actions;
export default authSlice.reducer;