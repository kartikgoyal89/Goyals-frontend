import React, { useState, useEffect } from "react";
import "./singleProduct.css";
import Meta from "../../components/Meta/Meta";
import BreadCrumb from "../../components/BreadCrumb/Breadcrumb";
import NextArrow from "../../components/Arrows/NextArrow";
import PrevArrow from "../../components/Arrows/PrevArrow";
import ReactStars from "react-rating-stars-component";
import Color from "../../components/Color/Color";
import ProductCard from "../../components/ProductCard/ProductCard";
import Slider from "react-slick";
import { Link, useLocation, useNavigate } from "react-router-dom";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";
import Accordion from "react-bootstrap/Accordion";
import { CiDeliveryTruck } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { FaLink } from "react-icons/fa6";
import {
  getAllProducts,
  getSingleProduct,
  getPrdtRatings,
} from "../../features/products/productSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { formatPriceToIndian } from "../../utils/DataFormat.js";
import toast from "react-hot-toast";
import {
  addToWishlist,
  addToCompareList,
  rateAProduct,
} from "../../features/products/productSlice.js";
import {
  addToCart,
  getUserCart,
  getWishlist,
} from "../../features/users/userSlice.js";

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

const settings2 = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  arrows: false,
  responsive: [
    {
      breakpoint: 1080,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
        dots: false,
        arrows: false,
      },
    },
    {
      breakpoint: 913,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: false,
        arrows: false,
      },
    },
    {
      breakpoint: 472,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: false,
        arrows: false,
      },
    },
  ],
};

const copyToClipboard = (text) => {
  var textField = document.createElement("textarea");
  textField.innerText = text;
  document.body.appendChild(textField);
  textField.select();
  document.execCommand("copy");
  textField.remove();
};

