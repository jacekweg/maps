import React from "react";

export default function Info({ message }) {
  return (
    <div className="w-screen h-screen bg-gray-800">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <p className="text-white">{message}</p>
      </div>
    </div>
  );
}
