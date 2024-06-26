"use client";
import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import MenuItem from "./MenuItem";
import { useRouter } from "next/navigation";

const AdminMenu = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);
  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div className="hidden md:block sm:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
          Employees Management System
        </div>
        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursror-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
        </div>
      </div>
      {isOpen && (
        <div className="absolute rouded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm ">
          <div className="flex flex-col cursor-pointer">
            <>
              <MenuItem
                onClick={() => {
                  router.push("/");
                }}
                label="Home"
              />
              <MenuItem
                onClick={() => {
                  router.push("/employees");
                }}
                label="Add Employees "
              />
              <MenuItem
                onClick={async () => {
                  await sessionStorage.removeItem("token");
                  router.push("/login");
                }}
                label="Logout "
              />
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMenu;
