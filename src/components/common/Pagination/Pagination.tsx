import styles from './Pagination.module.scss';
import LeftArrow from '../../../assets/arrow-left.svg';
import RightArrow from '../../../assets/arrow-right.svg';
import classNames from 'classnames';
import { useEffect, useState } from 'react';

interface Props {
  currentPage: number;
  onNext: () => void;
  onPrev: () => void;
  lastPage: number;
  firstPage: number;
}

function Pagination({
  currentPage,
  onNext,
  onPrev,
  firstPage,
  lastPage,
}: Props) {
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (currentPage === firstPage) {
      setPage(currentPage + 1);
      return;
    }

    setPage(currentPage);
  }, [currentPage]);

  return (
    <div className={styles.mainContainer}>
      <button onClick={onPrev}>
        <LeftArrow />
      </button>
      <div className={styles.pages}>
        <p
          className={classNames({ [styles.active]: currentPage === firstPage })}
        >
          {page - 1}
        </p>
        <p
          className={classNames({
            [styles.active]:
              currentPage !== firstPage && currentPage !== lastPage,
          })}
        >
          {page}
        </p>
        <p
          className={classNames({ [styles.active]: currentPage === lastPage })}
        >
          {page + 1}
        </p>
      </div>
      <button onClick={onNext}>
        <RightArrow />
      </button>
    </div>
  );
}

export default Pagination;
