import s from "./ImageCard.module.css";

const ImageCard = ({ image, onImageClick }) => {
  return (
    <div>
      <img
        className={s.image}
        src={image.urls.small}
        alt={image.alt_description}
        onClick={() => onImageClick(image.urls.regular)}
      />
    </div>
  );
};

export default ImageCard;
