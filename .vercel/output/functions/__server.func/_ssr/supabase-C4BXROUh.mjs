import { c as createClient } from "../_libs/supabase__supabase-js.mjs";
const supabaseUrl = "";
const supabaseAnonKey = "";
const hasSupabaseConfig = Boolean(supabaseUrl);
const supabase = hasSupabaseConfig ? createClient(supabaseUrl, supabaseAnonKey) : null;
export {
  supabase as s
};
