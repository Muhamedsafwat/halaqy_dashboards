"use client";
import React from "react";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";

const Sidebar = ({ links, image, active, onSelect }) => {
  const { logout, isAuth } = useAuth();

  if (!isAuth) return null;

  return (
    <aside className="fixed right-0 top-0 h-screen w-64 bg-base-dark text-base-light shadow-lg flex flex-col justify-between p-4 gap-6 z-50 border-l border-base-light/80">
      <div className="flex items-center justify-center w-full gap-4 pb-4">
        <div className="flex flex-col justify-center items-center">
          <h2 className="font-bold text-lg">حلاقي</h2>
          <span className="text-sm mt-2">ادمن داش بورد</span>
        </div>
        <Image
          src={image}
          alt="Admin"
          width={40}
          height={40}
          className="rounded-full"
        />
      </div>

      <div className="flex flex-col gap-2 flex-1 mt-4">
        {links.map((link) => {
          const isActive = active === link.key;

          return (
            <button
              key={link.key}
              onClick={() => onSelect(link.key)}
              className={`
                flex items-center gap-3 w-full px-4 py-2 rounded-lg text-right
                transition-all
                ${isActive ? "bg-background/90 text-brandColor" : "hover:bg-background/90"}
              `}
            >
              <Image src={link.image} width={20} height={20} alt={link.label} />
              <span>{link.label}</span>
            </button>
          );
        })}
      </div>

      <button
        onClick={logout}
        className="cursor-pointer text-textRed px-4 py-2 rounded w-full mt-auto"
      >
        <div className="flex justify-center items-center gap-3">
          <p>تسجيل الخروج</p>
          <Image
            src={"/assets/Logout.png"}
            width={20}
            height={20}
            alt="logout"
            className="object-contain"
          />
        </div>
      </button>
    </aside>
  );
};

export default Sidebar;
