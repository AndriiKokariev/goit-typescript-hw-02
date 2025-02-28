import toast from "react-hot-toast";
import SearchBar from "./SearchBar/SearchBar";
import { useEffect, useState } from "react";
import { findImages } from "./services/api";
import ImageGallery from "./ImageGallery/ImageGallery";
import LoadMoreBtn from "./LoadMoreBtn/LoadMoreBtn";
import Loader from "./Loader/Loader";
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import ImageModal from "./ImageModal/ImageModal";
import Notification from "./Notification/Notification";

const App = () => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newQuery = e.target.elements.search.value;
    if (newQuery.trim() === "") {
      toast.error("Search query cannot be empty!", {
        duration: 3000,
      });
      return;
    }
    setPage(1);
    setIsLoading(false);
    setImages([]);
    setQuery(newQuery);
    setIsEmpty(false);
  };

  useEffect(() => {
    if (!query) return;
    const getData = async () => {
      try {
        setIsLoading(true);
        const response = await findImages(query, page);
        setImages((prev) => [...prev, ...response.data.results]);
        if (!response.data.results.length) {
          setIsEmpty(true);
        }
      } catch (e) {
        console.log(e);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [query, page]);

  const handleClick = () => {
    setPage((prev) => prev + 1);
    setIsError(false);
  };

  const handleImageClick = (regularImage) => {
    setSelectedImage(regularImage);
    setModalIsOpen(true);
  };
  const handleModalClose = () => {
    setSelectedImage("");
    setModalIsOpen(false);
  };

  return (
    <div>
      <SearchBar handleSubmit={handleSubmit} />
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {images.length > 0 && <LoadMoreBtn handleClick={handleClick} />}
      {isLoading && <Loader loading={isLoading} />}
      {isError && <ErrorMessage />}
      {isEmpty && <Notification />}
      <ImageModal
        closeModal={handleModalClose}
        isOpen={modalIsOpen}
        imageUrl={selectedImage}
      />
    </div>
  );
};

export default App;
