import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://thcizpaogyzviiqgimbu.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRoY2l6cGFvZ3l6dmlpcWdpbWJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQxNjQ1MjQsImV4cCI6MjA4OTc0MDUyNH0.tDCjkrYCUyeJtDLOyoD5j917UAOLAqf0BV4w5aw4mC4"
);
