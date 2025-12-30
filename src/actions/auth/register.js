import { setUser } from "@/lib/auth/storage";

import Swal from "sweetalert2";
export const register = async (patientData, endpoint) => {
  try {
    const API_ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/auth/${endpoint}`;

    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patientData),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error:
          data.error?.message ||
          data.error ||
          "Registration failed. Please try again.",
      };
    }
    if (data?.data?.user) {
      setUser(data.data.user);
    }
    Swal.fire({
      icon: "success",
      title: "Registration Successful",
      text: `User has been registered successfully!`,
    });

    return {
      success: true,
      data: data.data,
      message: "User registered successfully",
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || "Registration failed. Please try again.",
    };
  }
};
