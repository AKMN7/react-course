import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://cbwthpnlibdoefohdvob.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNid3RocG5saWJkb2Vmb2hkdm9iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM0NDc1MjYsImV4cCI6MjAxOTAyMzUyNn0.pm4ZyBB7oEd1j6p5X4XOCjV5HIfGVgwgcjDrOcMaKyQ";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
