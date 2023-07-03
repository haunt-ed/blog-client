export interface CreatePostDto {
  title: string;
  content: string;
}

export interface UpdatePostDto {
  postId: number;
  title?: string;
  content?: string;
}