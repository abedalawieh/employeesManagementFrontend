import axios from "axios";

export const saveEmployee = async (data) => {
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
    const result = await axios.post(
      "http://localhost:4000/api/v1/employee/create",
      {
        employees: [data],
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
