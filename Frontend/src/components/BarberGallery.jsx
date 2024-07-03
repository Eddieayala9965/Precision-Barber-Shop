import React, { useEffect, useState } from "react";
import axios from "axios";
import { supabase } from "../utils/Supabase"; // Import the Supabase client

const BarberGallery = () => {
  const [barberData, setBarberData] = useState([]);

  useEffect(() => {
    const fetchBarberData = async () => {
      try {
        const barberResponse = await axios.get(
          "http://127.0.0.1:8000/barber_details"
        );
        const barberData = barberResponse.data.data;
        console.log("Fetched barber details:", barberData);

        const combinedData = await Promise.all(
          barberData.map(async (barber) => {
            const { data, error } = await supabase.storage
              .from("img")
              .list(barber.id, { limit: 9 });
            console.log("Fetched data for Barber ID", barber.id, ":", data);

            if (error) {
              console.error(
                "Error fetching data for Barber ID",
                barber.id,
                ":",
                error.message
              );
            }

            return {
              ...barber,
              image_url: data.length > 0 ? data[0].url : null,
            };
          })
        );

        console.log("Combined Data:", combinedData);
        setBarberData(combinedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchBarberData();
  }, []);

  return (
    <div>
      {barberData.map((barber) => (
        <div key={barber.id}>
          <h2>{barber.name}</h2>
          {barber.image_url && <img src={barber.image_url} alt={barber.name} />}
          <p>{barber.bio}</p>
          <p>{barber.instagram_link}</p>
        </div>
      ))}
    </div>
  );
};

export default BarberGallery;
