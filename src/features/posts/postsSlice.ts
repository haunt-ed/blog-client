import { ILike, IPost } from '@/types/posts/IPost';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface PostsState {
  posts: IPost[];
}

const initialState: PostsState = {
  posts: [],
};

export const PostsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<IPost>) => {
      state.posts = [action.payload, ...state.posts];
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
    addLike: (state, action: PayloadAction<ILike>) => {
      const { payload } = action;
      const post = state.posts.find((el) => el.id === payload.postId);
      post?.likes.push(payload);
    },
    removeLike: (state, action: PayloadAction<ILike>) => {
      const { payload } = action;
      const post = state.posts.find((el) => el.id === payload.postId);
      const likeIdx =
        post?.likes.findIndex((el) => el.userId === payload.userId) || -1;
      post?.likes.splice(likeIdx, 1);
    },
  },
});

export const {
  setPosts,
  addLike,
  addPost,
  deletePost,
  removeLike,
  updatePost,
} = PostsSlice.actions;
export default PostsSlice.reducer;
