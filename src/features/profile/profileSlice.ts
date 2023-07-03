import { IPost } from '@/types/posts/IPost';
import { IProfileData } from '@/types/profile/ProfileTypes';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface ProfileState {
  profileData: IProfileData | null;
  posts: IPost[];
}

const initialState: ProfileState = {
  profileData: null,
  posts: [],
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfileData: (state, action: PayloadAction<IProfileData>) => {
      state.profileData = action.payload;
    },
    addPost: (state, action: PayloadAction<IPost>) => {
      state.posts = [...state.posts, action.payload];
    },
    setPosts: (state, action: PayloadAction<IPost[]>) => {
      state.posts = action.payload;
    },
    updatePost: (state, action: PayloadAction<IPost>) => {
      const postIdx = state.posts.findIndex(
        (post) => post.id === action.payload.id
      );
      state.posts.splice(postIdx, 1, action.payload);
    },
    deletePost: (state, action: PayloadAction<number>) => {
      const postIdx = state.posts.findIndex(
        (post) => post.id === action.payload
      );
      state.posts.splice(postIdx, 1);
    },
  },
});

export const { setProfileData, addPost, setPosts, updatePost, deletePost } =
  profileSlice.actions;
export default profileSlice.reducer;
