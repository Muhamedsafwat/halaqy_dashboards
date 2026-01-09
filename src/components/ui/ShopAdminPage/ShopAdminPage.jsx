"use client";
import React, { useState } from "react";
import Sidebar from "@/components/layout/SideBar/SideBar";
import Appointments from "@/components/ui/ShopAdminPage/Sections/Appointments";
import Services from "@/components/ui/ShopAdminPage/Sections/Services";

const ShopAdminPage = () => {
  const [activeSection, setActiveSection] = useState("Appointments");

  const links = [
    {
      key: "Appointments",
      label: "المواعيد",
      image: "/assets/Appointment.png",
    },
    {
      key: "Services & Gallery",
      label: "الخدمات والمعرض",
      image: "/assets/Services.png",
    },
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

      <div className="flex-1 flex flex-col mr-64">
        <main className="flex-1">
          {activeSection === "Appointments" && <Appointments />}
          {activeSection === "Services & Gallery" && <Services />}
        </main>
      </div>
    </div>
  );
};

export default ShopAdminPage;
