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
            const { data: files, error } = await supabase.storage
              .from("img")
              .list(barber.id); // Fetch all images for each barber

            if (error) {
              console.error(
                "Error fetching data for Barber ID",
                barber.id,
                ":",
                error.message
              );
              return { ...barber, images: [] };
            }

            const image_urls = files.map((file) => {
              const publicURL = `https://juowekkvvwyquoqoarfr.supabase.co/storage/v1/object/public/img/${barber.id}/${file.name}`;
              console.log(`Image URL for barber ${barber.id}:`, publicURL);
              return publicURL;
            });

            return {
              ...barber,
              images: image_urls,
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
          {barber.images.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`${barber.name} image ${index + 1}`}
            />
          ))}
          <p>{barber.bio}</p>
          <p>{barber.instagram_link}</p>
        </div>
      ))}
    </div>
  );
};

export default BarberGallery;
