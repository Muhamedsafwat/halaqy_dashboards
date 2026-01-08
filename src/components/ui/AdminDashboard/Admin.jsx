"use client";
import { useState } from "react";
import Sidebar from "@/components/layout/SideBar/SideBar";

import Dashboard from "./sections/Dashboard";
import Bookings from "./sections/Bookings";
import Staff from "./sections/Staff";
import Customers from "./sections/Customers";
import Finance from "./sections/Finance";
import Settings from "./sections/Settings";

const AdminPage = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  const links = [
    { key: "dashboard", label: "لوحة التحكم", image: "/assets/Dash.png" },
    { key: "bookings", label: "الحجوزات", image: "/assets/Booking.png" },
    { key: "staff", label: "الموظفين", image: "/assets/Staff.png" },
    { key: "customers", label: "العملاء", image: "/assets/Cust.png" },
    { key: "finance", label: "المالية", image: "/assets/Finance.png" },
    { key: "settings", label: "الإعدادات", image: "/assets/Setting.png" },
  ];

  return (
    <div className="min-h-screen bg-base-dark flex">
      <Sidebar
        links={links}
        active={activeSection}
        onSelect={setActiveSection}
        image="/assets/Admin.png"
      />

      <main className="flex-1 mr-64 p-6">
        {activeSection === "dashboard" && <Dashboard />}
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
