import $api from '@/http';
import { IComment } from '@/types/comments/IComment';

export default class CommentsService {
  static getCommentByPostId(postId: number) {
    return $api.get<IComment[]>(`comments/${postId}`);
  }

  static getCommentAmount(postId: number) {
    return $api.get<number>(`comments/amount/${postId}`);
  }

  static createComment(postId: number, content: string) {
    return $api.post<IComment>('comments/create', {
      postId,
      content,
    });
  }

  static updateComment(id: number, content: string) {
    return $api.post<IComment>('comments/update', {
      id,
      content,
    });
  }

  static deleteComment(id: number) {
    return $api.delete('comments', {
      data: {
        id,
      },
    });
  }
}
