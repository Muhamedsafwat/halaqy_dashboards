import { useState, useRef, useEffect } from "react";
import Image from "next/image";

const ActionMenu = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const handleConfirm = () => {
    alert("تم التأكيد");
    setOpen(false);
  };

  const handleCancel = () => {
    alert("تم الإلغاء");
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block" ref={menuRef}>
      <span className="cursor-pointer" onClick={() => setOpen(!open)}>
        <Image
          src="/assets/Actions.png"
          alt="Actions"
          width={20}
          height={20}
          className="object-contain"
        />
      </span>

      {open && (
        <div className="absolute right-0 mt-2 w-36 bg-white border rounded-lg shadow-lg z-50 flex flex-col p-4">
          <button
            onClick={handleConfirm}
            className="cursor-pointer px-4 py-2 flex items-center justify-between w-full gap-2 rounded-full bg-bgGreen text-textGreen "
          >
            تأكيد
            <span className="w-3 h-3 rounded-full bg-bGreen"></span>
          </button>

          <button
            onClick={handleCancel}
            className="cursor-pointer px-4 py-2 flex items-center justify-between w-full gap-2 rounded-full bg-textRed mt-2 text-Red"
          >
            إلغاء
            <span className="w-3 h-3 rounded-full bg-Red"></span>
          </button>

          <button
            onClick={() => setOpen(false)}
            className="cursor-pointer px-4 py-2 text-center text-sm text-base-dark transition-colors rounded-b-lg"
          >
            إغلاق
          </button>
        </div>
      )}
    </div>
  );
};

export default ActionMenu;
