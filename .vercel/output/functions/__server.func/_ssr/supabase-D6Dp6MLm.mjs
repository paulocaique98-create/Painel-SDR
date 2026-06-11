import { c as createClient } from "../_libs/supabase__supabase-js.mjs";
const supabaseUrl = "";
const supabaseAnonKey = "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);
export {
  supabase as s
};
