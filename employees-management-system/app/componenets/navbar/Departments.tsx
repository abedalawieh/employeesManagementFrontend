"use client";

import { MdEngineering, MdOutlineAttachMoney, MdSell } from "react-icons/md";
import Container from "../Container";
import DepartmentBox from "../DepartmentBox";
import { FaPeopleGroup } from "react-icons/fa6";

import { usePathname, useSearchParams } from "next/navigation";

export const departments = [
  {
    label: "Engineering",
    icon: MdEngineering,
  },
  {
    label: "Finance",
    icon: MdOutlineAttachMoney,
  },
  {
    label: "Sales",
    icon: MdSell,
  },
  {
    label: "Marketing",
    icon: FaPeopleGroup,
  },
];
const Departments = () => {
  const params = useSearchParams();
  const department = params?.get("department");
  const pathName = usePathname();
  const isMainPage = pathName === "/";
  if (!isMainPage) {
    return null;
  }
  return (
    <Container>
      <div className=" pt-4  flex flex-row  items-center justify-center overflow-x-auto">
        {departments.map((item) => (
          <DepartmentBox
            key={item.label}
            label={item.label}
            selected={department === item.label}
            icon={item.icon}
          />
        ))}
      </div>
    </Container>
  );
};

export default Departments;
