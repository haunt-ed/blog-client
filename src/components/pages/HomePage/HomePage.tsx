import { useEffect, useState } from 'react';
import styles from './HomePage.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { Order, SortBy } from '@/types/posts/PostsQueryTypes';
import { useDispatch } from 'react-redux';
import { PostsService } from '@/services/PostsService';
import HomePosts from './components/HomePosts/HomePosts';
import { setPosts } from '@/features/posts/postsSlice';
import SortButton from './components/SortButton/SortButton';
import Pagination from '@/components/common/Pagination/Pagination';

function HomePage() {
  const { order, sortBy } = useSelector((state: RootState) => state.home);
  const dispatch = useDispatch();

  const getPosts = async (order: Order, sortBy: SortBy) => {
    try {
      const { data } = await PostsService.getAllPosts(order, sortBy);
      dispatch(setPosts(data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts(order, sortBy);
  }, [sortBy, order]);

  const [page, setPage] = useState(1);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.topBar}>
        <SortButton />
        {/* <Pagination
          currentPage={page}
          firstPage={1}
          lastPage={10}
          onNext={() => {
            setPage(prev => prev + 1)
          }}
          onPrev={() => {
            setPage(prev => prev - 1)
          }}
        /> */}
      </div>
      <HomePosts />
    </div>
  );
}

export default HomePage;
