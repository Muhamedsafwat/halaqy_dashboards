"use client";
import React, { useState } from "react";
import Dashboard from "@/components/shared/Section/Dashboard";
const Appointments = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const data = [
    {
      icon: "/assets/OverlayOne.png",
      title: "إجمالي الحجوزات",
      number: "124",
      subtitle: "هذا الشهر",
    },
    {
      icon: "/assets/OverlayTwo.png",
      title: "الحجوزات القادمة",
      number: "12",
      subtitle: "خلال 7 أيام",
    },
    {
      icon: "/assets/OverlayThree.png",
      title: "الإيرادات",
      number: "3,450 $",
      subtitle: "+12٪ مقارنة بالأسبوع الماضي",
    },
  ];

  const clients = [
    {
      id: "#BK-2094",
      clientName: "أحمد محمد",
      clientImage: "/assets/LogoF.jpg",
      service: "قص شعر + تهذيب لحية",
      date: "24 أكتوبر 2023",
      time: "10:00 AM",
      staffName: "محمد علي",
      staffImage: "/assets/CoverF.jpg",
      duration: "45 دقيقة",
      price: "45 دولار",
      status: "تم التأكيد",
    },
    {
      id: "#BK-2095",
      clientName: "كريم حسن",
      clientImage: "/assets/LogoF.jpg",
      service: "قص شعر",
      date: "24 أكتوبر 2023",
      time: "11:00 AM",
      staffName: "عمر سمير",
      staffImage: "/assets/LogoF.jpg",
      duration: "30 دقيقة",
      price: "30 دولار",
      status: "قيد الانتظار",
    },
    {
      id: "#BK-2096",
      clientName: "محمود علي",
      clientImage: "/assets/LogoF.jpg",
      service: "تهذيب لحية",
      date: "25 أكتوبر 2023",
      time: "12:30 PM",
      staffName: "يوسف أحمد",
      staffImage: "/assets/LogoF.jpg",
      duration: "20 دقيقة",
      price: "20 دولار",
      status: "ملغاة",
    },
    {
      id: "#BK-2097",
      clientName: "خالد محمود",
      clientImage: "/assets/LogoF.jpg",
      service: "قص شعر + حلاقة كاملة",
      date: "25 أكتوبر 2023",
      time: "02:00 PM",
      staffName: "إسلام فتحي",
      staffImage: "/assets/LogoF.jpg",
      duration: "60 دقيقة",
      price: "60 دولار",
      status: "تم التأكيد",
    },
    {
      id: "#BK-2098",
      clientName: "حسام أحمد",
      clientImage: "/assets/LogoF.jpg",
      service: "تنظيف بشرة",
      date: "26 أكتوبر 2023",
      time: "01:00 PM",
      staffName: "أحمد سامي",
      staffImage: "/assets/LogoF.jpg",
      duration: "40 دقيقة",
      price: "35 دولار",
      status: "قيد الانتظار",
    },
    {
      id: "#BK-2099",
      clientName: "رامي يوسف",
      clientImage: "/assets/LogoF.jpg",
      service: "قص شعر أطفال",
      date: "26 أكتوبر 2023",
      time: "04:00 PM",
      staffName: "محمد علي",
      staffImage: "/assets/LogoF.jpg",
      duration: "25 دقيقة",
      price: "25 دولار",
      status: "ملغاة",
    },
    {
      id: "#BK-2100",
      clientName: "سيف الدين",
      clientImage: "/assets/LogoF.jpg",
      service: "قص شعر + تهذيب لحية",
      date: "27 أكتوبر 2023",
      time: "10:30 AM",
      staffName: "عمر سمير",
      staffImage: "/assets/LogoF.jpg",
      duration: "50 دقيقة",
      price: "50 دولار",
      status: "تم التأكيد",
    },
    {
      id: "#BK-2101",
      clientName: "عبدالله حسن",
      clientImage: "/assets/LogoF.jpg",
      service: "حلاقة كاملة",
      date: "27 أكتوبر 2023",
      time: "01:30 PM",
      staffName: "يوسف أحمد",
      staffImage: "/assets/LogoF.jpg",
      duration: "35 دقيقة",
      price: "35 دولار",
      status: "قيد الانتظار",
    },
    {
      id: "#BK-2102",
      clientName: "علي رضا",
      clientImage: "/assets/LogoF.jpg",
      service: "قص شعر VIP",
      date: "28 أكتوبر 2023",
      time: "21:00 PM",
      staffName: "إسلام فتحي",
      staffImage: "/assets/LogoF.jpg",
      duration: "70 دقيقة",
      price: "80 دولار",
      status: "ملغاة",
    },
  ];

  const headers = [
    "اسم العميل",
    "الخدمة",
    "التاريخ والوقت",
    "اسم الموظف",
    "الحالة",
    "الإجراءات",
  ];

  return (
    <Dashboard
      clients={clients}
      setActiveIndex={setActiveIndex}
      activeIndex={activeIndex}
      itemsPerPage={itemsPerPage}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      data={data}
      headers={headers}
    />
  );
};

export default Appointments;
