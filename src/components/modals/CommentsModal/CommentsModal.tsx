import { useEffect, useState } from 'react';
import styles from './CommentsModal.module.scss';
import CommentsService from '@/services/CommentsService';
import { IComment } from '@/types/comments/IComment';
import Cross from '@/components/common/Cross/Cross';
import Comment from '@/components/common/Comment/Comment';
import CreateComment from './CreateComment/CreateComment';

interface Props {
  postId: number;
  closeModal: () => void;
}

function CommentsModal({ postId, closeModal }: Props) {
  const [comments, setComments] = useState<IComment[]>([]);

  const getComments = async (postId: number) => {
    try {
      const comments = await CommentsService.getCommentByPostId(postId);
      setComments(comments.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onDelete = async (id: number) => {
    try {
      await CommentsService.deleteComment(id);
      setComments((prev) => {
        return prev.filter((comment) => comment.id !== id);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onUpdate = async (id: number, content: string) => {
    try {
      await CommentsService.updateComment(id, content);
      getComments(postId);
    } catch (error) {
      console.log(error);
    }
  };

  const addComment = (comment: IComment) => {
    setComments((prev) => [...prev, comment]);
  };

  useEffect(() => {
    getComments(postId);
  }, [postId]);

  return (
    <div className={styles.mainContainer}>
      <Cross onClose={closeModal} />
      <div className={styles.comments}>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <Comment
              comment={comment}
              key={comment.id}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          ))
        ) : (
          <p className={styles.noComments}>there are no comets</p>
        )}
      </div>
      <CreateComment postId={postId} addComment={addComment} />
    </div>
  );
}

export default CommentsModal;
