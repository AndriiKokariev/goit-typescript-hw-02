import Modal from "react-modal";
import s from "./ImageModal.module.css";
import { FC } from "react";

Modal.setAppElement("#root");

interface ImageModalProps {
  isOpen: boolean;
  imageUrl: string;
  closeModal: () => void;
}

const ImageModal: FC<ImageModalProps> = ({ isOpen, imageUrl, closeModal }) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: 0,
      border: 0,
      borderRadius: 10,
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Image Modal"
      className={s.modal}
      overlayClassName={s.Overlay}
      style={customStyles}
    >
      <img src={imageUrl} alt="Large view" className={s.modalImage} />
    </Modal>
  );
};

export default ImageModal;
