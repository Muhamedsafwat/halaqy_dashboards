import React from "react";
import Link from "next/link";
import Image from "next/image";
const DesktopNav = ({ locale, navLinks, BarberProAdmin }) => {
  return (
    <div className="w-full bg-base-dark p-6 text-base-light border-b border-borderColor ">
      <div className="flex flex-row justify-between w-full ">
        <div className="flex gap-2 items-center">
          {navLinks.map((link) => (
            <div key={link.id} className="relative group">
              <Link
                href={`/${locale}/${link.href}`}
                className={`text-base text-base-light/80 hover:text-base-light transition-colors duration-300 ${link.linkStyle}`}
              >
                <span className={`text-base  capitalize ${link.style}`}>
                  {link.name}
                </span>
              </Link>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center gap-4">
          <p className="text-lg font-semibold">{BarberProAdmin}</p>
          <Image
            src="/assets/Logo.png"
            width={35}
            height={35}
            alt="logo"
            className=" object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default DesktopNav;
