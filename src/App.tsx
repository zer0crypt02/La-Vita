// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useEffect, useRef } from 'react';
import ImageModal from './ImageModal'; // ← JSX dosyasıysa, uzantı yazmana gerek yok
import ServiceModal from './ServiceModal'; // ← TSX dosyasıysa, yine uzantıya gerek yok
import LanguageModal from './LanguageModal';
import { useTranslation } from './useTranslation';
import * as echarts from 'echarts';

const App: React.FC = () => {
  const { currentLanguage, changeLanguage, t, isTranslating } =
    useTranslation();
  const [showLanguageModal, setShowLanguageModal] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [currentMenu, setCurrentMenu] = useState('icecream');
  const [animatedElements, setAnimatedElements] = useState<Set<string>>(
    new Set()
  );
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedAlt, setSelectedAlt] = useState('');

  const [showBellMessage, setShowBellMessage] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleLanguageSelect = async (language: string) => {
    console.log('Language selected:', language);
    setShowLanguageModal(false);
    console.log('Language modal closed');
    await changeLanguage(language);
    console.log('Language changed');
    // Dil seçildikten sonra yükleme ekranını başlat
    setIsLoading(true);
    console.log('Loading started');
    setTimeout(() => {
      setIsLoading(false);
      console.log('Loading finished');
      // Yüklenme ekranından sonra servis modal'ını göster
      setTimeout(() => {
        setShowServiceModal(true);
        console.log('Service modal opened');
      }, 500);
    }, 2500);
  };
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<{ [key: string]: number }>(
    {}
  );

  const [deliveryOption, setDeliveryOption] = useState('delivery');
  const [orderTotal, setOrderTotal] = useState(0);
  const menuItems = {
    icecream: [
      {
        id: 'vanilla',
        name: 'Classic Vanilla Bean',
        price: 3.5,
        image:
          'https://readdy.ai/api/search-image?query=Creamy%20vanilla%20bean%20gelato%20scoop%20in%20a%20waffle%20cone%20against%20a%20neutral%20background%2C%20showing%20rich%20texture%20with%20visible%20vanilla%20bean%20specks%2C%20professional%20food%20photography%20with%20soft%20natural%20lighting&width=100&height=100&seq=vanilla2&orientation=squarish',
      },
      {
        id: 'chocolate',
        name: 'Rich Chocolate',
        price: 3.5,
        image:
          'https://readdy.ai/api/search-image?query=Rich%20dark%20chocolate%20gelato%20scoop%20in%20an%20elegant%20glass%20bowl%20against%20a%20neutral%20background%2C%20showing%20velvety%20texture%20and%20deep%20color%2C%20professional%20food%20photography%20with%20soft%20natural%20lighting&width=100&height=100&seq=choco2&orientation=squarish',
      },
      {
        id: 'pistachio',
        name: 'Pistachio Dream',
        price: 4.0,
        image:
          'https://readdy.ai/api/search-image?query=Pistachio%20gelato%20scoop%20with%20visible%20nut%20pieces%20in%20a%20white%20ceramic%20bowl%20against%20a%20neutral%20background%2C%20showing%20creamy%20texture%20and%20pale%20green%20color%2C%20professional%20food%20photography%20with%20soft%20natural%20lighting&width=100&height=100&seq=pistachio2&orientation=squarish',
      },
    ],
  };
  const handleQuantityChange = (itemId: string, quantity: number) => {
    setSelectedItems((prev) => ({
      ...prev,
      [itemId]: Math.max(0, quantity),
    }));
  };
  const calculateTotal = () => {
    let total = 0;
    Object.entries(selectedItems).forEach(([itemId, quantity]) => {
      const item = menuItems.icecream.find((item) => item.id === itemId);
      if (item) {
        total += item.price * quantity;
      }
    });
    setOrderTotal(total);
  };
  useEffect(() => {
    calculateTotal();
  }, [selectedItems]);
  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the order submission
    setIsOrderModalOpen(false);
    // Show success message or handle further processing
  };

  // Refs for scroll reveal animations
  const heroRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLDivElement>(null);
  const contactFormRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  // Split text animation function
  const splitTextAnimation = (element: HTMLElement) => {
    if (!element || animatedElements.has(element.id)) return;
    const text = element.innerText;
    element.innerHTML = '';
    text.split('').forEach((char, index) => {
      const span = document.createElement('span');
      span.innerText = char === ' ' ? '\u00A0' : char;
      span.style.opacity = '0';
      span.style.transform = 'translateY(20px)';
      span.style.display = 'inline-block';
      span.style.transition = `opacity 0.5s ease ${
        index * 0.03
      }s, transform 0.5s ease ${index * 0.03}s`;
      element.appendChild(span);
      setTimeout(() => {
        span.style.opacity = '1';
        span.style.transform = 'translateY(0)';
      }, 10);
    });
    setAnimatedElements((prev) => new Set(prev).add(element.id));
  };
  // Blur text animation function
  const blurTextAnimation = (element: HTMLElement) => {
    if (!element || animatedElements.has(element.id)) return;
    element.style.filter = 'blur(8px)';
    element.style.opacity = '0';
    element.style.transition = 'filter 1s ease, opacity 1s ease';
    setTimeout(() => {
      element.style.filter = 'blur(0)';
      element.style.opacity = '1';
    }, 100);
    setAnimatedElements((prev) => new Set(prev).add(element.id));
  };
  // Scroll reveal function
  const scrollReveal = () => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px',
      }
    );
    document.querySelectorAll('.reveal-item').forEach((el) => {
      observer.observe(el);
    });
    [
      heroRef,
      categoriesRef,
      testimonialsRef,
      menuItemsRef,
      contactFormRef,
      mapRef,
      faqRef,
    ].forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });
  };
  // Initialize animations
  useEffect(() => {
    // Initialize animations after loading screen
    if (!isLoading) {
      // Apply split text animation to main headings
      const headings = document.querySelectorAll('.split-text');
      headings.forEach((heading) => {
        if (heading instanceof HTMLElement) {
          heading.id =
            heading.id ||
            `split-text-${Math.random().toString(36).substr(2, 9)}`;
          splitTextAnimation(heading);
        }
      });
      // Apply blur text animation to paragraphs
      const paragraphs = document.querySelectorAll('.blur-text');
      paragraphs.forEach((paragraph) => {
        if (paragraph instanceof HTMLElement) {
          paragraph.id =
            paragraph.id ||
            `blur-text-${Math.random().toString(36).substr(2, 9)}`;
          blurTextAnimation(paragraph);
        }
      });
      // Trigger initial reveal for elements in viewport
      scrollReveal();
    }
  }, [isLoading, activeTab]);
  // Add base styles for reveal animations
  const style = document.createElement('style');
  style.textContent = `
.reveal-item, [ref] {
opacity: 0;
transform: translateY(30px);
transition: opacity 0.8s ease, transform 0.8s ease;
}
.reveal-visible {
opacity: 1 !important;
transform: translateY(0) !important;
}
`;
  document.head.appendChild(style);
  // Initialize scroll reveal elements
  document.querySelectorAll('.reveal-item').forEach((el) => {
    if (el instanceof HTMLElement) {
      el.classList.add('reveal-item');
    }
  });
  // Initialize scroll reveal
  useEffect(() => {
    if (!isLoading) {
      // Apply split text animation to main headings
      const headings = document.querySelectorAll('.split-text');
      headings.forEach((heading) => {
        if (heading instanceof HTMLElement) {
          heading.id =
            heading.id ||
            `split-text-${Math.random().toString(36).substr(2, 9)}`;
          splitTextAnimation(heading);
        }
      });
      // Apply blur text animation to paragraphs
      const paragraphs = document.querySelectorAll('.blur-text');
      paragraphs.forEach((paragraph) => {
        if (paragraph instanceof HTMLElement) {
          paragraph.id =
            paragraph.id ||
            `blur-text-${Math.random().toString(36).substr(2, 9)}`;
          blurTextAnimation(paragraph);
        }
      });
      // Add scroll event listener
      window.addEventListener('scroll', scrollReveal);
      scrollReveal(); // Initial check
      // Cleanup
      return () => {
        window.removeEventListener('scroll', scrollReveal);
      };
    }
  }, [isLoading, activeTab, scrollReveal]);
  useEffect(() => {
    if (activeTab === 'contact') {
      const chartDom = document.getElementById('visitorsChart');
      if (chartDom) {
        const myChart = echarts.init(chartDom);
        const option = {
          animation: false,
          color: isDarkMode ? ['#FF6B6B', '#98FF98'] : ['#FF4B4B', '#4CAF50'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow',
            },
          },
          legend: {
            data: ['Weekday', 'Weekend'],
            textStyle: {
              color: isDarkMode ? '#FFFFFF' : '#333333',
            },
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
          },
          xAxis: {
            type: 'category',
            data: ['Morning', 'Noon', 'Afternoon', 'Evening'],
            axisLine: {
              lineStyle: {
                color: isDarkMode ? '#FFFFFF' : '#333333',
              },
            },
            axisLabel: {
              color: isDarkMode ? '#FFFFFF' : '#333333',
            },
          },
          yAxis: {
            type: 'value',
            name: 'Visitors',
            axisLine: {
              lineStyle: {
                color: isDarkMode ? '#FFFFFF' : '#333333',
              },
            },
            axisLabel: {
              color: isDarkMode ? '#FFFFFF' : '#333333',
            },
          },
          series: [
            {
              name: 'Weekday',
              type: 'bar',
              data: [25, 52, 45, 80],
            },
            {
              name: 'Weekend',
              type: 'bar',
              data: [45, 80, 90, 120],
            },
          ],
        };
        myChart.setOption(option);
        return () => {
          myChart.dispose();
        };
      }
    }
  }, [activeTab, isDarkMode]);
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  const renderHome = () => (
    <div className="flex flex-col">
      {/* Hero Section */}
      <div
        ref={heroRef}
        className="relative h-[600px] overflow-hidden"
        style={{
          opacity: 0,
          transform: 'translateY(30px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
        }}
      >
        <div className="absolute inset-0 z-0">
          <img
            src="https://readdy.ai/api/search-image?query=A%20luxurious%20display%20of%20artisanal%20gelato%20in%20various%20vibrant%20colors%20arranged%20in%20an%20elegant%20Italian%20ice%20cream%20shop%20counter%2C%20with%20soft%20focus%20background%20of%20a%20cozy%20cafe%20interior%2C%20high-end%20professional%20food%20photography%20with%20perfect%20lighting&width=1440&height=600&seq=hero1&orientation=landscape"
            alt="Main Picture"
            className="w-full h-full object-cover object-top"
          />
          <div
            className={`absolute inset-0 ${
              isDarkMode ? 'bg-black/50' : 'bg-black/30'
            }`}
          ></div>
        </div>
        <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
          <div className="max-w-2xl animate-fade-in">
            <RGBTextAnimation
              text={t('welcome')}
              className="text-5xl md:text-6xl font-bold mb-4"
            />

            <RGBTextAnimation
              text={t('eisCafe')}
              className="text-5xl md:text-6xl font-bold mb-4"
            />

            <RGBTextAnimation
              text={t('laVita')}
              className="text-5xl md:text-6xl font-bold mb-4"
            />

            <div className="text-2xl font-extrabold mb-8">
              <RGBTextAnimation2 text={t('heroSubtitle')} />
            </div>

            <button
              id="orderNowBtn"
              onClick={() => {
                setActiveTab('contact');
                document
                  .getElementById('contact-heading')
                  ?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-[#FF4B4B] hover:bg-[#E43535] text-white py-3 px-8 rounded-button text-lg font-semibold transition-all duration-300 transform hover:scale-105 cursor-pointer whitespace-nowrap"
            >
              {t('contactUs')}
            </button>
            {isOrderModalOpen && (
              <div className="fixed inset-0 z-50 overflow-y-auto">
                <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>
                <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
                  <div
                    className={`relative w-full max-w-4xl p-6 mx-auto rounded-xl shadow-xl transition-all ${
                      isDarkMode
                        ? 'bg-[#2A2A40] text-white'
                        : 'bg-white text-gray-800'
                    }`}
                  >
                    <div className="absolute right-4 top-4">
                      <button
                        onClick={() => setIsOrderModalOpen(false)}
                        className="text-gray-400 hover:text-gray-500 cursor-pointer"
                      >
                        <i className="fas fa-times text-xl"></i>
                      </button>
                    </div>
                    <h2 className="text-2xl font-bold mb-6">
                      Place Your Order
                    </h2>
                    <form onSubmit={handleOrderSubmit} className="space-y-6">
                      {/* Menu Selection */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div
                          className={`p-4 rounded-lg ${
                            isDarkMode ? 'bg-[#3A3A50]' : 'bg-gray-50'
                          }`}
                        >
                          <h3 className="text-xl font-semibold mb-4">
                            Menu Items
                          </h3>
                          <div className="space-y-4">
                            {menuItems.icecream.map((item) => (
                              <div
                                key={item.id}
                                className="flex items-center space-x-4"
                              >
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-16 h-16 rounded-lg object-cover"
                                />
                                <div className="flex-1">
                                  <h4 className="font-medium">{item.name}</h4>
                                  <p
                                    className={`${
                                      isDarkMode
                                        ? 'text-gray-300'
                                        : 'text-gray-600'
                                    }`}
                                  >
                                    €{item.price.toFixed(2)}
                                  </p>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleQuantityChange(
                                        item.id,
                                        (selectedItems[item.id] || 0) - 1
                                      )
                                    }
                                    className={`px-2 py-1 rounded-button ${
                                      isDarkMode
                                        ? 'bg-[#FF6B6B]'
                                        : 'bg-[#FF4B4B]'
                                    } text-white cursor-pointer whitespace-nowrap`}
                                  >
                                    <i className="fas fa-minus"></i>
                                  </button>
                                  <span className="w-8 text-center">
                                    {selectedItems[item.id] || 0}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleQuantityChange(
                                        item.id,
                                        (selectedItems[item.id] || 0) + 1
                                      )
                                    }
                                    className={`px-2 py-1 rounded-button ${
                                      isDarkMode
                                        ? 'bg-[#98FF98]'
                                        : 'bg-[#4CAF50]'
                                    } text-white cursor-pointer whitespace-nowrap`}
                                  >
                                    <i className="fas fa-plus"></i>
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        {/* Customer Information */}
                        <div className="space-y-4">
                          <div>
                            <label className="block mb-2 font-medium">
                              Name
                            </label>
                            <input
                              type="text"
                              required
                              className={`w-full px-4 py-2 rounded-lg border-none ${
                                isDarkMode
                                  ? 'bg-[#3A3A50] text-white placeholder-gray-400'
                                  : 'bg-gray-100 text-gray-800 placeholder-gray-500'
                              }`}
                              placeholder="Your name"
                            />
                          </div>
                          <div>
                            <label className="block mb-2 font-medium">
                              Phone
                            </label>
                            <input
                              type="tel"
                              required
                              className={`w-full px-4 py-2 rounded-lg border-none ${
                                isDarkMode
                                  ? 'bg-[#3A3A50] text-white placeholder-gray-400'
                                  : 'bg-gray-100 text-gray-800 placeholder-gray-500'
                              }`}
                              placeholder="Your phone number"
                            />
                          </div>
                          <div>
                            <label className="block mb-2 font-medium">
                              Delivery Option
                            </label>
                            <div className="flex space-x-4">
                              <button
                                type="button"
                                onClick={() => setDeliveryOption('delivery')}
                                className={`px-4 py-2 rounded-button cursor-pointer whitespace-nowrap ${
                                  deliveryOption === 'delivery'
                                    ? isDarkMode
                                      ? 'bg-[#FF6B6B] text-white'
                                      : 'bg-[#FF4B4B] text-white'
                                    : isDarkMode
                                    ? 'bg-[#3A3A50] text-gray-300'
                                    : 'bg-gray-100 text-gray-600'
                                }`}
                              >
                                Delivery
                              </button>
                              <button
                                type="button"
                                onClick={() => setDeliveryOption('pickup')}
                                className={`px-4 py-2 rounded-button cursor-pointer whitespace-nowrap ${
                                  deliveryOption === 'pickup'
                                    ? isDarkMode
                                      ? 'bg-[#FF6B6B] text-white'
                                      : 'bg-[#FF4B4B] text-white'
                                    : isDarkMode
                                    ? 'bg-[#3A3A50] text-gray-300'
                                    : 'bg-gray-100 text-gray-600'
                                }`}
                              >
                                Pickup
                              </button>
                            </div>
                          </div>
                          {deliveryOption === 'delivery' && (
                            <div>
                              <label className="block mb-2 font-medium">
                                Delivery Address
                              </label>
                              <textarea
                                required
                                className={`w-full px-4 py-2 rounded-lg border-none ${
                                  isDarkMode
                                    ? 'bg-[#3A3A50] text-white placeholder-gray-400'
                                    : 'bg-gray-100 text-gray-800 placeholder-gray-500'
                                }`}
                                rows={3}
                                placeholder="Your delivery address"
                              ></textarea>
                            </div>
                          )}
                        </div>
                      </div>
                      {/* Order Summary */}
                      <div
                        className={`p-4 rounded-lg ${
                          isDarkMode ? 'bg-[#3A3A50]' : 'bg-gray-50'
                        }`}
                      >
                        <h3 className="text-xl font-semibold mb-4">
                          Order Summary
                        </h3>
                        <div className="flex justify-between items-center">
                          <span>Total Amount:</span>
                          <span className="text-xl font-bold">
                            €{orderTotal.toFixed(2)}
                          </span>
                        </div>
                      </div>
                      {/* Payment Method */}
                      <div>
                        <h3 className="text-xl font-semibold mb-4">
                          Payment Method
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                          <button
                            type="button"
                            className={`p-4 rounded-lg border-2 flex items-center justify-center space-x-2 cursor-pointer whitespace-nowrap ${
                              isDarkMode
                                ? 'border-gray-600 hover:border-[#FF6B6B]'
                                : 'border-gray-200 hover:border-[#FF4B4B]'
                            }`}
                          >
                            <i className="fab fa-cc-visa text-2xl"></i>
                            <span>Credit Card</span>
                          </button>
                          <button
                            type="button"
                            className={`p-4 rounded-lg border-2 flex items-center justify-center space-x-2 cursor-pointer whitespace-nowrap ${
                              isDarkMode
                                ? 'border-gray-600 hover:border-[#FF6B6B]'
                                : 'border-gray-200 hover:border-[#FF4B4B]'
                            }`}
                          >
                            <i className="fab fa-paypal text-2xl"></i>
                            <span>PayPal</span>
                          </button>
                        </div>
                      </div>
                      {/* Action Buttons */}
                      <div className="flex justify-end space-x-4">
                        <button
                          type="button"
                          onClick={() => setIsOrderModalOpen(false)}
                          className={`px-6 py-3 rounded-button cursor-pointer whitespace-nowrap ${
                            isDarkMode
                              ? 'bg-gray-600 text-white hover:bg-gray-700'
                              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                          }`}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className={`px-6 py-3 rounded-button text-white cursor-pointer whitespace-nowrap ${
                            isDarkMode
                              ? 'bg-[#98FF98] text-gray-800 hover:bg-[#7EFF7E]'
                              : 'bg-[#4CAF50] hover:bg-[#3D9C40]'
                          }`}
                        >
                          Place Order
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Categories Section */}
      <div
        ref={categoriesRef}
        className={`py-16 ${isDarkMode ? 'bg-[#1A1A2E]' : 'bg-[#FFFAF0]'}`}
        style={{
          opacity: 0,
          transform: 'translateY(30px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
        }}
      >
        <div className="container mx-auto px-6">
          <h2
            id="categories-heading"
            className={`split-text text-3xl md:text-4xl font-bold text-center mb-12 ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}
          >
            {t('ourSpecialties')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Ice Cream Category */}
            <div
              className={`reveal-item rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2 cursor-pointer ${
                isDarkMode
                  ? 'bg-[#2A2A40] text-white'
                  : 'bg-white text-gray-800'
              }`}
            >
              <div className="h-64 overflow-hidden">
                <img
                  src="https://readdy.ai/api/search-image?query=Artisanal%20gelato%20scoops%20in%20various%20flavors%20displayed%20in%20an%20elegant%20glass%20counter%2C%20with%20vibrant%20colors%20and%20garnishes%2C%20shallow%20depth%20of%20field%2C%20professional%20food%20photography%20with%20soft%20natural%20lighting&width=400&height=300&seq=ice1&orientation=landscape"
                  alt="Ice Cream Selection"
                  className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3">{t('iceCreams')}</h3>
                <p
                  className={`mb-4 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  {t('iceCreamDesc')}
                </p>
                <button
                  onClick={() => {
                    setActiveTab('menu');
                    setCurrentMenu('icecream');
                    setTimeout(() => {
                      const target =
                        document.getElementById('icecream-section');
                      if (target) {
                        const yOffset = -300; // yukarı kaydırma miktarı, ihtiyacına göre değiştirebilirsin
                        const y =
                          target.getBoundingClientRect().top +
                          window.pageYOffset +
                          yOffset;
                        window.scrollTo({ top: y, behavior: 'smooth' });
                      }
                    }, 100);
                  }}
                  className="text-[#FF4B4B] font-semibold flex items-center cursor-pointer whitespace-nowrap"
                >
                  {t('exploreIceCreams')}
                  <i className="fa-solid fa-arrow-right ml-2 transition-transform duration-300 ease-in-out group-hover:translate-x-1.5"></i>
                </button>
              </div>
            </div>
            {/* Waffles Category */}
            <div
              className={`reveal-item rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2 cursor-pointer ${
                isDarkMode
                  ? 'bg-[#2A2A40] text-white'
                  : 'bg-white text-gray-800'
              }`}
            >
              <div className="h-64 overflow-hidden">
                <img
                  src="https://readdy.ai/api/search-image?query=Freshly%20baked%20Belgian%20waffles%20topped%20with%20ice%20cream%2C%20fresh%20berries%20and%20chocolate%20sauce%2C%20served%20on%20an%20elegant%20plate%20in%20a%20cozy%20cafe%20setting%2C%20professional%20food%20photography%20with%20perfect%20lighting&width=400&height=300&seq=waffle1&orientation=landscape"
                  alt="Waffle Treats"
                  className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3">{t('cakes')}</h3>
                <p
                  className={`mb-4 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  {t('cakesDesc')}
                </p>
                <button
                  onClick={() => {
                    setActiveTab('menu');
                    setCurrentMenu('waffles');
                    setTimeout(() => {
                      const target =
                        document.getElementById('icecream-section');
                      if (target) {
                        const yOffset = -300; // yukarı kaydırma miktarı, ihtiyacına göre değiştirebilirsin
                        const y =
                          target.getBoundingClientRect().top +
                          window.pageYOffset +
                          yOffset;
                        window.scrollTo({ top: y, behavior: 'smooth' });
                      }
                    }, 100);
                  }}
                  className="text-[#4CAF50] font-semibold flex items-center cursor-pointer whitespace-nowrap"
                >
                  {t('seeCakes')} <i className="fas fa-arrow-right ml-2"></i>
                </button>
              </div>
            </div>
            {/* Beverages Category */}
            <div
              className={`reveal-item rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2 cursor-pointer ${
                isDarkMode
                  ? 'bg-[#2A2A40] text-white'
                  : 'bg-white text-gray-800'
              }`}
            >
              <div className="h-64 overflow-hidden">
                <img
                  src="https://readdy.ai/api/search-image?query=Assortment%20of%20elegant%20coffee%20drinks%2C%20Italian%20sodas%2C%20and%20refreshing%20beverages%20in%20stylish%20glassware%20arranged%20on%20a%20marble%20counter%20in%20a%20sophisticated%20cafe%20setting%2C%20professional%20beverage%20photography%20with%20perfect%20lighting&width=400&height=300&seq=drink1&orientation=landscape"
                  alt="Beverages"
                  className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3">{t('beverages')}</h3>
                <p
                  className={`mb-4 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  {t('beveragesDesc')}
                </p>
                <button
                  onClick={() => {
                    setActiveTab('menu');
                    setCurrentMenu('icecream');
                    setTimeout(() => {
                      const target =
                        document.getElementById('icecream-section');
                      if (target) {
                        const yOffset = -300; // yukarı kaydırma miktarı, ihtiyacına göre değiştirebilirsin
                        const y =
                          target.getBoundingClientRect().top +
                          window.pageYOffset +
                          yOffset;
                        window.scrollTo({ top: y, behavior: 'smooth' });
                      }
                    }, 100);
                  }}
                  className="text-[#FF4B4B] font-semibold flex items-center cursor-pointer whitespace-nowrap"
                >
                  {t('exploreBeverages')}{' '}
                  <i className="fas fa-arrow-right ml-2"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Testimonials */}
      <div
        ref={testimonialsRef}
        className={`py-16 ${isDarkMode ? 'bg-[#252540]' : 'bg-[#F5F5F5]'}`}
        style={{
          opacity: 0,
          transform: 'translateY(30px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
        }}
      >
        <div className="container mx-auto px-6">
          <h2
            id="testimonials-heading"
            className={`split-text text-3xl md:text-4xl font-bold text-center mb-12 ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}
          >
            {t('whatCustomersSay')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Customer 1',
                quote: t('customer1'),
                rating: 5,
              },
              {
                name: 'Customer 2',
                quote: t('customer2'),
                rating: 5,
              },
              {
                name: 'Customer 3',
                quote: t('customer3'),
                rating: 4,
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className={`reveal-item rounded-xl p-6 shadow-lg ${
                  isDarkMode
                    ? 'bg-[#2A2A40] text-white'
                    : 'bg-white text-gray-800'
                }`}
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className={`fas fa-star ${
                        i < testimonial.rating
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      } mr-1`}
                    ></i>
                  ))}
                </div>
                <p
                  className={`italic mb-4 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  "{testimonial.quote}"
                </p>
                <p className="font-semibold">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
  const renderMenu = () => (
    <div
      ref={menuItemsRef}
      className={`py-12 ${
        isDarkMode ? 'bg-[#1A1A2E] text-white' : 'bg-[#FFFAF0] text-gray-800'
      }`}
      style={{
        opacity: 0,
        transform: 'translateY(30px)',
        transition: 'opacity 0.8s ease, transform 0.8s ease',
      }}
    >
      <div className="container mx-auto px-6">
        <h1
          id="menu-heading"
          className="split-text text-4xl md:text-5xl font-bold text-center mb-12"
        >
          Our Menu
        </h1>
        {/* Menu Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-lg overflow-hidden">
            {['icecream', 'cakes', 'beverages'].map((tab) => (
              <button
                key={tab}
                onClick={() => setCurrentMenu(tab)}
                className={`px-6 py-3 font-medium text-lg transition-colors duration-300 cursor-pointer whitespace-nowrap ${
                  currentMenu === tab
                    ? isDarkMode
                      ? 'bg-[#FF6B6B] text-white'
                      : 'bg-[#FF4B4B] text-white'
                    : isDarkMode
                    ? 'bg-[#2A2A40] text-gray-300 hover:bg-[#3A3A50]'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {tab === 'icecream'
                  ? 'Ice Cream'
                  : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
        {/* Menu Content */}
        <div
          id="icecream-section"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {currentMenu === 'icecream' &&
            [
              {
                name: 'Classic Vanilla Bean',
                description:
                  'Smooth and creamy vanilla gelato made with Madagascar vanilla beans',
                price: '€3.00',
                image:
                  'https://raw.githubusercontent.com/zer0crypt02/For-React/main/jole.jpeg',
              },
              {
                name: 'Spaghetti Klassik',
                description:
                  'Decadent chocolate gelato made with premium Belgian chocolate',
                price: '€6.20',
                image:
                  'https://raw.githubusercontent.com/zer0crypt02/For-React/main/garip.jpeg',
              },
              {
                name: 'Frucht Becher',
                description:
                  'Authentic pistachio gelato made with Sicilian pistachios',
                price: '€9.20',
                image:
                  'https://raw.githubusercontent.com/zer0crypt02/For-React/main/meyveli-dondurma.jpeg',
              },
              {
                name: 'Pizzaeis',
                description:
                  'Fresh strawberry gelato made with seasonal berries',
                price: '€3.75',
                image:
                  'https://raw.githubusercontent.com/zer0crypt02/For-React/main/meyveli.jpeg',
              },
              {
                name: 'Frucht Becher',
                description:
                  'Sweet and salty caramel gelato with caramel swirls',
                price: '€9.20',
                image:
                  'https://raw.githubusercontent.com/zer0crypt02/For-React/main/kar%C4%B1s%C4%B1k.jpeg',
              },
              {
                name: 'Lemon Sorbet',
                description:
                  'Refreshing dairy-free lemon sorbet, perfect for hot days',
                price: '€3.50',
                image:
                  'https://readdy.ai/api/search-image?query=Bright%20yellow%20lemon%20sorbet%20scoop%20in%20a%20glass%20bowl%20against%20a%20neutral%20background%2C%20showing%20icy%20texture%20and%20vibrant%20color%2C%20professional%20food%20photography%20with%20soft%20natural%20lighting&width=300&height=300&seq=lemon1&orientation=squarish',
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`reveal-item rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl ${
                  isDarkMode ? 'bg-[#2A2A40]' : 'bg-white'
                }`}
              >
                <div className="h-30 overflow-hidden rounded-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover object-bottom transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold">{item.name}</h3>
                    <span
                      className={`font-bold ${
                        isDarkMode ? 'text-[#98FF98]' : 'text-[#4CAF50]'
                      }`}
                    >
                      {item.price}
                    </span>
                  </div>
                  <p
                    className={`mb-4 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  >
                    {item.description}
                  </p>
                  <button
                    className={`mt-2 px-4 py-2 rounded-button ${
                      isDarkMode
                        ? 'bg-[#FF6B6B] hover:bg-[#FF5151]'
                        : 'bg-[#FF4B4B] hover:bg-[#E43535]'
                    } text-white font-medium transition-colors duration-300 cursor-pointer whitespace-nowrap`}
                  >
                    Add to Order
                  </button>
                </div>
              </div>
            ))}
          {currentMenu === 'cakes' &&
            [
              {
                name: 'Vanillan Banane Toten',
                description:
                  '! Ein Stück Price : 4.50€ Toten bitte vorbestellen',
                price: 'Alles : 15€',
                image:
                  'https://raw.githubusercontent.com/zer0crypt02/For-React/main/muzlu-pasta.jpeg',
              },
              {
                name: 'Cake Pop',
                description:
                  'Belgian waffle topped with chocolate sauce and chocolate gelato',
                price: 'Ein Stück: 1€',
                image:
                  'https://raw.githubusercontent.com/zer0crypt02/For-React/main/toplar.jpeg',
              },
              {
                name: 'Waffle Nutella und Früschte',
                description:
                  'Belgian waffle topped with mixed berries and vanilla gelato',
                price: '€4.50',
                image:
                  'https://raw.githubusercontent.com/zer0crypt02/For-React/main/waffle.jpeg',
              },
              {
                name: 'Waffle Komplett',
                description:
                  'Belgian waffle topped with banana slices, three gelato flavors, and whipped cream',
                price: '€7.50',
                image:
                  'https://readdy.ai/api/search-image?query=Belgian%20waffle%20topped%20with%20banana%20slices%2C%20three%20gelato%20scoops%2C%20and%20whipped%20cream%20on%20a%20long%20plate%20against%20a%20neutral%20background%2C%20showing%20elaborate%20presentation%2C%20professional%20food%20photography%20with%20soft%20natural%20lighting&width=300&height=300&seq=bananawaffle1&orientation=squarish',
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`reveal-item rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl ${
                  isDarkMode ? 'bg-[#2A2A40]' : 'bg-white'
                }`}
              >
                <div className="h-30 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold">{item.name}</h3>
                    <span
                      className={`font-bold ${
                        isDarkMode ? 'text-[#98FF98]' : 'text-[#4CAF50]'
                      }`}
                    >
                      {item.price}
                    </span>
                  </div>
                  <p
                    className={`mb-4 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  >
                    {item.description}
                  </p>
                  <button
                    className={`mt-2 px-4 py-2 rounded-button ${
                      isDarkMode
                        ? 'bg-[#FF6B6B] hover:bg-[#FF5151]'
                        : 'bg-[#FF4B4B] hover:bg-[#E43535]'
                    } text-white font-medium transition-colors duration-300 cursor-pointer whitespace-nowrap`}
                  >
                    Add to Order
                  </button>
                </div>
              </div>
            ))}
          {currentMenu === 'beverages' &&
            [
              {
                name: 'Espresso',
                description: 'Espresso',
                price: '€2.50',
                image:
                  'https://readdy.ai/api/search-image?query=Espresso%20in%20a%20small%20white%20cup%20on%20a%20saucer%20against%20a%20neutral%20background%2C%20showing%20rich%20crema%20and%20dark%20color%2C%20professional%20beverage%20photography%20with%20soft%20natural%20lighting&width=300&height=300&seq=espresso1&orientation=squarish',
              },
              {
                name: 'Cappuccino',
                description: 'Espresso und milch und milchschaum',
                price: '€2.80',
                image:
                  'https://readdy.ai/api/search-image?query=Cappuccino%20in%20a%20white%20cup%20with%20perfect%20milk%20foam%20art%20on%20a%20saucer%20against%20a%20neutral%20background%2C%20showing%20creamy%20texture%2C%20professional%20beverage%20photography%20with%20soft%20natural%20lighting&width=300&height=300&seq=cappuccino1&orientation=squarish',
              },
              {
                name: 'Eiskaffee - 1',
                description: 'Kalte kaffe vanilla eis und cafe souse und sahne',
                price: 'Klein : €5.20',
                image:
                  'https://readdy.ai/api/search-image?query=Affogato%20with%20vanilla%20gelato%20being%20covered%20with%20hot%20espresso%20in%20a%20glass%20cup%20against%20a%20neutral%20background%2C%20showing%20contrast%20of%20hot%20and%20cold%2C%20professional%20beverage%20photography%20with%20soft%20natural%20lighting&width=300&height=300&seq=affogato1&orientation=squarish',
              },
              {
                name: 'Italian Soda',
                description: 'Sparkling water with your choice of fruit syrup',
                price: '€3.75',
                image:
                  'https://readdy.ai/api/search-image?query=Colorful%20Italian%20soda%20in%20a%20tall%20glass%20with%20ice%20and%20straw%20against%20a%20neutral%20background%2C%20showing%20fizzy%20bubbles%20and%20vibrant%20color%2C%20professional%20beverage%20photography%20with%20soft%20natural%20lighting&width=300&height=300&seq=soda1&orientation=squarish',
              },
              {
                name: 'Eiskaffe - 2',
                description:
                  'Kalte kaffe, karamel souse und kaffe souse und eıswüfel',
                price: '€5.20',
                image:
                  'https://readdy.ai/api/search-image?query=Iced%20coffee%20in%20a%20tall%20glass%20with%20ice%20cubes%20and%20straw%20against%20a%20neutral%20background%2C%20showing%20condensation%20on%20glass%2C%20professional%20beverage%20photography%20with%20soft%20natural%20lighting&width=300&height=300&seq=icedcoffee1&orientation=squarish',
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`reveal-item rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl ${
                  isDarkMode ? 'bg-[#2A2A40]' : 'bg-white'
                }`}
              >
                <div className="h-30 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold">{item.name}</h3>
                    <span
                      className={`font-bold ${
                        isDarkMode ? 'text-[#98FF98]' : 'text-[#4CAF50]'
                      }`}
                    >
                      {item.price}
                    </span>
                  </div>
                  <p
                    className={`mb-4 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  >
                    {item.description}
                  </p>
                  <button
                    className={`mt-2 px-4 py-2 rounded-button ${
                      isDarkMode
                        ? 'bg-[#FF6B6B] hover:bg-[#FF5151]'
                        : 'bg-[#FF4B4B] hover:bg-[#E43535]'
                    } text-white font-medium transition-colors duration-300 cursor-pointer whitespace-nowrap`}
                  >
                    Add to Order
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
  const renderContact = () => (
    <div
      className={`py-12 ${
        isDarkMode ? 'bg-[#1A1A2E] text-white' : 'bg-[#FFFAF0] text-gray-800'
      }`}
    >
      <div className="container mx-auto px-6">
        <h1
          id="contact-heading"
          className="split-text text-4xl md:text-5xl font-bold text-center mb-12"
        >
          Visit Us
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Map and Info */}
          <div
            ref={mapRef}
            className={`rounded-xl overflow-hidden shadow-lg ${
              isDarkMode ? 'bg-[#2A2A40]' : 'bg-white'
            }`}
            style={{
              opacity: 0,
              transform: 'translateY(30px)',
              transition: 'opacity 0.8s ease, transform 0.8s ease',
            }}
          >
            <div className="h-96 bg-gray-300 relative">
              <img
                src="https://readdy.ai/api/search-image?query=A%20stylized%20map%20view%20of%20Cologne%20Germany%20with%20cafe%20location%20marker%2C%20showing%20streets%20and%20landmarks%20in%20a%20clean%20modern%20design%20with%20neutral%20background%2C%20digital%20illustration%20with%20soft%20colors&width=600&height=400&seq=map1&orientation=landscape"
                alt="Map Location"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={() =>
                    window.open(
                      'https://maps.app.goo.gl/G4ajUMMA9YzfYVPk7',
                      '_blank'
                    )
                  }
                  className={`px-6 py-3 rounded-button ${
                    isDarkMode ? 'bg-[#FF6B6B]' : 'bg-[#FF4B4B]'
                  } text-white font-medium shadow-lg cursor-pointer whitespace-nowrap`}
                >
                  <i className="fas fa-directions mr-2"></i> Get Directions
                </button>
              </div>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <i
                    className={`fas fa-map-marker-alt mt-1 mr-3 ${
                      isDarkMode ? 'text-[#FF6B6B]' : 'text-[#FF4B4B]'
                    }`}
                  ></i>
                  <div>
                    <h3 className="font-semibold">Address</h3>
                    <p
                      className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}
                    >
                      Markt 8,
                      <br />
                      42853 Köln Remschied
                      <br />
                      Germany
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <i
                    className={`fas fa-clock mt-1 mr-3 ${
                      isDarkMode ? 'text-[#98FF98]' : 'text-[#4CAF50]'
                    }`}
                  ></i>
                  <div>
                    <h3 className="font-semibold">Opening Hours</h3>
                    <p
                      className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}
                    >
                      Everyday : 10:00 - 22:00
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <i
                    className={`fas fa-phone-alt mt-1 mr-3 ${
                      isDarkMode ? 'text-[#FF6B6B]' : 'text-[#FF4B4B]'
                    }`}
                  ></i>
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p
                      className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}
                    >
                      +49 176 323 002 30
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <i
                    className={`fas fa-envelope mt-1 mr-3 ${
                      isDarkMode ? 'text-[#98FF98]' : 'text-[#4CAF50]'
                    }`}
                  ></i>
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p
                      className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}
                    >
                      lavitaeiscafe@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Contact Form */}
          <div
            ref={contactFormRef}
            className={`rounded-xl overflow-hidden shadow-lg ${
              isDarkMode ? 'bg-[#2A2A40]' : 'bg-white'
            }`}
            style={{
              opacity: 0,
              transform: 'translateY(30px)',
              transition: 'opacity 0.8s ease, transform 0.8s ease',
            }}
          ></div>
        </div>
        {/* Visitor Statistics */}
        <div
          className={`rounded-xl overflow-hidden shadow-lg ${
            isDarkMode ? 'bg-[#2A2A40]' : 'bg-white'
          } mb-16`}
        >
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Visitor Statistics</h2>
            <div
              id="visitorsChart"
              style={{ width: '100%', height: '400px' }}
            ></div>
          </div>
        </div>
        {/* FAQ Section */}
        <div
          ref={faqRef}
          className={`rounded-xl overflow-hidden shadow-lg ${
            isDarkMode ? 'bg-[#2A2A40]' : 'bg-white'
          }`}
          style={{
            opacity: 0,
            transform: 'translateY(30px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          <div className="p-6">
            <h2 id="faq-heading" className="split-text text-2xl font-bold mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {[
                {
                  question: 'Do you offer dairy-free options?',
                  answer: 'Yes, we have dairy-free options.',
                },
                {
                  question: 'Do you do home delivery or takeout?',
                  answer:
                    'Yes, We have home service on Friday, Saturday and Sunday. For detailed information +49 176 323 002 30',
                },
                {
                  question: 'Can I buy ice cream as a takeaway?',
                  answer:
                    'Yes, you can take our ice cream home in a bag. We have no weight limit.',
                },
                {
                  question: 'Can I come with a pet?',
                  answer:
                    'Our outdoor seating area is pet-friendly. Your furry friends are welcome, too!',
                },
              ].map((faq, index) => (
                <div
                  key={index}
                  className={`reveal-item p-4 rounded-lg ${
                    isDarkMode ? 'bg-[#3A3A50]' : 'bg-gray-100'
                  }`}
                >
                  <h3 className="font-bold mb-2">{faq.question}</h3>
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <>
      {/* Language Selection Modal */}
      <LanguageModal
        isOpen={showLanguageModal}
        onLanguageSelect={handleLanguageSelect}
        isDarkMode={isDarkMode}
        t={t}
      />

      {isLoading ? (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center ${
            isDarkMode ? 'bg-[#1A1A2E]' : 'bg-[#FFFAF0]'
          }`}
        >
          <div className="text-center">
            <h1
              className="text-5xl font-bold italic mb-8"
              style={{ fontFamily: 'Brush Script MT, cursive' }}
            >
              <span className="inline-block animate-bounce text-[#FF4B4B] delay-100">
                E
              </span>
              <span className="inline-block animate-bounce text-[#FF4B4B] delay-200">
                i
              </span>
              <span className="inline-block animate-bounce text-[#FF4B4B] delay-300">
                s
              </span>
              <span className="inline-block animate-bounce text-[#4CAF50] delay-400">
                C
              </span>
              <span className="inline-block animate-bounce text-[#4CAF50] delay-500">
                a
              </span>
              <span className="inline-block animate-bounce text-[#4CAF50] delay-600">
                f
              </span>
              <span className="inline-block animate-bounce text-[#4CAF50] delay-700">
                e
              </span>
              <span className="inline-block animate-bounce text-[#DDB690] delay-700 ml-4">
                L
              </span>
              <span className="inline-block animate-bounce text-[#DDB690] delay-700">
                a
              </span>
              <span className="inline-block animate-bounce text-[#DDB690] delay-700 ml-4">
                V
              </span>
              <span className="inline-block animate-bounce text-[#DDB690] delay-700">
                i
              </span>
              <span className="inline-block animate-bounce text-[#DDB690] delay-700">
                t
              </span>
              <span className="inline-block animate-bounce text-[#DDB690] delay-700">
                a
              </span>
            </h1>
            <div className="flex justify-center space-x-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  isDarkMode ? 'bg-[#FF6B6B]' : 'bg-[#FF4B4B]'
                } animate-pulse delay-100`}
              ></div>
              <div
                className={`w-3 h-3 rounded-full ${
                  isDarkMode ? 'bg-[#FF6B6B]' : 'bg-[#FF4B4B]'
                } animate-pulse delay-300`}
              ></div>
              <div
                className={`w-3 h-3 rounded-full ${
                  isDarkMode ? 'bg-[#FF6B6B]' : 'bg-[#FF4B4B]'
                } animate-pulse delay-500`}
              ></div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`min-h-screen ${
            isDarkMode
              ? 'bg-[#1A1A2E] text-white'
              : 'bg-[#FFFAF0] text-gray-800'
          }`}
        >
          {/* Header */}
          <header
            className={`py-4 ${
              isDarkMode ? 'bg-[#252540]' : 'bg-white'
            } shadow-md sticky top-0 z-50`}
          >
            <div className="container mx-auto px-6">
              <div className="flex justify-between items-center">
                {/* Logo */}
                <div className="flex items-center">
                  <h1
                    className="text-3xl font-bold italic"
                    style={{ fontFamily: 'Brush Script MT, cursive' }}
                  >
                    <span className="text-[#FF4B4B]">Eis</span>
                    <span className="text-[#4CAF50]">Cafe</span>
                    <span className="text-[#DDB690] ml-2">La Vita</span>
                  </h1>
                </div>
                {/* Navigation for larger screens */}
                <nav className="hidden lg:flex items-center space-x-8">
                  {['home', 'menu', 'contact'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`font-medium text-lg transition-colors duration-300 cursor-pointer whitespace-nowrap ${
                        activeTab === tab
                          ? isDarkMode
                            ? 'text-[#FF6B6B]'
                            : 'text-[#FF4B4B]'
                          : isDarkMode
                          ? 'text-gray-300 hover:text-white'
                          : 'text-gray-700 hover:text-gray-900'
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </nav>
                {/* Dark Mode Toggle and Mobile Menu */}
                <div className="flex items-center space-x-4">
                  <button
                    onClick={toggleDarkMode}
                    className={`p-2 rounded-full ${
                      isDarkMode
                        ? 'bg-[#3A3A50] text-yellow-300'
                        : 'bg-gray-100 text-gray-700'
                    } cursor-pointer`}
                    aria-label="Toggle dark mode"
                  >
                    <i
                      className={`fas ${isDarkMode ? 'fa-sun' : 'fa-moon'}`}
                    ></i>
                  </button>
                  <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="lg:hidden text-2xl cursor-pointer"
                    aria-label="Toggle mobile menu"
                  >
                    <i
                      className={`fas ${
                        isMobileMenuOpen ? 'fa-times' : 'fa-bars'
                      }`}
                    ></i>
                  </button>
                </div>
                {/* Mobile Navigation Menu */}
                {isMobileMenuOpen && (
                  <div
                    className="lg:hidden absolute top-full left-0 right-0 mt-2 py-4 px-6 shadow-lg transition-all duration-300 ease-in-out transform origin-top z-50"
                    style={{
                      backgroundColor: isDarkMode
                        ? 'rgba(42, 42, 64, 0.95)'
                        : 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    {['home', 'menu', 'contact'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => {
                          setActiveTab(tab);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`block w-full text-left py-3 px-4 rounded-lg mb-2 font-medium text-lg transition-colors duration-300 cursor-pointer whitespace-nowrap ${
                          activeTab === tab
                            ? isDarkMode
                              ? 'bg-[#FF6B6B] text-white'
                              : 'bg-[#FF4B4B] text-white'
                            : isDarkMode
                            ? 'text-gray-300 hover:bg-[#3A3A50]'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </header>
          {/* Main Content */}
          <main>
            <section
              id="home"
              className={activeTab === 'home' ? 'block' : 'hidden'}
            >
              {renderHome()}
            </section>

            <section
              id="menu"
              className={activeTab === 'menu' ? 'block' : 'hidden'}
            >
              {renderMenu()}
            </section>

            <section
              id="contact"
              className={activeTab === 'contact' ? 'block' : 'hidden'}
            >
              {renderContact()}
            </section>
          </main>
          {/* Footer */}
          <footer
            className={`py-12 ${
              isDarkMode ? 'bg-[#252540] text-white' : 'bg-gray-800 text-white'
            }`}
          >
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Logo and About */}
                <div className="md:col-span-1">
                  <h2
                    className="text-2xl font-bold italic mb-4"
                    style={{ fontFamily: 'Brush Script MT, cursive' }}
                  >
                    <span className="text-[#FF6B6B]">Eis</span>
                    <span className="text-[#98FF98]">Cafe</span>
                    <span className="text-[#DDB690]"> La Vita</span>
                  </h2>
                  <p className="text-gray-400 mb-4">{t('footerDescription')}</p>
                  <div className="flex space-x-4">
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer"
                    >
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer"
                    >
                      <i className="fab fa-instagram"></i>
                    </a>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer"
                    >
                      <i className="fab fa-twitter"></i>
                    </a>
                  </div>
                </div>
                {/* Quick Links */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    {t('quickLinks')}
                  </h3>
                  <ul className="space-y-2">
                    {[
                      { key: 'home', text: t('home') },
                      { key: 'menu', text: t('menu') },
                      { key: 'aboutUs', text: t('aboutUs') },
                      { key: 'contact', text: t('contact') },
                      { key: 'careers', text: t('careers') },
                    ].map((link, index) => {
                      const sectionIdMap: Record<string, string> = {
                        home: 'home',
                        menu: 'menu',
                        aboutUs: 'about',
                        contact: 'contact',
                        careers: 'careers',
                      };

                      return (
                        <li key={index}>
                          <a
                            className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer"
                            onClick={() => {
                              setActiveTab(sectionIdMap[link.key]);
                              // küçük gecikmeyle scroll yapalım, render sonrası
                              setTimeout(() => {
                                const target = document.getElementById(
                                  sectionIdMap[link.key]
                                );
                                target?.scrollIntoView({
                                  behavior: 'smooth',
                                });
                              }, 50);
                            }}
                          >
                            {link.text}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                {/* Contact */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">{t('contact')}</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <i className="fas fa-map-marker-alt mt-1 mr-2 text-gray-400"></i>
                      <span className="text-gray-400">
                        Markt 8, 42853 Remschied
                      </span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-phone-alt mt-1 mr-2 text-gray-400"></i>
                      <span className="text-gray-400">+49 176 323 002 30</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-envelope mt-1 mr-2 text-gray-400"></i>
                      <span className="text-gray-400">
                        lavitaeiscafe@gmail.com
                      </span>
                    </li>
                  </ul>
                </div>
                {/* Opening Hours */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    {t('openingHoursFooter')}
                  </h3>
                  <ul className="space-y-2 text-gray-400">
                    <li>{t('everyday')}</li>
                  </ul>
                </div>
              </div>
              <div className="mt-12 pt-8 border-t border-gray-700">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <p className="text-gray-400 mb-4 md:mb-0">
                    &copy; {new Date().getFullYear()} EisCafe.{' '}
                    {t('allRightsReserved')}
                  </p>
                  <div className="flex space-x-4">
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer"
                    >
                      {t('privacyPolicy')}
                    </a>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer"
                    >
                      {t('termsOfService')}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </footer>
          {/* Bell Icon and Message */}
          {/* Floating Bell Button + Message Bubble */}
          <div className="fixed bottom-24 right-6 z-50 flex items-center justify-end space-x-2">
            {/* Baloncuk */}
            {showBellMessage && (
              <div className="mr-3 backdrop-blur-md bg-white/30 text-gray-800 dark:bg-white/10 dark:text-white p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 max-w-xs animate-slide-in-left">
                <p className="text-sm">
                  <RGBTextAnimation3 text="We have home service on Friday, Saturday and Sunday. For detailed information +49 176 323 002 30" />
                </p>
              </div>
            )}

            {/* Zil Butonu */}
            <button
              onClick={() => setShowBellMessage((prev) => !prev)}
              className="bg-[#FF4B4B] hover:bg-[#E43535] text-white p-4 rounded-full shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF4B4B] animate-bounce-slow"
              aria-label="Support bell"
            >
              <i className="fas fa-bell text-xl"></i>
            </button>
          </div>
        </div>
      )}

      {/* Service Modal */}
      <ServiceModal
        isOpen={showServiceModal}
        onClose={() => setShowServiceModal(false)}
        isDarkMode={isDarkMode}
        t={t}
      />
    </>
  );
};
const RGBTextAnimation2 = ({
  text,
  className = '',
}: {
  text: string;
  className?: string;
}) => {
  const baseColor = '#E3D5BF'; // 🔸 Normal harf rengi (sarı)
  const highlightColor = '#FFF8EB'; // 🔹 Parlak şerit rengi (açık sarı)
  const [highlightIndex, setHighlightIndex] = useState(0);

  const letters = text.split('');

  useEffect(() => {
    const interval = setInterval(() => {
      setHighlightIndex((prev) => (prev + 1) % letters.length);
    }, 60);

    return () => clearInterval(interval);
  }, [letters.length]);

  return (
    <h1 className={`${className} flex flex-wrap drop-shadow-lg`}>
      {letters.map((letter, idx) => {
        const isHighlight =
          idx === highlightIndex ||
          idx === (highlightIndex + 1) % letters.length ||
          idx === (highlightIndex - 1 + letters.length) % letters.length;
        return (
          <span
            key={idx}
            style={{
              color: isHighlight ? highlightColor : baseColor,
              transition: 'color 0.2s ease',
              userSelect: 'none',
              whiteSpace: 'pre',
            }}
          >
            {letter}
          </span>
        );
      })}
    </h1>
  );
};

const RGBTextAnimation3 = ({
  text,
  className = '',
}: {
  text: string;
  className?: string;
}) => {
  const baseColor = '#E3D5BF'; // 🔸 Normal harf rengi (sarı)
  const highlightColor = '#FFF8EB'; // 🔹 Parlak şerit rengi (açık sarı)
  const [highlightIndex, setHighlightIndex] = useState(0);

  const letters = text.split('');

  useEffect(() => {
    const interval = setInterval(() => {
      setHighlightIndex((prev) => (prev + 1) % letters.length);
    }, 60);

    return () => clearInterval(interval);
  }, [letters.length]);

  return (
    <h1 className={`${className} flex flex-wrap drop-shadow-lg`}>
      {letters.map((letter, idx) => {
        const isHighlight =
          idx === highlightIndex ||
          idx === (highlightIndex + 1) % letters.length ||
          idx === (highlightIndex - 1 + letters.length) % letters.length;
        return (
          <span
            key={idx}
            style={{
              color: isHighlight ? highlightColor : baseColor,
              transition: 'color 0.2s ease',
              userSelect: 'none',
              whiteSpace: 'pre',
            }}
          >
            {letter}
          </span>
        );
      })}
    </h1>
  );
};

const RGBTextAnimation = ({
  text,
  className = '',
}: {
  text: string;
  className?: string;
}) => {
  const baseColor = '#FFD700'; // 🔸 Normal harf rengi (sarı)
  const highlightColor = '#FFF59D'; // 🔹 Parlak şerit rengi (açık sarı)
  const [highlightIndex, setHighlightIndex] = useState(0);

  const letters = text.split('');

  useEffect(() => {
    const interval = setInterval(() => {
      setHighlightIndex((prev) => (prev + 1) % letters.length);
    }, 120);

    return () => clearInterval(interval);
  }, [letters.length]);

  return (
    <h1 className={`${className} flex flex-wrap drop-shadow-lg`}>
      {letters.map((letter, idx) => {
        const isHighlight =
          idx === highlightIndex ||
          idx === (highlightIndex + 1) % letters.length ||
          idx === (highlightIndex - 1 + letters.length) % letters.length;
        return (
          <span
            key={idx}
            style={{
              color: isHighlight ? highlightColor : baseColor,
              transition: 'color 0.2s ease',
              userSelect: 'none',
              whiteSpace: 'pre',
            }}
          >
            {letter}
          </span>
        );
      })}
    </h1>
  );
};

export default App;
