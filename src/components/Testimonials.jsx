import { FaQuoteLeft, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const Testimonials = () => {
  return (
    <div>
      <div className="relative mt-8 lg:mt-16">
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          loop={true}
          breakpoints={{
            768: {
              slidesPerView: 2,
              spaceBetween: 40,
            },

            1024: {
              slidesPerView: 3,
              spaceBetween: 50,
            },
          }}
          modules={[Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="flex flex-col gap-4 px-4">
              <FaQuoteLeft className="mx-auto text-2xl text-customBlue"></FaQuoteLeft>
              <p className="italic">
                Thanks to JobVerse, I found the perfect job as a Software
                Engineer. The user-friendly platform made it easy to explore
                opportunities, and the application process was seamless.
                JobVerse truly connects talent with the right opportunities. I'm
                grateful for the platform that kickstarted my thriving career!
              </p>
              <div className="flex justify-center text-[#F0AD4E]">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <h5 className="text-lg uppercase">Sarah J.</h5>
              <p className="-mt-4">Software Engineer</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex flex-col gap-4 px-8">
              <FaQuoteLeft className="mx-auto text-2xl text-customBlue"></FaQuoteLeft>
              <p className="italic">
                JobVerse transformed my job search. I landed a fantastic role as
                a Marketing Specialist that perfectly matched my skills and
                career goals. The remote job feature allowed me to find
                opportunities beyond my local area. JobVerse has my sincere
                thanks for making job hunting an exciting and rewarding
                experience!
              </p>
              <div className="flex justify-center text-[#F0AD4E]">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStarHalfAlt />
              </div>
              <h5 className="text-lg uppercase">Alex M.</h5>
              <p className="-mt-4">Marketing Specialist</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex flex-col gap-4 px-8">
              <FaQuoteLeft className="mx-auto text-2xl text-customBlue"></FaQuoteLeft>
              <p className="italic">
                JobVerse exceeded my expectations! As a Graphic Designer, I was
                able to showcase my portfolio and connect with employers looking
                for creative talent. The hybrid job option was a game-changer
                for me. Thanks to JobVerse, I now enjoy a fulfilling career that
                balances both on-site and remote work seamlessly.
              </p>
              <div className="flex justify-center text-[#F0AD4E]">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <h5 className="text-lg uppercase">Emily H.</h5>
              <p className="-mt-4">Graphic Designer</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex flex-col gap-4 px-8">
              <FaQuoteLeft className="mx-auto text-2xl text-customBlue"></FaQuoteLeft>
              <p className="italic">
                JobVerse made job hunting stress-free. I discovered a remote
                Customer Support Specialist position that matched my skills
                perfectly. The platform's user-friendly interface and detailed
                job listings made the entire process smooth. I've found my dream
                job, all thanks to JobVerse!
              </p>
              <div className="flex justify-center text-[#F0AD4E]">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStarHalfAlt />
              </div>
              <h5 className="text-lg uppercase">Taylor B.</h5>
              <p className="-mt-4">Customer Support Specialist</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex flex-col gap-4 px-8">
              <FaQuoteLeft className="mx-auto text-2xl text-customBlue"></FaQuoteLeft>
              <p className="italic">
                JobVerse made job hunting a breeze! I secured a position as a
                Data Analyst, and the detailed job descriptions allowed me to
                find the perfect match for my skills. The 'My Jobs' feature made
                managing applications straightforward. JobVerse is not just a
                job board; it's a career catalyst!
              </p>
              <div className="flex justify-center text-[#F0AD4E]">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <h5 className="text-lg uppercase">Jeke R.</h5>
              <p className="-mt-4">Data Analyst</p>
            </div>
          </SwiperSlide>
        </Swiper>

        <div className="swiper-button-next absolute top-1/2 !-right-4 lg:!-right-8 transform -translate-y-1/2 !text-customBlue after:!text-xl"></div>
        <div className="swiper-button-prev absolute top-1/2 !-left-4 lg:!-left-8 transform -translate-y-1/2 !text-customBlue after:!text-xl"></div>
      </div>
    </div>
  );
};

export default Testimonials;
