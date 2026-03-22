import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://thcizpaogyzviiqgimbu.supabase.co",
  "YOUR_ANON_KEY"
);
