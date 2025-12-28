"use client";
import React from "react";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

const NavBar = ({ locale }) => {
  const t = useTranslations("nav");
  const otherLocale = locale === "en" ? "ar" : "en";
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { id: 1, name: t("home"), href: "/" },
    { id: 2, name: t("aboutUs"), href: "/about-us" },
    { id: 3, name: t("projects"), href: "/projects" },
    { id: 4, name: t("mediaCenter"), href: "/media-center" },
    { id: 5, name: t("supplierRegistration"), href: "/supplier-Registration" },
    { id: 6, name: t("contactUs"), href: "/contact-us" },
  ];
  const buttons = [
    { Name: t("invest"), href: "/invest" },
    { Name: t("buy"), href: "/buy" },
    { Name: t("rent"), href: "/rent" },
  ];

  return (
    <nav className="">
      <div className="hidden lg:block">
        <DesktopNav
          locale={locale}
          navLinks={navLinks}
          otherLocale={otherLocale}
          t={t}
          buttons={buttons}
        />
      </div>

      <div className="block lg:hidden">
        <MobileNav
          locale={locale}
          navLinks={navLinks}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          otherLocale={otherLocale}
          buttons={buttons}
          t={t}
        />
      </div>
    </nav>
  );
};

export default NavBar;
