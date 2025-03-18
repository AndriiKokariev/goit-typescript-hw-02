import ImageCard from "../ImageCard/ImageCard";
import s from "./ImageGallery.module.css";
import { FC } from "react";

interface Image {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description: string;
}

interface ImageGalleryProps {
  images: Image[];
  onImageClick: (url: string) => void;
}

const ImageGallery: FC<ImageGalleryProps> = ({ images, onImageClick }) => {
  return (
    <div className={s.imagesContainer}>
      <ul className={s.imageList}>
        {images.map((image) => (
          <li className={s.listItem} key={image.id}>
            <ImageCard image={image} onImageClick={onImageClick} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ImageGallery;
