"use client";

import { BiSearch } from "react-icons/bi";
import InputField from "../Input";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

const Search = () => {
  const [name, setName] = useState("");
  const pathname = usePathname();

  const [location, setLocation] = useState("");
  const [jobTitle, setjobTitle] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const [prevQuery, setPrevQuery] = useState("");

  return (
    <div className=" border-[1-px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer">
      <div className="flex flex-row items-center justify-between ">
        <div className="text-sm font-semibold px-6">
          <InputField
            id="name"
            placeHolder="Search By name"
            type="text"
            onChange={(e) => {
              setName(e.target.value);
              const queryString = createQueryString("n", e.target.value);
              router.push(pathname + "?" + queryString);
            }}
          />
        </div>
        <div className="text-sm font-semibold px-6">
          <InputField
            id="location"
            placeHolder="Search By location"
            type="text"
            onChange={(e) => {
              setLocation(e.target.value);
              const queryString = createQueryString("l", e.target.value);
              router.push(pathname + "?" + queryString);
            }}
          />
        </div>
        <div className="text-sm font-semibold px-6">
          {" "}
          <InputField
            id="jobTitle"
            placeHolder="Search By job title"
            type="text"
            onChange={(e) => {
              setjobTitle(e.target.value);
              const queryString = createQueryString("j", e.target.value);
              router.push(pathname + "?" + queryString);
            }}
          />
        </div>

        <div className="text-sm font-semibold px-6">
          <BiSearch size={18} />
        </div>
      </div>
    </div>
  );
};

export default Search;
