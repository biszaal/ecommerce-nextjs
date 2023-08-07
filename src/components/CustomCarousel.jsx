import React from "react";
import Image from "next/image";
import Carousel from "react-bootstrap/Carousel";

const CustomCarousel = ({ banners }) => {
  return (
    <div className="banner bg-body-secondary">
      <div className="banner-container">
        <Carousel id="carouselExampleIndicators" interval={3000} pause="hover">
          {banners.map((banner, index) => (
            <Carousel.Item key={index}>
              <Image
                src={banner.image}
                className="d-block w-100 banner-image"
                alt={`Banner ${index + 1}`}
                width={1000}
                height={1000}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default CustomCarousel;
