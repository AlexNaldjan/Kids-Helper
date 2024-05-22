import { useEffect, useState } from 'react';
import { Virtual, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperInstance from 'swiper';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './Carousel.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import api from '../../api';
import { setMarkers } from '../../store/map/markerSlice';

type slideType = {
  id: number;
  title: string;
  image: string;
  description: string;
};

export default function Carousel() {
  const [swiperRef, setSwiperRef] = useState<SwiperInstance | null>(null);
  const markersData = useSelector((state: RootState) => state.markers.markers);

  // Create array with 500 slides
  const [slides, setSlides] = useState<slideType[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getSocialServices() {
      const res = await api.services.getServices();
      dispatch(setMarkers(res.data));
    }
    getSocialServices();
  }, [dispatch]);

  useEffect(() => {
    setSlides(
      markersData.map(marker => ({
        id: marker.id,
        title: marker.title,
        description: marker.description,
        image: marker.img,
      })),
    );
  }, [markersData]);

  const slideTo = (id: number) => {
    swiperRef?.slideTo(id);
  };

  return (
    <>
      <Swiper
        modules={[Virtual, Navigation, Pagination]}
        onSwiper={setSwiperRef}
        slidesPerView={3}
        centeredSlides={true}
        spaceBetween={30}
        pagination={{
          type: 'fraction',
        }}
        navigation={true}
        virtual
      >
        {slides.map(slideContent => (
          <>
            <SwiperSlide key={slideContent.id}>
              <img src={slideContent.image} alt={slideContent.image} />
            </SwiperSlide>
          </>
        ))}
      </Swiper>

      <p className="append-buttons">
        <button onClick={() => slideTo(1)} className="prepend-slide">
          Start
        </button>
        <button
          onClick={() => slideTo(slides.length / 2)}
          className="slide-250"
        >
          Middle
        </button>
        <button onClick={() => slideTo(slides.length)} className="slide-500">
          End
        </button>
      </p>
    </>
  );
}
