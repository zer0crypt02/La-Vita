import React, { useState } from 'react';
import './App.css';
import ImageModal from './ImageModal';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
}

const menuData = {
  gelato: [
    {
      id: 1,
      name: 'Vanilya Gelato',
      description: 'Klasik vanilya aroması ile hazırlanmış kremsi gelato',
      price: '₺45',
      image: 'https://images.pexels.com/photos/1362534/pexels-photo-1362534.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 2,
      name: 'Çikolata Gelato',
      description: 'Belçika çikolatası ile hazırlanmış yoğun aromalı gelato',
      price: '₺50',
      image: 'https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 3,
      name: 'Çilek Gelato',
      description: 'Taze çileklerden yapılmış doğal aromalı gelato',
      price: '₺48',
      image: 'https://images.pexels.com/photos/1352278/pexels-photo-1352278.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 4,
      name: 'Fıstık Gelato',
      description: 'Antep fıstığı ile hazırlanmış özel gelato',
      price: '₺55',
      image: 'https://images.pexels.com/photos/1362534/pexels-photo-1362534.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ],
  cakes: [
    {
      id: 5,
      name: 'Tiramisu',
      description: 'Geleneksel İtalyan tatlısı, mascarpone peyniri ile',
      price: '₺65',
      image: 'https://images.pexels.com/photos/6880219/pexels-photo-6880219.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 6,
      name: 'Cheesecake',
      description: 'Kremsi cheesecake, meyveli sos ile',
      price: '₺60',
      image: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 7,
      name: 'Çikolatalı Pasta',
      description: 'Üç katlı çikolatalı pasta, ganaj ile',
      price: '₺70',
      image: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ],
  beverages: [
    {
      id: 8,
      name: 'Espresso',
      description: 'İtalyan usulü espresso',
      price: '₺25',
      image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 9,
      name: 'Cappuccino',
      description: 'Köpüklü süt ile hazırlanmış cappuccino',
      price: '₺30',
      image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 10,
      name: 'Affogato',
      description: 'Vanilya gelato üzerine espresso',
      price: '₺40',
      image: 'https://images.pexels.com/photos/1362534/pexels-photo-1362534.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 11,
      name: 'Limonata',
      description: 'Taze sıkılmış limon suyu',
      price: '₺20',
      image: 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ]
};

export default function App() {
  const [currentSection, setCurrentSection] = useState('home');
  const [activeMenuCategory, setActiveMenuCategory] = useState('gelato');
  const [modalImage, setModalImage] = useState<{ src: string; alt: string } | null>(null);

  const openModal = (src: string, alt: string) => {
    setModalImage({ src, alt });
  };

  const closeModal = () => {
    setModalImage(null);
  };

  const renderMenuItem = (item: MenuItem) => (
    <div key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
          onClick={() => openModal(item.image, item.name)}
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h3>
        <p className="text-gray-600 mb-4 text-sm leading-relaxed">{item.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-green-600">{item.price}</span>
          <button className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-2 rounded-full hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
            Sipariş Ver
          </button>
        </div>
      </div>
    </div>
  );

  const renderMenuSection = () => (
    <section className="py-20 bg-gradient-to-br from-orange-50 to-pink-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-800 mb-6 animate-fade-in">
            Menümüz
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in-up">
            İtalyan gelato geleneğinin en lezzetli örnekleri
          </p>
        </div>

        {/* Menu Category Buttons */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-full p-2 shadow-lg">
            <button
              onClick={() => setActiveMenuCategory('gelato')}
              className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeMenuCategory === 'gelato'
                  ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg'
                  : 'text-gray-600 hover:text-red-500'
              }`}
            >
              <i className="fas fa-ice-cream mr-2"></i>
              Gelato
            </button>
            <button
              onClick={() => setActiveMenuCategory('cakes')}
              className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeMenuCategory === 'cakes'
                  ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg'
                  : 'text-gray-600 hover:text-red-500'
              }`}
            >
              <i className="fas fa-birthday-cake mr-2"></i>
              Pastalar
            </button>
            <button
              onClick={() => setActiveMenuCategory('beverages')}
              className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeMenuCategory === 'beverages'
                  ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg'
                  : 'text-gray-600 hover:text-red-500'
              }`}
            >
              <i className="fas fa-coffee mr-2"></i>
              İçecekler
            </button>
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {menuData[activeMenuCategory as keyof typeof menuData].map(renderMenuItem)}
        </div>
      </div>
    </section>
  );

  const renderHomeSection = () => (
    <section className="min-h-screen bg-gradient-to-br from-orange-100 via-pink-50 to-yellow-50 flex items-center">
      <div className="container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-6xl lg:text-7xl font-bold text-gray-800 mb-6 animate-fade-in">
              Eis Cafe
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500 animate-gradient-x bg-200%">
                La Vita
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed animate-fade-in-up">
              İtalyan gelato geleneğinin en lezzetli örnekleri ile tanışın. 
              Her kaşık, İtalya'nın güneşli sokaklarından gelen otantik tatları sunar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up">
              <button 
                onClick={() => setCurrentSection('menu')}
                className="group bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-4 rounded-full font-semibold hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Menüyü Keşfet
                <i className="fas fa-arrow-right ml-2 arrow-icon"></i>
              </button>
              <button 
                onClick={() => setCurrentSection('about')}
                className="group border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full font-semibold hover:border-red-500 hover:text-red-500 transition-all duration-300 transform hover:scale-105"
              >
                Hakkımızda
                <i className="fas fa-info-circle ml-2 arrow-icon"></i>
              </button>
            </div>
          </div>
          <div className="relative animate-blur-in">
            <div className="absolute inset-0 bg-gradient-to-r from-red-200 to-pink-200 rounded-full blur-3xl opacity-30 animate-bounce-slow"></div>
            <img
              src="https://images.pexels.com/photos/1362534/pexels-photo-1362534.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Delicious Italian Gelato"
              className="relative z-10 w-full max-w-lg mx-auto rounded-3xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );

  const renderAboutSection = () => (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-800 mb-6 animate-fade-in">
            Hakkımızda
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up">
            1985 yılından beri İtalyan gelato geleneğini Türkiye'ye taşıyoruz
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in-up">
            <img
              src="https://images.pexels.com/photos/4109743/pexels-photo-4109743.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Our Story"
              className="w-full rounded-2xl shadow-xl cursor-pointer hover:scale-105 transition-transform duration-300"
              onClick={() => openModal('https://images.pexels.com/photos/4109743/pexels-photo-4109743.jpeg?auto=compress&cs=tinysrgb&w=800', 'Our Story')}
            />
          </div>
          <div className="animate-fade-in-up">
            <h3 className="text-3xl font-bold text-gray-800 mb-6">Hikayemiz</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Eis Cafe La Vita, İtalya'nın geleneksel gelato yapım tekniklerini modern dünyaya taşıyan bir aile işletmesidir. 
              Kurucumuz Marco Rossi, Milano'da öğrendiği gelato sanatını Türkiye'ye getirmiş ve 40 yıldır bu lezzeti sizlerle paylaşmaktadır.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Her gün taze malzemelerle, geleneksel yöntemlerle hazırladığımız gelato ve tatlılarımız, 
              İtalyan mutfağının özgün tatlarını sunar. Kalite ve lezzet bizim için vazgeçilmezdir.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-4 bg-white rounded-xl shadow-lg">
                <div className="text-3xl font-bold text-red-500 mb-2">40+</div>
                <div className="text-gray-600">Yıllık Deneyim</div>
              </div>
              <div className="text-center p-4 bg-white rounded-xl shadow-lg">
                <div className="text-3xl font-bold text-red-500 mb-2">50+</div>
                <div className="text-gray-600">Çeşit Gelato</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const renderContactSection = () => (
    <section className="py-20 bg-gradient-to-br from-green-50 to-teal-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-800 mb-6 animate-fade-in">
            İletişim
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in-up">
            Bizi ziyaret edin veya iletişime geçin
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="animate-fade-in-up">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">İletişim Bilgileri</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <i className="fas fa-map-marker-alt text-red-500 text-xl mr-4"></i>
                  <div>
                    <div className="font-semibold text-gray-800">Adres</div>
                    <div className="text-gray-600">Nişantaşı, Teşvikiye Cad. No:123, Şişli/İstanbul</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-phone text-red-500 text-xl mr-4"></i>
                  <div>
                    <div className="font-semibold text-gray-800">Telefon</div>
                    <div className="text-gray-600">+90 212 123 45 67</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-envelope text-red-500 text-xl mr-4"></i>
                  <div>
                    <div className="font-semibold text-gray-800">E-posta</div>
                    <div className="text-gray-600">info@eiscafelavita.com</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-clock text-red-500 text-xl mr-4"></i>
                  <div>
                    <div className="font-semibold text-gray-800">Çalışma Saatleri</div>
                    <div className="text-gray-600">Pazartesi - Pazar: 10:00 - 23:00</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="animate-fade-in-up">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Mesaj Gönderin</h3>
              <form className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Adınız"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="E-posta Adresiniz"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
                <div>
                  <textarea
                    rows={4}
                    placeholder="Mesajınız"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Mesaj Gönder
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500">
                Eis Cafe La Vita
              </h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <button
                onClick={() => setCurrentSection('home')}
                className={`font-semibold transition-colors duration-300 ${
                  currentSection === 'home' ? 'text-red-500' : 'text-gray-700 hover:text-red-500'
                }`}
              >
                Ana Sayfa
              </button>
              <button
                onClick={() => setCurrentSection('menu')}
                className={`font-semibold transition-colors duration-300 ${
                  currentSection === 'menu' ? 'text-red-500' : 'text-gray-700 hover:text-red-500'
                }`}
              >
                Menü
              </button>
              <button
                onClick={() => setCurrentSection('about')}
                className={`font-semibold transition-colors duration-300 ${
                  currentSection === 'about' ? 'text-red-500' : 'text-gray-700 hover:text-red-500'
                }`}
              >
                Hakkımızda
              </button>
              <button
                onClick={() => setCurrentSection('contact')}
                className={`font-semibold transition-colors duration-300 ${
                  currentSection === 'contact' ? 'text-red-500' : 'text-gray-700 hover:text-red-500'
                }`}
              >
                İletişim
              </button>
            </nav>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-300">
                <i className="fas fa-moon text-gray-600"></i>
              </button>
              <button className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors duration-300">
                <i className="fas fa-bars text-gray-600"></i>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20">
        {currentSection === 'home' && renderHomeSection()}
        {currentSection === 'menu' && renderMenuSection()}
        {currentSection === 'about' && renderAboutSection()}
        {currentSection === 'contact' && renderContactSection()}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-400">
                Eis Cafe La Vita
              </h3>
              <p className="text-gray-300 leading-relaxed">
                İtalyan gelato geleneğinin en lezzetli örnekleri ile 40 yıldır hizmetinizdeyiz.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Hızlı Linkler</h4>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setCurrentSection('home')}
                    className="text-gray-300 hover:text-red-400 transition-colors duration-300"
                  >
                    Ana Sayfa
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setCurrentSection('menu')}
                    className="text-gray-300 hover:text-red-400 transition-colors duration-300"
                  >
                    Menü
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setCurrentSection('about')}
                    className="text-gray-300 hover:text-red-400 transition-colors duration-300"
                  >
                    Hakkımızda
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setCurrentSection('contact')}
                    className="text-gray-300 hover:text-red-400 transition-colors duration-300"
                  >
                    İletişim
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Sosyal Medya</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-red-400 transition-colors duration-300">
                  <i className="fab fa-facebook-f text-xl"></i>
                </a>
                <a href="#" className="text-gray-300 hover:text-red-400 transition-colors duration-300">
                  <i className="fab fa-instagram text-xl"></i>
                </a>
                <a href="#" className="text-gray-300 hover:text-red-400 transition-colors duration-300">
                  <i className="fab fa-twitter text-xl"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 Eis Cafe La Vita. Tüm hakları saklıdır.
            </p>
          </div>
        </div>
      </footer>

      {/* Image Modal */}
      <ImageModal
        isOpen={modalImage !== null}
        onClose={closeModal}
        imageSrc={modalImage?.src || ''}
        altText={modalImage?.alt || ''}
      />

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-4 rounded-full shadow-lg hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-110">
          <i className="fas fa-bell text-xl"></i>
        </button>
      </div>
    </div>
  );
}