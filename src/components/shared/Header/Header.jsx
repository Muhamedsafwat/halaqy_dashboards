import Image from "next/image";
import React from "react";

const Header = ({ pageTitle }) => {
  return (
    <div className="w-full">
      <div className="flex px-4 py-4 justify-between items-center text-base-light">
        <div className="text-2xl font-bold">{pageTitle}</div>

        <div className="flex justify-center items-center gap-3">
          <div className="flex items-center gap-2 rounded-full text-sm px-3 py-2 border border-brandColor">
            المحل مفتوح الان
            <span className="w-2 h-2 rounded-full bg-bGreen"></span>
          </div>

          <div className="h-6 border-l border-brandColor" />

          <div className="relative w-12 h-12 rounded-full overflow-hidden">
            <Image
              src="/assets/LogoF.jpg"
              fill
              className="object-cover"
              alt="Logo"
            />
          </div>
        </div>
      </div>

      <div className="w-full border-b border-brandColor my-2" />
    </div>
  );
};

export default Header;
