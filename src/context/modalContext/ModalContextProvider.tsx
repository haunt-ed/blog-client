import React, { useState, createContext, useContext, useCallback, useEffect } from "react";
import Modal, { ModalProps } from "./index";

interface Props {
  children: React.ReactNode;
}

type ConfigurableModalProps = Omit<ModalProps, "active" | "setActive"> & { onClose?: VoidFunction };

interface ModalProviderValue {
  openModalWithContent: (content: React.ReactNode, options?: ConfigurableModalProps) => void;
  closeModal: () => void;
  openModal: () => void;
  modalOpened: boolean;
}

export const ModalContext = createContext<ModalProviderValue>({} as ModalProviderValue);

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }: Props) => {
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(null);
  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const [modalProps, setModalProps] = useState<ConfigurableModalProps | undefined | null>();

  const openModalWithContent = useCallback(
    (content: React.ReactNode, props?: ConfigurableModalProps) => {
      setModalContent(content);
      setModalProps(props);
      setModalOpened(true);
    },
    []
  );

  const openModal = useCallback(() => {
    setModalOpened(true);
  }, []);

  const closeModal = useCallback(() => {
    if (modalOpened && modalProps?.onClose) {
      modalProps.onClose();
    }

    setModalOpened(false);
    setModalContent(null);
    setModalProps(null);
  }, [modalOpened, modalProps]);

  const modalValueProvider: ModalProviderValue = {
    openModalWithContent: openModalWithContent,
    closeModal,
    openModal,
    modalOpened
  };

  useEffect(() => {
    if (modalOpened) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [modalOpened]);

  return (
    <ModalContext.Provider value={modalValueProvider}>
      <Modal active={modalOpened && !!modalContent} setActive={closeModal} {...modalProps}>
        {modalContent}
      </Modal>
      {children}
    </ModalContext.Provider>
  );
};
