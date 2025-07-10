import React from 'react';

export default function ImageModal({ isOpen, onClose, imageSrc, altText }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-[90%] max-h-[90%]">
        <img
          src={imageSrc}
          alt={altText}
          className="max-w-full max-h-[70vh] object-contain rounded-md"
        />
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Kapat
        </button>
      </div>
    </div>
  );
}
