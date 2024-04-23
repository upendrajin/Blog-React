import axios from "axios";
import React, { useEffect, useState, Component } from "react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Container, Row } from "react-bootstrap";

import img from "../BLog Img/blog-1.webp";
import main from "../BLog Img/main.webp";

import Slider from "react-slick";

const Home = () => {
  const [blog, setBlog] = useState([]);

  const history = useHistory();

  const getBlog = () => {
    axios
      .get("https://blog-node-x3z2.onrender.com/blog/find")
      .then((res) => {
        console.log(res.data.data);
        setBlog(res.data.data);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  useEffect(() => {
    getBlog();
  }, []);

  const card = (id) => {
    console.log(id);
    localStorage.setItem("blogid", id);
    history.push("/blog");
  };

  // Slider Setting
  const settings = {
    // dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    // cssEase: "linear"
  };

  return (
    <div>
      {/* Main IMG */}
      <div className="container-fluid  position-relative  p-0">
        <div className="row align-items-center">
          <div className="p-0 img">
            <img width="100%" src={main} alt="" />
          </div>
        </div>
      </div>

      <div className="container-fluid pos-ab">
        <div className="row align-items-center">
          <div className="p-0">
            <h1 className="fs-60 fs-sm-6">
              DESIGN <span className="fs-2 fs-sm-6 for">FOR</span> LIFE
            </h1>
          </div>
        </div>
      </div>

      {/* Blog,Map Card */}
      {/* <Container fluid className='bg-lite text-dark pt-5 pb-5 ps-0 pe-0'>
        <Container className="">
          <Row className="  ">
            {
              blog.map((el, index) => {
                return <div className="col-lg-4 position-relative img-hov" key={index}>
                  <div className=''>
                    <img width="100%" className='' onClick={() => card(el._id)} src={'https://blog-node-x3z2.onrender.com/images/' + el.image} alt="" />
                  </div>
                  <div className='pos-ab-1 text-center '>
                    <h3 className='mt-2 '>{el.title}</h3>
                    <hr />
                    <p className='ms-1'><a href="/blog" onClick={() => card(el._id)} className='text-white fs-5 Read-more mt-3'>Read More..!</a></p>
                  </div>
                </div>
              })
            }
          </Row>
        </Container>
      </Container> */}

      {/* Slider */}
      <Container fluid className="mt-5 mb-5">
        <Row className="d-flex">
          <div className="slider-container p-0">
            <Slider {...settings}>
              {blog.map((el, index) => {
                return (
                  <div
                    className="col-lg-4 m-2 position-relative img-hov"
                    key={index}
                  >
                    <div className="m-2">
                      <div className="">
                        <img
                          width="100%"
                          className=""
                          onClick={() => card(el._id)}
                          src={
                            "https://blog-node-x3z2.onrender.com/images/" +
                            el.image
                          }
                          alt=""
                        />
                      </div>
                      <div className="pos-ab-1 text-center ">
                        <h3 className="mt-2 ">{el.title}</h3>
                        <hr />
                        <p className="ms-1">
                          <a
                            href="/blog"
                            onClick={() => card(el._id)}
                            className="text-white fs-5 Read-more mt-3"
                          >
                            Read More..!
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
