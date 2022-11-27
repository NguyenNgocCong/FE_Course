import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from "../layout/header/header1";
import Footer from "../layout/footer/footer1";
import bannerImg from '../../images/banner/banner3.jpg';

class About2 extends Component {
  render() {
    return (
      <>
        <Header />
        <div className="page-content">
          <div
            className="page-banner ovbl-dark"
            style={{
              height: "200px",
              backgroundImage: "url(" + bannerImg + ")",
            }}
          >
            <div className="container">
              <div className="page-banner-entry">
                <h1 className="text-white">About Us</h1>
              </div>
            </div>
          </div>
          <div className="breadcrumb-row">
            <div className="container">
              <ul className="list-inline">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>About Us</li>
              </ul>
            </div>
          </div>

          <div className="content-block">
            <div className="section-area section-sp1">
              <div className="container">
                <div className="row align-items-center">
                  <div className="heading-bx left">
                    <h2 className="title-head m-b0">Source</h2>
                    <div>
                      FPT is an acronym for Technology Education, which is a
                      brand built from an online training channel on Youtube in
                      the form of a vBlog sharing free technology videos and
                      tips for everyone.
                    </div>
                    <div>
                      Established and started sharing from the end of 2022 by
                      FPT University students under the guidance of lecturers,
                      the website has been established.
                    </div>
                  </div>
                  <div className="heading-bx left">
                    <h2 className="title-head m-b0">Target</h2>
                    <div>
                      FPT education's goal is to give students who are
                      passionate about programming a place to learn, and discuss
                      technology topics. Help build a strong FPT education
                      community that brings a lot of value to society. Help new
                      programmers to shorten their access to real work that
                      creates value for businesses and the country.
                    </div>
                    <div>
                      To develop an IT background, the most important thing is
                      people. So we focus on people for the goal of 1 million
                      programmers for Vietnam by 2022.
                    </div>
                  </div>
                  <div className="heading-bx left">
                    <h2 className="title-head m-b0">Core values</h2>
                    <div>
                      The core value of FPT education is the value of knowledge
                      and skills brought to each of its members as a
                      prerequisite in all FPT education activities. FPT
                      education will always work non-stop to enhance that value.
                    </div>
                  </div>
                  <div className="heading-bx left">
                    <h2 className="title-head m-b0">Development strategy</h2>
                    <div>
                      The development orientation is to become a reputable
                      online training channel that is a bridge for businesses
                      and professionals. It helps to increase the
                      competitiveness of programmers and ultimately, supports
                      building a well-developed IT platform for Vietnam.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

export default About2;
