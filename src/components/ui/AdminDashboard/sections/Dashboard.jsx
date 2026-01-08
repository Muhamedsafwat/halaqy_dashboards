"use client";
import React, { useState } from "react";
import Image from "next/image";
import ActionMenu from "@/components/shared/Menu/Menu";
import Link from "next/link";
const Dashboard = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const shopsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const id = 1;
  const data = [
    { icon: "/assets/OverlayOne.png", title: "إجمالي المحلات", number: "20" },
    { icon: "/assets/OverlayTwo.png", title: "الطلبات المعلقة", number: "8" },
    { icon: "/assets/OverlayThree.png", title: "المحلات النشطة", number: "12" },
  ];
  const buttons = [
    { title: "الكل", numbers: "" },
    { title: "تم التأكيد", numbers: 8 },
    { title: "قيد الانتظار", numbers: 3 },
    { title: "ملغاة", numbers: 4 },
  ];
  const shops = [
    {
      shopName: "صالون الحلاقة المثالي",
      city: "القاهرة",
      requestDate: "2026-01-07",
      ownerName: "محمد علي",
      status: "تم التأكيد",
      details: "عرض التفاصيل",
      actions: "تعديل / حذف",
    },
    {
      shopName: "صالون الشباب",
      city: "الإسكندرية",
      requestDate: "2026-01-05",
      ownerName: "أحمد حسن",
      status: "قيد الانتظار",
      details: "عرض التفاصيل",
      actions: "تعديل / حذف",
    },
    {
      shopName: "صالون الأصدقاء",
      city: "الجيزة",
      requestDate: "2026-01-06",
      ownerName: "سعيد محمد",
      status: "ملغاة",
      details: "عرض التفاصيل",
      actions: "تعديل / حذف",
    },
    {
      shopName: "صالون النجوم",
      city: "القاهرة",
      requestDate: "2026-01-04",
      ownerName: "هشام أحمد",
      status: "تم التأكيد",
      details: "عرض التفاصيل",
      actions: "تعديل / حذف",
    },
    {
      shopName: "صالون الملوك",
      city: "الإسكندرية",
      requestDate: "2026-01-03",
      ownerName: "كريم مصطفى",
      status: "قيد الانتظار",
      details: "عرض التفاصيل",
      actions: "تعديل / حذف",
    },
    {
      shopName: "صالون الملوك",
      city: "الإسكندرية",
      requestDate: "2026-01-03",
      ownerName: "كريم مصطفى",
      status: "قيد الانتظار",
      details: "عرض التفاصيل",
      actions: "تعديل / حذف",
    },
    {
      shopName: "صالون الملوك",
      city: "الإسكندرية",
      requestDate: "2026-01-03",
      ownerName: "كريم مصطفى",
      status: "قيد الانتظار",
      details: "عرض التفاصيل",
      actions: "تعديل / حذف",
    },
    {
      shopName: "صالون الملوك",
      city: "الإسكندرية",
      requestDate: "2026-01-03",
      ownerName: "كريم مصطفى",
      status: "قيد الانتظار",
      details: "عرض التفاصيل",
      actions: "تعديل / حذف",
    },
    {
      shopName: "صالون الملوك",
      city: "الإسكندرية",
      requestDate: "2026-01-03",
      ownerName: "كريم مصطفى",
      status: "قيد الانتظار",
      details: "عرض التفاصيل",
      actions: "تعديل / حذف",
    },
    {
      shopName: "صالون الملوك",
      city: "الإسكندرية",
      requestDate: "2026-01-03",
      ownerName: "كريم مصطفى",
      status: "قيد الانتظار",
      details: "عرض التفاصيل",
      actions: "تعديل / حذف",
    },
    {
      shopName: "صالون الملوك",
      city: "الإسكندرية",
      requestDate: "2026-01-03",
      ownerName: "كريم مصطفى",
      status: "قيد الانتظار",
      details: "عرض التفاصيل",
      actions: "تعديل / حذف",
    },
    {
      shopName: "صالون الملوك",
      city: "الإسكندرية",
      requestDate: "2026-01-03",
      ownerName: "كريم مصطفى",
      status: "قيد الانتظار",
      details: "عرض التفاصيل",
      actions: "تعديل / حذف",
    },
    {
      shopName: "صالون الملوك",
      city: "الإسكندرية",
      requestDate: "2026-01-03",
      ownerName: "كريم مصطفى",
      status: "قيد الانتظار",
      details: "عرض التفاصيل",
      actions: "تعديل / حذف",
    },
    {
      shopName: "صالون الملوك",
      city: "الإسكندرية",
      requestDate: "2026-01-03",
      ownerName: "كريم مصطفى",
      status: "قيد الانتظار",
      details: "عرض التفاصيل",
      actions: "تعديل / حذف",
    },
    {
      shopName: "صالون الملوك",
      city: "الإسكندرية",
      requestDate: "2026-01-03",
      ownerName: "كريم مصطفى",
      status: "قيد الانتظار",
      details: "عرض التفاصيل",
      actions: "تعديل / حذف",
    },
    {
      shopName: "صالون الملوك",
      city: "الإسكندرية",
      requestDate: "2026-01-03",
      ownerName: "كريم مصطفى",
      status: "قيد الانتظار",
      details: "عرض التفاصيل",
      actions: "تعديل / حذف",
    },
    {
      shopName: "صالون الملوك",
      city: "الإسكندرية",
      requestDate: "2026-01-03",
      ownerName: "كريم مصطفى",
      status: "قيد الانتظار",
      details: "عرض التفاصيل",
      actions: "تعديل / حذف",
    },
  ];
  const headers = [
    "اسم المتجر",
    "المدينة",
    "تاريخ الطلب",
    "اسم المالك",
    "الحالة",
    "التفاصيل",
    "الإجراءات",
  ];
  const statusStyles = {
    "تم التأكيد": "bg-bgGreen text-textGreen px-6 py-2 rounded-full",
    "قيد الانتظار": "bg-bgYel text-textYel px-6 py-2 rounded-full",
    ملغاة: "bg-textRed text-Red px-6 py-2 rounded-full",
  };

  const totalShops = shops.length;
  const totalPages = Math.ceil(totalShops / shopsPerPage);

  const indexOfLastShop = currentPage * shopsPerPage;
  const indexOfFirstShop = indexOfLastShop - shopsPerPage;
  const currentShops = shops.slice(indexOfFirstShop, indexOfLastShop);

  const getPageNumbers = (currentPage, totalPages) => {
    const delta = 1;
    const range = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        range.push(i);
      } else if (range[range.length - 1] !== "...") {
        range.push("...");
      }
    }
    return range;
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };
  return (
    <div className="container text-base-light mt-4 flex flex-col justify-start items-center gap-4">
      <div className="flex justify-between w-full items-center">
        <button className="cursor-pointer flex items-center justify-center gap-3 px-4 py-2 rounded-lg  bg-brandColor text-semiblod text-base-light">
          إضافة محل جديد
          <span>+</span>
        </button>
        <div className="flex flex-col justify-center items-center">
          <p className="font-extrabold text-3xl">محلات الحلاقة</p>
          <p className="text-base text-base-light/80 font-medium">
            إدارة مواعيدك القادمة والسابقة
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between w-full gap-2">
        {data.map((d, i) => (
          <div
            key={i}
            className="flex flex-col justify-center items-start gap-2 border border-borderColorv6 bg-borderColorv6/40 w-full p-4 rounded-lg"
          >
            <div className="mr-auto">
              <Image
                src={d.icon}
                width={30}
                height={30}
                alt={d.title}
                className="object-contain"
              />
            </div>
            <p className="items-end font-semibold text-lg">{d.title}</p>
            <p className="items-end text-2xl font-extrabold">{d.number}</p>
          </div>
        ))}
      </div>
      <div className="w-full rounded-lg border border-borderColorv6  bg-borderColorv6/40">
        <div className="flex w-full p-4 items-center gap-3">
          <div className="relative flex-1 ">
            <Image
              src="/assets/search.png"
              width={20}
              height={20}
              alt="Search"
              className="absolute right-3 top-1/2 -translate-y-1/2  opacity-60"
            />

            <input
              type="text"
              placeholder={"ابحث باسم العميل"}
              className="w-full border rounded-lg pr-10 py-3 text-sm focus:outline-none"
            />
          </div>

          <button className="flex items-center gap-2 hover:bg-background/80 border rounded-lg px-4 py-3 text-sm font-medium cursor-pointer transition">
            <Image src="/assets/Ex.png" width={18} height={18} alt="Export" />
            تصدير
          </button>

          <button className=" flex items-center gap-2 border rounded-lg px-4 py-3 text-sm font-medium cursor-pointer hover:bg-background/80 transition">
            <Image
              src="/assets/Filter.png"
              width={18}
              height={18}
              alt="Filter"
            />
            فلترة
          </button>
        </div>
        <div className="p-0 w-full border border-borderColorv6 my-2"></div>
        <div className="flex p-4 justify-start items-start mt-2 gap-3">
          {buttons.map((b, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`
            flex items-center gap-2 px-6 py-2 rounded-lg cursor-pointer
            transition-colors duration-200
            ${
              activeIndex === i
                ? "bg-base-light text-base-dark"
                : "bg-ButtonBg text-black"
            }
          `}
            >
              <span
                className={`${activeIndex === i ? "text-base-dark" : "text-base-light"}`}
              >
                {b.title}
              </span>
              {b.numbers && (
                <span
                  className={`
      min-w-6 h-6 flex items-center justify-center
      text-xs font-medium rounded-full
      transition-colors duration-300 ease-in-out
      ${
        b.title === "قيد الانتظار"
          ? "bg-pending text-base-dark"
          : b.title === "ملغاة"
            ? "bg-textRed text-base-dark"
            : "bg-borderColorv6 text-base-light"
      }
    `}
                >
                  {b.numbers}
                </span>
              )}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-4 font-medium text-sm border-b-2 my-2 border-borderColorv6 p-2 justify-items-center">
          {headers.map((header, index) => (
            <span key={index}>{header}</span>
          ))}
        </div>
        {currentShops.map((shop, index) => (
          <div
            key={index}
            className="grid grid-cols-7 gap-4 p-2  transition-colors justify-items-center"
          >
            <span>{shop.shopName}</span>
            <span>{shop.city}</span>
            <span>{shop.requestDate}</span>
            <span>{shop.ownerName}</span>
            <span
              className={`
    ${statusStyles[shop.status] || "bg-gray-200 text-gray-600"}
    px-4 py-2 rounded-full
    w-36 flex items-center justify-center gap-2
    text-sm font-semibold
    transition-colors duration-300 ease-in-out
  `}
            >
              {shop.status}
              <span
                className={`
      w-3 h-3 rounded-full mr-auto
      ${
        shop.status === "تم التأكيد"
          ? "bg-bGreen"
          : shop.status === "قيد الانتظار"
            ? "bg-brandColor"
            : shop.status === "ملغاة"
              ? "bg-bgRed"
              : "bg-gray-400"
      }
    `}
              ></span>
            </span>
            <Link href={`/admin/${id}`} className="cursor-pointer">
              <Image
                src={"/assets/Eye.png"}
                alt="Image"
                width={20}
                height={20}
                className="object-contain"
              />
            </Link>
            <ActionMenu />
          </div>
        ))}
        <div className="border w-full my-2 border-borderColorv6" />
        <div className="flex justify-between items-center w-full px-4 py-2 text-sm text-gray-500">
          <span>
            عرض {indexOfFirstShop + 1} -{Math.min(indexOfLastShop, totalShops)}{" "}
            من {totalShops} نتيجة
          </span>

          <div className="flex gap-2">
            {getPageNumbers(currentPage, totalPages).map((page, i) =>
              page === "..." ? (
                <span key={i} className="px-3 py-1 text-gray-400">
                  ...
                </span>
              ) : (
                <button
                  key={i}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 cursor-pointer rounded-lg transition ${
                    currentPage === page
                      ? "bg-brandColor text-white"
                      : "bg-base-dark text-base-light"
                  }`}
                >
                  {page}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
