import React from "react";
import { Tally1 } from "lucide-react";
import Link from "next/link";
import LocaleSwitcher from "@/components/shared/Buttons/LocaleSwitcher";
const DesktopNav = ({ locale, navLinks, otherLocale, buttons, t }) => {
  return (
    <div className="w-full bg-base-dark p-4 text-base-light">
      <div className="flex flex-row justify-around gap-5 w-full items-center">
        <div className="flex gap-4 items-center">
          <LocaleSwitcher locale={locale} otherLocale={otherLocale} />
          {buttons.map((b, i) => (
            <div key={i} className="realtive group">
              <Link
                href={`${locale}/${b.href}`}
                className="flex items-center text-base text-base-light/80 hover:text-base-light transition-colors duration-300"
              >
                <Tally1 />{" "}
                <span className="relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-base-light after:transition-all after:duration-300 group-hover:after:w-full">
                  {b.Name}
                </span>
              </Link>
            </div>
          ))}
        </div>
        <div className="flex gap-5 items-center">
          {navLinks.map((link) => (
            <div key={link.id} className="relative group">
              <Link
                href={`/${locale}/${link.href}`}
                className="text-base text-base-light/80 hover:text-base-light transition-colors duration-300"
              >
                <span className="relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-base-light after:transition-all after:duration-300 group-hover:after:w-full">
                  {link.name}
                </span>
              </Link>
            </div>
          ))}
          <img src="/assets/Logo.png" className="w-24 object-contain" />
        </div>
      </div>
    </div>
  );
};

export default DesktopNav;


