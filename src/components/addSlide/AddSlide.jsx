/** @format */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddSlide.css";

const AddSlide = () => {
  const history = useNavigate();

  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageUrl || !title) {
      setError("Both fields are required.");
      return;
    }

    const data = {
      thumbnail: imageUrl,
      title: title,
    };

    try {
      const response = await fetch("http://localhost:3000/api/add-slide", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        history("/");
        window.location.reload();
      } else {
        setError("Failed to add slide. Please try again later.");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className='fun-background-container'>
      <div className='fun-form-container'>
        <div className='fun-form'>
          <h1 className='fun-title'>Add a Fun Slide!</h1>
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <label className='fun-label'>Image URL:</label>
              <input
                type='text'
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className='fun-input'
              />
            </div>
            <div className='form-group'>
              <label className='fun-label'>Title:</label>
              <input
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className='fun-input'
              />
            </div>
            {error && <div className='fun-error'>{error}</div>}
            <button type='submit' className='fun-button'>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSlide;
