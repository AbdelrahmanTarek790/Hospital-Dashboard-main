import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination ,Navigation} from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

function Assets() {
  const cards = [
    {
      img: "../src/assets/974 1.png",
      text: "نبذة عن المنشئة",
    },
    {
      img: "../src/assets/974 1.png",
      text: "نبذة عن المنشئة",
    },
    {
      img: "../src/assets/974 1.png",
      text: "نبذة عن المنشئة",
    },
    {
      img: "../src/assets/974 1.png",
      text: "نبذة عن المنشئة",
    },
  ];
  return (
    <div className="p-6 bg-white rounded-lg mb-6 mx-2 lg:mx-6">
      <h2 className="text-right text-[#05004E] font-bold text-2xl mb-6">المنشآت</h2>
      <Swiper slidesPerView={1} loop={true} pagination={true} navigation={true} modules={[Pagination,Navigation]} className="max-w-lg lg:max-w-xl xl:max-w-4xl 2xl:max-w-5xl 4xl:max-w-screen-2xl">
        {cards.map((card, index) => {
          return (
            <SwiperSlide key={index} className="mb-12">
              <div className="flex justify-center items-center mb-3">
                <img src={card.img} alt="" />
              </div>
              <p className="text-center">{card.text}</p>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default Assets;
