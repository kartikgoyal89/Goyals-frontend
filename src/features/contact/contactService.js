import axios from "axios";
import { config } from "../../utils/axiosConfig";

const postQuery = async (enqData) => {
  const response = await axios.post(
    `${import.meta.env.VITE_BASE_URL}enq/create`,
    enqData,
    config
  );

  return response.data;
};

const contactService = { postQuery };

export default contactService;
