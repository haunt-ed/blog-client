import Input from '@/components/common/Input/Input';
import styles from './CreatePostModal.module.scss';
import Button from '@/components/common/Button/Button';
import Cross from '@/components/common/Cross/Cross';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CreatePostDto } from '@/types/posts/PostServiceTypes';
import { useEffect, useState } from 'react';
import { getFormErrors } from '@/utils/getFormErrors';
import { PostsService } from '@/services/PostsService';
import { useDispatch } from 'react-redux';
import { addPost } from '@/features/profile/profileSlice';

interface Props {
  closeModal: () => void;
}

type PostErrors = CreatePostDto & { hasError: boolean; globalError: string };

const initialErrors: PostErrors = {
  title: '',
  content: '',
  hasError: false,
  globalError: '',
};

function CreatePostModal({ closeModal }: Props) {
  const { register, reset, handleSubmit } = useForm<CreatePostDto>();
  const [errors, setErrors] = useState<PostErrors>({} as PostErrors);
  const dispatch = useDispatch();

  useEffect(() => {
    setErrors(initialErrors);
  }, []);

  const submitHandler: SubmitHandler<CreatePostDto> = async (data) => {
    const checkedData = getFormErrors(data, initialErrors);
    setErrors(checkedData);

    if (checkedData.hasError) {
      return;
    }

    try {
      const res = await PostsService.createPost(data);
      dispatch(addPost(res.data));
      reset();
      closeModal();
    } catch (error: any) {
      const message = error?.response?.data?.message || '';
      const globalError = Array.isArray(message) ? message[0] : message;
      setErrors((prev) => ({
        ...prev,
        globalError,
      }));
    }
  };

  const removeError = (key: keyof CreatePostDto) => {
    setErrors((prev) => ({
      ...prev,
      [key]: '',
      hasError: false,
      globalError: '',
    }));
  };

  return (
    <div className={styles.mainContainer}>
      <h2>New Post</h2>
      <Cross onClose={closeModal} />
      <form className={styles.form} onSubmit={handleSubmit(submitHandler)}>
        <Input
          placeholder="Title*"
          reverseColors
          onChange={() => {
            removeError('title');
          }}
          props={register('title')}
          error={errors.title}
        />
        <Input
          placeholder="Content*"
          reverseColors
          type="textarea"
          onChange={() => {
            removeError('content');
          }}
          props={register('content')}
          error={errors.content}
        />
        <Button text="Create" type="button" />
      </form>
    </div>
  );
}

export default CreatePostModal;
