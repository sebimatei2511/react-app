import React from "react";
import Navbar from "./components/navbar/navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import BookmarkItems from "./context/bookmarkContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <BookmarkItems>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </BookmarkItems>
  );
};

export default App;
