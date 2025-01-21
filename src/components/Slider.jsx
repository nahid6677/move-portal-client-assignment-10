import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import './styles.css';
import '../components/Style.css'

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';

const Slider = ({Movies}) => {
    // console.log(Movies)
    // const slide = Movies.map((m,i) => {
    //     if(i < 3){
    //         return m
    //     }
    // })
    // console.log(slide)
    const progressCircle = useRef(null);
    const progressContent = useRef(null);
    const onAutoplayTimeLeft = (s, time, progress) => {
        progressCircle.current.style.setProperty('--progress', 1 - progress);
        progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    };
    return (
        <div className="w-11/12 mx-auto  mt-10">
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                onAutoplayTimeLeft={onAutoplayTimeLeft}
                className="mySwiper bg-slate-400"
            >
                {
                    Movies.map((m,i) => {
                        if(i < 3){
                            return <SwiperSlide><Link className='w-full' to={`/seedetails/${m._id}`}><img src={m.poster} alt="" /></Link></SwiperSlide>
                        }
                    })
                }
                {/* <SwiperSlide><img src="https://img.freepik.com/premium-psd/poster-design-photo-manipulation-template_528542-1009.jpg?w=740" alt="" /></SwiperSlide>
                <SwiperSlide><img src="https://img.freepik.com/premium-psd/poster-design-photo-manipulation-template_528542-1009.jpg?w=740" alt="" /></SwiperSlide>
                <SwiperSlide><img src="https://img.freepik.com/premium-psd/poster-design-photo-manipulation-template_528542-1009.jpg?w=740" alt="" /></SwiperSlide> */}

                <div className="autoplay-progress" slot="container-end">
                    <svg viewBox="0 0 48 48" ref={progressCircle}>
                        <circle cx="24" cy="24" r="20"></circle>
                    </svg>
                    <span ref={progressContent}></span>
                </div>
            </Swiper>
        </div>
    );
};

export default Slider;