import { useEffect, useState } from "react";
import { supabase } from "../utils/Supabase";

const Barbers = () => {
  const [barbers, setBarbers] = useState([]);

  useEffect(() => {
    const fetchBarbers = async () => {
      try {
        const { data, error } = await supabase.from("barbers").select("*");
        if (error) {
          throw error;
        }
        setBarbers(data);
      } catch (error) {
        console.error("Error fetching barbers:", error.message);
      }
    };
    fetchBarbers();
  }, []);
  return (
    <div>
      {barbers.map((barbers, index) => {
        return (
          <div key={index}>
            <ul>
              <li>{barbers.first_name}</li>
              <li>{barbers.last_name}</li>
              <li>{barbers.phone}</li>
              <li>{barbers.bio}</li>
              <li>{barbers.email}</li>
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default Barbers;
