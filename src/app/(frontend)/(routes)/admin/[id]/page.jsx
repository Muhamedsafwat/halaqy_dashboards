import React from "react";
import Register from "@/components/ui/RegisterPage/Register";
const page = () => {
  const data = {
    shopName: "صالون الجناتل",
    shopSlogan: "أفضل تسريحات في المدينة",
    shopDescription:
      "صالون متخصص في الحلاقة الرجالية، يقدم أحدث الصيحات في أجواء مريحة وراقية.",

    logoUrl: "/assets/LogoF.jpg",
    coverUrl: "/assets/CoverF.jpg",

    streetAddress: "123 شارع الحلاق",
    city: "القاهرة",
    state: "الجيزة",
    postalCode: "11511",

    phone: "01095762378",
    email: "contact@gentlemen.com",

    ownerName: "محمد أحمد",
    ownerRole: "المالك",

    mapUrl:
      "https://www.google.com/maps?q=31.417952504002116,31.812964647572347&z=15&output=embed",

    workingHours: {
      السبت: { open: "10:00", close: "22:00" },
      الأحد: { open: "10:00", close: "22:00" },
      الاثنين: { open: "10:00", close: "22:00" },
      الثلاثاء: { open: "10:00", close: "22:00" },
      الأربعاء: { open: "10:00", close: "22:00" },
      الخميس: { open: "10:00", close: "23:00" },
      الجمعة: null,
    },

    status: "pending",
  };

  return (
    <div>
      <Register data={data} />
    </div>
  );
};

export default page;
