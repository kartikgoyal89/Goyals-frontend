import React, { useState, useEffect } from "react";
import "./OurStore.css";
import BreadCrumb from "../../components/BreadCrumb/Breadcrumb";
import Meta from "../../components/Meta/Meta";
import ReactStars from "react-rating-stars-component";
import ProductCard from "../../components/ProductCard/ProductCard";
import Color from "../../components/Color/Color";
import FilterMenu from "../../components/FilterMenu/FilterMenu";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProducts,
  getAllCategories,
  getAllBrands,
} from "../../features/products/productSlice.js";

const OurStore = () => {
  const dispatch = useDispatch();
  const [grid, setGrid] = useState(4);
  const [filter, setFilter] = useState("closed");
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [colors, setColors] = useState([]);

  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [color, setColor] = useState(null);
  const [brand, setBrand] = useState(null);
  const [category, setCategory] = useState(null);
  const [tag, setTag] = useState(null);
  const [sort, setSort] = useState(null);

  const productState = useSelector((state) => state.product.products);
  const categoryState = useSelector((state) => state?.product?.categories);
  const brandState = useSelector((state) => state?.product?.brands);

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const breakpoint = 660;

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    dispatch(
      getAllProducts({ sort, tag, brand, category, minPrice, maxPrice })
    );
    dispatch(getAllCategories());
    dispatch(getAllBrands());
  }, [sort, tag, brand, category, minPrice, maxPrice]);

  return (
    <>
      <Meta title="Our Store" />
      <BreadCrumb title="Our Store" />

      <div className="store-wrapper py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-3 side-filter-tab">
              <div className="filter-card mb-3">
                <h3 className="filter-title mt-3">Shop By Categories</h3>
                <div>
                  <ul className="ps-0">
                    {categoryState &&
                      categoryState?.map((item, key) => {
                        return (
                          <li
                            onClick={() => setCategory(item?.title)}
                            className={
                              category === item?.title ? "title-active" : ""
                            }
                            style={{ fontSize: "15.6px" }}
                            key={key}
                          >
                            {item?.title}
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </div>
              <div className="filter-card mb-3">
                <h3 className="filter-title">Filter By</h3>
                <div>
                  <h5 className="sub-title">Price</h5>
                  <div className="d-flex align-items-center gap-10">
                    <div className="form-floating mb-3">
                      <input
                        type="number"
                        className="form-control"
                        id="floatingInput"
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
                        name="maxPrice"
                        onChange={(e) => setMaxPrice(e.target.value)}
                      />
                      <label htmlFor="floatingInput">To</label>
                    </div>
                  </div>

                  <h5 className="sub-title">Colors</h5>
                  <div className="d-flex flex-wrap">
                    <Color />
                  </div>
                </div>
              </div>

              <div className="filter-card mb-3">
                <h3 className="filter-title">Product Tags</h3>
                <div>
                  <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                    <span
                      className="badge bg-light text-secondary rounded-3 py-2 px-3"
                      onClick={() => setTag("special")}
                    >
                      Special
                    </span>
                    <span
                      className="badge bg-light text-secondary rounded-3 py-2 px-3"
                      onClick={() => setTag("popular")}
                    >
                      Popular
                    </span>
                    <span
                      className="badge bg-light text-secondary rounded-3 py-2 px-3"
                      onClick={() => setTag("featured")}
                    >
                      Featured
                    </span>
                  </div>
                </div>
              </div>

              <div className="filter-card mb-3">
                <h3 className="filter-title mt-3">Shop By Brands</h3>
                <ul className="ps-0">
                  {brandState &&
                    brandState?.map((item, key) => {
                      return (
                        <li
                          onClick={() => setBrand(item?.title)}
                          className={
                            brand === item?.title ? "brand-active" : ""
                          }
                          style={{ fontSize: "15.6px" }}
                          key={key}
                        >
                          {item?.title}
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
            <div className="col-9 product-layout">
              <div className="filter-sort-grid mb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center gap-10">
                    <p className="mb-0 text-nowrap sorting-tab">Sort By:</p>
                    <select
                      name=""
                      className="form-control form-select sorting-tab"
                      id=""
                      onChange={(e) => setSort(e.target.value)}
                    >
                      <option value="title">Alphabetically, A-Z</option>
                      <option value="-title">Alphabetically, Z-A</option>
                      <option value="price">Price, Low to High</option>
                      <option value="-price">Price, High to Low</option>
                      <option value="createdAt">Date, Old to New</option>
                      <option value="-createdAt">Date, New to Old</option>
                    </select>
                    <button
                      onClick={() => setFilter("open")}
                      className="responsive-filter-btn"
                    >
                      Filter & Sort
                    </button>
                  </div>
                  <div className="d-flex align-items-center gap-10 prdt-filter">
                    <p className="total-products">
                      {productState?.length} Products
                    </p>
                    <div className="d-flex gap-10 align-items-center grid">
                      <img
                        onClick={() => setGrid(3)}
                        src="/grid1.svg"
                        alt="grid"
                        className="d-block img-fluid"
                      />
                      <img
                        onClick={() => setGrid(4)}
                        src="/grid2.svg"
                        alt="grid"
                        className="d-block img-fluid"
                      />
                      <img
                        onClick={() => setGrid(6)}
                        src="/grid3.svg"
                        alt="grid"
                        className="d-block img-fluid"
                      />
                      <img
                        onClick={() => setGrid(12)}
                        src="/grid4.svg"
                        alt="grid"
                        className="d-block img-fluid"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <FilterMenu
                filter={filter}
                crossClicked={() => setFilter("closed")}
              />

              <div className="products-list pb-5">
                <div className="d-flex flex-wrap gap-10">
                  {productState?.length === 0 ? (
                    <>
                      <div className="w-100 d-flex flex-column align-items-center justify-content-center">
                        <img
                          width="400px"
                          src="/search_not_found.png"
                          alt="not_found"
                        />
                        <h4>No Products Found</h4>
                      </div>
                    </>
                  ) : (
                    productState &&
                    productState?.map((prdt, key) => {
                      return <ProductCard grid={grid} product={prdt} />;
                    })
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurStore;
