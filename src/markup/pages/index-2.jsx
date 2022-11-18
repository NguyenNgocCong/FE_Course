import React from "react";

// Layout
import Header from "../layout/header/header1";
import Footer from "../layout/footer/footer1";

// Elements
import OnlineCourses from "../elements/online-courses";
import PopularCoursesSlider from "../elements/popular-courses-slider";
import JoinBx from "../elements/join-bx";
import FeatureContent3 from "../elements/feature-content3";
import Counter2 from "../elements/counter/counter2";
import Testimonial1 from "../elements/testimonial1";

function Index2() {
    return (
        <div>
            <Header />
            <div className="page-content" >
                <div className="content-block" id="content-area">
                    <OnlineCourses />
                    <PopularCoursesSlider />
                    <JoinBx />
                    <FeatureContent3 />
                    <Counter2 />
                    <Testimonial1 />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Index2;
