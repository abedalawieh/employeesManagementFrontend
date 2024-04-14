"use client";
import Image from "next/image";
import Navbar from "./componenets/navbar/Navbar";
import toast, { Toaster } from "react-hot-toast";
import { isAuthenticated } from "@/app/utils/isAuthenticated";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { get } from "@/app/actions/getEmployees.action.js";
import { Employee } from "./models/Employee";
import EmployeeCard from "./componenets/employee/EmployeeCard";
import EventEmitter from "@/app/utils/EventEmitter";
import Event from "@/app/events/event.js";

export default function Home() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const router = useRouter();
  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
    }
  }, []);
  useEffect(() => {
    Event.addListener("UpdateEmployeeFromArray", (data) => {
      setEmployees((prevEmployees) =>
        prevEmployees.map((employee) =>
          employee.id === data.id ? { ...employee, ...data } : employee
        )
      );
    });
  }, [employees]);
  useEffect(() => {
    Event.addListener("RemoveEmployeeFromArrayAtHomePage", (id) => {
      const newEmployees = employees.filter((employee) => employee.id !== id);
      setEmployees(newEmployees);
    });
  }, [employees]);
  useEffect(() => {
    const getEmployees = async () => {
      try {
        const result = await get();
        console.log(result.data);
        setEmployees(result.data);
      } catch (error: any) {
        if (error.message == "Validation error") {
          toast.error("Couldn't save employee");
        } else if (
          error.message ==
            "Your session is not valid, you must be logged in!" ||
          error.message == "Your session has expired, please login again"
        ) {
          await toast.error(error.message);
          await sessionStorage.removeItem("token");
          await router.push("/login");
        } else {
          await toast.error(error.message);
        }
      }
    };
    getEmployees();
  }, []);
  return (
    <>
      {" "}
      <Toaster position="top-center" />
      <Navbar />
      <div className="pt-20 mt-25">
        <div className="pt-40 pb-40 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {employees.map((employee: any) => {
            return <EmployeeCard data={employee} disabled={true} />;
          })}
        </div>
      </div>
    </>
  );
}
