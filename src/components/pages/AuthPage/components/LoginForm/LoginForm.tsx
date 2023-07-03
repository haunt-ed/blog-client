import { LoginErrors, LoginInputs } from '@/types/forms/AuthFormTypes';
import styles from './LoginForm.module.scss';
import Input from '@/components/common/Input';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '@/services/AuthService';
import { login } from '@/features/auth/authSlice';
import Button from '@/components/common/Button';
import { getFormErrors } from '@/utils/getFormErrors';

const initialErrors: LoginErrors = {
  user: '',
  password: '',
  hasError: false,
  globalError: '',
};

function LoginForm() {
  const { register, handleSubmit, reset } = useForm<LoginInputs>();
  const [errors, setErrors] = useState<LoginErrors>(
    {} as LoginErrors
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setErrors(initialErrors);
  }, []);

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    const checkedErrors = getFormErrors(data, initialErrors);
    setErrors(checkedErrors);

    if (checkedErrors.hasError) {
      return;
    }

    try {
      const res = await AuthService.login(data);
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
      <h2>Login</h2>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder="Username or Email*"
          className={styles.input}
          props={register('user')}
          onChange={onInputChange}
          error={errors.user}
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
          text="Sign in"
          className={styles.button}
          disabled={errors.hasError}
        />
      </form>
    </div>
  )
}

export default LoginForm