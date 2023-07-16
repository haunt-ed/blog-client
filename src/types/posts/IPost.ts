export interface ILike {
  postId: number;
  userId: number;
}

export interface IPost {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  content: string;
  authorId: number;
  likes: ILike[];
}
