import classNames from 'classnames';
import styles from './Input.module.scss';
import CrossedEye from '../../../assets/crossed-eye.svg';
import Eye from '../../../assets/eye.svg';
import { useEffect, useState } from 'react';

interface Props {
  placeholder: string;
  type?: string;
  className?: string;
  props?: any;
  onChange?: (ars: any) => void;
  error?: string;
  reverseColors?: boolean;
}

function Input({
  className,
  props,
  type,
  placeholder,
  onChange,
  error,
  reverseColors,
}: Props) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (type === 'password') {
      setVisible(false);
    }
  }, [type]);

  return (
    <label
      className={classNames(styles.label, { [styles.reverse]: reverseColors })}
    >
      {type !== 'textarea' ? (
        <input
          type={type === 'password' && visible ? 'text' : type || 'text'}
          className={classNames(className, styles.input, {
            [styles.error]: error?.length,
          })}
          placeholder={placeholder}
          {...props}
          onChange={onChange}
        />
      ) : (
        <textarea
          className={classNames(className, styles.input, styles.textarea, {
            [styles.error]: error?.length,
          })}
          placeholder={placeholder}
          {...props}
          onChange={onChange}
        ></textarea>
      )}
      {error && <p className={styles.errorText}>{error}</p>}
      {type === 'password' && (
        <button
          type="button"
          className={styles.eye}
          onClick={() => {
            setVisible((prev) => !prev);
          }}
        >
          {!visible ? <Eye /> : <CrossedEye />}
        </button>
      )}
    </label>
  );
}

export default Input;
