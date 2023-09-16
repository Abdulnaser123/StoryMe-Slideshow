/** @format */

import { Swiper, SwiperSlide } from "swiper/react";
import { useFullScreenHandle } from "react-full-screen";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Link } from "react-router-dom";

import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";

function MainSlideshow({ data, loading }) {
  const handle = useFullScreenHandle();

  return (
    <>
      <div className='container'>
        <div className='buttons'>
          <Link to={"/FullscreenSlideshow"} className='btn-link'>
            <button className='preview-btn' onClick={handle.enter}>
              Preview <ion-icon name='play-outline'></ion-icon>
            </button>
          </Link>
          <Link to={"/AddSlide"} className='btn-link'>
            <button className='add-btn' onClick={handle.enter}>
              Add Slide
              <ion-icon name='add-outline'></ion-icon>{" "}
            </button>
          </Link>
        </div>

        {loading ? (
          <div className='heading'>Loading...</div>
        ) : (
          <>
            <Swiper
              effect={"coverflow"}
              grabCursor={true}
              loop={true}
              slidesPerView={"3"}
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 2.5,
              }}
              pagination={{ el: ".swiper-pagination", clickable: true }}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
                clickable: true,
              }}
              modules={[EffectCoverflow, Pagination, Navigation]}
              className='swiper_container'
            >
              {data.map((slide, index) => (
                <SwiperSlide key={slide.id}>
                  <img src={slide.thumbnail} alt={`slide_image_${index}`} />
                </SwiperSlide>
              ))}
              <div className='slider-controler'>
                <div className='swiper-button-prev slider-arrow'>
                  <ion-icon name='arrow-back-outline'></ion-icon>
                </div>
                <div className='swiper-button-next slider-arrow'>
                  <ion-icon name='arrow-forward-outline'></ion-icon>
                </div>
                <div className='swiper-pagination'></div>
              </div>
            </Swiper>
          </>
        )}
      </div>
    </>
  );
}

export default MainSlideshow;
