import styles from './PostCard.module.scss';
import PostEditField from './PostEditField';
import { IPost } from '@/types/posts/IPost';
import { useModal } from '@/context/modalContext/ModalContextProvider';
import DeletePostModal from '@/components/modals/DeletePostModal/DeletePostModal';
import CrossIcon from '../../../assets/cross.svg';
import moment from 'moment';
import LikeButton from '../LikeButton';
import classNames from 'classnames';
import CommentButton from '../CommentButton/CommentButton';

interface Props {
  post: IPost;
  isUsersPage: boolean;
}

function PostCard({ post, isUsersPage }: Props) {
  const { title, content, id, createdAt, likes } = post;
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
      <p className={classNames(styles.editable, styles.content)}>
        {isUsersPage ? (
          <PostEditField field="content" defaultValue={content} postId={id} />
        ) : (
          <div>{content}</div>
        )}
      </p>
      <div className={styles.buttons}>
        <LikeButton postId={id} likes={likes} />
        <CommentButton postId={id} />
      </div>
      {isUsersPage && (
        <button
          className={styles.deleteButton}
          onClick={onDelete}
          title="Delete"
        >
          <CrossIcon />
        </button>
      )}
      <p className={styles.date}>{moment(createdAt).format('DD MMMM YYYY')}</p>
    </div>
  );
}

export default PostCard;
