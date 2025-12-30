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
    <>
      <table className="hidden md:table w-full bg-backgroundDiv border border-borderColorv5 rounded-lg overflow-hidden">
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
              <td className="p-3">{day}</td>

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
      <div className="md:hidden space-y-4">
        {days.map((day, index) => (
          <div
            key={index}
            className="bg-backgroundDiv border border-borderColorv5 rounded-lg p-4 space-y-4"
          >
            <div className="flex justify-between items-center">
              <span className="font-semibold text-lg">{day}</span>

              <button
                type="button"
                onClick={() => toggleDay(index)}
                className={`relative rounded-3xl px-6 py-3 transition-colors ${
                  openDays[index] ? "bg-brandColor" : "bg-background"
                }`}
              >
                <span
                  className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-base-dark transition-transform ${
                    openDays[index] ? "translate-x-full" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <span className="block text-sm mb-1 text-base-light/70">
                  موعد الفتح
                </span>
                {openDays[index] ? (
                  <input
                    type="time"
                    defaultValue="09:00"
                    className="w-full border border-brandColor mt-2 bg-background rounded p-2"
                  />
                ) : (
                  <span className="block border rounded p-2 mt-2 text-center text-base-light/80">
                    مغلق
                  </span>
                )}
              </div>

              <div>
                <span className="block text-sm mb-1 text-base-light/70">
                  موعد الإغلاق
                </span>
                {openDays[index] ? (
                  <input
                    type="time"
                    defaultValue="18:00"
                    className="w-full border mt-2 border-brandColor bg-background rounded p-2"
                  />
                ) : (
                  <span className="block border rounded mt-2 p-2 text-center text-base-light/80">
                    مغلق
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Times;
