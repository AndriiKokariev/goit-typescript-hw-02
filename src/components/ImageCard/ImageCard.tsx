import s from "./ImageCard.module.css";
import { FC } from "react";

interface Image {
  urls: {
    small: string;
    regular: string;
  };
  alt_description: string;
}

interface ImageCardProps {
  image: Image;
  onImageClick: (url: string) => void;
}

const ImageCard: FC<ImageCardProps> = ({ image, onImageClick }) => {
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
