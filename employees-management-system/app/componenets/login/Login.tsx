"use client";
import InputField from "../Input";
import Button from "../Button";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/app/actions/login.action.js";
import { isAuthenticated } from "@/app/utils/isAuthenticated";

import toast from "react-hot-toast";
export default function Login() {
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated()) {
      router.push("/");
    }
  }, []);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      const result = await login(email, password);
      sessionStorage.setItem("token", result.data.data.token);
      toast.success(result.data.msg);
      router.push("/");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-gray-100">
      <div className="w-full p-6 justify-center bg-white rounded-md shadow-md lg:max-w-xl">
        <Image
          className="mx-auto"
          src="/images/logo.png"
          height={100}
          width={300}
          alt="image"
        />
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <InputField
              id="email"
              label="Email"
              type="email"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="mb-4">
            <InputField
              id="password"
              label="Password"
              type="password"
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <div className="mt-2">
            <Button label="Login" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
}
