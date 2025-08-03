import React from 'react';

interface LanguageModalProps {
  isOpen: boolean;
  onLanguageSelect: (language: string) => void;
  isDarkMode: boolean;
  t: (key: string) => string;
}

const LanguageModal: React.FC<LanguageModalProps> = ({
  isOpen,
  onLanguageSelect,
  isDarkMode,
  t,
}) => {
  if (!isOpen) return null;

  const languages = [
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
  ];

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
          {/* Content */}
          <div className="text-center">
            {/* Icon */}
            <div className="mb-6">
              <i
                className={`fas fa-globe text-4xl ${
                  isDarkMode ? 'text-[#FF6B6B]' : 'text-[#FF4B4B]'
                }`}
              ></i>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold mb-4">{t('chooseLanguage')}</h2>

            {/* Description */}
            <p
              className={`mb-6 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              {t('pleaseSelectLanguage')}
            </p>

            {/* Language Options */}
            <div className="space-y-3">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => onLanguageSelect(language.code)}
                  className={`w-full p-4 rounded-lg border-2 transition-all duration-300 transform hover:scale-105 cursor-pointer ${
                    isDarkMode
                      ? 'border-gray-600 hover:border-[#FF6B6B] hover:bg-[#3A3A50]'
                      : 'border-gray-200 hover:border-[#FF4B4B] hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-3">
                    <span className="text-2xl">{language.flag}</span>
                    <span className="font-semibold text-lg">
                      {language.name}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageModal;
