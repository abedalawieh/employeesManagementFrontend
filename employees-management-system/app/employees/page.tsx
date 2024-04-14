"use client";
import { createEmployees } from "@/app/actions/createEmployees.action.js";
import { useState } from "react";
import InputField from "../componenets/Input";
import Button from "../componenets/Button";
import Navbar from "../componenets/navbar/Navbar";
import EmployeeCard from "../componenets/employee/EmployeeCard";
import { isAuthenticated } from "@/app/utils/isAuthenticated";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Container } from "postcss";
import { Toaster } from "react-hot-toast";
import EventEmitter from "@/app/utils/EventEmitter";
import Event from "@/app/events/event.js";
import { Employee } from "../models/Employee";

const EmployeesPage = () => {
  const router = useRouter();
  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
    }
  }, []);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [count, setCount] = useState(0);

  const getEmployees = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const result = await createEmployees(count);
      setEmployees(result);
    } catch (error: any) {
      console.error("Error fetching employees:", error.message);
    }
  };
  useEffect(() => {
    Event.addListener("RemoveEmployeeFromArray", (id) => {
      const newEmployees = employees.filter((employee) => employee.id !== id);
      setEmployees(newEmployees);
    });
  }, [employees]);

  return (
    <>
      <Toaster position="top-center" />

      <Navbar />
      <div className="pt-20">
        {" "}
        {/* Add padding top to create space for the navbar */}
        <form className="mt-10" onSubmit={getEmployees}>
          <div className="pt-10">
            <InputField
              id="count"
              label=" Enter the number of employees you need"
              type="number"
              onChange={(e) => setCount(Number(e.target.value))}
            />
            <Button label="Get Employees" type="submit" />{" "}
          </div>
        </form>
        <div className="pt-1  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {employees.map((employee: any) => {
            return <EmployeeCard data={employee} />;
          })}
        </div>
      </div>
    </>
  );
};

export default EmployeesPage;
