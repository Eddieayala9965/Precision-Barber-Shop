import { supabaseSSR } from "../utils/SupabaseBrowser";
import { useQuery } from "@tanstack/react-query";

const initUser = {
  created_at: "",
  first_name: "",
  last_name: "",
  email: "",
  id: "",
  gallery: "",
  profile_image: "",
};

const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const supabase = supabaseSSR();
      const { data } = await supabase.auth.getSession();
      if (data.session?.user) {
        const { data: user } = await supabase
          .from("barbers")
          .select("*")
          .eq("id", data.session.user.id)
          .single();

        return user;
      }
      return initUser;
    },
  });
};
export default useUser;
