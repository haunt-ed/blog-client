import { IPost } from '@/types/posts/IPost';
import { IProfileData } from '@/types/profile/ProfileTypes';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface ProfileState {
  profileData: IProfileData | null;
}

const initialState: ProfileState = {
  profileData: null,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfileData: (state, action: PayloadAction<IProfileData>) => {
      state.profileData = action.payload;
    },
  },
});

export const { setProfileData } = profileSlice.actions;
export default profileSlice.reducer;
