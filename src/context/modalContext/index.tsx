import { PropsWithChildren } from "react";
import classnames from "classnames";

import styles from "./Modal.module.scss";

export type SizeTypes = "medium" | "auto";

export interface ModalProps {
  active: boolean;
  setActive: () => void;
  size?: SizeTypes;
  preventClickToClose?: boolean;
}

export default function Modal({
  active,
  size,
  children
}: PropsWithChildren<ModalProps>): JSX.Element {
  return (
    <div
      className={classnames(styles.modal, {
        [styles.active]: active
      })}
    >
      <div className={styles.modalContainer}>
        <div
          className={classnames(styles.modalContent, {
            [styles.active]: active,
            [styles.medium]: size === "medium",
            [styles.autoSize] : size === 'auto'
          })}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
