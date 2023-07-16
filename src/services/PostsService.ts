import $api from '@/http';
import { ILike, IPost } from '@/types/posts/IPost';
import { CreatePostDto, UpdatePostDto } from '@/types/posts/PostServiceTypes';
import { Order, SortBy } from '@/types/posts/PostsQueryTypes';

export class PostsService {
  static getAllPosts(order: Order, sortBy: SortBy) {
    return $api.get<IPost[]>(`/posts?sortBy=${sortBy}&order=${order}`);
  }

  static getPostByUserId(userId: number) {
    return $api.get<IPost[]>(`/posts/${userId}`);
  }

  static createPost(data: CreatePostDto) {
    return $api.post<IPost>('/posts/create', data);
  }

  static updatePost(data: UpdatePostDto) {
    return $api.post<IPost>('/posts/update', data);
  }

  static deletePost(postId: number) {
    return $api.delete('/posts', { data: { postId } });
  }

  static likePost(postId: number) {
    return $api.post<ILike>(`/posts/like/${postId}`);
  }
}
