import Input from '@/components/common/Input/Input';
import styles from './CreateComment.module.scss';
import SendIcon from '../../../../assets/send.svg';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IComment } from '@/types/comments/IComment';
import { useState } from 'react';
import CommentsService from '@/services/CommentsService';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { useNavigate } from 'react-router-dom';
import { useModal } from '@/context/modalContext/ModalContextProvider';

interface Props {
  postId: number;
  addComment: (comment: IComment) => void;
}

interface InputType {
  content: string;
}

function CreateComment({ postId, addComment }: Props) {
  const { register, handleSubmit, reset } = useForm<InputType>();
  const [error, setError] = useState('');
  const isAuthorized = useSelector((state: RootState) => state.auth.isAuth);
  const navigate = useNavigate();
  const { closeModal } = useModal();

  const onSubmit: SubmitHandler<InputType> = async (data) => {
    if (!isAuthorized) {
      navigate('/sign-up');
      closeModal();
    }

    if (!data.content) {
      setError('Comment should not be empty');
      return;
    }

    try {
      const comment = await CommentsService.createComment(postId, data.content);
      addComment(comment.data);
      reset();
    } catch (error: any) {
      setError(error.data);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Input
        placeholder="Comment on this post..."
        reverseColors
        props={register('content')}
        error={error}
      />
      <button>
        <SendIcon />
      </button>
    </form>
  );
}

export default CreateComment;
