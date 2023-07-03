import { useDispatch } from 'react-redux';
import styles from './DeletePostModal.module.scss';
import { PostsService } from '@/services/PostsService';
import { deletePost } from '@/features/profile/profileSlice';
import Button from '@/components/common/Button/Button';

interface Props {
  postId: number;
  closeModal: () => void;
}

function DeletePostModal({ postId, closeModal }: Props) {
  const dispatch = useDispatch();

  const onDelete = async (postId: number) => {
    try {
      await PostsService.deletePost(postId);
      dispatch(deletePost(postId));
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <h3>Do you want to delete post?</h3>
      <div className={styles.buttons}>
        <Button
          text="Cancel"
          type="button"
          onClick={closeModal}
          className={styles.cancelButton}
        />
        <Button text="Delete" type="button" onClick={() => onDelete(postId)} />
      </div>
    </div>
  );
}

export default DeletePostModal;
