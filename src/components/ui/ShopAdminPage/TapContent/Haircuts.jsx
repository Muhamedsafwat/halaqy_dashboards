"use client";
import Image from "next/image";
import React from "react";

const Haircuts = () => {
  const servicesData = [
    {
      icon: "/assets/Beard.png",
      name: "تقليم اللحية وتحديدها",
      price: 20.0,
      duration: "15 دقيقة",
      status: "نشط",
    },
    {
      icon: "/assets/Class.png",
      name: "قص الشعر الكلاسيكي",
      price: 25.0,
      duration: "30 دقيقة",
      status: "نشط",
    },
    {
      icon: "/assets/Hot.png",
      name: "تقليم اللحية فقط",
      price: 15.0,
      duration: "10 دقيقة",
      status: "غير نشط",
    },
    {
      icon: "/assets/Kids.png",
      name: "حلاقة كاملة مع تحديد",
      price: 30.0,
      duration: "40 دقيقة",
      status: "نشط",
    },
  ];

  return (
    <div className="flex flex-col text-base-light gap-4">
      {servicesData.map((service, index) => (
        <div
          key={index}
          className="flex justify-between  items-center w-full p-4 border rounded-md border-borderColorv6 shadow-sm"
        >
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <Image
                src={service.icon}
                width={30}
                height={30}
                className="object-contain"
                alt="Image"
              />
              <span className="font-semibold">{service.name}</span>
            </div>
            <div className="flex gap-4 mt-1 text-sm ">
              <span>{service.duration}</span>
              <span
                className={
                  service.status === "نشط" ? "text-bGreen" : "text-base-light"
                }
              >
                {service.status}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="flex border border-brandColor p-1 px-4 rounded-lg items-center gap-1 text-base-light transition-colors">
              <span>{service.price} $</span>
            </button>
            <button className="flex items-center gap-1  transition-colors">
              <Image
                src={"/assets/Edit.png"}
                width={20}
                height={20}
                alt="edit"
                className="object-contain"
              />
            </button>
            <button className="flex items-center gap-1  transition-colors">
              <Image
                src={"/assets/Delete.png"}
                width={20}
                height={20}
                alt="edit"
                className="object-contain"
              />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Haircuts;
