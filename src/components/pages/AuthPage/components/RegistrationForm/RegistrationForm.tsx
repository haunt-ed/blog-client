import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './RegistrationForm.module.scss';
import {
  RegistrationErrors,
  RegistrationInputs,
} from '@/types/forms/AuthFormTypes';
import Input from '@/components/common/Input/Input';
import Button from '@/components/common/Button/Button';
import { useEffect, useState } from 'react';
import { AuthService } from '@/services/AuthService';
import { useDispatch } from 'react-redux';
import { login } from '@/features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { getFormErrors } from '@/utils/getFormErrors';

const initialErrors: RegistrationErrors = {
  email: '',
  password: '',
  username: '',
  hasError: false,
  globalError: '',
};

function RegistrationForm() {
  const { register, handleSubmit, reset } = useForm<RegistrationInputs>();
  const [errors, setErrors] = useState<RegistrationErrors>(
    {} as RegistrationErrors
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setErrors(initialErrors);
  }, []);

  const onSubmit: SubmitHandler<RegistrationInputs> = async (data) => {
    const checkedErrors = getFormErrors(data, initialErrors);
    setErrors(checkedErrors);

    if (checkedErrors.hasError) {
      return;
    }

    try {
      const res = await AuthService.register(data);
      dispatch(login(res.data.user));
      reset();
      navigate('/');
    } catch (error: any) {
      const message = error?.response?.data?.message || '';
      const globalError = Array.isArray(message) ? message[0] : message;
      setErrors((prev) => ({
        ...prev,
        globalError,
      }));
    }
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrors((prev) => ({
      ...prev,
      [event.target.name]: '',
      hasError: false,
    }));
  };

  return (
    <div className={styles.mainContainer}>
      <h2>Registration</h2>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder="Email*"
          className={styles.input}
          props={register('email')}
          onChange={onInputChange}
          error={errors.email}
        />
        <Input
          placeholder="Username*"
          className={styles.input}
          props={register('username')}
          onChange={onInputChange}
          error={errors.username}
        />
        <Input
          type="password"
          placeholder="Password*"
          className={styles.input}
          props={register('password')}
          onChange={onInputChange}
          error={errors.password}
        />
        {errors.globalError?.length > 0 && (
          <p className={styles.error}>{errors.globalError}</p>
        )}
        <Button
          type="button"
          text="Sign up"
          className={styles.button}
          disabled={errors.hasError}
        />
      </form>
    </div>
  );
}

export default RegistrationForm;
