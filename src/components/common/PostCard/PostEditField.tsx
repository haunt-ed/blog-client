import { useEffect, useRef, useState } from 'react';
import styles from './PostCard.module.scss';
import EditIcon from '../../../assets/edit.svg';
import { PostsService } from '@/services/PostsService';
import CheckIcon from '../../../assets/check.svg';
import { useDispatch } from 'react-redux';
import { updatePost } from '@/features/posts/postsSlice';

interface Props {
  defaultValue: string;
  field: 'title' | 'content';
  postId: number;
}

function PostEditField({ defaultValue, field, postId }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState('');
  const containerRef = useRef(null);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    onSubmit(value, field);
    setIsEditing(false);
  };

  const onSubmit = async (value: string, field: string) => {
    if (!value) {
      return;
    }

    const res = await PostsService.updatePost({ [field]: value, postId });
    dispatch(updatePost(res.data));
  };

  useEffect(() => {
    const submitOnEnter = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && isEditing) {
        event.preventDefault();
        handleSubmit();
      }
    };

    document.addEventListener('keydown', submitOnEnter);

    return () => {
      document.removeEventListener('keydown', submitOnEnter);
    };
  }, [value, isEditing]);

  useEffect(() => {
    setValue(defaultValue);
  }, []);

  return (
    <div onDoubleClick={() => setIsEditing(true)} ref={containerRef}>
      {isEditing ? (
        field === 'title' ? (
          <input
            type="text"
            className={styles.editInput}
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
            }}
          />
        ) : (
          <textarea
            className={styles.editInput}
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
            }}
          ></textarea>
        )
      ) : (
        defaultValue
      )}
      <button
        className={styles.editButton}
        onClick={() => {
          isEditing ? handleSubmit() : setIsEditing(true);
        }}
        title={`Edit ${field}`}
      >
        {isEditing ? <CheckIcon /> : <EditIcon />}
      </button>
    </div>
  );
}

export default PostEditField;
