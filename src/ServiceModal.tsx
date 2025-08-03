import React from 'react';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

const ServiceModal: React.FC<ServiceModalProps> = ({
  isOpen,
  onClose,
  isDarkMode,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>

      {/* Modal */}
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
        <div
          className={`relative w-full max-w-md p-6 mx-auto rounded-xl shadow-xl transition-all ${
            isDarkMode ? 'bg-[#2A2A40] text-white' : 'bg-white text-gray-800'
          }`}
        >
          {/* Close button */}
          <div className="absolute right-4 top-4">
            <button
              onClick={onClose}
              className={`text-gray-400 hover:text-gray-500 cursor-pointer ${
                isDarkMode ? 'hover:text-white' : 'hover:text-gray-700'
              }`}
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>

          {/* Content */}
          <div className="text-center">
            {/* Icon */}
            <div className="mb-6">
              <i
                className={`fas fa-home text-4xl ${
                  isDarkMode ? 'text-[#FF6B6B]' : 'text-[#FF4B4B]'
                }`}
              ></i>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold mb-4">Eve Servis İmkanları</h2>

            {/* Description */}
            <p
              className={`mb-6 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              Cuma, Cumartesi ve Pazar günleri evinize kadar geliyoruz! Detaylı
              bilgi için bizi arayın.
            </p>

            {/* Phone number */}
            <div
              className={`p-3 rounded-lg mb-6 ${
                isDarkMode ? 'bg-[#3A3A50]' : 'bg-gray-100'
              }`}
            >
              <p className="font-semibold">+49 176 323 002 30</p>
            </div>

            {/* OK button */}
            <button
              onClick={onClose}
              className={`w-full py-3 px-6 rounded-button text-white font-semibold transition-all duration-300 transform hover:scale-105 cursor-pointer ${
                isDarkMode
                  ? 'bg-[#FF6B6B] hover:bg-[#FF5151]'
                  : 'bg-[#FF4B4B] hover:bg-[#E43535]'
              }`}
            >
              Tamam
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceModal;
