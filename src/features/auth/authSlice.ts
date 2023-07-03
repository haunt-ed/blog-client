import { IUser } from '@/types/auth/IUser';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface AuthState {
  userData: IUser | null;
  isAuth: boolean;
  _isLoading: boolean;
}

const initialState: AuthState = {
  userData: null,
  isAuth: false,
  _isLoading: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<IUser>) => {
      state.userData = action.payload;
      state.isAuth = true;
    },
    logout: (state) => {
      state.isAuth = false;
      state.userData = null;
    },
    startLoading: (state) => {
      state._isLoading = true;
    },
    finishLoading: (state) => {
      state._isLoading = false;
    }
  },
});

export const { login, logout, finishLoading, startLoading } = authSlice.actions;
export default authSlice.reducer;
