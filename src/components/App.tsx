import toast from "react-hot-toast";
import SearchBar from "./SearchBar/SearchBar";
import { useEffect, useState, FC, FormEvent } from "react";
import { findImages } from "./services/api";
import ImageGallery from "./ImageGallery/ImageGallery";
import LoadMoreBtn from "./LoadMoreBtn/LoadMoreBtn";
import Loader from "./Loader/Loader";
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import ImageModal from "./ImageModal/ImageModal";

interface Image {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description: string;
}

const App: FC = () => {
  const [query, setQuery] = useState<string>("");
  const [images, setImages] = useState<Image[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [newQuery, setNewQuery] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value.trim() === "") {
      toast.error("Search query cannot be empty!", { duration: 3000 });
      return;
    }
    if (newQuery === value) {
      toast.error("Request already submitted. Try another.");
      return;
    }

    setNewQuery(value);
    setPage(1);
    setIsLoading(false);
    setImages([]);
    setQuery(value);
    setIsEmpty(false);
  };

  useEffect(() => {
    if (!query) return;
    const getData = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        const { results } = await findImages(query, page);
        
        setImages((prev) => [...prev, ...results]);
        if (!results.length) {
          setIsEmpty(true);
        }
        if (isEmpty) {
          toast.error("There are no matches for your search query...");
        }
      } catch (e) {
        console.log(e);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [query, page, isEmpty]);

  const handleClick = () => {
    setPage((prev) => prev + 1);
    setIsError(false);
  };

  const handleImageClick = (regularImage: string) => {
    setSelectedImage(regularImage);
    setModalIsOpen(true);
  };
  
  const handleModalClose = () => {
    setSelectedImage("");
    setModalIsOpen(false);
  };

  return (
    <div>
      <SearchBar handleSubmit={handleSubmit} value={value} setValue={setValue} />
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {images.length > 0 && !(images.length % 12) && <LoadMoreBtn handleClick={handleClick} />}
      {isLoading && <Loader loading={isLoading} />}
      {isError && <ErrorMessage />}
      <ImageModal closeModal={handleModalClose} isOpen={modalIsOpen} imageUrl={selectedImage} />
    </div>
  );
};

export default App;