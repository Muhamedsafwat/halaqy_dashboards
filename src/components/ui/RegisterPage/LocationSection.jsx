"use client";

import { useState } from "react";

const LocationSection = ({ setMapUrl, data }) => {
  const [coords, setCoords] = useState(null);

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      const url = `https://www.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;
      setCoords({ latitude, longitude });
      setMapUrl(url);
    });
  };

  return (
    <>
      {!data && (
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
      )}
      {data ? (
        <iframe
          className="w-full h-64 rounded-lg border"
          src={data.mapUrl}
          loading="lazy"
        />
      ) : (
        ""
      )}
    </>
  );
};
export default LocationSection;
