import React from "react";
import { Link } from "react-router-dom";
import "./blogcard.css";
import { useDispatch } from "react-redux";
import { getABlog } from "../../features/blogs/blogSlice.js";

const BlogCard = (props) => {
  const { id, title, desc, image, createdAt } = props;
  return (
    <div className="blog-card">
      <div className="card-image" style={{ width: "100%" }}>
        <img
          src={image ? image : "/blog1.jpg"}
          className="img-fluid"
          alt="blog-img"
          style={{ width: "100%", height: "350px", objectFit: "cover" }}
        />
      </div>
      <div className="blog-content">
        <p className="date">{createdAt ? createdAt : "11 June 2024"}</p>
        <h5 className="title">{title}</h5>
        <p
          className="desc mb-0"
          dangerouslySetInnerHTML={{ __html: desc?.substr(0, 120) + "..." }}
        ></p>
        <Link to={`/blog/${id}`} className="button">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