const SingleProduct = () => {
  const [orderedProduct, setOrderedProduct] = useState(true);
  const [wishlistprdt, setWishlistPrdt] = useState(false);
  const [compareprdt, setComparePrdt] = useState(false);
  const [similarProduct, setSimilarProduct] = useState([]);
  const [activeColor, setActiveColor] = useState("");

  const [cartColor, setCartColor] = useState("");
  const [cartQuantity, setCartQuantity] = useState(1);
  const [color, setColor] = useState(null);
  const [alreadyAdded, setAlreadyAdded] = useState(false);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const productState = useSelector((state) => state?.product?.products);
  const prdtState = useSelector((state) => state.product.productInfo);
  const cartState = useSelector((state) => state.auth.userCart);
  const userState = useSelector((state) => state?.auth);
  const wishlistState = useSelector((state) => state?.product?.wishlist);
  const compareState = useSelector((state) => state?.product?.compareList);
  const ratingState = useSelector(
    (state) => state?.product?.productInfo?.ratings
  );

  const getPrdtId = location.pathname.split("/")[2];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [getPrdtId]);

  useEffect(() => {
    if (prdtState && productState) {
      let data = productState.filter(
        (product) => product.tags === prdtState.tags
      );
      setSimilarProduct(data);
    }
  }, [prdtState, productState]);

  useEffect(() => {
    if (getPrdtId) {
      dispatch(getSingleProduct(getPrdtId));
      dispatch(getUserCart());
      dispatch(getPrdtRatings(getPrdtId));
    } else if (!getPrdtId || isError) {
      toast.error("Something Went Wrong!");
      navigate("/store");
    }
  }, [getPrdtId]);

  useEffect(() => {
    for (let i = 0; i < cartState.length; i++) {
      if (getPrdtId === cartState[i]?.productId?._id) {
        setAlreadyAdded(true);
      }
    }
  }, [cartState]);

  useEffect(() => {
    for (let i = 0; i < wishlistState?.wishlist?.length; i++) {
      if (getPrdtId === wishlistState?.wishlist[i]) {
        setWishlistPrdt(true);
      } else {
        setWishlistPrdt(false);
      }
    }
  }, [wishlistState, wishlistprdt, setWishlistPrdt, dispatch]);
  const handleWishlist = (id) => {
    dispatch(addToWishlist(id));
    if (wishlistprdt) {
      toast.success("Product Removed from Wishlist");
    } else {
      toast.success("Product Added to Wishlist");
    }
  };

  useEffect(() => {
    for (let i = 0; i < compareState?.compare?.length; i++) {
      if (getPrdtId === compareState?.compare[i]) {
        setComparePrdt(true);
      } else {
        setComparePrdt(false);
      }
    }
  }, [compareState, compareprdt, setComparePrdt, dispatch]);
  const handleCompare = (id) => {
    dispatch(addToCompareList(id));
    if (compareprdt) {
      toast.success("Product Removed From Compare");
    } else {
      toast.success("Product Added to Compare");
    }
  };

  const [zoomImg, setZoomImg] = useState(
    prdtState?.images?.length > 0 ? prdtState?.images[0]?.url : ""
  );

  useEffect(() => {
    if (prdtState?.images?.length > 0) {
      setZoomImg(prdtState.images[0].url);
    }
  }, [prdtState]);

  const uploadCart = () => {
    if (color === null) {
      toast.error("Please Choose a color!");
      return false;
    } else {
      dispatch(
        addToCart({
          productId: prdtState?._id,
          quantity: cartQuantity,
          color: color,
          price: prdtState?.price,
        })
      );
      setTimeout(() => {
        navigate("/cart");
      }, 200);
    }
  };

  const [star, setStar] = useState(null);
  const [comment, setComment] = useState(null);

  const addRatingToProduct = () => {
    if (star === null) {
      toast.error("Please provide the rating!");
      return false;
    } else if (comment === null) {
      toast.error("Please add a review!");
      return false;
    } else {
      dispatch(
        rateAProduct({ stars: star, comment: comment, prodId: getPrdtId })
      ).then(() => {
        dispatch(getPrdtRatings(getPrdtId));
      });
      setTimeout(() => {
        setStar(null);
        setComment(null);
      }, 200);
      return false;
    }
    return false;
  };

  return (
    <>
      <Meta title={`${prdtState?.title}`} />
      <BreadCrumb title={`${prdtState?.title}`} />

      <div className="main-product-wrapper py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <div className="main-product-image">
                <div>
                  {zoomImg ? (
                    <InnerImageZoom
                      src={zoomImg}
                      fadeDuration={150}
                      zoomSrc={zoomImg}
                      zoomScale={1.5}
                      zoomPreload={true}
                      hideHint={false}
                      fullScreenOnMobile={true}
                      alt="asdjasod"
                      onError={(e) => (e.target.src = "/no_prdt_image.png")}
                    />
                  ) : (
                    <img src="/no_prdt_image.png" alt="Product Zoom" />
                  )}
                </div>
              </div>
              <div className="prdt-img-slider">
                <Slider {...settings2}>
                  {prdtState?.images?.map((img, key) => {
                    return (
                      <div
                        key={key}
                        className="item"
                        onClick={() => {
                          setZoomImg(img?.url || "/no_prdt_image.png");
                        }}
                      >
                        <img src={img?.url} alt="" width="200px" />
                      </div>
                    );
                  })}
                </Slider>
              </div>
            </div>
            <div className="col-6">
              <div className="main-product-details">
                <div className="border-bottom">
                  <h3 className="title mb-0">{prdtState?.title}</h3>
                </div>
                <div className="border-bottom">
                  <p className="price mb-0">
                    {formatPriceToIndian(prdtState?.price)}
                  </p>
                  <div className="d-flex align-items-center gap-20">
                    <ReactStars
                      count={5}
                      size={25}
                      value={parseInt(prdtState?.totalRatings)}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <p className="mb-0 reviews">
                      (Based on {prdtState?.ratings?.length} Reviews)
                    </p>
                  </div>
                </div>

                <div className="border-bottom py-3">
                  <div className="d-flex gap-10 align-items-center my-1">
                    <h4 className="mb-0 product-heading">Type :</h4>
                    <p className="mb-0 product-data text-capitalize">
                      {prdtState?.category}
                    </p>
                  </div>
                  <div className="d-flex gap-10 align-items-center my-1">
                    <h4 className="mb-0 product-heading">Brand :</h4>
                    <p className="mb-0 product-data text-capitalize">
                      {prdtState?.brand}
                    </p>
                  </div>
                  <div className="d-flex gap-10 align-items- my-1">
                    <h4 className="mb-0 product-heading">Tags :</h4>
                    <p className="mb-0 product-data text-capitalize">
                      {prdtState?.tags ? prdtState?.tags : prdtState?.category}
                    </p>
                  </div>

                  <div className="d-flex gap-10 align-items-center my-1">
                    <h4 className="mb-0 product-heading">Availability :</h4>
                    <p className="mb-0 product-data text-capitalize">
                      In Stock
                    </p>
                  </div>

                  {prdtState?.category === "clothing" && (
                    <div className="d-flex flex-column mt-2 mb-1">
                      <h4 className="mb-1 product-heading">Size :</h4>
                      <div className="d-flex flex-wrap gap-15 mb-1">
                        <span className="badge border border-1 bg-white text-dark border-secondary">
                          S
                        </span>
                        <span className="badge border border-1 bg-white text-dark border-secondary">
                          M
                        </span>
                        <span className="badge border border-1 bg-white text-dark border-secondary">
                          L
                        </span>
                      </div>
                    </div>
                  )}
                  <div className="d-flex gap-10 flex-column mt-2 mb-1">
                    {alreadyAdded === false && (
                      <>
                        <h4 className="mb-0 product-heading">Color :</h4>
                        <div className="d-flex gap-10">
                          {prdtState?.color?.map((item, key) => {
                            return (
                              <Color
                                key={key}
                                id={item?._id}
                                setColor={setColor}
                                color={item?.color}
                              />
                            );
                          })}
                        </div>
                      </>
                    )}
                  </div>

                  <div className="d-flex gap-15 align-items-center flex-row mt-2 mb-1 responsive-div">
                    <div className="d-flex align-items-center gap-10">
                      {alreadyAdded === false && (
                        <>
                          <h4 className="mb-0 product-heading">Quantity :</h4>
                          <input
                            type="number"
                            min={1}
                            max={10}
                            className="form-control"
                            style={{ width: "60px" }}
                            onChange={(e) => setCartQuantity(e.target.value)}
                            value={cartQuantity}
                          />
                        </>
                      )}
                    </div>
                    <div className="d-flex flex-row gap-10 quantity-div">
                      <div className="d-flex align-items-center  gap-10 btn-div">
                        {alreadyAdded === false ? (
                          <button className="btn" onClick={() => uploadCart()}>
                            Add To Cart
                          </button>
                        ) : (
                          <button
                            className="btn"
                            onClick={() => navigate("/cart")}
                          >
                            Go To Cart
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-15 pt-2">
                    <div className="d-flex align-items-center">
                      <img
                        src={"/heart.png"}
                        alt="heart"
                        width="15px"
                        className="me-1"
                      />
                      <button
                        style={{
                          border: "none",
                          backgroundColor: "#fff",
                          color: "#777",
                          fontSize: "14px",
                          letterSpacing: "0.3px",
                        }}
                        onClick={() => handleCompare(getPrdtId)}
                      >
                        Add To Compare
                      </button>
                    </div>
                    <div>
                      <img
                        src={"/compare.svg"}
                        alt="compare"
                        className="me-1"
                        width="15px"
                      />
                      <button
                        style={{
                          border: "none",
                          backgroundColor: "#fff",
                          color: "#777",
                          fontSize: "14px",
                          letterSpacing: "0.3px",
                        }}
                        onClick={() => handleWishlist(getPrdtId)}
                      >
                        Add To Wishlist
                      </button>
                    </div>
                  </div>

                  <div className="accordion-container">
                    <Accordion defaultActiveKey="0">
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>
                          <CiDeliveryTruck className="me-2 fs-5" /> Shipping &
                          Materials
                        </Accordion.Header>
                        <Accordion.Body>
                          Free shipping and returns available on all orders!
                          <br />
                          We ship all Indian domestic orders within{" "}
                          <b>5-10 business days!</b>
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="1">
                        <Accordion.Header>
                          <CiHeart className="fs-5 me-2" />
                          Care Instructions
                        </Accordion.Header>
                        <Accordion.Body>
                          All the products after the delivery are not the
                          company's responsibility. Handle it with care and
                          there will be no replacement in case of broken or
                          tear.
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </div>

                  <div className="d-flex gap-10 align-items-center mt-3">
                    <h3 className="product-heading mb-0">Product Link :</h3>
                    <Link
                      onClick={(link) => {
                        copyToClipboard(window.location.href);
                        toast.success("Link Copied Succesfully!");
                      }}
                    >
                      Copy Product Link <FaLink className="ms-2" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="description-wrapper pb-4 px-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h4 className="px-2">Description</h4>
              <div className="bg-white p-3 desc-container">
                <p
                  dangerouslySetInnerHTML={{ __html: prdtState?.description }}
                ></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="reviews-wrapper py-3 px-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h4 className="px-2 mb-3">Reviews</h4>
              <div className="review-inner-wrapper">
                <div className="review-head d-flex justify-content-between align-items-end pe-3">
                  <div className="px-3">
                    <h5 className="mb-2">Customer Reviews</h5>
                    <div className="d-flex gap-10 align-items-center">
                      <ReactStars
                        count={5}
                        size={24}
                        value={parseInt(prdtState?.totalRatings)}
                        edit={false}
                        activeColor="#ffd700"
                      />
                      <p className="mb-0">
                        Based on {ratingState?.length} Reviews
                      </p>
                    </div>
                  </div>
                </div>
                <div className="review-form px-3 py-3 pb-5">
                  <h5>Write a Review</h5>
                  <div>
                    <ReactStars
                      count={5}
                      size={24}
                      edit={true}
                      onChange={(e) => setStar(e)}
                    />
                  </div>
                  <div className="pb-4">
                    <textarea
                      name=""
                      id=""
                      className="w-100 form-control"
                      cols="30"
                      placeholder="Write a Review..."
                      rows="4"
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="pb-2">
                    <button
                      onClick={addRatingToProduct}
                      type="button"
                      className="button border-0"
                    >
                      Submit Review
                    </button>
                  </div>
                </div>
                <div className="reviews px-3 mt-3">
                  {prdtState?.ratings &&
                    prdtState?.ratings?.map((i, index) => {
                      return (
                        <div key={index} className="review">
                          <div className="d-flex gap-10 align-items-center">
                            <h6 className="mb-0">
                              {i?.postedBy?.firstName} {i?.postedBy?.lastName}
                            </h6>
                            <ReactStars
                              count={5}
                              size={20}
                              value={i?.star}
                              edit={false}
                              activeColor="#ffd700"
                            />
                          </div>
                          <p className="mt-1">{i?.comment}</p>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="feature-wrapper py-5">
        <div className="container-xxl">
          <h3 className="section-heading">You May Also Like</h3>
          <div className="row">
            <Slider {...settings5}>
              {similarProduct &&
                similarProduct?.map((prdt, idx) => {
                  return (
                    <>
                      <div className="item p-2">
                        <ProductCard product={prdt} />
                      </div>
                    </>
                  );
                })}
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
