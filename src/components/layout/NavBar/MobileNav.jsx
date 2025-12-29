"use client";
import React, { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const MobileNav = ({
  locale,
  navLinks,
  menuOpen,
  setMenuOpen,
  BarberProAdmin,
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
    <div className="relative w-full flex items-center gap-5 p-4 bg-base-dark text-base-light overflow-hidden">
      <button onClick={() => setMenuOpen(!menuOpen)} className="z-50">
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div className="absolute left-1/2 mt-4 flex -translate-x-1/2 justify-center items-center gap-2">
        <Image
          width={35}
          height={35}
          src="/assets/Logo.png"
          className="object-contain"
          alt="Logo"
        />
        <p className="text-lg font-bold">{BarberProAdmin}</p>
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
        <div className="flex justify-center mt-8 mb-6 items-center gap-2">
          <Image
            src="/assets/Logo.png"
            width={35}
            height={35}
            className="object-contain "
            alt="Logo"
          />
          <p className="text-lg font-bold">{BarberProAdmin}</p>
        </div>

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
      </div>
    </div>
  );
};

export default MobileNav;
