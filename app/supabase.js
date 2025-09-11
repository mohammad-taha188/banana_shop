import { createClient } from "@supabase/supabase-js";
let supabaseInfo = {
  projectURL: "https://rrgpxlsfehaliddqwhsw.supabase.co",
  key: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJyZ3B4bHNmZWhhbGlkZHF3aHN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1Nzk0ODQsImV4cCI6MjA3MzE1NTQ4NH0.mPabBdhK_t1XA7qHae3qC0MIQW4YW0Fz73mv1Uv-14E",
};

export const supabase = createClient(supabaseInfo.projectURL, supabaseInfo.key);
