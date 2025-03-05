import toast from "react-hot-toast";
import SearchBar from "./SearchBar/SearchBar";
import { useEffect, useState } from "react";
import { findImages } from "./services/api";
import ImageGallery from "./ImageGallery/ImageGallery";
import LoadMoreBtn from "./LoadMoreBtn/LoadMoreBtn";
import Loader from "./Loader/Loader";
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import ImageModal from "./ImageModal/ImageModal";

const App = () => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);
  const [value, setValue] = useState("");
  const [newQuery, setNewQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim() === "") {
      toast.error("Search query cannot be empty!", {
        duration: 3000,
      });
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
        const { data } = await findImages(query, page);

        setImages((prev) => [...prev, ...data.results]);
        if (!data.results.length) {
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
      <SearchBar
        handleSubmit={handleSubmit}
        value={value}
        setValue={setValue}
      />
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {images.length > 0 && !(images.length % 12) && (
        <LoadMoreBtn handleClick={handleClick} />
      )}
      {isLoading && <Loader loading={isLoading} />}
      {isError && <ErrorMessage />}
      <ImageModal
        closeModal={handleModalClose}
        isOpen={modalIsOpen}
        imageUrl={selectedImage}
      />
    </div>
  );
};

export default App;
