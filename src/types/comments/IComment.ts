export interface IComment {
  id: number;
  createdAt: string;
  updatedAt: string;
  content: string;
  authorId: number;
  postId: number;
  author: {
    username: string;
  }
}
