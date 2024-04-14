import axios from "axios";

export const createEmployees = async (count) => {
  const departments = ["Engineering", "Sales", "Finance", "Marketing"];
  const jobTitles = ["Engineer", "Salesman", "Accountant", "Seller"];

  try {
    const result = await axios.get(
      `https://randomuser.me/api/?results=${String(count)}`
    );

    const employees = result.data.results.map((employee) => {
      const departmentIndex = getRandomIndex(departments.length);

      return {
        id: employee.login.uuid,
        picture: employee.picture.large,
        name: `${employee.name.title}. ${employee.name.first} ${employee.name.last}`,
        location: `${employee.location.street.number} ${employee.location.street.name}, ${employee.location.city}, ${employee.location.state}, ${employee.location.country}`,
        email: employee.email,
        department: departments[departmentIndex],
        jobTitle: jobTitles[departmentIndex],
      };
    });

    return employees;
  } catch (error) {
    throw new Error("Couldn't get Employees");
  }
};

function getRandomIndex(max) {
  return Math.floor(Math.random() * max);
}
