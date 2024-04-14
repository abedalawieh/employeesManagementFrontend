import axios from "axios";

export const get = async () => {
  const token = sessionStorage.getItem("token");

  try {
    const result = await axios.post(
      "http://localhost:4000/api/v1/employee/get",
      {},

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return result.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response.data.msg);
  }
};
