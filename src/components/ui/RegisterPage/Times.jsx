"use client";
import React, { useState } from "react";

const Times = () => {
  const days = [
    "الاثنين",
    "الثلاثاء",
    "الأربعاء",
    "الخميس",
    "الجمعة",
    "السبت",
    "الأحد",
  ];

  const [openDays, setOpenDays] = useState({});
  const toggleDay = (index) => {
    setOpenDays((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <table className="w-full bg-backgroundDiv border border-borderColorv5 rounded-lg overflow-hidden">
      <thead className="border-b-2 border-borderColorv5">
        <tr className="text-start">
          <th className="p-3 font-semibold w-1/4 text-start">اليوم</th>
          <th className="p-3 font-semibold w-1/12 text-start">الحالة</th>
          <th className="p-3 font-semibold w-1/4 text-start">موعد الفتح</th>
          <th className="p-3 font-semibold w-1/12 text-center">إلى</th>
          <th className="p-3 font-semibold w-1/4 text-start">موعد الإغلاق</th>
        </tr>
      </thead>

      <tbody>
        {days.map((day, index) => (
          <tr key={index}>
            {/* اليوم */}
            <td className="p-3">{day}</td>

            {/* الحالة */}
            <td className="p-3 text-start">
              <button
                type="button"
                onClick={() => toggleDay(index)}
                className={`relative rounded-3xl cursor-pointer px-6 py-3 transition-colors duration-300 ease-in-out ${
                  openDays[index] ? "bg-brandColor" : "bg-background"
                }`}
              >
                <span
                  className={`absolute top-1/2 transform -translate-y-1/2 w-5 h-5 rounded-full bg-base-dark transition-transform duration-300 ${
                    openDays[index] ? "translate-x-full" : "translate-x-0"
                  }`}
                ></span>
              </button>
            </td>

            {/* موعد الفتح */}
            <td className="p-3">
              {openDays[index] ? (
                <input
                  type="time"
                  className="border border-brandColor bg-background rounded text-base-light p-2 w-full"
                  defaultValue="09:00"
                />
              ) : (
                <span className="border rounded p-2 w-full text-center text-base-light/80 inline-block">
                  مغلق
                </span>
              )}
            </td>

            <td className="p-3 text-center">-</td>

            <td className="p-3">
              {openDays[index] ? (
                <input
                  type="time"
                  className="border border-brandColor bg-background rounded text-base-light p-2 w-full"
                  defaultValue="18:00"
                />
              ) : (
                <span className="border rounded p-2 w-full text-center text-base-light/80 inline-block">
                  مغلق
                </span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Times;
