"use client";
import Image from "next/image";
import Navbar from "./componenets/navbar/Navbar";
import toast, { Toaster } from "react-hot-toast";
import { isAuthenticated } from "@/app/utils/isAuthenticated";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
    }
  }, []);
  return (
    <>
      {" "}
      <Toaster position="top-center" />
      <Navbar />
    </>
  );
}
