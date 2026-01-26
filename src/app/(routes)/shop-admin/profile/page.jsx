"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/services/SupaBaseClient";
import { useAuth } from "@/context/AuthContext";
import Swal from "sweetalert2";
import FormTitle from "@/components/shared/FormTitle/FormTitle";
import Image from "next/image";
import Times from "@/components/ui/RegisterPage/Times";

const ProfilePage = () => {
    const router = useRouter();
    const { user, shopId, setShopId, isAuth, isLoading } = useAuth();
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [logoPreview, setLogoPreview] = useState(null);
    const [coverPreview, setCoverPreview] = useState(null);
    const [logoFile, setLogoFile] = useState(null);
    const [coverFile, setCoverFile] = useState(null);
    const [isPromoting, setIsPromoting] = useState(false);

    const [formData, setFormData] = useState({
        shopName: "",
        shopSlogan: "",
        shopDescription: "",
        streetAddress: "",
        city: "",
        state: "",
        postalCode: "",
        phone: "",
        email: "",
        ownerName: "",
        ownerRole: "",
        workingHours: {},
        latitude: "",
        longitude: "",
    });

    useEffect(() => {
        if (!isLoading && !isAuth) {
            router.push("/login");
        }
    }, [isAuth, isLoading, router]);

    // Promote user to owner on mount if not already
    useEffect(() => {
        if (isAuth && user) {
            promoteToOwner();
        }
    }, [isAuth, user]);

    const promoteToOwner = async () => {
        if (isPromoting) return;

        setIsPromoting(true);
        try {
            const { error } = await supabase.rpc("promote_me_to_owner");
            if (error) {
                console.error("Error promoting to owner:", error);
                // Show error if it's not just "already owner" type error
                if (!error.message?.includes("already") && !error.message?.includes("exists")) {
                    await Swal.fire({
                        icon: "warning",
                        title: "تحذير",
                        text: "حدث خطأ أثناء تعيين الدور. سيتم المحاولة مرة أخرى عند الحفظ.",
                    });
                }
            } else {
                // Refresh user data after promotion
                const { data: session } = await supabase.auth.getSession();
                if (session?.session) {
                    // The role will be updated in the next auth state change
                }
            }
        } catch (error) {
            console.error("Error promoting to owner:", error);
        } finally {
            setIsPromoting(false);
        }
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
            // Step 1: Verify session is available before calling RPC
            const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

            if (sessionError || !sessionData.session) {
                setMessage({
                    type: "error",
                    text: "جلسة المستخدم غير متاحة. يرجى تسجيل الدخول مرة أخرى.",
                });
                setLoading(false);
                await Swal.fire({
                    icon: "error",
                    title: "خطأ",
                    text: "جلسة المستخدم غير متاحة. يرجى تسجيل الدخول مرة أخرى.",
                });
                router.push("/login");
                return;
            }

            // Step 2: Always ensure user is promoted to owner before creating shop
            // This must be done client-side to ensure the session is available
            console.log("Calling promote_me_to_owner RPC...");
            console.log("Session available:", !!sessionData.session);
            console.log("User ID:", sessionData.session?.user?.id);

            const { data: promoteData, error: promoteError } = await supabase.rpc("promote_me_to_owner");

            console.log("Promote RPC result:", { promoteData, promoteError });

            if (promoteError) {
                // If promotion fails, check if it's because user is already owner
                // or if it's a real error
                if (!promoteError.message?.includes("already") &&
                    !promoteError.message?.includes("exists") &&
                    !promoteError.message?.includes("profile not found")) {
                    setMessage({
                        type: "error",
                        text: promoteError.message || "فشل تعيين دور المستخدم",
                    });
                    setLoading(false);
                    await Swal.fire({
                        icon: "error",
                        title: "خطأ",
                        text: promoteError.message || "فشل تعيين دور المستخدم. يرجى المحاولة مرة أخرى.",
                    });
                    return;
                }
                // If it's "already owner" or "profile not found", continue anyway
                // The RPC might handle profile creation internally
            }

            // Wait a moment for the promotion to take effect
            await new Promise(resolve => setTimeout(resolve, 500));

            // Step 3: Validate coordinates
            const latitude = parseFloat(formData.latitude);
            const longitude = parseFloat(formData.longitude);

            if (!formData.latitude || !formData.longitude || isNaN(latitude) || isNaN(longitude)) {
                setMessage({
                    type: "error",
                    text: "يرجى إدخال خط العرض وخط الطول بشكل صحيح",
                });
                setLoading(false);
                await Swal.fire({
                    icon: "error",
                    title: "خطأ",
                    text: "يرجى إدخال خط العرض وخط الطول بشكل صحيح",
                });
                return;
            }

            if (latitude < -90 || latitude > 90) {
                setMessage({
                    type: "error",
                    text: "خط العرض يجب أن يكون بين -90 و 90",
                });
                setLoading(false);
                await Swal.fire({
                    icon: "error",
                    title: "خطأ",
                    text: "خط العرض يجب أن يكون بين -90 و 90",
                });
                return;
            }

            if (longitude < -180 || longitude > 180) {
                setMessage({
                    type: "error",
                    text: "خط الطول يجب أن يكون بين -180 و 180",
                });
                setLoading(false);
                await Swal.fire({
                    icon: "error",
                    title: "خطأ",
                    text: "خط الطول يجب أن يكون بين -180 و 180",
                });
                return;
            }

            // Step 4: Create or update shop using upsert_my_shop RPC
            const { data: newShopId, error: shopError } = await supabase.rpc(
                "upsert_my_shop",
                {
                    p_name: formData.shopName,
                    p_description: formData.shopDescription || "",
                    p_address_text: formData.streetAddress,
                    p_latitude: latitude,
                    p_longitude: longitude,
                    p_seat_count: null,
                }
            );

            if (shopError || !newShopId) {
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

            // Step 5: Upload images to shop-photos bucket
            const logoUrl = await uploadImage(logoFile, newShopId);
            const coverUrl = await uploadImage(coverFile, newShopId);

            // Step 6: Set shop schedule using set_shop_schedule RPC
            const schedule = convertWorkingHours(formData.workingHours);
            const { error: scheduleError } = await supabase.rpc("set_shop_schedule", {
                p_shop_id: newShopId,
                p_days: schedule,
            });

            if (scheduleError) {
                console.error("Schedule error:", scheduleError);
                // Continue anyway - schedule can be set later
            }

            // Step 6: Store shopId in context
            setShopId(newShopId);

            // Step 7: Show success message and redirect
            await Swal.fire({
                icon: "success",
                title: "تم الحفظ بنجاح!",
                text: "تم حفظ بيانات المتجر بنجاح",
                timer: 2000,
                showConfirmButton: false,
            });

            router.push("/shop-admin");
        } catch (error) {
            console.error("Profile save error:", error);
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

    if (isLoading || isPromoting) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-base-light">جاري التحميل...</p>
            </div>
        );
    }

    if (!isAuth) {
        return null;
    }

    return (
        <div className="container text-base-light mt-10 flex flex-col justify-center text-start">
            <p className="lg:text-4xl text-2xl font-bold">لنقم بإعداد متجرك</p>
            <p className="text-base font-semibold text-brandColor mt-2">
                سجّل تفاصيل متجرك لبدء إدارة أعمالك.
            </p>
            <div className="border border-borderColorv4 my-4" />

            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
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
                                value={formData.shopName}
                                onChange={(e) =>
                                    setFormData({ ...formData, shopName: e.target.value })
                                }
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
                                value={formData.shopSlogan}
                                onChange={(e) =>
                                    setFormData({ ...formData, shopSlogan: e.target.value })
                                }
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
                            rows={3}
                            value={formData.shopDescription}
                            onChange={(e) =>
                                setFormData({ ...formData, shopDescription: e.target.value })
                            }
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
                                accept="image/*"
                                onChange={handleLogoChange}
                            />
                            <div
                                className={`w-32 ${logoPreview ? "border-none" : ""
                                    } h-32 rounded-full overflow-hidden border-2 border-dashed border-base-dark bg-background flex items-center justify-center`}
                            >
                                {logoPreview ? (
                                    <img
                                        src={logoPreview}
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
                        <p className="text-sm text-brandColor font-semibold">
                            PNG, JPG حتى 2 ميجابايت
                        </p>
                    </div>

                    <div className="flex flex-col w-full justify-center gap-2 items-center md:items-start">
                        <label>صورة الغلاف</label>
                        <div className="relative w-full mt-4">
                            <input
                                type="file"
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                accept="image/*"
                                onChange={handleCoverChange}
                            />
                            <div
                                className={`w-full ${coverPreview ? "h-64 border-none" : "h-32"
                                    } rounded-lg overflow-hidden border-2 border-dashed border-base-dark bg-background flex flex-col items-center justify-center gap-2`}
                            >
                                {coverPreview ? (
                                    <img
                                        src={coverPreview}
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
                                        <p className="md:text-lg text-base text-center md:text-start font-semibold text-brandColor">
                                            اضغط لرفع صورة الغلاف
                                        </p>
                                    </>
                                )}
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
                            <input
                                className="outline-none flex-1"
                                placeholder="123 شارع الحلاق"
                                value={formData.streetAddress}
                                onChange={(e) =>
                                    setFormData({ ...formData, streetAddress: e.target.value })
                                }
                            />
                        </div>
                    </div>
                    <div className="flex md:flex-row flex-col w-full mt-4 gap-4">
                        <div className="w-full md:w-full">
                            <label className="block">المدينة</label>
                            <input
                                placeholder="القاهرة"
                                className="w-full mt-2 p-2 rounded-lg bg-background"
                                value={formData.city}
                                onChange={(e) => {
                                    setFormData({ ...formData, city: e.target.value });
                                }}
                            />
                        </div>

                        <div className="w-full">
                            <label className="block">المحافظة / الولاية</label>
                            <input
                                placeholder="الجيزة"
                                className="w-full mt-2 p-2 rounded-lg bg-background"
                                value={formData.state}
                                onChange={(e) => {
                                    setFormData({ ...formData, state: e.target.value });
                                }}
                            />
                        </div>

                        <div className="w-full md:w-full">
                            <label className="block">الرمز البريدي</label>
                            <input
                                placeholder="10101010202"
                                className="w-full mt-2 p-2 rounded-lg bg-background"
                                value={formData.postalCode}
                                onChange={(e) => {
                                    setFormData({ ...formData, postalCode: e.target.value });
                                }}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between w-full mt-4 gap-5 items-start">
                        <div className="flex flex-col justify-center w-full items-start gap-2">
                            <label>رقم الهاتف *</label>
                            <input
                                placeholder="01095762378"
                                className="w-full rounded-lg p-2 bg-background"
                                value={formData.phone}
                                onChange={(e) => {
                                    setFormData({ ...formData, phone: e.target.value });
                                }}
                            />
                        </div>
                        <div className="flex flex-col justify-center w-full items-start gap-2">
                            <label>البريد الإلكتروني</label>
                            <input
                                placeholder="contact@shop.com"
                                className="w-full rounded-lg p-2 bg-background"
                                value={formData.email}
                                onChange={(e) => {
                                    setFormData({ ...formData, email: e.target.value });
                                }}
                            />
                        </div>
                    </div>
                </div>

                <FormTitle
                    image={"/assets/Location.png"}
                    text={"إحداثيات الموقع"}
                />
                <div className="rounded-lg bg-backgroundDiv/95 p-4">
                    <div className="flex md:flex-row flex-col w-full gap-4">
                        <div className="w-full md:w-1/2">
                            <label className="block text-base font-semibold mb-2">
                                خط العرض (Latitude) *
                            </label>
                            <input
                                type="number"
                                step="any"
                                placeholder="30.0444"
                                className="w-full mt-2 p-2 rounded-lg bg-background"
                                value={formData.latitude}
                                onChange={(e) => {
                                    setFormData({ ...formData, latitude: e.target.value });
                                }}
                                required
                            />
                            <p className="text-xs text-base-light/60 mt-1">
                                يجب أن يكون بين -90 و 90
                            </p>
                        </div>

                        <div className="w-full md:w-1/2">
                            <label className="block text-base font-semibold mb-2">
                                خط الطول (Longitude) *
                            </label>
                            <input
                                type="number"
                                step="any"
                                placeholder="31.2357"
                                className="w-full mt-2 p-2 rounded-lg bg-background"
                                value={formData.longitude}
                                onChange={(e) => {
                                    setFormData({ ...formData, longitude: e.target.value });
                                }}
                                required
                            />
                            <p className="text-xs text-base-light/60 mt-1">
                                يجب أن يكون بين -180 و 180
                            </p>
                        </div>
                    </div>
                </div>

                <FormTitle image={"/assets/Time.png"} text={"ساعات العمل"} />
                <div className="w-full">
                    <Times
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
                                <label>الاسم الكامل*</label>
                                <input
                                    placeholder="جون دو"
                                    className="w-full rounded-lg p-2 bg-background"
                                    value={formData.ownerName}
                                    onChange={(e) => {
                                        setFormData({ ...formData, ownerName: e.target.value });
                                    }}
                                />
                            </div>
                            <div className="flex flex-col justify-center w-full items-start gap-2">
                                <label>الدور / الوظيفة</label>
                                <input
                                    placeholder="المالك"
                                    className="w-full rounded-lg p-2 bg-background"
                                    value={formData.ownerRole}
                                    onChange={(e) => {
                                        setFormData({ ...formData, ownerRole: e.target.value });
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

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

                <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 rounded bg-brandColor text-base-light font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? "جاري الحفظ..." : shopId ? "تحديث بيانات المتجر" : "إنشاء المتجر"}
                </button>
            </form>
        </div>
    );
};

export default ProfilePage;
