import axios from "axios";

export const getSingleEmployee = async (id) => {
  const token = sessionStorage.getItem("token");

  try {
    const result = await axios.get(
      `http://localhost:4000/api/v1/employee/get?id=${id}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return result.data;
  } catch (error) {
    throw new Error(error.response.data.msg);
  }
};
