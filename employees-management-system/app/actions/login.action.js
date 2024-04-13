import axios from "axios";
const adminLoginRoute = "/admin/login";
export const login = async (email, password) => {
  try {
    const result = await axios.post(
      "http://localhost:4000/api/v1" + adminLoginRoute,
      {
        email: email,
        password: password,
      }
    );
    return result;
  } catch (error) {
    throw new Error(error.response.data.msg);
  }
};
