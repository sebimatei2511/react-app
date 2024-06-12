import React, { useEffect, useState, useContext } from "react";
import "./popular.scss";
import { assets } from "../../assets/assets";
import axios from "axios";
import { BookmarkContext } from "../../context/bookmarkContext";
import { toast } from "react-toastify";

const Popular = ({ searchQuery }) => {
  const [images, setImages] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(4);
  const [showMore, setShowMore] = useState(true);
  const { isInWishlist, handleBookmarkClick, API_KEY } =
    useContext(BookmarkContext);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          "https://pixabay.com/api/?key=" +
            API_KEY +
            "&q=" +
            encodeURIComponent(searchQuery)
        );

        const images = response.data.hits;
        // sort by views for most populars
        images.sort((a, b) => b.views - a.views);
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
    setSelectedImageIndex(index);
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

  const toggleShowMore = () => {
    if (showMore) {
      setItemsToShow(images.length);
    } else {
      setItemsToShow(4);
    }
    setShowMore(!showMore);
  };
  return (
    <div className="popular">
      <span>POPULAR</span>
      <div className="mainPopular">
        {images.length > 0 && (
          <>
            <div className="mainPopularDetails">
              <h2>Views on title: {images[0].views}</h2>
              <p>Tags on description: {images[0].tags}</p>
              <div className="mainPopularDetailsBottom">
                <div className="DetailsBottomLeft">
                  <p className="popularArticleAuthor">
                    Author: {images[0].user}
                  </p>
                  <p className="popularArticleDateTime">
                    {images[0].likes} likes, {images[0].comments} comments, 3
                    min read
                  </p>
                </div>
                <div className="DetailsBottomRight">
                  <img
                    src={
                      isInWishlist(images[0].id)
                        ? assets.heart
                        : assets.bookmark
                    }
                    onClick={() => handleBookmarkClick(images[0])}
                    className={`bookmark ${
                      isInWishlist(images[0].id) ? "favorite" : ""
                    }`}
                  />
                  <img src={assets.vector} alt="Vector" />
                </div>
              </div>
            </div>
            <img
              className="mainPopularImage"
              src={images[0].webformatURL}
              alt="Popular article"
              onClick={() => openPopup(0)}
            />
          </>
        )}
      </div>

      <div className="popularCarousel">
        <div className="popularCarouselParent">
          {images.slice(1, itemsToShow).map((image, index) => (
            <div key={index} className="popularCarouselComponent">
              <div className="mainPopularCarouselImageParent">
                <img
                  className="mainPopularCarouselImage"
                  src={image.webformatURL}
                  alt={`Carousel article ${index + 1}`}
                  onClick={() => openPopup(index + 1)}
                />
              </div>
              <div className="carouselComponentDetails">
                <h3>Views on title: {image.views}</h3>
                <p>Tags on description: {image.tags}</p>
                <div className="DetailsBottom">
                  <div className="DetailsBottomLeft">
                    <p className="popularArticleAuthor">Author: {image.user}</p>
                    <p className="popularArticleDateTime">
                      {image.likes} likes, {image.comments} comments, 3 min read
                    </p>
                  </div>
                  <div className="DetailsBottomRight">
                    <img
                      src={
                        isInWishlist(image.id) ? assets.heart : assets.bookmark
                      }
                      alt="Bookmark"
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
        <div className="spanLeftBox" onClick={toggleShowMore}>
          <span className="spanLeft">
            {showMore
              ? "SEE ALL POPULAR ARTICLES"
              : "SEE LESS POPULAR ARTICLES"}
          </span>
        </div>
      </div>

      {isPopupOpen && images[selectedImageIndex] && (
        <div className="imageModalOverlay" onClick={closePopup}>
          <div className="imageModal" onClick={(e) => e.stopPropagation()}>
            <img
              src={images[selectedImageIndex]?.webformatURL}
              alt={images[selectedImageIndex]?.tags}
            />
            <div className="carouselComponentDetails">
              <h3>Views on title: {images[selectedImageIndex]?.views}</h3>
              <p>Tags on description: {images[selectedImageIndex]?.tags}</p>
              <div className="DetailsBottom">
                <div className="DetailsBottomLeft">
                  <p className="popularArticleAuthor">
                    Author: {images[selectedImageIndex]?.user}
                  </p>
                  <p className="popularArticleDateTime">
                    {images[selectedImageIndex]?.likes} likes,{" "}
                    {images[selectedImageIndex]?.comments} comments, 3 min read
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
            <button className="prevButton" onClick={prevImage}>
              &lt;
            </button>
            <button className="nextButton" onClick={nextImage}>
              &gt;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Popular;
