"use client";
import React, { useState } from "react";
import FormTitle from "@/components/shared/FormTitle/FormTitle";
import Image from "next/image";
import LocationSection from "@/components/ui/RegisterPage/LocationSection";
import supabase from "@/SupaBaseClient";
import Times from "./Times";
const Register = ({ data }) => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [logoPreview, setLogoPreview] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);

  const [formData, setFormData] = useState({
    shopName: "",
    shopSlogan: "",
    shopDescription: "",
    logoFile: null,
    coverFile: null,
    streetAddress: "",
    city: "",
    state: "",
    postalCode: "",
    phone: "",
    email: "",
    ownerName: "",
    ownerRole: "",
    password: "",
    workingHours: {},
    mapUrl: "",
  });

  const uploadImage = async (file) => {
    if (!file) return null;

    const filePath = `${Date.now()}_${file.name}`;
    const { error } = await supabase.storage
      .from("Images")
      .upload(filePath, file);

    if (error) {
      console.log("Upload error:", error);
      return null;
    }

    const { data } = supabase.storage.from("Images").getPublicUrl(filePath);
    console.log("Public URL data:", data);
    return data?.publicUrl || null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const logoUrl = await uploadImage(logoFile);
    const coverUrl = await uploadImage(coverFile);

    console.log("Logo URL:", logoUrl);
    console.log("Cover URL:", coverUrl);

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      setMessage({ type: "error", text: authError.message });
      setLoading(false);
      return;
    }

    if (authData.user.identities.length === 0) {
      setMessage({
        type: "error",
        text: "هذا البريد الإلكتروني مسجل بالفعل، برجاء تسجيل الدخول",
      });
      setLoading(false);
      return;
    }
    const userId = authData.user.id;

    const { error: shopError } = await supabase.from("Shop").insert([
      {
        shop_name: formData.shopName,
        shop_slogan: formData.shopSlogan,
        shop_description: formData.shopDescription,
        logo_url: logoUrl,
        cover_image_url: coverUrl,
        street_address: formData.streetAddress,
        city: formData.city,
        state: formData.state,
        postal_code: formData.postalCode,
        phone: formData.phone,
        email: formData.email,
        owner_name: formData.ownerName,
        owner_role: formData.ownerRole,
        map_link: formData.mapUrl,
        working_hours: formData.workingHours,
        user_id: userId,
        status: "pending",
      },
    ]);

    if (shopError) {
      setMessage({ type: "error", text: shopError.message });
      setLoading(false);
      return;
    }

    setMessage({
      type: "success",
      text: "تم إنشاء الحساب بنجاح، بانتظار موافقة الأدمن",
    });
    setLoading(false);
  };
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onload = () => setLogoPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverFile(file);
      const reader = new FileReader();
      reader.onload = () => setCoverPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container text-base-light mt-10 flex flex-col justify-center text-start">
      {!data ? (
        <>
          <p className="lg:text-4xl text-2xl font-bold">لنقم بإعداد متجرك</p>
          <p className="text-base font-semibold text-brandColor mt-2">
            سجّل تفاصيل متجرك لبدء إدارة أعمالك.
          </p>
          <div className="border border-borderColorv4 my-4" />
        </>
      ) : (
        ""
      )}

      <form className="flex flex-col gap-6">
        <FormTitle image={"/assets/Shop.png"} text={"المعلومات الاساسية"} />

        <div className="rounded-lg bg-backgroundDiv/95 p-4 flex flex-wrap gap-4">
          <div className="flex justify-between gap-4 w-full">
            <div className="flex flex-col w-full md:w-1/2 gap-2">
              <label className="text-base font-semibold text-start">
                {!data ? "اسم المتجر *" : data.shopName}
              </label>
              {!data ? (
                <input
                  placeholder="مثال: حلاق الجناتل"
                  className="bg-background w-full p-2 rounded-lg text-start"
                  required
                  value={formData.shopName}
                  onChange={(e) =>
                    setFormData({ ...formData, shopName: e.target.value })
                  }
                />
              ) : (
                ""
              )}
            </div>

            <div className="flex flex-col w-full md:w-1/2 gap-2">
              <label className="text-base font-semibold text-start">
                {!data ? "شعار المتجر *" : data.shopSlogan}
              </label>
              {!data ? (
                <input
                  placeholder="مثال: أفضل تسريحات في المدينة"
                  className="bg-background w-full p-2 rounded-lg text-start"
                  required
                  value={formData.shopSlogan}
                  onChange={(e) =>
                    setFormData({ ...formData, shopSlogan: e.target.value })
                  }
                />
              ) : (
                ""
              )}
            </div>
          </div>

          <div className="flex flex-col w-full gap-2">
            <label className="text-base font-semibold text-start">
              {!data ? "وصف المتجر" : data.shopDescription}
            </label>
            {!data ? (
              <textarea
                placeholder="أخبر العملاء عن خدماتك، الأجواء، وما يميز متجرك..."
                className="bg-background w-full p-2 rounded-lg text-start"
                required
                rows={3}
                value={formData.shopDescription}
                onChange={(e) =>
                  setFormData({ ...formData, shopDescription: e.target.value })
                }
              />
            ) : (
              ""
            )}
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
              {!data && (
                <input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  accept="image/*"
                  onChange={handleLogoChange}
                />
              )}

              <div
                className={`w-32 ${data || logoPreview ? "border-none" : ""} h-32 rounded-full overflow-hidden border-2 border-dashed border-base-dark bg-background flex items-center justify-center`}
              >
                {data?.logoUrl || logoPreview ? (
                  <img
                    src={data.logoUrl || logoPreview}
                    alt="Logo Preview"
                    className="object-cover w-full h-full rounded-full"
                  />
                ) : (
                  <Image
                    src="/assets/upload.png"
                    alt="Image Upload"
                    width={25}
                    height={25}
                    className="object-contain"
                  />
                )}
              </div>
            </div>
            {!data && (
              <p className="text-sm text-brandColor font-semibold">
                PNG, JPG حتى 2 ميجابايت
              </p>
            )}
          </div>

          <div className="flex flex-col w-full justify-center gap-2 items-center md:items-start">
            <label>صورة الغلاف</label>
            <div className="relative w-full mt-4">
              {!data && (
                <input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  accept="image/*"
                  onChange={handleCoverChange}
                />
              )}

              <div
                className={`w-full ${data || coverPreview ? "h-64 border-none" : "h-32"} rounded-lg overflow-hidden border-2 border-dashed border-base-dark bg-background flex flex-col items-center justify-center gap-2`}
              >
                {data || coverPreview ? (
                  <img
                    src={data.coverUrl || coverPreview}
                    alt="Cover Preview"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <>
                    <Image
                      src="/assets/Imageupload.png"
                      alt="Image Upload"
                      width={25}
                      height={25}
                      className="object-contain"
                    />
                    {!data && (
                      <p className="md:text-lg text-base text-center md:text-start font-semibold text-brandColor">
                        اضغط لرفع صورة الغلاف
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>
            {!data && (
              <p className="text-sm font-semibold text-center md:text-start text-brandColor">
                الحجم الموصى به: 1200x400 بيكسل
              </p>
            )}
          </div>
        </div>
        <FormTitle
          image={"/assets/Location.png"}
          text={"الموقع وبيانات التواصل"}
        />
        <div className="rounded-lg bg-backgroundDiv/95 p-4">
          <div className="relative w-full flex flex-col items-cenetr justify-center gap-2">
            <label>{data ? data.streetAddress : "عنوان الشارع *"}</label>
            {!data && (
              <div className="flex justify-start items-center gap-2 rounded-lg bg-background p-2">
                <Image
                  src={"/assets/IconLocation.png"}
                  width={20}
                  height={20}
                  className="object-contain"
                  alt="location"
                />
                <input
                  className="outline-none"
                  placeholder="123 شارع الحلاق"
                  value={formData.streetAddress}
                  onChange={(e) =>
                    setFormData({ ...formData, streetAddress: e.target.value })
                  }
                />
              </div>
            )}
          </div>
          <div className="flex md:flex-row flex-col w-full mt-4 gap-4">
            <div className="w-full md:w-full">
              <label className="block">{data ? data.city : "المدينة"}</label>
              {!data && (
                <input
                  placeholder="القاهرة"
                  className="w-full mt-2 p-2 rounded-lg bg-background"
                  value={formData.city}
                  onChange={(e) => {
                    setFormData({ ...formData, city: e.target.value });
                  }}
                />
              )}
            </div>

            <div className="w-full">
              <label className="block">
                {data ? data.state : "المحافظة / الولاية"}
              </label>
              {!data && (
                <input
                  placeholder="الجيزة"
                  className="w-full mt-2 p-2 rounded-lg bg-background"
                  value={formData.state}
                  onChange={(e) => {
                    setFormData({ ...formData, state: e.target.value });
                  }}
                />
              )}
            </div>

            <div className="w-full md:w-full">
              <label className="block">
                {data ? data.postalCode : "الرمز البريدي"}
              </label>
              {!data && (
                <input
                  placeholder="10101010202"
                  className="w-full mt-2 p-2 rounded-lg bg-background"
                  value={formData.postalCode}
                  onChange={(e) => {
                    setFormData({ ...formData, postalCode: e.target.value });
                  }}
                />
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between w-full mt-4 gap-5 items-start">
            <div className="flex flex-col justify-center w-full items-start gap-2">
              <label>{data ? data.phone : "رقم الهاتف *"}</label>
              {!data && (
                <input
                  placeholder="01095762378"
                  className="w-full rounded-lg p-2 bg-background"
                  value={formData.phone}
                  onChange={(e) => {
                    setFormData({ ...formData, phone: e.target.value });
                  }}
                />
              )}
            </div>
            <div className="flex flex-col justify-center w-full items-start gap-2">
              <label>{data ? data.email : "البريد الإلكتروني"}</label>
              {!data && (
                <input
                  placeholder="contact@shop.com"
                  className="w-full rounded-lg p-2 bg-background"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                  }}
                />
              )}
            </div>
          </div>
        </div>
        <LocationSection
          data={data}
          setMapUrl={(url) => setFormData({ ...formData, mapUrl: url })}
        />

        <FormTitle image={"/assets/Time.png"} text={"ساعات العمل"} />
        <div className="w-full">
          <Times
            data={data}
            setWorkingHours={(hours) =>
              setFormData({ ...formData, workingHours: hours })
            }
          />
        </div>
        <FormTitle image={"/assets/Person.png"} text={"بيانات المالك"} />
        <div className="rounded-lg bg-backgroundDiv/95 p-4">
          <div className="relative w-full flex flex-col items-cenetr justify-center gap-2">
            <div className="flex justify-between w-full mt-4 gap-5 items-start">
              <div className="flex flex-col justify-center w-full items-start gap-2">
                <label>{data ? data.ownerName : "الاسم الكامل*"}</label>
                {!data && (
                  <input
                    placeholder="جون دو"
                    className="w-full rounded-lg p-2 bg-background"
                    value={formData.ownerName}
                    onChange={(e) => {
                      setFormData({ ...formData, ownerName: e.target.value });
                    }}
                  />
                )}
              </div>
              <div className="flex flex-col justify-center w-full items-start gap-2">
                <label>{data ? data.ownerRole : "الدور / الوظيفة"}</label>
                {!data && (
                  <input
                    placeholder="المالك"
                    className="w-full rounded-lg p-2 bg-background"
                    value={formData.ownerRole}
                    onChange={(e) => {
                      setFormData({ ...formData, ownerRole: e.target.value });
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        {!data && (
          <>
            <FormTitle image="/assets/Lock.png" text="بيانات تسجيل الدخول" />

            <div className="rounded-lg bg-backgroundDiv/95 p-4 flex flex-col gap-4">
              <div>
                <label>البريد الإلكتروني *</label>
                <input
                  type="email"
                  required
                  className="w-full p-2 mt-2 rounded-lg bg-background"
                  placeholder="topman@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label>كلمة المرور *</label>
                <input
                  type="password"
                  required
                  className="w-full p-2 mt-2 rounded-lg bg-background"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </>
        )}
        {!data && (
          <>
            <button
              type="submit"
              onClick={handleSubmit}
              className="px-4 py-2 rounded bg-brandColor text-base-light font-semibold"
            >
              سجل الان
            </button>
            {message && (
              <div
                className={`p-3 rounded-lg text-sm font-semibold ${
                  message.type === "success"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {message.text}
              </div>
            )}
          </>
        )}
      </form>
    </div>
  );
};

export default Register;
