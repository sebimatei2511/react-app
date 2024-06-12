import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export const BookmarkContext = createContext();

const BookmarkProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const API_KEY = "44329045-905aa74f9ba46c6c0c46bfce8";

  const addToWishlist = (image) => {
    setWishlist((prevWishlist) => [...prevWishlist, image]);
  };

  const removeFromWishlist = (imageId) => {
    setWishlist((prevWishlist) =>
      prevWishlist.filter((image) => image.id !== imageId)
    );
  };

  const isInWishlist = (imageId) => {
    return wishlist.some((image) => image.id === imageId);
  };

  useEffect(() => {
    console.log("Wishlist updated:", wishlist);
  }, [wishlist]);

  const handleBookmarkClick = (image) => {
    if (isInWishlist(image.id)) {
      removeFromWishlist(image.id);
      toast.info("Item deleted from wishlist!");
    } else {
      addToWishlist(image);
      toast.success("Item added to wishlist!");
    }
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

  return (
    <BookmarkContext.Provider
      value={{
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        wishlist,
        handleBookmarkClick,
        API_KEY,
        closePopup,
        nextImage,
        prevImage,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};

export default BookmarkProvider;
