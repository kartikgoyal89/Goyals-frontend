import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import "./filterMenu.css";
import { BsArrowRight } from "react-icons/bs";
import { GoArrowLeft } from "react-icons/go";
import Color from "../../components/Color/Color";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProducts,
  getAllCategories,
  getAllBrands,
} from "../../features/products/productSlice.js";

const FilterMenu = (props) => {
  const dispatch = useDispatch();
  const productState = useSelector((state) => state?.product?.products);
  const categoryState = useSelector((state) => state?.product?.categories);
  const brandState = useSelector((state) => state?.product?.brands);

  const [sidefilter, setSideFilter] = useState("closed");
  const [showFilter, setShowFilter] = useState(1);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [brand, setBrand] = useState(null);
  const [category, setCategory] = useState(null);
  const [tag, setTag] = useState(null);
  const [sort, setSort] = useState(null);

  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllBrands());
  }, []);

  const handleFilter = () => {
    dispatch(
      getAllProducts({ sort, tag, brand, category, minPrice, maxPrice })
    );
  };

  const clearFilter = () => {
    setMinPrice(null);
    setMaxPrice(null);
    setBrand(null);
    setCategory(null);
    setTag(null);
    setSort(null);
    dispatch(
      getAllProducts({ sort, tag, brand, category, minPrice, maxPrice })
    );
  };

  return (
    <>
      <div className={`filter-menu  ${props.filter} `}>
        <div className="filter-container">
          <div className="heading position-relative ">
            <RxCross2 onClick={props.crossClicked} className="cross" />
            <div className="d-flex flex-column gap--5 align-items-center">
              <h3 className="mb-0">Filter And Sort</h3>
              <p className="mb-0">{productState?.length} Products</p>
            </div>
          </div>
          <hr className="hr" />
          <div className="list">
            <ul>
              <Link>
                <button
                  onClick={() => {
                    setSideFilter("open"), setShowFilter(1);
                  }}
                >
                  <h3>Category</h3>
                  <BsArrowRight />
                </button>
              </Link>
              <Link>
                <button
                  onClick={() => {
                    setSideFilter("open"), setShowFilter(2);
                  }}
                >
                  <h3>Price</h3>
                  <BsArrowRight />
                </button>
              </Link>
              <Link>
                <button
                  onClick={() => {
                    setSideFilter("open"), setShowFilter(3);
                  }}
                >
                  <h3>Brand</h3>
                  <BsArrowRight />
                </button>
              </Link>
              <Link>
                <button
                  onClick={() => {
                    setSideFilter("open"), setShowFilter(4);
                  }}
                >
                  <h3>Tags</h3>
                  <BsArrowRight />
                </button>
              </Link>

              <Link>
                <button>
                  <h3>Sort by: </h3>
                  <select
                    name=""
                    onChange={(e) => setSort(e.target.value)}
                    className="form-control form-select"
                    id=""
                  >
                    <option value="title">Alphabetically, A-Z</option>
                    <option value="-title">Alphabetically, Z-A</option>
                    <option value="price">Price, Low to High</option>
                    <option value="-price">Price, High to Low</option>
                    <option value="createdAt">Date, Old to New</option>
                    <option value="-createdAt">Date, New to Old</option>
                  </select>
                </button>
              </Link>
            </ul>
          </div>
          <div className={`side-filter-page ${sidefilter}`}>
            {showFilter === 1 && (
              <>
                <p className="px-3 pt-3 mb-3">
                  <GoArrowLeft
                    className="me-2 fs-4 cursor-pointer"
                    onClick={() => setSideFilter("closed")}
                  />
                  Category
                </p>
                <div className="px-2">
                  {categoryState?.map((item, key) => {
                    return (
                      <div
                        onClick={() => setCategory(item?.title)}
                        className="form-check mt-1 mb-1"
                      >
                        <label
                          className="form-check-label cursor-pointer"
                          style={
                            category === item?.title
                              ? { color: "#000", fontWeight: "500" }
                              : { color: "#777" }
                          }
                        >
                          {item?.title}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
            {showFilter === 2 && (
              <>
                <p className="px-3 pt-3 mb-2">
                  <GoArrowLeft
                    className="me-2 fs-4 cursor-pointer"
                    onClick={() => setSideFilter("closed")}
                  />
                  Price
                </p>

                <div className="d-flex align-items-center gap-10 px-3 pt-4">
                  <div className="form-floating mb-3">
                    <input
                      type="number"
                      className="form-control"
                      id="floatingInput"
                      min={0}
                      placeholder="From"
                      name="minPrice"
                      onChange={(e) => setMinPrice(e.target.value)}
                    />
                    <label htmlFor="floatingInput">From</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="number"
                      className="form-control"
                      id="floatingInput1"
                      placeholder="To"
                      max={500}
                      name="maxPrice"
                      onChange={(e) => setMaxPrice(e.target.value)}
                    />
                    <label htmlFor="floatingInput">To</label>
                  </div>
                </div>
              </>
            )}
            {showFilter === 3 && (
              <>
                <p className="p-3 pb-0">
                  <GoArrowLeft
                    className="me-2 fs-4 cursor-pointer"
                    onClick={() => setSideFilter("closed")}
                  />
                  Brand
                </p>
                <div className="color-pallete">
                  <div className="px-2">
                    {brandState?.map((item, key) => {
                      return (
                        <div
                          className={`form-check mt-1 mb-1 ${
                            brand === item?.title ? "brand-active" : ""
                          }`}
                          onClick={() => setBrand(item?.title)}
                        >
                          <label
                            className="form-check-label cursor-pointer"
                            style={
                              brand === item?.title
                                ? { color: "#000", fontWeight: "500" }
                                : { color: "#777" }
                            }
                          >
                            {item?.title}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
            {showFilter === 4 && (
              <>
                <p className="p-3 pb-0">
                  <GoArrowLeft
                    className="me-2 fs-4 cursor-pointer"
                    onClick={() => setSideFilter("closed")}
                  />
                  Tags
                </p>
                <div className="px-2">
                  <div className="form-check pb-1">
                    <label
                      className="form-check-label cursor-pointer"
                      style={
                        tag === "featured"
                          ? { color: "#000", fontWeight: "500" }
                          : { color: "#777" }
                      }
                      onClick={() => setTag("featured")}
                    >
                      Featured
                    </label>
                  </div>
                  <div className="form-check pb-1">
                    <label
                      className="form-check-label cursor-pointer"
                      style={
                        tag === "special"
                          ? { color: "#000", fontWeight: "500" }
                          : { color: "#777" }
                      }
                      onClick={() => setTag("special")}
                    >
                      Special
                    </label>
                  </div>
                  <div className="form-check pb-1">
                    <label
                      className="form-check-label cursor-pointer"
                      style={
                        tag === "popular"
                          ? { color: "#000", fontWeight: "500" }
                          : { color: "#777" }
                      }
                      onClick={() => setTag("popular")}
                    >
                      Popular
                    </label>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="filter-btn">
          <button className="button" onClick={clearFilter}>
            Clear
          </button>
          <button className="button" onClick={handleFilter}>
            Apply
          </button>
        </div>
      </div>
    </>
  );
};

export default FilterMenu;
