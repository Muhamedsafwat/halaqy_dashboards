import React from "react";
import FormTitle from "@/components/shared/FormTitle/FormTitle";
import Image from "next/image";
import LocationSection from "@/components/ui/RegisterPage/LocationSection";

import Times from "./Times";
const Register = () => {
  return (
    <div className="container text-base-light mt-10 flex flex-col justify-center text-start">
      <p className="lg:text-4xl text-2xl font-bold">لنقم بإعداد متجرك</p>
      <p className="text-base font-semibold text-brandColor mt-2">
        سجّل تفاصيل متجرك لبدء إدارة أعمالك.
      </p>

      <div className="border border-borderColorv4 my-4" />

      <form className="flex flex-col gap-6">
        <FormTitle image={"/assets/Shop.png"} text={"المعلومات الاساسية"} />

        <div className="rounded-lg bg-backgroundDiv/95 p-4 flex flex-wrap gap-4">
          <div className="flex justify-between gap-4 w-full">
            <div className="flex flex-col w-full md:w-1/2 gap-2">
              <label className="text-base font-semibold text-start">
                اسم المتجر *
              </label>
              <input
                placeholder="مثال: حلاق الجناتل"
                className="bg-background w-full p-2 rounded-lg text-start"
                required
              />
            </div>

            <div className="flex flex-col w-full md:w-1/2 gap-2">
              <label className="text-base font-semibold text-start">
                شعار المتجر *
              </label>
              <input
                placeholder="مثال: أفضل تسريحات في المدينة"
                className="bg-background w-full p-2 rounded-lg text-start"
                required
              />
            </div>
          </div>

          <div className="flex flex-col w-full gap-2">
            <label className="text-base font-semibold text-start">
              وصف المتجر
            </label>
            <textarea
              placeholder="أخبر العملاء عن خدماتك، الأجواء، وما يميز متجرك..."
              className="bg-background w-full p-2 rounded-lg text-start"
              required
              rows={3}
            />
          </div>
        </div>
        <FormTitle
          image={"/assets/Brand.png"}
          text={"العلامة التجارية والوسائط"}
        />
        <div className="flex justify-between rounded-lg bg-backgroundDiv/95 p-4 items-start gap-5 w-full">
          <div className="flex flex-col justify-center gap-2 items-center md:items-start">
            <label>شعار المتجر</label>
            <div className="relative w-32 h-32 mt-4">
              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
              />

              <div className="w-32 h-32 bg-background rounded-full border-2 border-dashed border-base-dark flex items-center justify-center">
                <Image
                  src="/assets/upload.png"
                  alt="Image Upload "
                  width={25}
                  height={25}
                  className="object-contain"
                />
              </div>
            </div>
            <p className="text-sm md:whitespace-nowrap text-center md:text-start font-semibold text-brandColor">
              PNG, JPG حتى 2 ميجابايت
            </p>
          </div>
          <div className="flex flex-col w-full justify-center gap-2 items-center md:items-start">
            <label>صورة الغلاف</label>
            <div className="relative w-full mt-4">
              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
              />

              <div className="w-full h-32 bg-background rounded-lg border-2 border-dashed border-base-dark flex gap-4 flex-col items-center justify-center">
                <Image
                  src="/assets/Imageupload.png"
                  alt="Image Upload "
                  width={25}
                  height={25}
                  className="object-contain"
                />
                <p className="md:text-lg text-base  text-center md:text-start font-semibold text-brandColor">
                  اضغط لرفع صورة الغلاف
                </p>
              </div>
            </div>
            <p className="text-sm font-semibold text-center md:text-start text-brandColor">
              الحجم الموصى به: 1200x400 بيكسل
            </p>
          </div>
        </div>
        <FormTitle
          image={"/assets/Location.png"}
          text={"الموقع وبيانات التواصل"}
        />
        <div className="rounded-lg bg-backgroundDiv/95 p-4">
          <div className="relative w-full flex flex-col items-cenetr justify-center gap-2">
            <label>عنوان الشارع *</label>
            <div className="flex justify-start items-center gap-2 rounded-lg bg-background p-2">
              <Image
                src={"/assets/IconLocation.png"}
                width={20}
                height={20}
                className="object-contain"
                alt="location"
              />
              <input className="outline-none" placeholder="123 شارع الحلاق" />
            </div>
          </div>
          <div className="flex w-full mt-4 flex-wrap justify-between items-center gap-2">
            <div className="w-1/4">
              <label>المدينة</label>
              <input
                placeholder="القاهرة"
                className="w-full mt-2 p-2 rounded-lg bg-background"
              />
            </div>
            <div className="w-1/3">
              <label>المحافظة / الولاية</label>
              <input
                placeholder="الجيزة"
                className="w-full mt-2 p-2 rounded-lg bg-background"
              />
            </div>
            <div className="w-1/3">
              <label>الرمز البريدي</label>
              <input
                placeholder="10101010202"
                className="w-full mt-2 p-2 rounded-lg bg-background"
              />
            </div>
          </div>
          <div className="flex justify-between w-full mt-4 gap-5 items-start">
            <div className="flex flex-col justify-center w-full items-start gap-2">
              <label>رقم الهاتف *</label>
              <input
                placeholder="01095762378"
                className="w-full rounded-lg p-2 bg-background"
              />
            </div>
            <div className="flex flex-col justify-center w-full items-start gap-2">
              <label>البريد الإلكتروني</label>
              <input
                placeholder="contact@shop.com"
                className="w-full rounded-lg p-2 bg-background"
              />
            </div>
          </div>
        </div>
        <LocationSection />
        <FormTitle image={"/assets/Time.png"} text={"ساعات العمل"} />
        <div className="w-full">
          <Times />
        </div>
        <FormTitle image={"/assets/Person.png"} text={"بيانات المالك"} />
        <div className="rounded-lg bg-backgroundDiv/95 p-4">
          <div className="relative w-full flex flex-col items-cenetr justify-center gap-2">
            <div className="flex justify-between w-full mt-4 gap-5 items-start">
              <div className="flex flex-col justify-center w-full items-start gap-2">
                <label>الاسم الكامل*</label>
                <input
                  placeholder="جون دو"
                  className="w-full rounded-lg p-2 bg-background"
                />
              </div>
              <div className="flex flex-col justify-center w-full items-start gap-2">
                <label>الدور / الوظيفة</label>
                <input
                  placeholder="المالك"
                  className="w-full rounded-lg p-2 bg-background"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
