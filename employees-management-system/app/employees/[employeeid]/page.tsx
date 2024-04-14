"use client";
import { useRouter } from "next/navigation";

import EmployeeCard from "@/app/componenets/employee/EmployeeCard";
import Navbar from "@/app/componenets/navbar/Navbar";
import toast, { Toaster } from "react-hot-toast";
import { isAuthenticated } from "@/app/utils/isAuthenticated";
import { useEffect, useState } from "react";
import { getSingleEmployee } from "@/app/actions/getSingleEmployee.action";
import { Employee } from "@/app/models/Employee";
const SingleEmployee = ({ params }: { params: { employeeid: string } }) => {
  const router = useRouter();
  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
    }
  }, []);
  const [employee, setEmployee] = useState<Employee | null>(null);
  const employeeId = params.employeeid;

  const getEmployee = async (employeeId: string) => {
    try {
      const result = await getSingleEmployee(employeeId);
      setEmployee(result.data);
      toast.success(result.msg);
    } catch (error: any) {
      if (error.message == "Validation error") {
        toast.error("Couldn't save employee");
      } else if (
        error.message == "Your session is not valid, you must be logged in!" ||
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

  useEffect(() => {
    if (employeeId) {
      getEmployee(employeeId as string);
    }
  }, [employeeId]);
  return (
    <>
      <Toaster position="top-center" />

      <Navbar />
      <div className="pt-9  ">
        {employee && (
          <EmployeeCard data={employee} isUpdate={true} disabled={false} />
        )}{" "}
      </div>
    </>
  );
};

export default SingleEmployee;
