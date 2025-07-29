import React, { useState } from 'react';
import './App.css';
import ImageModal from './ImageModal';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('ice-cream');
  const [modalImage, setModalImage] = useState({ isOpen: false, src: '', alt: '' });

  const openModal = (src, alt) => {
    setModalImage({ isOpen: true, src, alt });
  };

  const closeModal = () => {
    setModalImage({ isOpen: false, src: '', alt: '' });
  };

  const menuItems = {
    'ice-cream': [
      {
        name: 'Vanilla Gelato',
        price: '€4.50',
        description: 'Creamy vanilla gelato made with Madagascar vanilla beans',
        image: 'https://images.pexels.com/photos/1362534/pexels-photo-1362534.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        name: 'Chocolate Gelato',
        price: '€4.50',
        description: 'Rich dark chocolate gelato with cocoa from Belgium',
        image: 'https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        name: 'Strawberry Gelato',
        price: '€4.80',
        description: 'Fresh strawberry gelato made with local organic strawberries',
        image: 'https://images.pexels.com/photos/1352278/pexels-photo-1352278.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        name: 'Pistachio Gelato',
        price: '€5.20',
        description: 'Authentic Sicilian pistachio gelato with real pistachios',
        image: 'https://images.pexels.com/photos/1625235/pexels-photo-1625235.jpeg?auto=compress&cs=tinysrgb&w=400'
      }
    ],
    'cakes': [
      {
        name: 'Tiramisu',
        price: '€6.50',
        description: 'Classic Italian tiramisu with mascarpone and coffee',
        image: 'https://images.pexels.com/photos/6880219/pexels-photo-6880219.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        name: 'Cannoli Siciliani',
        price: '€5.80',
        description: 'Traditional Sicilian cannoli filled with ricotta cream',
        image: 'https://images.pexels.com/photos/4099123/pexels-photo-4099123.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        name: 'Panna Cotta',
        price: '€5.50',
        description: 'Silky smooth panna cotta with berry compote',
        image: 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=400'
      }
    ],
    'beverages': [
      {
        name: 'Espresso',
        price: '€2.20',
        description: 'Strong Italian espresso made from premium beans',
        image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        name: 'Cappuccino',
        price: '€3.50',
        description: 'Classic cappuccino with steamed milk and foam art',
        image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        name: 'Affogato',
        price: '€4.80',
        description: 'Vanilla gelato "drowned" in hot espresso',
        image: 'https://images.pexels.com/photos/1251175/pexels-photo-1251175.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        name: 'Italian Soda',
        price: '€3.20',
        description: 'Refreshing sparkling water with natural fruit syrups',
        image: 'https://images.pexels.com/photos/1304540/pexels-photo-1304540.jpeg?auto=compress&cs=tinysrgb&w=400'
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
      {/* Navigation */}
      <nav className="bg-white shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <i className="fas fa-ice-cream text-3xl text-orange-500 mr-3"></i>
              <span className="text-2xl font-bold text-gray-800">Eis Cafe</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {['home', 'menu', 'about', 'contact'].map((section) => (
                  <button
                    key={section}
                    onClick={() => setActiveSection(section)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      activeSection === section
                        ? 'bg-orange-500 text-white'
                        : 'text-gray-700 hover:bg-orange-100 hover:text-orange-600'
                    }`}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Home Section */}
      {activeSection === 'home' && (
        <div className="relative">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-orange-400 via-pink-400 to-red-400 text-white py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
                Authentic Italian Gelato
              </h1>
              <p className="text-xl md:text-2xl mb-8 animate-fade-in-up">
                Experience the true taste of Italy with our handcrafted gelato
              </p>
              <button
                onClick={() => setActiveSection('menu')}
                className="bg-white text-orange-500 px-8 py-4 rounded-full text-lg font-semibold hover:bg-orange-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                View Our Menu
              </button>
            </div>
          </div>

          {/* Features Section */}
          <div className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Our Gelato?</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  We use only the finest ingredients and traditional Italian methods to create the perfect gelato experience
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-300">
                  <i className="fas fa-leaf text-4xl text-green-500 mb-4"></i>
                  <h3 className="text-xl font-semibold mb-2">Natural Ingredients</h3>
                  <p className="text-gray-600">Made with fresh, organic ingredients sourced locally and from Italy</p>
                </div>
                <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-300">
                  <i className="fas fa-heart text-4xl text-red-500 mb-4"></i>
                  <h3 className="text-xl font-semibold mb-2">Made with Love</h3>
                  <p className="text-gray-600">Every batch is crafted with passion using traditional Italian techniques</p>
                </div>
                <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-300">
                  <i className="fas fa-award text-4xl text-yellow-500 mb-4"></i>
                  <h3 className="text-xl font-semibold mb-2">Award Winning</h3>
                  <p className="text-gray-600">Recognized for excellence in taste and quality by gelato experts</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Menu Section */}
      {activeSection === 'menu' && (
        <div className="py-16 bg-white min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Menu</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover our delicious selection of authentic Italian gelato, desserts, and beverages
              </p>
            </div>

            {/* Category Buttons */}
            <div className="flex justify-center mb-12">
              <div className="bg-gray-100 p-2 rounded-full">
                <button
                  onClick={() => setSelectedCategory('ice-cream')}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === 'ice-cream'
                      ? 'bg-orange-500 text-white shadow-lg'
                      : 'text-gray-600 hover:text-orange-500'
                  }`}
                >
                  <i className="fas fa-ice-cream mr-2"></i>
                  Ice Cream
                </button>
                <button
                  onClick={() => setSelectedCategory('cakes')}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ml-2 ${
                    selectedCategory === 'cakes'
                      ? 'bg-orange-500 text-white shadow-lg'
                      : 'text-gray-600 hover:text-orange-500'
                  }`}
                >
                  <i className="fas fa-birthday-cake mr-2"></i>
                  Cakes
                </button>
                <button
                  onClick={() => setSelectedCategory('beverages')}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ml-2 ${
                    selectedCategory === 'beverages'
                      ? 'bg-orange-500 text-white shadow-lg'
                      : 'text-gray-600 hover:text-orange-500'
                  }`}
                >
                  <i className="fas fa-coffee mr-2"></i>
                  Beverages
                </button>
              </div>
            </div>

            {/* Menu Items */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {menuItems[selectedCategory]?.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-48 object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                      onClick={() => openModal(item.image, item.name)}
                    />
                    <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full font-bold">
                      {item.price}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h3>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    <button className="w-full bg-gradient-to-r from-orange-400 to-pink-400 text-white py-2 px-4 rounded-lg font-medium hover:from-orange-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-105">
                      Add to Order
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* About Section */}
      {activeSection === 'about' && (
        <div className="py-16 bg-white min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">About Us</h2>
              <p className="text-gray-600 max-w-3xl mx-auto text-lg">
                Welcome to Eis Cafe, where authentic Italian gelato meets modern craftsmanship. 
                Our story began in the heart of Sicily, where our founder learned the traditional 
                art of gelato making from master artisans.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <img
                  src="https://images.pexels.com/photos/1362534/pexels-photo-1362534.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Gelato making process"
                  className="rounded-lg shadow-lg"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Story</h3>
                <p className="text-gray-600 mb-6">
                  Every scoop tells a story of passion, tradition, and quality. We import the finest 
                  ingredients from Italy and combine them with local organic produce to create 
                  gelato that's both authentic and fresh.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <i className="fas fa-check-circle text-green-500 mr-3"></i>
                    <span>Traditional Italian recipes</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-check-circle text-green-500 mr-3"></i>
                    <span>Fresh ingredients daily</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-check-circle text-green-500 mr-3"></i>
                    <span>Handcrafted in small batches</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Section */}
      {activeSection === 'contact' && (
        <div className="py-16 bg-white min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Contact Us</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Visit us today or get in touch to learn more about our delicious gelato
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Visit Our Store</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <i className="fas fa-map-marker-alt text-orange-500 mr-3 mt-1"></i>
                    <div>
                      <p className="font-semibold">Address</p>
                      <p className="text-gray-600">123 Gelato Street<br />Italian Quarter, City 12345</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <i className="fas fa-clock text-orange-500 mr-3 mt-1"></i>
                    <div>
                      <p className="font-semibold">Opening Hours</p>
                      <p className="text-gray-600">
                        Mon-Thu: 10:00 AM - 10:00 PM<br />
                        Fri-Sat: 10:00 AM - 11:00 PM<br />
                        Sun: 11:00 AM - 9:00 PM
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <i className="fas fa-phone text-orange-500 mr-3 mt-1"></i>
                    <div>
                      <p className="font-semibold">Phone</p>
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <i className="fas fa-envelope text-orange-500 mr-3 mt-1"></i>
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-gray-600">info@eiscafe.com</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h3>
                <form className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <textarea
                      rows="4"
                      placeholder="Your Message"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-orange-400 to-pink-400 text-white py-3 px-6 rounded-lg font-medium hover:from-orange-500 hover:to-pink-500 transition-all duration-300"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Image Modal */}
      <ImageModal
        isOpen={modalImage.isOpen}
        onClose={closeModal}
        imageSrc={modalImage.src}
        altText={modalImage.alt}
      />
    </div>
  );
}