import styles from './LikeButton.module.scss';
import LikeIcon from '../../../assets/like.svg';
import LikeFilledIcon from '../../../assets/like-filled.svg';
import { PostsService } from '@/services/PostsService';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { ILike } from '@/types/posts/IPost';
import { addLike, removeLike } from '@/features/posts/postsSlice';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

interface Props {
  postId: number;
  likes: ILike[];
}

function LikeButton({ postId, likes }: Props) {
  const dispatch = useDispatch();
  const currentUserId = useSelector(
    (state: RootState) => state.auth.userData?.id
  );
  const navigate = useNavigate();

  const likedByUser = likes?.find((like) => like.userId === currentUserId);

  const onLike = async (postId: number) => {
    try {
      const res = await PostsService.likePost(postId);

      dispatch(
        res.data
          ? addLike(res.data)
          : removeLike({ postId, userId: currentUserId || -1 })
      );
    } catch (error) {
      navigate('/sign-in');
    }
  };

  return (
    <div className={styles.mainContainer}>
      <button className={styles.like} onClick={() => onLike(postId)}>
        <i
          className={classNames(styles.icon, {
            [styles.visible]: likedByUser,
          })}
        >
          <LikeFilledIcon />
        </i>
        <i
          className={classNames(styles.icon, {
            [styles.visible]: !likedByUser,
          })}
        >
          <LikeIcon />
        </i>
      </button>
      <p>{likes?.length || 0}</p>
    </div>
  );
}

export default LikeButton;
