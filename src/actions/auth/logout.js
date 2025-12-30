import { clearAuth } from "@/lib/auth/storage";

export const logout = () => {
  clearAuth();
  // TODO: Call logout API endpoint if needed
  // await fetch(API_ENDPOINT + '/logout', { method: 'POST' });
};
