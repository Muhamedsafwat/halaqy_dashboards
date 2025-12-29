"use client";
import React, { useState } from "react";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    {
      id: 1,
      name: "تسجيل متجر",
      href: "/register-shop",
      style: "text-brandColor font-bold",
      linkStyle: "border-brandColor py-1 px-4 rounded-lg border",
    },
    {
      id: 2,
      name: "صاحب متجر جديد؟",
      href: "/new-shop-owner",
      style: "text-brandColor font-semibold",
      linkStyle: "",
    },
    {
      id: 3,
      name: "الدعم",
      href: "/support",
      style: "text-base-light mr-5 font-semibold",
      linkStyle: "",
    },
  ];

  const BarberProAdmin = "BarberPro Admin";

  return (
    <nav className="w-full">
      <div className="hidden lg:block">
        <DesktopNav navLinks={navLinks} BarberProAdmin={BarberProAdmin} />
      </div>

      <div className="block lg:hidden">
        <MobileNav
          navLinks={navLinks}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          BarberProAdmin={BarberProAdmin}
        />
      </div>
    </nav>
  );
};

export default NavBar;
