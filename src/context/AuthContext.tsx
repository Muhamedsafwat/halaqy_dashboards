"use client";

// import { createContext, useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { login as loginAction } from "@/actions/auth/login";
// import { logout as logoutAction } from "@/actions/auth/logout";
// import { getUser } from "@/lib/auth/storage";
// import { register as registerAPI } from "@/actions/auth/register";
// import Swal from "sweetalert2";

// const AuthContext = createContext(undefined);

// export function AuthProvider({ children }) {
//   const router = useRouter();
//   const [user, setUser] = useState(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   useEffect(() => {
//     checkAuth();
//   }, []);

//   const checkAuth = () => {
//     try {
//       const userData = getUser();
//       if (userData) {
//         setUser(userData);
//         setIsAuthenticated(true);
//       } else {
//         setUser(null);
//         setIsAuthenticated(false);
//       }
//     } catch (error) {
//       console.error("Auth check error:", error);
//       setUser(null);
//       setIsAuthenticated(false);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const login = async (credentials, endpoint = "admin", redirectPath) => {
//     setIsSubmitting(true);

//     try {
//       const result = await loginAction(endpoint, credentials);

//       if (result.success) {
//         setUser(result.data.user);
//         setIsAuthenticated(true);

//         await Swal.fire({
//           icon: "success",
//           title: "Login Successful!",
//           text: "Redirecting to Dashboard...",
//           timer: 1500,
//           showConfirmButton: false,
//         });

//         router.push(redirectPath);

//         return { success: true };
//       } else {
//         Swal.fire({
//           icon: "error",
//           title: "Login Failed",
//           text: result.error,
//         });

//         return { success: false, error: result.error };
//       }
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "An unexpected error occurred. Please try again.",
//       });
//       return { success: false, error: error.message };
//     } finally {
//       setIsSubmitting(false);
//     }
//   };
//   const register = async (patientData, clinicSlug, endpoint) => {
//     setIsSubmitting(true);
//     try {
//       const result = await registerAPI(patientData, endpoint);

//       if (!result.success) {
//         return { success: false, error: result.error };
//       }

//       if (result.success) {
//         setUser(result.data.user);
//         setIsAuthenticated(true);
//       }

//       router.push(`/${clinicSlug}`);

//       return result;
//     } catch (error) {
//       return { success: false, error: error.message || "Registration failed" };
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const logout = async () => {
//     try {
//       const result = await Swal.fire({
//         title: "Are you sure?",
//         text: "You will be logged out of your account",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonColor: "#3085d6",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Yes, logout",
//         cancelButtonText: "Cancel",
//       });

//       if (result.isConfirmed) {
//         // Call logout action
//         logoutAction();

//         // Clear context state
//         setUser(null);
//         setIsAuthenticated(false);

//         // Show success message
//         await Swal.fire({
//           icon: "success",
//           title: "Logged Out",
//           text: "You have been successfully logged out",
//           timer: 1500,
//           showConfirmButton: false,
//         });

//         // Redirect to appropriate login page
//         router.push("/admin/login");
//       }
//     } catch (error) {
//       console.error("Logout error:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Failed to logout. Please try again.",
//       });
//     }
//   };

//   const updateUser = (updatedData) => {
//     const updated = { ...user, ...updatedData };
//     setUser(updated);
//     if (typeof window !== "undefined") {
//       localStorage.setItem("user", JSON.stringify(updated));
//     }
//   };

//   const value = {
//     user,
//     isAuthenticated,
//     isLoading,
//     isSubmitting,
//     login,
//     logout,
//     updateUser,
//     register,
//     checkAuth,
//     role: user?.role || null,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// }

// export default AuthContext;

// context/AuthContext.tsx

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type AuthContextType = {
  isAuth: boolean;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("isAuth");
    if (saved === "true") setIsAuth(true);
  }, []);

  const login = () => {
    setIsAuth(true);
    localStorage.setItem("isAuth", "true");
  };

  const logout = () => {
    setIsAuth(false);
    localStorage.setItem("isAuth", "false");
  };

  return (
    <AuthContext.Provider value={{ isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
