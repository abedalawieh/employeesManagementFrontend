import axios from "axios";

export const updateEmployee = async (data) => {
  const departments = ["Engineering", "Sales", "Finance", "Marketing"];
  const jobTitles = ["Engineer", "Salesman", "Accountant", "Seller"];

  if (
    !departments.includes(data.department) ||
    !jobTitles.includes(data.jobTitle)
  ) {
    throw new Error("Invalid department or job title");
  }

  const token = sessionStorage.getItem("token");

  try {
    const result = await axios.put(
      `http://localhost:4000/api/v1/employee/update?id=${data.id}`,
      {
        data: data,
      },
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
