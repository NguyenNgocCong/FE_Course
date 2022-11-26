import React from "react";

// Layout
import Header from "../layout/header/header1";
import Footer from "../layout/footer/footer1";

// Elements
import OnlineCourses from "../elements/online-courses";
import PopularCoursesSlider from "../elements/popular-courses-slider";
import JoinBx from "../elements/join-bx";
import TopBlogPage from "../elements/recent-news-slider";
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
                    <TopBlogPage />
                    <Testimonial1 />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Index2;
