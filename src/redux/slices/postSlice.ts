import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Post } from "../../interface/Post";

interface PostState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: PostState = {
  posts: [],
  loading: false,
  error: null,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    fetchPostsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchPostsSuccess: (state, action: PayloadAction<Post[]>) => {
      state.loading = false;
      state.posts = action.payload;
    },
    fetchPostsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    addPost: (state, action: PayloadAction<Post>) => {
      state.posts.unshift(action.payload);
    },
    updatePost: (state, action: PayloadAction<Post>) => {
      state.posts = state.posts.map((p) =>
        p.id === action.payload.id ? action.payload : p
      );
    },
    deletePost: (state, action: PayloadAction<string>) => {
      // id is string in your interface
      state.posts = state.posts.filter((p) => p.id !== action.payload);
    },
  },
});

export const {
  fetchPostsStart,
  fetchPostsSuccess,
  fetchPostsFailure,
  addPost,
  updatePost,
  deletePost,
} = postSlice.actions;

export default postSlice.reducer;
