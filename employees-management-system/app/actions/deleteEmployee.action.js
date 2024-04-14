import axios from "axios";

export const deleteEmployee = async (id) => {
  const token = sessionStorage.getItem("token");

  try {
    const result = await axios.delete(
      `http://localhost:4000/api/v1/employee/delete?id=${id}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return result.data.msg;
  } catch (error) {
    throw new Error(error.response.data.msg);
  }
};
