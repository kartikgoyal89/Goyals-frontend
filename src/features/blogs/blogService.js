import axios from "axios";

const getBlogs = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_BASE_URL}blog/all-blogs`
  );

  return response.data;
};

const getSingleBlog = async (id) => {
  const response = await axios.get(
    `${import.meta.env.VITE_BASE_URL}blog/${id}`
  );

  return response.data;
};

const blogService = { getBlogs, getSingleBlog };

export default blogService;
