import React, { useContext, useState } from "react";
import "./navbar.scss";
import { assets } from "../../assets/assets";
import { BookmarkContext } from "../../context/bookmarkContext";

const Navbar = () => {
  const { wishlist } = useContext(BookmarkContext);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;
  const { addToWishlist, removeFromWishlist, isInWishlist } =
    useContext(BookmarkContext);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleNextPage = () => {
    if ((currentPage + 1) * itemsPerPage < wishlist.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderWishlistItems = () => {
    const startIndex = currentPage * itemsPerPage;
    const selectedItems = wishlist.slice(startIndex, startIndex + itemsPerPage);

    return selectedItems.map((item, index) => (
      <div key={index} className="wishlistItem">
        <img src={item.webformatURL} alt={item.tags} />
        <div className="wishlistItemDetails">
          <h3>{item.tags}</h3>
          <p>Author: {item.user}</p>
          <p>
            {item.likes} likes, {item.comments} comments
          </p>
        </div>
      </div>
    ));
  };

  

  return (
    <div className="navbar">
      <img src={assets.logo} alt="Logo" />
      <img
        className="bookmark"
        src={assets.bookmark}
        alt="Bookmark"
        onClick={togglePopup}
      />
      {isPopupOpen && (
        <div className="wishlistPopupOverlay" onClick={togglePopup}>
          <div className="wishlistPopup" onClick={(e) => e.stopPropagation()}>
            <button className="closeButton" onClick={togglePopup}>
              X
            </button>
            <div className="wishlistGrid">{renderWishlistItems()}</div>
            <div className="paginationButtons">
              <button onClick={handlePrevPage} disabled={currentPage === 0}>
                &lt;
              </button>
              <button
                onClick={handleNextPage}
                disabled={(currentPage + 1) * itemsPerPage >= wishlist.length}
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
