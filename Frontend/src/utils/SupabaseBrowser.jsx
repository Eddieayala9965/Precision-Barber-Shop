import { createBrowserClient } from "@supabase/ssr";

export const supabaseSSR = createBrowserClient(
  `${import.meta.env.VITE_SUPABASE_URL}`,
  `${import.meta.env.VITE_SUPABASE_KEY}`
);
