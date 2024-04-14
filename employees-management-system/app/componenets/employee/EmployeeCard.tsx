"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Employee } from "@/app/models/Employee";
import Button from "../Button";
import InputField from "../Input";
import { useEffect, useState } from "react";
import { saveEmployee } from "@/app/actions/saveEmployee.action";
import toast from "react-hot-toast";
import EventEmitter from "@/app/utils/EventEmitter";
import Event from "@/app/events/event.js";
interface EmployeeCardProps {
  data: Employee;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ data }) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [department, setDepartment] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [picture, setPicture] = useState("");
  const [name, setName] = useState("");

  const [id, setId] = useState("");
  useEffect(() => {
    setDepartment(data.department);
    setEmail(data.email);
    setPicture(data.picture);
    setLocation(data.location);
    setJobTitle(data.jobTitle);
    setId(data.id);
    setName(data.name);
  }, [data]);

  const handleSave = async (e: any) => {
    e.preventDefault();
    const data = {
      id: id,
      name: name,
      location: location,
      email: email,
      department: department,
      jobTitle: jobTitle,
    };
    try {
      const result = await saveEmployee(data);
      Event.emit("RemoveEmployeeFromArray", id);
      toast.success(result);
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
  const handleDelete = async (e: any) => {
    e.preventDefault();

    try {
      Event.emit("RemoveEmployeeFromArray", id);
    } catch (error: any) {
      toast.error("Couldn't Delete employee");
    }
  };
  return (
    <div className="col-span-1 cursor-pointer group">
      <div className="border aspect-square w-full relative overflow-hidden rounded-x1">
        <Image
          fill
          alt="listing"
          src={picture}
          className="object-cover h-50 w-50 group-hover:scale-110 transition"
        />
      </div>
      <div className="font-semibold text-lg">
        <InputField
          id="name"
          type="name"
          value={name}
          label="Name"
          onChange={(e) => {
            setName(e.target.value);
            console.log(e.target.value);
          }}
        />
      </div>
      <div className="font-semibold text-lg">
        <InputField
          id="email"
          type="email"
          value={email}
          label="Email"
          onChange={(e) => {
            setEmail(e.target.value);
            console.log(e.target.value);
          }}
        />
      </div>
      <div className="font-semibold text-lg">
        {" "}
        <InputField
          id="jobTitle"
          type="text"
          value={jobTitle}
          label="Job Title"
          onChange={(e) => {
            setJobTitle(e.target.value);
          }}
        />
      </div>
      <div className="font-semibold text-lg">
        {" "}
        <InputField
          id="location"
          type="text"
          value={location}
          label="Location"
          onChange={(e) => {
            setLocation(e.target.value);
          }}
        />
      </div>
      <div className="font-light text-neutral-500">
        {" "}
        <InputField
          id="Department"
          type="text"
          value={department}
          label="department"
          onChange={(e) => {
            setDepartment(e.target.value);
          }}
        />
      </div>
      <div className="flex flex-row items-center gap-1">
        <Button onClick={handleSave} label="Save" />
        <Button onClick={handleDelete} label="Delete" />
      </div>
    </div>
  );
};

export default EmployeeCard;
