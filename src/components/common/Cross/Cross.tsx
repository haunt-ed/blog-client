import styles from './Cross.module.scss';

import CrossIcon from '../../../assets/cross.svg';
import classNames from 'classnames';

interface Props {
  className?: string;
  onClose: () => void;
}

function Cross({ onClose, className }: Props) {
  return (
    <button className={classNames(className, styles.cross)} onClick={onClose}>
      <CrossIcon />
    </button>
  );
}

export default Cross;
