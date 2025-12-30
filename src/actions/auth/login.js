import { setUser } from "@/lib/auth/storage";

export const login = async (endpoint, credentials) => {
  try {
    const API_ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/auth/${endpoint}`;

    // Build request body based on provided credentials
    const body = { ...credentials };

    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      credentials: "include",
    });
    const awaitedRes = await response.json();

    if (!awaitedRes.success) {
      throw new Error(
        awaitedRes.error.message || "Login failed. Please try again."
      );
    }

    if (awaitedRes?.data?.user) {
      setUser(awaitedRes.data.user);
    }
    return {
      success: true,
      data: awaitedRes.data,
      message: awaitedRes.data.message || "Login successful",
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || "An unexpected error occurred",
    };
  }
};
