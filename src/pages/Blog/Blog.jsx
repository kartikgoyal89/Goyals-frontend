import React, { useEffect } from "react";
import Meta from "../../components/Meta/Meta";
import BreadCrumb from "../../components/BreadCrumb/Breadcrumb";
import "./blog.css";
import BlogCard from "../../components/BlogCard/BlogCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../../features/blogs/blogSlice.js";

const Blog = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBlogs());
  }, []);

  const blogState = useSelector((state) => state.blog.blogs);
  console.log(blogState);

  return (
    <>
      <Meta title={"Blogs"} />
      <BreadCrumb title="Blogs" />
      <div className="main-blog-wrapper py-3">
        <div className="container-xxl">
          <div className="row d-flex flex-wrap align-items-center justify-content-center">
            <div className="col-12">
              <div className="row d-flex flex-wrap align-items-center blog-card-container">
                {blogState?.map((blog, key) => {
                  return (
                    <div className="col-6" key={key}>
                      <BlogCard
                        id={blog?._id}
                        title={blog?.title}
                        image={blog?.images[0]?.url}
                        desc={blog?.description}
                        date={blog?.createdAt}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
