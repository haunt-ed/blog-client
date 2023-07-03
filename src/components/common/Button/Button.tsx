import { Link } from 'react-router-dom';
import styles from './Button.module.scss';
import classNames from 'classnames';

interface Props {
  type: 'button' | 'link';
  text: string;
  link?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

function Button({ type, className, link, onClick, text, disabled }: Props) {
  return type === 'link' && link ? (
    <Link to={link} className={classNames(styles.button, className)}>
      {text}
    </Link>
  ) : (
    <button onClick={onClick} className={classNames(styles.button, className)} disabled={disabled}>
      {text}
    </button>
  );
}

export default Button;
