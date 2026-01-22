import React from "react";
import LoginForm from "@/components/ui/LoginPage/LoginForm"
import Image from "next/image";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-base-dark text-base-light p-4">
      <div className="flex md:flex-row flex-col border-2 border-borderColorv2 rounded-lg overflow-hidden max-w-5xl w-full">
        <div className="relative md:w-1/2 w-full h-96 md:h-auto">
          <Image
            fill
            src="/assets/Image.png"
            className="object-cover brightness-50"
            alt="صورة توضيحية"
          />
          <div className="absolute inset-0 flex flex-col justify-end items-start p-6">
            <p className="text-2xl font-bold">إدارة متجرك بكل سهولة</p>
            <p className="text-base-light/90 text-base font-semibold">
              نظّم المواعيد والمخزون وإدارة الموظفين في مكان واحد.
            </p>
          </div>
        </div>

        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
