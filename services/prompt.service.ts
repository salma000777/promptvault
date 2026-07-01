import { createClient } from "@/utils/supabase/server";

export async function getSupabase() {
  return await createClient();
}