import React, { useEffect } from "react";
import "./singleBlog.css";
import Meta from "../../components/Meta/Meta";
import BreadCrumb from "../../components/BreadCrumb/Breadcrumb";
import BlogCard from "../../components/BlogCard/BlogCard";
import { Link } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getABlog } from "../../features/blogs/blogSlice.js";
import toast from "react-hot-toast";

const SingleBlog = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const getBlogId = location.pathname.split("/")[2];

  useEffect(() => {
    if (getBlogId !== undefined) {
      dispatch(getABlog(getBlogId));
    }
  }, [getBlogId]);

  const blogState = useSelector((state) => state.blog.blogInfo);

  return (
    <>
      <Meta title={`${blogState?.title}`} />
      <BreadCrumb title={`${blogState?.title}`} />
      <div className="single-blog-wrapper py-3">
        <div className="container-xxl">
          <div className="blog-container">
            <div className="col-12">
              <div className="single-blog-card">
                <Link to="/blog" className="w-30 mb-2">
                  <GoArrowLeft className="fs-5 me-2" />
                  Go Back to Blogs
                </Link>
                <h3 className="title ">{blogState?.title}</h3>
                <div className="blog-img">
                  <img
                    className="img-fluid"
                    src={
                      blogState?.images
                        ? blogState?.images[0]?.url
                        : blogState?.image
                    }
                    alt=""
                  />
                </div>
                <p
                  className="desc"
                  dangerouslySetInnerHTML={{ __html: blogState?.description }}
                ></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleBlog;
