import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Link, useNavigate } from "react-router-dom";
import "./home.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BlogCard from "../../components/BlogCard/BlogCard";
import NextArrow from "../../components/Arrows/NextArrow";
import PrevArrow from "../../components/Arrows/PrevArrow";
import ProductCard from "../../components/ProductCard/ProductCard";
import SpecialProduct from "../../components/SpecialProduct/SpecialProduct";
import { services } from "../../utils/Data";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../../features/blogs/blogSlice.js";
import { getAllProducts } from "../../features/products/productSlice.js";
import Meta from "../../components/Meta/Meta";
import BreadCrumb from "../../components/BreadCrumb/Breadcrumb";
import moment from "moment";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBlogs());
    dispatch(getAllProducts());
  }, []);

  const blogState = useSelector((state) => state.blog.blogs);
  const productState = useSelector((state) => state.product.products);
  const [categoryCount, setCategoryCount] = useState([]);

  useEffect(() => {
    if (productState && productState?.length > 0) {
      const categoryMap = {};

      productState.forEach((prdt) => {
        if (prdt?.category) {
          if (categoryMap[prdt?.category]) {
            categoryMap[prdt?.category] += 1;
          } else {
            categoryMap[prdt?.category] = 1;
          }
        }
      });

      setCategoryCount(categoryMap);
    }
  }, [productState]);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
    arrows: false,
    responsive: [
      {
        breakpoint: 1116,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: false,
        },
      },
      {
        breakpoint: 1047,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: false,
        },
      },
      {
        breakpoint: 857,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: false,
        },
      },
      {
        breakpoint: 567,
        settings: {
          dots: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          arrows: false,
        },
      },
    ],
  };

  const settings1 = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
    arrows: false,
    responsive: [
      {
        breakpoint: 1116,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: false,
        },
      },
      {
        breakpoint: 1047,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: false,
        },
      },
      {
        breakpoint: 857,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: false,
        },
      },
      {
        breakpoint: 567,
        settings: {
          dots: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          arrows: false,
        },
      },
    ],
  };

  const settings2 = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1116,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: false,
        },
      },
      {
        breakpoint: 1047,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: false,
        },
      },
      {
        breakpoint: 857,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: false,
        },
      },
      {
        breakpoint: 684,
        settings: {
          dots: false,
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          arrows: false,
        },
      },
      {
        breakpoint: 409,
        settings: {
          dots: false,
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          arrows: false,
        },
      },
    ],
  };

  const settings4 = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: <PrevArrow className="bg-dark next-arrow" />,
    nextArrow: <NextArrow className="bg-dark next-arrow" />,
    arrows: true,
    responsive: [
      {
        breakpoint: 1060,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: true,
        },
      },
      {
        breakpoint: 910,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: true,
        },
      },
      {
        breakpoint: 570,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: true,
        },
      },
    ],
  };

  const settings5 = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <PrevArrow className="bg-dark next-arrow" />,
    nextArrow: <NextArrow className="bg-dark next-arrow" />,
    responsive: [
      {
        breakpoint: 1116,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: true,
        },
      },
      {
        breakpoint: 924,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: true,
        },
      },
      {
        breakpoint: 670,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: true,
        },
      },
    ],
  };

  const settings6 = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <PrevArrow className="bg-dark next-arrow" />,
    nextArrow: <NextArrow className="bg-dark next-arrow" />,
    responsive: [
      {
        breakpoint: 968,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: true,
        },
      },
    ],
  };

  const settings7 = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <PrevArrow className="bg-dark next-arrow" />,
    nextArrow: <NextArrow className="bg-dark next-arrow" />,
    responsive: [
      {
        breakpoint: 1030,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: true,
        },
      },
      {
        breakpoint: 780,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: true,
        },
      },
    ],
  };

  const settings8 = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1116,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: false,
          dots: false,
          arrows: true,
        },
      },
      {
        breakpoint: 846,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: false,
          dots: false,
          arrows: true,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          dots: false,
          arrows: true,
        },
      },
    ],
  };

  return (
    <>
      <Meta title={"Goyal's: Revolutionizing Online Shopping in India"} />
      <section className="home-wrapper-1 py-5 ps-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6 main-banner-div">
              <div className="main-banner position-relative p-1">
                <img
                  src="/main-banner1.webp"
                  className="img-fluid rounded-3"
                  alt="main banner 1"
                />
                <div className="main-banner-content position-absolute">
                  <h4>Supercharged for Pros.</h4>
                  <h5>iPad S13+ Pro.</h5>
                  <p>
                    From ₹80,000.00 or ₹3,500/mo. <br /> for 24 mo.
                  </p>
                  <Link to="/store">Buy Now</Link>
                </div>
              </div>
            </div>
            <div className="col-6 small-banner-div">
              <div className=" d-flex small-div-inner flex-wrap align-items-center gap-10">
                <div className="small-banner position-relative p-1">
                  <img
                    src="/sm-banner1.webp"
                    className="img-fluid rounded-3"
                    alt="main banner 1"
                    width="310px"
                  />
                  <div className="small-banner-content position-absolute">
                    <h4>Best Sale</h4>
                    <h5>Laptops Max</h5>
                    <p>
                      From ₹1,42,000.00 <br />
                      or ₹5400/mo.
                    </p>
                  </div>
                </div>
                <div className="small-banner position-relative p-1">
                  <img
                    src="/sm-banner2.jpg"
                    className="img-fluid rounded-3"
                    alt="main banner 1"
                    width="310px"
                  />
                  <div className="small-banner-content position-absolute">
                    <h4>New Arrival</h4>
                    <h5>Buy Ipad Air</h5>
                    <p>
                      From ₹50,000.00 <br />
                      or ₹4,200/mo. for 12 mo*
                    </p>
                  </div>
                </div>
                <div className="small-banner position-relative p-1">
                  <img
                    src="/sm-banner3.jpg"
                    className="img-fluid rounded-3"
                    alt="main banner 1"
                    width="310px"
                  />
                  <div className="small-banner-content position-absolute">
                    <h4>15% Off</h4>
                    <h5>Smartwatch 7</h5>
                    <p>
                      Shop the latest brand <br />
                      styles and colors.
                    </p>
                  </div>
                </div>
                <div className="small-banner position-relative p-1">
                  <img
                    src="/sm-banner4.jpg"
                    className="img-fluid rounded-3"
                    alt="main banner 1"
                    width="310px"
                  />
                  <div className="small-banner-content position-absolute">
                    <h4>Free Engraving</h4>
                    <h5>AirPods Max</h5>
                    <p>
                      High-fidelity playback & <br />
                      ultra-low distortion
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home-wrapper-2 service-cat">
        <div className="container-xxl">
          <Slider {...settings1}>
            {services?.map((i, j) => {
              return (
                <div className="item gap-10 d-flex align-items-center" key={j}>
                  <img
                    src={i.image}
                    alt="services"
                    width="30px"
                    className="mb-3"
                  />
                  <div className="service-content">
                    <h6 className="mb-1">{i.title}</h6>
                    <p className="text-nowrap">{i.tagline}</p>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </section>

      <section className="home-wrapper-3">
        <div className="container-xxl">
          <div className="categories-container categories">
            <Slider {...settings}>
              <div className="item item-container">
                <div className="item item1 d-flex gap-10 align-items-center justify-content-around">
                  <div className="ps-3 hover-outline">
                    <h6>Headphones</h6>
                    <p>
                      {categoryCount?.Headphones
                        ? categoryCount?.Headphones
                        : "0"}{" "}
                      Items
                    </p>
                  </div>
                  <div style={{ height: "110px" }}>
                    <img src="/headphones1.png" alt="headphones" width="70px" />
                  </div>
                </div>

                <div className=" item item1 d-flex gap-10 align-items-center justify-content-around">
                  <div className="ps-3 hover-outline">
                    <h6>Smart TV</h6>
                    <p> {categoryCount?.TV ? categoryCount?.TV : "0"} Items</p>
                  </div>
                  <div style={{ height: "110px" }}>
                    <img src="/smartTV.png" alt="camera" height="90px" />
                  </div>
                </div>
              </div>

              <div className="item">
                <div className=" item item1 d-flex gap-10 align-items-center justify-content-around">
                  <div className="ps-3 hover-outline">
                    <h6>Smart Watches</h6>
                    <p>
                      {" "}
                      {categoryCount["Smart Watches"]
                        ? categoryCount["Smart Watches"]
                        : "0"}{" "}
                      Items
                    </p>
                  </div>
                  <div style={{ height: "110px" }}>
                    <img src="/watch.png" alt="camera" height="90px" />
                  </div>
                </div>

                <div className="item item1 d-flex gap-10 align-items-center justify-content-around">
                  <div className="ps-3 hover-outline">
                    <h6>Laptops</h6>
                    <p>
                      {" "}
                      {categoryCount?.Laptops
                        ? categoryCount?.Laptops
                        : "0"}{" "}
                      Items
                    </p>
                  </div>
                  <div style={{ height: "110px" }}>
                    <img src="/laptop.png" alt="Laptops" height="90px" />
                  </div>
                </div>
              </div>

              <div className="item">
                <div className="item  item1 d-flex gap-10 align-items-center justify-content-around">
                  <div className="ps-3 hover-outline">
                    <h6>Analog Watches</h6>
                    <p>
                      {" "}
                      {categoryCount["Analog Watches"]
                        ? categoryCount["Analog Watches"]
                        : "0"}{" "}
                      Items
                    </p>
                  </div>
                  <div style={{ height: "110px" }}>
                    <img src="/analog-watch.png" alt="camera" height="100px" />
                  </div>
                </div>

                <div className="item item1 d-flex gap-10 align-items-center justify-content-around">
                  <div className="ps-3 hover-outline">
                    <h6>Cameras</h6>
                    <p>
                      {" "}
                      {categoryCount?.Camera ? categoryCount?.Camera : "0"}{" "}
                      Items
                    </p>
                  </div>
                  <div style={{ height: "110px" }}>
                    <img src="/camera.png" alt="camera" height="100px" />
                  </div>
                </div>
              </div>

              <div className="item">
                <div className="item item1 d-flex gap-10 align-items-center justify-content-around">
                  <div className="ps-3 hover-outline">
                    <h6>Smartphones</h6>
                    <p>
                      {" "}
                      {categoryCount?.Smartphones
                        ? categoryCount?.Smartphones
                        : "0"}{" "}
                      Items
                    </p>
                  </div>
                  <div style={{ height: "110px" }}>
                    <img
                      src="/smartphone.png"
                      alt="camera"
                      height="100px"
                      width="120px"
                    />
                  </div>
                </div>

                <div className="item item1 d-flex gap-10 align-items-center justify-content-around">
                  <div className="ps-3 hover-outline">
                    <h6 className="m-0">Speakers</h6>
                    <p className="m-0">
                      {" "}
                      {categoryCount?.Speakers
                        ? categoryCount?.Speakers
                        : "0"}{" "}
                      Items
                    </p>
                  </div>
                  <div style={{ height: "110px" }}>
                    <img src="/speaker.png" alt="speakers" height="100px" />
                  </div>
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </section>

      <section className="home-wrapper-8 pb-5">
        <div className="container-xxl">
          <div className="brands-slider">
            <Slider {...settings2}>
              <div className="item">
                <img src="/dell.png" width="120px" alt="" />
              </div>
              <div className="item">
                <img src="/LG.png" width="150px" alt="" />
              </div>
              <div className="item">
                <img src="/bose.png" width="150px" alt="" />
              </div>
              <div className="item">
                <img src="/canon.png" width="150px" alt="" />
              </div>
              <div className="item">
                <img src="/appl.png" width="130px" alt="" />
              </div>
              <div className="item">
                <img src="/intel.png" width="150px" alt="" />
              </div>
              <div className="item">
                <img src="/sony.png" width="150px" alt="" />
              </div>
              <div className="item">
                <img src="/samsung.png" width="150px" alt="" />
              </div>
            </Slider>
          </div>
        </div>
      </section>

      <div className="feature-wrapper">
        <div className="container-xxl">
          <h3 className="section-heading">Featured Collection</h3>
          <div className="row">
            <Slider {...settings5}>
              {productState &&
                productState?.map((prdt, key) => {
                  if (prdt?.tags?.toLowerCase() === "featured") {
                    return (
                      <div className="item p-2" key={key}>
                        <ProductCard product={prdt} />
                      </div>
                    );
                  }
                })}
            </Slider>
          </div>
        </div>
      </div>

      <div className="popular-wrapper">
        <div className="container-xxl">
          <h3 className="section-heading">Our Popular Products</h3>
          <div className="row">
            <div className="side-box">
              <div className="card">
                <img
                  src="/cat-product-banner.jpg"
                  alt=""
                  width="250px"
                  className="side-slider-img"
                />
              </div>
            </div>
            <div className="popular-slider">
              <Slider {...settings7}>
                {productState &&
                  productState?.map((prdt, key) => {
                    if (prdt?.tags?.toLowerCase() === "popular") {
                      return (
                        <div className="item p-2" key={key}>
                          <ProductCard product={prdt} />
                        </div>
                      );
                    }
                  })}
              </Slider>
            </div>
          </div>
        </div>
      </div>

      <section className="famous-wrapper py-5">
        <div className="container-xxl">
          <div className="row">
            <Slider {...settings8}>
              <div className="item position-relative">
                <div className="card ">
                  <img src="/famous1.jpg" alt="" />
                </div>
                <div className="card-content position-absolute">
                  <p className="text-white">big screen</p>
                  <h3 className="text-white">Smart Watch Series 7</h3>
                  <p className="text-white">
                    From ₹35,000 or ₹1,400./mo. for 24mo.*
                  </p>
                </div>
              </div>
              <div className="item position-relative">
                <div className="card">
                  <img src="/famous2.jpg" alt="" />
                </div>
                <div className="card-content position-absolute">
                  <p>big studio</p>
                  <h3>600 nits of brightness.</h3>
                  <p>27-inch 5K Retina Display</p>
                </div>
              </div>
              <div className="item position-relative">
                <div className="card">
                  <img src="/famous3.jpg" alt="" />
                </div>
                <div className="card-content position-absolute">
                  <p>Smartphones</p>
                  <h3>Smartphone 13 Pro.</h3>
                  <p>
                    New in Green. From ₹84,000.00 <br />
                    or ₹3,500.00/mo. for 24mo.*
                  </p>
                </div>
              </div>
              <div className="item position-relative">
                <div className="card">
                  <img src="/famous4.jpg" alt="" />
                </div>
                <div className="card-content position-absolute">
                  <p>Home Speakers</p>
                  <h3>Room-filling sound.</h3>
                  <p>From ₹59,000 or ₹9800.00/mo. for 12mo.*</p>
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </section>

      <section className="special-wrapper py-5 px-2 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading pb-3">Special Products</h3>
            </div>
          </div>
          <div className="row">
            <Slider {...settings6}>
              {productState &&
                productState?.map((product, key) => {
                  if (product?.tags?.toLowerCase() === "special") {
                    return (
                      <div className="item">
                        <SpecialProduct
                          id={product?._id}
                          title={product?.title}
                          desc={product?.description}
                          price={product?.price}
                          brand={product?.brand}
                          images={product?.images}
                          ratings={product?.totalRatings}
                        />
                      </div>
                    );
                  }
                })}
            </Slider>
          </div>
        </div>
      </section>

      <div className="blog-wrapper home-wrapper-4">
        <div className="container-xxl">
          <h3 className="section-heading">Our Latest Blogs</h3>

          <div className="row">
            <Slider {...settings4}>
              {blogState &&
                blogState?.map((blog, key) => {
                  return (
                    <div className="item">
                      <BlogCard
                        id={blog?._id}
                        title={blog?.title}
                        image={blog?.images[0]?.url}
                        desc={blog?.description}
                        date={moment(blog?.createdAt).format("DD-MM-YYYY")}
                      />
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
