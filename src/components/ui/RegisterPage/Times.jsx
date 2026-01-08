"use client";
import React, { useState, useEffect } from "react";

const Times = ({ setWorkingHours, data }) => {
  const days = [
    "الاثنين",
    "الثلاثاء",
    "الأربعاء",
    "الخميس",
    "الجمعة",
    "السبت",
    "الأحد",
  ];
  const isViewMode = !!data;

  const [openDays, setOpenDays] = useState({});
  const [openTimes, setOpenTimes] = useState({});
  const [closeTimes, setCloseTimes] = useState({});
  const toggleDay = (index) => {
    setOpenDays((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };
  useEffect(() => {
    if (!data?.workingHours) return;

    const initialOpenDays = {};
    const initialOpenTimes = {};
    const initialCloseTimes = {};

    days.forEach((day, index) => {
      const dayData = data.workingHours[day];

      if (dayData) {
        initialOpenDays[index] = true;
        initialOpenTimes[index] = dayData.open;
        initialCloseTimes[index] = dayData.close;
      } else {
        initialOpenDays[index] = false;
      }
    });

    setOpenDays(initialOpenDays);
    setOpenTimes(initialOpenTimes);
    setCloseTimes(initialCloseTimes);
  }, [data]);

  useEffect(() => {
    const hours = {};
    days.forEach((day, index) => {
      if (openDays[index]) {
        hours[day] = {
          open: openTimes[index] || "09:00",
          close: closeTimes[index] || "18:00",
        };
      } else {
        hours[day] = null;
      }
    });
    setWorkingHours(hours);
  }, [openDays, openTimes, closeTimes]);

  const handleOpenChange = (index, value) => {
    setOpenTimes((prev) => ({ ...prev, [index]: value }));
  };

  const handleCloseChange = (index, value) => {
    setCloseTimes((prev) => ({ ...prev, [index]: value }));
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
                  disabled={isViewMode}
                  onClick={() => !isViewMode && toggleDay(index)}
                  className={`relative rounded-3xl px-6 py-3 transition-colors duration-300 ease-in-out ${
                    openDays[index] ? "bg-brandColor" : "bg-background"
                  }
                 ${isViewMode ? "cursor-auto" : "cursor-pointer"} 
                  `}
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
                    readOnly={isViewMode}
                    disabled={isViewMode}
                    type="time"
                    className="border border-brandColor bg-background rounded text-base-light p-2 w-full"
                    value={openTimes[index] || "09:00"}
                    onChange={(e) => handleOpenChange(index, e.target.value)}
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
                    readOnly={isViewMode}
                    disabled={isViewMode}
                    type="time"
                    className="border border-brandColor bg-background rounded text-base-light p-2 w-full"
                    value={closeTimes[index] || "18:00"}
                    onChange={(e) => handleCloseChange(index, e.target.value)}
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
                disabled={isViewMode}
                onClick={() => !isViewMode && toggleDay(index)}
                className={`relative rounded-3xl px-6 py-3 transition-colors ${
                  openDays[index] ? "bg-brandColor" : "bg-background"
                }
                ${isViewMode ? "cursor-auto" : "cursor-pointer"} 
                `}
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
                    readOnly={isViewMode}
                    disabled={isViewMode}
                    type="time"
                    value={openTimes[index] || "09:00"}
                    onChange={(e) => handleOpenChange(index, e.target.value)}
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
                    readOnly={isViewMode}
                    disabled={isViewMode}
                    type="time"
                    value={closeTimes[index] || "18:00"}
                    className="w-full border mt-2 border-brandColor bg-background rounded p-2"
                    onChange={(e) => handleCloseChange(index, e.target.value)}
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
