import { createClient } from "@supabase/supabase-js";
import { createBrowserClient } from "@supabase/ssr";

export const supabase = createClient(
  `${import.meta.env.VITE_SUPABASE_URL}`,
  `${import.meta.env.VITE_SUPABASE_KEY}`
);

export const supabaseSSR = createBrowserClient(
  `${import.meta.env.VITE_SUPABASE_URL}`,
  `${import.meta.env.VITE_SUPABASE_KEY}`
);
