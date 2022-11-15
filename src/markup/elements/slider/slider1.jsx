import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { userApi } from "../../../api/userApi";

function Slider1() {
  const [listSlider, setListSlider] = useState([]);

  const getListSlider = async () => {
    try {
      const response = await userApi.getAllSlider();
      setListSlider(response);
    } catch (responseError) {
      console.log(responseError);
    }
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  useEffect(() => {
    getListSlider();
  }, []);

  return (
    <Slider {...settings} className="tt-slider slider-one slider-sp0">
    	{listSlider.map(slider => (
    		<div key={slider?.id} className="slider-item">
    			<div className="slider-thumb">
    				<img src={process.env.REACT_APP_BASE_URL + "/api/account/downloadFile/" + slider?.imageUrl} alt="" />
    			</div>
    		</div>
    	))}
    </Slider>
  );
}

export default Slider1;
