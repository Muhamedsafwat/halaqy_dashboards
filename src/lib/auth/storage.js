const USER_KEY = "user";

export const getUser = () => {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  }
  return null;
};

export const setUser = (user) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
};

export const clearAuth = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(USER_KEY);
  }
};

export const isAuthenticated = () => {
  return !!getUser();
};

export const getUserRole = () => {
  const user = getUser();
  return user?.role || null;
};

export const hasRole = (role) => {
  const userRole = getUserRole();
  return userRole === role;
};

export const hasAnyRole = (roles) => {
  const userRole = getUserRole();
  return roles.includes(userRole);
};
