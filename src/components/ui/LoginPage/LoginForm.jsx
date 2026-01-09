"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from 'next/navigation'

const LoginForm = () => {
  const router = useRouter()
  const { login } = useAuth();
  const handleSubmit = (e) => {
    e.preventDefault();
    login();
    router.push("/admin");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="md:w-1/2 w-full flex flex-col justify-center p-8 bg-base-dark"
    >
      <p className="lg:text-4xl text-2xl font-bold mt-2">مرحبًا بعودتك</p>
      <p className="text-base text-brandColor font-semibold mb-6  mt-4">
        من فضلك أدخل بياناتك للوصول إلى لوحة التحكم الخاصة بك.
      </p>

      <label className="text-base font-semibold text-base-light mt-4">
        البريد الإلكتروني
      </label>
      <div className="w-full border border-brandColor rounded mt-2 p-2 gap-2 items-center flex">
        <Image
          src="/assets/Email.png"
          width={17}
          height={17}
          className="object-contain"
          alt="Lock Icon"
        />
        <input
          placeholder="name@barbershop.com"
          className="flex-1 outline-none placeholder:text-brandColor"
        />
      </div>
      <div className="flex justify-between mt-2 w-full text-base font-semibold items-center">
        <label className="text-base-light ">كلمة المرور</label>
        <Link href="/forget-password" className="text-brandColor">
          نسيت كلمة المرور؟
        </Link>
      </div>
      <div className="w-full flex items-center border border-brandColor rounded gap-2 p-2 mt-2">
        <Image
          src="/assets/Lock.png"
          width={17}
          height={17}
          className="object-contain"
          alt="Lock Icon"
        />
        <input
          type="password"
          placeholder="أدخل كلمة المرور"
          className="flex-1 outline-none placeholder:text-brandColor bg-transparent"
        />
      </div>

      <button
        type="submit"
        className="bg-brandColor text-base-light font-bold py-2 px-4 rounded mt-4 hover:opacity-90 transition"
      >
        تسجيل الدخول
      </button>
      <div className="mt-10 border border-borderColorv3" />
      <p className="mt-4 text-sm text-center ite">
        ليس لديك حساب بعد؟
        <a href="/register-shop" className="text-brandColor font-semibold">
          سجّل متجرك
        </a>
      </p>
    </form>
  );
};

export default LoginForm;
