import React from "react";
import Image from "next/image";

const FormTitle = ({ image, text }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="p-2 bg-background/90 rounded-full">
        <Image
          src={image}
          width={25}
          height={25}
          alt="Image"
          className="object-contain rounded-lg"
        />
      </div>
      <p className="text-2xl font-semibold">{text}</p>
    </div>
  );
};

export default FormTitle;
