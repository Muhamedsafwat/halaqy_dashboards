"use client";

import { useState } from "react";

const LocationSection = () => {
  const [coords, setCoords] = useState(null);

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
    }
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      setCoords({ latitude, longitude });
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <button
        type="button"
        onClick={getLocation}
        className="px-4 py-2 rounded bg-brandColor text-base-light font-semibold"
      >
        تحديد موقعي الحالي
      </button>

      {coords && (
        <iframe
          className="w-full h-64 rounded-lg border"
          src={`https://www.google.com/maps?q=${coords.latitude},${coords.longitude}&z=15&output=embed`}
          loading="lazy"
        />
      )}
    </div>
  );
};
export default LocationSection;
