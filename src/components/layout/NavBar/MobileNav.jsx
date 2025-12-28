"use client";
import React, { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import LocaleSwitcher from "@/components/shared/Buttons/LocaleSwitcher";

const MobileNav = ({
  locale,
  navLinks,
  menuOpen,
  setMenuOpen,
  otherLocale,
  buttons,
  t,
}) => {
  const [buttonsOpen, setButtonsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setButtonsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  return (
    <div className="w-full flex items-center justify-between gap-5 p-4 bg-base-dark text-base-light overflow-hidden">
      <button onClick={() => setMenuOpen(!menuOpen)} className="z-50">
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div className="flex">
        <img
          src="/assets/Logo.png"
          className="w-24 object-contain"
          alt="Logo"
        />
      </div>

      <div
        ref={ref}
        dir={locale === "ar" ? "rtl" : "ltr"}
        className={`fixed inset-0 bg-base-dark z-40 flex flex-col items-center overflow-hidden transform transition-all duration-300 ease-in-out
    ${
      menuOpen
        ? "opacity-100 translate-x-0"
        : locale === "ar"
          ? "opacity-0 translate-x-10 pointer-events-none"
          : "opacity-0 -translate-x-10 pointer-events-none"
    }
  `}
      >
        <img
          src="/assets/Logo.png"
          className="w-28 object-contain mt-8 mb-6"
          alt="Logo"
        />

        <div className="flex flex-col gap-4 w-full items-center">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              href={`${locale}/${link.href}`}
              className="w-11/12 text-center text-lg font-semibold hover:text-base-dark hover:bg-base-light px-4 py-2 rounded transition-colors duration-150"
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex flex-col w-11/12 mt-6 border-t border-gray-700 pt-4">
          <button
            onClick={() => setButtonsOpen(!buttonsOpen)}
            className="w-full flex justify-between items-center px-4 py-2 text-lg font-semibold rounded hover:bg-base-light hover:text-base-dark transition-colors duration-150"
          >
            {t("moreOptions")}
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-150 ${
                buttonsOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          <div
            className={`overflow-hidden flex text-center justify-center transition-all duration-300 ${
              buttonsOpen ? "max-h-96 mt-2" : "max-h-0"
            }`}
          >
            {buttons.map((button, i) => (
              <Link
                key={i}
                href={button.href}
                className=" px-4 py-2 rounded-lg hover:bg-base-light hover:text-base-dark transition-colors duration-150"
                onClick={() => setMenuOpen(false)}
              >
                {button.Name}
              </Link>
            ))}
          </div>
          <div className="mt-6 mb-8">
            <LocaleSwitcher locale={locale} otherLocale={otherLocale} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;


