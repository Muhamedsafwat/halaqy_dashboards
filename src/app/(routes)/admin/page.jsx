"use client";
import { useState } from "react";
import Sidebar from "@/components/layout/SideBar/SideBar";

import Dashboard from "@/components/shared/Section/Dashboard";
import Bookings from "@/components/ui/AdminDashboard/sections/Bookings";
import Staff from "@/components/ui/AdminDashboard/sections/Staff";
import Customers from "@/components/ui/AdminDashboard/sections/Customers";
import Finance from "@/components/ui/AdminDashboard/sections/Finance";
import Settings from "@/components/ui/AdminDashboard/sections/Settings";

const AdminPage = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [activeIndex, setActiveIndex] = useState(0);
  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);

  const links = [
    { key: "dashboard", label: "لوحة التحكم", image: "/assets/Dash.png" },
    { key: "bookings", label: "الحجوزات", image: "/assets/Booking.png" },
    { key: "staff", label: "الموظفين", image: "/assets/Staff.png" },
    { key: "customers", label: "العملاء", image: "/assets/Cust.png" },
    { key: "finance", label: "المالية", image: "/assets/Finance.png" },
    { key: "settings", label: "الإعدادات", image: "/assets/Setting.png" },
  ];
  const data = [
    { icon: "/assets/OverlayOne.png", title: "إجمالي المحلات", number: "20" },
    { icon: "/assets/OverlayTwo.png", title: "الطلبات المعلقة", number: "8" },
    { icon: "/assets/OverlayThree.png", title: "المحلات النشطة", number: "12" },
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
  return (
    <div className="min-h-screen bg-base-dark flex">
      <Sidebar
        links={links}
        active={activeSection}
        onSelect={setActiveSection}
        image="/assets/Admin.png"
        name="حلاقي"
        title="ادمن داش بورد"
      />

      <main className="flex-1 mr-64 p-6">
        {activeSection === "dashboard" && (
          <Dashboard
            shops={shops}
            setActiveIndex={setActiveIndex}
            activeIndex={activeIndex}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            data={data}
            headers={headers}
          />
        )}
        {activeSection === "bookings" && <Bookings />}
        {activeSection === "staff" && <Staff />}
        {activeSection === "customers" && <Customers />}
        {activeSection === "finance" && <Finance />}
        {activeSection === "settings" && <Settings />}
      </main>
    </div>
  );
};

export default AdminPage;
