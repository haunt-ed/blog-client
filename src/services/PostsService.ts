import $api from '@/http';
import { IPost } from '@/types/posts/IPost';
import { CreatePostDto, UpdatePostDto } from '@/types/posts/PostServiceTypes';

export class PostsService {
  static getPostByUserId(userId: number) {
    return $api.get<IPost[]>(`/posts/${userId}`)
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
}
