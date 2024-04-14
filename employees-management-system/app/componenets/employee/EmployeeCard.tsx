import Image from "next/image";
import Button from "../Button";
import InputField from "../Input";
import { useEffect, useState } from "react";
import { saveEmployee } from "@/app/actions/saveEmployee.action";
import { deleteEmployee } from "@/app/actions/deleteEmployee.action";
import { updateEmployee } from "@/app/actions/updateEmployee.action";

import toast from "react-hot-toast";
import EventEmitter from "@/app/utils/EventEmitter";
import Event from "@/app/events/event.js";
import { Employee } from "@/app/models/Employee";
import { useRouter } from "next/navigation";

interface EmployeeCardProps {
  data: Employee;
  disabled?: boolean;
  isUpdate?: boolean;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({
  data,
  disabled,
  isUpdate,
}) => {
  const router = useRouter();
  const [email, setEmail] = useState(data.email);
  const [location, setLocation] = useState(data.location);
  const [department, setDepartment] = useState(data.department);
  const [jobTitle, setJobTitle] = useState(data.jobTitle);
  const [picture, setPicture] = useState(data.picture);
  const [name, setName] = useState(data.name);
  const [id, setId] = useState(data.id);

  useEffect(() => {
    setEmail(data.email);
    setLocation(data.location);
    setDepartment(data.department);
    setJobTitle(data.jobTitle);
    setPicture(data.picture);
    setName(data.name);
    setId(data.id);
  }, [data]);

  const handleSave = async (e: any) => {
    e.preventDefault();
    const employeeData = {
      id: id,
      name: name,
      location: location,
      email: email,
      department: department,
      jobTitle: jobTitle,
      picture: picture,
    };
    toast((t) => (
      <div className=" relative flex flex-col items-center justify-between  overflow-hidden bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <p className="mb-4">Are you sure you want to save?</p>
          <div className="flex justify-center">
            <button
              onClick={async () => {
                try {
                  const result = await saveEmployee(employeeData);
                  Event.emit("RemoveEmployeeFromArray", id);

                  toast.success(result);
                } catch (error: any) {
                  handleError(error);
                }
                toast.dismiss(t.id);
              }}
              className="px-4 py-2 bg-green-600 text-white rounded mr-2 hover:bg-red-600"
            >
              Yes
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              No
            </button>
          </div>
        </div>
      </div>
    ));
  };
  const updateCurrentEmployee = async (e: any) => {
    e.preventDefault();
    const employeeData = {
      id: id,
      name: name,
      location: location,
      email: email,
      department: department,
      jobTitle: jobTitle,
    };
    toast((t) => (
      <div className=" relative flex flex-col items-center justify-between  overflow-hidden bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <p className="mb-4">Are you sure you want to update?</p>
          <div className="flex justify-center">
            <button
              onClick={async () => {
                try {
                  const result = await updateEmployee(employeeData);
                  Event.emit("UpdateEmployeeFromArray", employeeData);
                  toast.success(result);
                  router.push("/");
                } catch (error: any) {
                  handleError(error);
                }
                toast.dismiss(t.id);
              }}
              className="px-4 py-2 bg-yellow-600 text-white rounded mr-2 hover:bg-red-600"
            >
              Yes
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              No
            </button>
          </div>
        </div>
      </div>
    ));
  };
  const handleError = async (error: any) => {
    if (error.message === "Validation error") {
      toast.error("Couldn't save employee");
    } else if (
      error.message === "Your session is not valid, you must be logged in!" ||
      error.message === "Your session has expired, please login again"
    ) {
      await toast.error(error.message);
      await sessionStorage.removeItem("token");
      await router.push("/login");
    } else {
      await toast.error(error.message);
    }
  };

  const handleDelete = async (e: any) => {
    e.preventDefault();
    toast((t) => (
      <div className=" relative flex flex-col items-center justify-between  overflow-hidden bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <p className="mb-4">Are you sure you want to delete?</p>
          <div className="flex justify-center">
            <button
              onClick={async () => {
                try {
                  disabled
                    ? await deleteFunction(e)
                    : await defaultDeleteFunction(e);
                } catch (error: any) {
                  handleError(error);
                }
                toast.dismiss(t.id);
              }}
              className="px-4 py-2 bg-red-600 text-white rounded mr-2 hover:bg-red-600"
            >
              Yes
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              No
            </button>
          </div>
        </div>
      </div>
    ));
  };
  const deleteFunction = async (e: any) => {
    e.preventDefault();
    try {
      const result = await deleteEmployee(id);
      Event.emit("RemoveEmployeeFromArrayAtHomePage", id);
      toast.success(result);
    } catch (error: any) {
      handleError(error);
    }
  };
  const defaultDeleteFunction = async (e: any) => {
    Event.emit("RemoveEmployeeFromArray", id);
  };

  const handleUpdate = async (e: any) => {
    e.preventDefault();

    router.push(`employees/${id}`);
  };

  return (
    <div className="col-span-1 cursor-pointer group">
      {isUpdate ? (
        <div className="">
          <Image
            width={500}
            height={100}
            alt="listing"
            src={picture}
            className="mx-auto transition"
          />
        </div>
      ) : (
        <div className="border aspect-square w-full relative overflow-hidden rounded-x1">
          <Image
            fill
            alt="listing"
            src={picture}
            className="object-cover h-50 w-50 group-hover:scale-110 transition"
          />
        </div>
      )}

      <div className="font-semibold text-lg">
        <InputField
          id="name"
          type="name"
          value={name}
          disabled={disabled}
          label="Name"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="font-semibold text-lg">
        <InputField
          id="email"
          type="email"
          value={email}
          disabled={disabled}
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="font-semibold text-lg">
        <InputField
          id="jobTitle"
          type="text"
          disabled={disabled}
          value={jobTitle}
          label="Job Title"
          onChange={(e) => setJobTitle(e.target.value)}
        />
      </div>
      <div className="font-semibold text-lg">
        <InputField
          id="location"
          type="text"
          disabled={disabled}
          value={location}
          label="Location"
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div className="font-light text-neutral-500">
        <InputField
          id="Department"
          type="text"
          disabled={disabled}
          value={department}
          label="Department"
          onChange={(e) => setDepartment(e.target.value)}
        />
      </div>
      <div className="flex flex-row items-center gap-1">
        {isUpdate ? (
          <Button onClick={updateCurrentEmployee} label="Update" />
        ) : disabled ? (
          <>
            {" "}
            <Button onClick={handleUpdate} label="Update" />
            <Button onClick={handleDelete} label="Delete" />
          </>
        ) : (
          <>
            {" "}
            <Button onClick={handleSave} label="Save" />
            <Button onClick={handleDelete} label="Delete" />
          </>
        )}
      </div>
    </div>
  );
};

export default EmployeeCard;
