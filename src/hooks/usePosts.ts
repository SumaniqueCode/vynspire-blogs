import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import api from "../apis/axios";
import {
  fetchPostsStart,
  fetchPostsSuccess,
  fetchPostsFailure,
  addPost as addPostAction,
  updatePost as updatePostAction,
  deletePost as deletePostAction,
} from "../redux/slices/postSlice";
import type { Post } from "../interface/Post";
import type { AppDispatch, RootState } from "../redux/store";

export const usePosts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, loading, error } = useSelector((state: RootState) => state.post);

  const fetchPosts = useCallback(async () => {
    dispatch(fetchPostsStart());
    try {
      const res = await api.get<Post[]>("/posts");
      // Sort newest first
      const sorted = res.data.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      dispatch(fetchPostsSuccess(sorted));
    } catch (err: any) {
      dispatch(fetchPostsFailure(err.message || "Failed to fetch posts"));
    }
  }, [dispatch]);

  const addPost = async (post: Omit<Post, "id" | "createdAt" | "updatedAt">) => {
    try {
      dispatch(fetchPostsStart());
      const newPost = {
        ...post,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const res = await api.post<Post>("/posts", newPost);
      dispatch(addPostAction(res.data));
    } catch (err) {
      console.error(err);
      dispatch(fetchPostsFailure("Failed to add post"));
    }
  };

  const updatePost = async (id: string, post: Partial<Post>) => {
    try {
      dispatch(fetchPostsStart());
      const res = await api.put<Post>(`/posts/${id}`, {
        ...post,
        updatedAt: new Date().toISOString(),
      });
      dispatch(updatePostAction(res.data));
    } catch (err) {
      console.error(err);
      dispatch(fetchPostsFailure("Failed to update post"));
    }
  };

  const removePost = async (id: string) => {
    try {
      dispatch(fetchPostsStart());
      await api.delete(`/posts/${id}`);
      dispatch(deletePostAction(id));
    } catch (err) {
      console.error(err);
      dispatch(fetchPostsFailure("Failed to delete post"));
    }
  };

  return { posts, loading, error, fetchPosts, addPost, updatePost, removePost };
};
