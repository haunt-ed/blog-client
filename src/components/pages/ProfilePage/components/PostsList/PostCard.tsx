import styles from './PostsList.module.scss';
import PostEditField from './PostEditField';
import { IPost } from '@/types/posts/IPost';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { useModal } from '@/context/modalContext/ModalContextProvider';
import DeletePostModal from '@/components/modals/DeletePostModal/DeletePostModal';
import CrossIcon from '../../../../../assets/cross.svg';

interface Props {
  post: IPost;
  isUsersPage: boolean;
}

function PostCard({ post, isUsersPage }: Props) {
  const { title, content, id } = post;
  const { closeModal, openModalWithContent } = useModal();
  

  const onDelete = () => {
    openModalWithContent(
      <DeletePostModal closeModal={closeModal} postId={post.id} />
    );
  };

  return (
    <div className={styles.postCard}>
      <h3 className={styles.editable}>
        {isUsersPage ? (
          <PostEditField field="title" defaultValue={title} postId={id} />
        ) : (
          title
        )}
      </h3>
      <p className={styles.editable}>
        {isUsersPage ? (
          <PostEditField field="content" defaultValue={content} postId={id} />
        ) : (
          content
        )}
      </p>
      {isUsersPage && (
        <button className={styles.deleteButton} onClick={onDelete} title="Delete">
          <CrossIcon />
        </button>
      )}
    </div>
  );
}

export default PostCard;
