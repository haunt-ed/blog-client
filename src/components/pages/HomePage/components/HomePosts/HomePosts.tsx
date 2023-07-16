import { useSelector } from 'react-redux';
import styles from './HomePosts.module.scss';
import { RootState } from '@/app/store';
import PostCard from '@/components/common/PostCard/PostCard';

function HomePosts() {
  const { posts   } = useSelector((state: RootState) => state.posts);

  return (
    <div className={styles.mainContainer}>
      {posts.map((post) => (
        <PostCard isUsersPage={false} post={post} key={post.id} />
      ))}
    </div>
  );
}

export default HomePosts;
