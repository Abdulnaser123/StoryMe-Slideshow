/** @format */

import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import MainSlideshow from "../components/mainSlideshow/mainSlidershow";
import FullscreenSlideshow from "../components/fullscreenSlideshow/fullscreenSlideshow";
import AddSlide from "../components/addSlide/AddSlide";
import PageNotFound from "../components/NotFound/NotFound";

function Routers() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = "http://localhost:3000/books";
    axios
      .get(apiUrl)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const collection = data.map((item) => ({
    src: item.thumbnail,
    caption: item.title,
  }));

  return (
    <div>
      <Routes>
        <Route
          exact
          path='/'
          element={<MainSlideshow data={data} loading={loading} />}
        />
        <Route
          path='/FullscreenSlideshow'
          element={
            <FullscreenSlideshow
              input={collection}
              ratio={`3:2`}
              mode={`automatic`}
              timeout={`4000`}
            />
          }
        />
        <Route path='/AddSlide' element={<AddSlide />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default Routers;
