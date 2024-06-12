import React, { useEffect, useState, useContext } from "react";
import "./allArticles.scss";
import { assets } from "../../assets/assets";
import axios from "axios";
import { BookmarkContext } from "../../context/bookmarkContext";
import { toast } from "react-toastify";

const AllArticles = ({ searchQuery }) => {
  const [images, setImages] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { isInWishlist, handleBookmarkClick, API_KEY } =
    useContext(BookmarkContext);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [showMore, setShowMore] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          "https://pixabay.com/api/?key=" +
            API_KEY +
            "&q=" +
            encodeURIComponent(searchQuery) +
            // API doesnt have a createdAt field -> fix
            "&image_type=photo&per_page=20&order=latest"
        );

        const images = response.data.hits;
        setImages(images);
      } catch (error) {
        console.error("Error fetching images from Pixabay:", error);
      }
    };

    fetchImages();
  }, [searchQuery]);

  if (!searchQuery || searchQuery.length < 3) {
    return null;
  }

  const openPopup = (index) => {
    setSelectedImageIndex(currentPage * itemsPerPage + index);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setSelectedImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setSelectedImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const nextPage = () => {
    if ((currentPage + 1) * itemsPerPage < images.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const toggleShowMore = () => {
    if (showMore) {
      setItemsPerPage(images.length);
    } else {
      setItemsPerPage(5);
    }
    setShowMore(!showMore);
  };

  const paginatedImages = images.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="allArticles">
      <hr />
      <div className="spanBox" onClick={toggleShowMore}>
        <span className="spanBoxText">
          {showMore ? "ALL ARTICLES" : "LESS ARTICLES"}
        </span>
      </div>
      <div className="allArticlesListing">
        {paginatedImages.map((image, index) => (
          <div key={index} className="allArticlesSingle">
            <div className="mainPopularImageParent">
              <img
                className="mainPopularImage"
                src={image.webformatURL}
                onClick={() => openPopup(index)}
              />
            </div>
            <div className="singleArticleDetails">
              <h3>Views on title: {image.views}</h3>
              <p>Tags on description: {image.tags}</p>
              <div className="singleArticleBottom">
                <div className="singleArticleBottomLeft">
                  <p className="singleArticleAuthor">Author: {image.user}</p>
                  <p className="singleArticleDateTime">
                    {image.likes} likes, {image.comments} comments, 3 min read
                  </p>
                </div>
                <div className="singleArticleBottomRight">
                  <img
                    src={
                      isInWishlist(image.id) ? assets.heart : assets.bookmark
                    }
                    onClick={() => handleBookmarkClick(image)}
                    className={`bookmark ${
                      isInWishlist(image.id) ? "favorite" : ""
                    }`}
                  />
                  <img src={assets.vector} alt="Vector" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="slideButtons">
        <button
          className="postButton"
          onClick={prevPage}
          disabled={currentPage === 0}
        >
          <img src={assets.back_icon} alt="Back" />
          <span>New Post</span>
        </button>
        <button
          className="postButton"
          onClick={nextPage}
          disabled={(currentPage + 1) * itemsPerPage >= images.length}
        >
          <span>Old Post</span>
          <img src={assets.next_icon} alt="Next" />
        </button>
      </div>
      {isPopupOpen && images.length > 0 && (
        <div className="imageModalOverlay" onClick={closePopup}>
          <div className="imageModal" onClick={(e) => e.stopPropagation()}>
            <img
              src={images[selectedImageIndex].webformatURL}
              alt={images[selectedImageIndex].tags}
            />
            <div className="carouselComponentDetails">
              <h3>Views on title: {images[selectedImageIndex].views}</h3>
              <p>Tags on description: {images[selectedImageIndex].tags}</p>
              <div className="DetailsBottom">
                <div className="DetailsBottomLeft">
                  <p className="popularArticleAuthor">
                    Author: {images[selectedImageIndex].user}
                  </p>
                  <p className="popularArticleDateTime">
                    {images[selectedImageIndex].likes} likes,{" "}
                    {images[selectedImageIndex].comments} comments, 3 min read
                  </p>
                </div>
                <div className="DetailsBottomRight">
                  <img
                    src={
                      isInWishlist(images[selectedImageIndex].id)
                        ? assets.heart
                        : assets.bookmark
                    }
                    onClick={() =>
                      handleBookmarkClick(images[selectedImageIndex])
                    }
                    className={`bookmark ${
                      isInWishlist(images[selectedImageIndex].id)
                        ? "favorite"
                        : ""
                    }`}
                  />
                  <img src={assets.vector} alt="Vector" />
                </div>
              </div>
            </div>
            <button className="closeButton" onClick={closePopup}>
              X
            </button>
          </div>
          <button className="prevButton" onClick={prevImage}>
            &lt;
          </button>
          <button className="nextButton" onClick={nextImage}>
            &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default AllArticles;
