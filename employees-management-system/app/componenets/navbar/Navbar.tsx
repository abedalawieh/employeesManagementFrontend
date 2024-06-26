"use client";

import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import AdminMenu from "./AdminMenu";
import Departments from "./Departments";

const Navbar = () => {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm ">
      <div className=" py-4 border-b-[1-px]">
        <Container>
          <div className=" flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <AdminMenu />
          </div>{" "}
        </Container>
      </div>
      <Departments />
    </div>
  );
};

export default Navbar;
