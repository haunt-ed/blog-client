import { useState } from 'react';
import styles from './SortButton.module.scss';
import DropDownIcon from '../../../../../assets/drop-down.svg';
import { Order, SortBy } from '@/types/posts/PostsQueryTypes';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { changeOrder, setSortBy } from '@/features/home/homeSlice';
import OrderIcon from '../../../../../assets/order.svg';

interface DropDownOption {
  enum: SortBy;
  title: string;
}

const DROPDOWN_OPTIONS: DropDownOption[] = [
  {
    enum: SortBy.createdAt,
    title: 'Date',
  },
  {
    enum: SortBy.likes,
    title: 'Likes',
  },
  {
    enum: SortBy.title,
    title: 'Title',
  },
];

function SortButton() {
  const { order, sortBy } = useSelector((state: RootState) => state.home);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const selectSortBy = (sortBy: SortBy) => {
    dispatch(setSortBy(sortBy));
    setIsOpen(false);
  };

  const onChangeOrder = () => {
    dispatch(changeOrder());
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.dropdown} title='Sort By'>
        <p
          className={styles.selected}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {DROPDOWN_OPTIONS.find((option) => option.enum === sortBy)?.title ||
            'Sort By'}
          <i className={isOpen ? styles.open : ''}>
            <DropDownIcon />
          </i>
        </p>
        <ul className={classNames(styles.options, { [styles.isOpen]: isOpen })}>
          {DROPDOWN_OPTIONS.map((option) => {
            if (option.enum === sortBy) {
              return;
            }

            return (
              <li
                className={styles.option}
                key={option.enum}
                onClick={() => selectSortBy(option.enum)}
              >
                {option.title}
              </li>
            );
          })}
        </ul>
      </div>
      <button
        className={classNames(styles.orderButton, {
          [styles.orderReverse]: order === Order.desc,
        })}
        onClick={onChangeOrder}
        title='Change order'
      >
        <OrderIcon />
      </button>
    </div>
  );
}

export default SortButton;
