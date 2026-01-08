import { createClient } from "@supabase/supabase-js";
const SupaBase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
);
export default SupaBase;
