"use client";
import Image from "next/image";

const ShopFooter = () => {
  return (
    <div className="w-full border-t border-brandColor mt-4 px-4 py-3 flex justify-between items-center bg">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 relative">
          <Image
            src="/assets/Info.png"
            alt="Info"
            fill
            className="object-contain"
          />
        </div>
        <span className="text-base-light">
          لديك تغييرات غير محفوظة على قائمة الخدمات
        </span>
      </div>

      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors">
          تجاهل
        </button>

        <button className="flex items-center gap-2 bg-brandColor text-white px-4 py-2 rounded-md hover:bg-brandColor/90 transition-colors">
          حفظ التغييرات
        </button>
      </div>
    </div>
  );
};

export default ShopFooter;
