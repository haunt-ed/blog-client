import { useSelector } from 'react-redux';
import styles from './PostsList.module.scss';
import { RootState } from '@/app/store';
import PostCard from './PostCard';
import PlusIcon from '../../../../../assets/plus.svg';
import { useModal } from '@/context/modalContext/ModalContextProvider';
import CreatePostModal from '@/components/modals/CreatePostModal/CreatePostModal';

const CreatePostButton = () => {
  const { openModalWithContent, closeModal } = useModal();
  return (
    <button
      className={styles.create}
      title="Create"
      onClick={() => {
        openModalWithContent(<CreatePostModal closeModal={closeModal} />);
      }}
    >
      <PlusIcon />
    </button>
  );
};

function PostsList() {
  const posts = useSelector((state: RootState) => state.profile.posts);
  const isUsersPage = useSelector(
    (state: RootState) =>
      state.profile.profileData?.id === state.auth.userData?.id
  );

  return (
    <div className={styles.mainContainer}>
      <div className={styles.bar}>
        <h2>{posts.length > 0 ? `posts: ${posts?.length}` : 'No posts'}</h2>
        {isUsersPage && <CreatePostButton />}
      </div>
      {posts && posts.length > 0 && (
        <>
          <div className={styles.postList}>
            {posts.map((post) => (
              <PostCard post={post} key={post.id} isUsersPage={isUsersPage} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default PostsList;
