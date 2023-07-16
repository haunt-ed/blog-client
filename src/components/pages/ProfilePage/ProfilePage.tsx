import { useNavigate, useParams } from 'react-router-dom';
import styles from './ProfilePage.module.scss';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { UsersService } from '@/services/UsersService';
import { setProfileData } from '@/features/profile/profileSlice';
import UserInfo from './components/UserInfo';
import PostsList from './components/PostsList/PostsList';
import { PostsService } from '@/services/PostsService';
import { setPosts } from '@/features/posts/postsSlice';

function ProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getUser = async (id: string) => {
    const res = await UsersService.getUserById(id);
    if (!res.data) {
      navigate('/');
    }
    const posts = await PostsService.getPostByUserId(res.data.id);
    dispatch(setPosts(posts.data));
    dispatch(setProfileData(res.data));
  };

  useEffect(() => {
    if (!id) {
      navigate('/');
      return;
    }

    getUser(id);
  }, [id]);

  return (
    <div className={styles.mainContainer}>
      <UserInfo />
      <PostsList />
    </div>
  );
}

export default ProfilePage;
