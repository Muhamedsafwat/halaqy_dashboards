"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/services/SupaBaseClient";
import { register as registerAction } from "@/actions/auth/register";
import { useAuth } from "@/context/AuthContext";
import Swal from "sweetalert2";

import FormTitle from "@/components/shared/FormTitle/FormTitle";
import Image from "next/image";
import LocationSection from "@/components/ui/RegisterPage/LocationSection";
import Times from "@/components/ui/RegisterPage/Times";


const Register = ({ data }) => {
  const router = useRouter();
  const { setShopId } = useAuth();
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

  // Extract latitude and longitude from map URL
  const extractCoordinates = (mapUrl) => {
    if (!mapUrl) return { latitude: null, longitude: null };

    try {
      const match = mapUrl.match(/q=([\d.]+),([\d.]+)/);
      if (match) {
        return {
          latitude: parseFloat(match[1]),
          longitude: parseFloat(match[2]),
        };
      }
    } catch (error) {
      console.error("Error extracting coordinates:", error);
    }
    return { latitude: null, longitude: null };
  };

  // Convert working hours from Arabic day names to RPC format
  const convertWorkingHours = (workingHours) => {
    const dayMapping = {
      الأحد: 0, // Sunday
      الاثنين: 1, // Monday
      الثلاثاء: 2, // Tuesday
      الأربعاء: 3, // Wednesday
      الخميس: 4, // Thursday
      الجمعة: 5, // Friday
      السبت: 6, // Saturday
    };

    const schedule = [];

    Object.keys(dayMapping).forEach((arabicDay) => {
      const dayData = workingHours[arabicDay];
      const dayOfWeek = dayMapping[arabicDay];

      if (dayData && dayData.open && dayData.close) {
        schedule.push({
          day_of_week: dayOfWeek,
          open_time: dayData.open,
          close_time: dayData.close,
          is_closed: false,
        });
      } else {
        schedule.push({
          day_of_week: dayOfWeek,
          is_closed: true,
        });
      }
    });

    return schedule;
  };

  const uploadImage = async (file, shopId) => {
    if (!file || !shopId) return null;

    try {
      const fileExtension = file.name.split(".").pop();
      const filePath = `${shopId}/${crypto.randomUUID()}.${fileExtension}`;

      const { error } = await supabase.storage
        .from("shop-photos")
        .upload(filePath, file);

      if (error) {
        console.error("Upload error:", error);
        return null;
      }

      const { data } = supabase.storage
        .from("shop-photos")
        .getPublicUrl(filePath);

      return data?.publicUrl || null;
    } catch (error) {
      console.error("Upload error:", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // Step 1: Register user and promote to owner
      const registerResult = await registerAction(email, password);

      if (!registerResult.success) {
        setMessage({ type: "error", text: registerResult.error });
        setLoading(false);
        await Swal.fire({
          icon: "error",
          title: "فشل التسجيل",
          text: registerResult.error || "حدث خطأ أثناء التسجيل",
        });
        return;
      }

      // Step 2: Extract coordinates from map URL
      const { latitude, longitude } = extractCoordinates(formData.mapUrl);

      if (!latitude || !longitude) {
        setMessage({
          type: "error",
          text: "يرجى تحديد موقع المتجر على الخريطة",
        });
        setLoading(false);
        await Swal.fire({
          icon: "error",
          title: "خطأ",
          text: "يرجى تحديد موقع المتجر على الخريطة",
        });
        return;
      }

      // Step 3: Create shop using upsert_my_shop RPC
      const { data: shopId, error: shopError } = await supabase.rpc(
        "upsert_my_shop",
        {
          p_name: formData.shopName,
          p_description: formData.shopDescription || "",
          p_address_text: formData.streetAddress,
          p_latitude: latitude,
          p_longitude: longitude,
          p_seat_count: null, // Add if you have seat count field
        }
      );

      if (shopError || !shopId) {
        setMessage({
          type: "error",
          text: shopError?.message || "فشل إنشاء المتجر",
        });
        setLoading(false);
        await Swal.fire({
          icon: "error",
          title: "خطأ",
          text: shopError?.message || "فشل إنشاء المتجر",
        });
        return;
      }

      // Step 4: Upload images to shop-photos bucket
      const logoUrl = await uploadImage(logoFile, shopId);
      const coverUrl = await uploadImage(coverFile, shopId);

      // Step 5: Set shop schedule using set_shop_schedule RPC
      const schedule = convertWorkingHours(formData.workingHours);
      const { error: scheduleError } = await supabase.rpc("set_shop_schedule", {
        p_shop_id: shopId,
        p_days: schedule,
      });

      if (scheduleError) {
        console.error("Schedule error:", scheduleError);
        // Continue anyway - schedule can be set later
      }

      // Step 6: Store shopId in context
      setShopId(shopId);

      // Step 7: Show success message and redirect
      await Swal.fire({
        icon: "success",
        title: "تم التسجيل بنجاح!",
        text: "تم إنشاء حسابك ومتجرك بنجاح",
        timer: 2000,
        showConfirmButton: false,
      });

      router.push("/shop-admin");
    } catch (error) {
      console.error("Registration error:", error);
      setMessage({
        type: "error",
        text: error.message || "حدث خطأ غير متوقع",
      });
      await Swal.fire({
        icon: "error",
        title: "خطأ",
        text: error.message || "حدث خطأ غير متوقع",
      });
    } finally {
      setLoading(false);
    }
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
                    src={data?.logoUrl || logoPreview}
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
                    src={data?.coverUrl || coverPreview}
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
              disabled={loading}
              className="px-4 py-2 rounded bg-brandColor text-base-light font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "جاري التسجيل..." : "سجل الان"}
            </button>
            {message && (
              <div
                className={`p-3 rounded-lg text-sm font-semibold ${message.type === "success"
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
