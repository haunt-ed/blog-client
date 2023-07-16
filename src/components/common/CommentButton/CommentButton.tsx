import styles from './CommentButton.module.scss';
import CommentIcon from '../../../assets/comment.svg';
import { useEffect, useState } from 'react';
import CommentsService from '@/services/CommentsService';
import { useModal } from '@/context/modalContext/ModalContextProvider';
import CommentsModal from '@/components/modals/CommentsModal/CommentsModal';

interface Props {
  postId: number;
}

function CommentButton({ postId }: Props) {
  const [commentCount, setCommentsCount] = useState(0);
  const { closeModal, openModalWithContent } = useModal();

  const getCommentsCount = async (postId: number) => {
    try {
      const count = await CommentsService.getCommentAmount(postId);
      setCommentsCount(count.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    openModalWithContent(
      <CommentsModal postId={postId} closeModal={closeModal} />
    )
  }

  useEffect(() => {
    getCommentsCount(postId);
  }, []);

  return (
    <button className={styles.comment} title="Comment" onClick={handleClick}>
      <CommentIcon />
      <p>{commentCount}</p>
    </button>
  );
}

export default CommentButton;
