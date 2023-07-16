import { IComment } from '@/types/comments/IComment';
import styles from './Comment.module.scss';
import moment from 'moment';
import DeleteIcon from '../../../assets/delete.svg';
import EditIcon from '../../../assets/edit-small.svg';
import CheckIcon from '../../../assets/check-small.svg';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';

interface Props {
  comment: IComment;
  onDelete: (id: number) => void;
  onUpdate: (id: number, content: string) => void;
}

function Comment({ comment, onDelete, onUpdate }: Props) {
  const [isAuthor, setIsAuthor] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(comment.content);
  const userId = useSelector((state: RootState) => state.auth.userData?.id);

  useEffect(() => {
    setIsAuthor(comment.authorId === userId);
  }, [userId, comment]);

  return (
    <article className={styles.mainContainer}>
      {isAuthor && (
        <div className={styles.buttons}>
          <button
            title="Edit"
            onClick={() => {
              if (isEditing) {
                onUpdate(comment.id, content);
              }
              setIsEditing((prev) => !prev);
            }}
          >
            {isEditing ? <CheckIcon /> : <EditIcon />}
          </button>
          <button
            title="Delete"
            onClick={() => {
              onDelete(comment.id);
            }}
          >
            <DeleteIcon />
          </button>
        </div>
      )}
      <p className={styles.content}>
        {isEditing ? (
          <input
            type="text"
            value={content}
            onChange={(event) => {
              setContent(event.target.value);
            }}
          />
        ) : (
          comment.content
        )}
      </p>
      <div className={styles.info}>
        <p>
          commented by <span>{comment.author.username}</span>{' '}
        </p>
        <p>
          at <span>{moment(comment.createdAt).format('DD.MM.yyyy')}</span>
        </p>
      </div>
    </article>
  );
}

export default Comment;
