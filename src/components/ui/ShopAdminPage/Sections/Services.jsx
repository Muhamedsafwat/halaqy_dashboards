"use client";
import React, { useState } from "react";
import Header from "@/components/shared/Header/Header";
import Haircuts from "@/components/ui/ShopAdminPage/TapContent/Haircuts";
import Beards from "@/components/ui/ShopAdminPage/TapContent/Beards";
import Combos from "@/components/ui/ShopAdminPage/TapContent/Combos";
import Packages from "@/components/ui/ShopAdminPage/TapContent/Packages";
import ShopFooter from "@/components/shared/Footer/ShopFooter";
import Image from "next/image";

const Services = () => {
  const pages = [
    { label: "قصّات الشعر", component: <Haircuts /> },
    { label: "اللِحى", component: <Beards /> },
    { label: "العروض المجمّعة", component: <Combos /> },
    { label: "الباقات", component: <Packages /> },
  ];
  const images = [
    "/assets/BackgroundOne.png",
    "/assets/BackgroundTwo.png",
    "/assets/BackgroundThree.png",
    "/assets/BackgroundFour.png",
    "/assets/BackgroundFive.png",
  ];
  const [active, setActive] = useState(0);

  return (
    <div className="h-screen flex flex-col">
      <Header pageTitle={"الخدمات والمعرض"} />
      <div className="text-base-light container mt-4">
        <div className="flex w-full justify-between items-start gap-10">
          <div className="flex-col justify-center w-1/2 items-center gap-2">
            <div className="flex justify-between w-full">
              <div className="flex flex-col justify-center items-cenetr">
                <p className="text-2xl font-bold">قائمة الخدمات</p>
                <p className="text-base text-base-light/80 font-medium">
                  إدارة الأسعار وتفاصيل الخدمات الخاصة بك.
                </p>
              </div>
              <button className="flex font-bold rounded-xl px-4 bg-brandColor text-base-dark justify-center gap-2 items-center">
                اضف خدمة
                <span>+</span>
              </button>
            </div>
            <div className="relative flex gap-6 border-b border-brandColor my-4">
              {pages.map((page, index) => (
                <button
                  key={index}
                  onClick={() => setActive(index)}
                  className={`relative pb-3 text-sm transition-colors duration-200
            ${
              active === index
                ? "text-brandColor"
                : "text-base-light hover:text-brandColor"
            }`}
                >
                  {page.label}

                  <span
                    className={`absolute left-0 -bottom-px h-[3px] w-full rounded-full bg-brandColor transition-all duration-300
              ${active === index ? "opacity-100" : "opacity-0"}
            `}
                  />
                </button>
              ))}
            </div>
            <div className="mt-4 w-full">{pages[active].component}</div>
          </div>
          <div className="flex flex-col justify-center items-center gap-2 w-1/2">
            <div className="flex justify-between text-base-light w-full mt-4 p-4">
              <div className="flex flex-col gap-1">
                <p className="text-lg font-bold">معرض المتجر</p>
                <p className="text-sm text-base-light/80">
                  اسحب الصور وأفلتها أو تصفح لتحميل الصور.
                </p>
              </div>

              <div className="flex items-center">
                <span className="text-brandColor font-semibold cursor-pointer hover:underline">
                  عرض المعرض العام
                </span>
              </div>
            </div>
            <div className="w-full h-44 border-2 border-dashed border-gray-400 rounded-md flex flex-col items-center justify-center gap-1 cursor-pointer relative">
              <input
                type="file"
                accept=".svg, .png, .jpg, .jpeg, .gif"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />

              <div className="w-6 h-6 relative">
                <Image
                  src="/assets/Upload.png"
                  alt="Upload"
                  fill
                  className="object-contain"
                />
              </div>

              <div className="text-xs text-center text-base-light/80 leading-tight">
                اضغط للتحميل أو اسحب وأفلت
                <br />
                SVG، PNG، JPG أو GIF (أقصى حجم 3MB)
              </div>
            </div>
            <div className="flex flex-wrap justify-center items-center mt-2 gap-4">
              {images.map((src, index) => (
                <div
                  key={index}
                  className="w-44 h-44 relative rounded-md overflow-hidden cursor-pointer"
                >
                  <Image
                    src={src}
                    alt={`Background ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-auto">
        <ShopFooter />
      </div>
    </div>
  );
};

export default Services;
