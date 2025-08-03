import { useState, useEffect, useCallback } from 'react';
import { translateWithCache, translateBatch } from './translationService';

export interface TranslationData {
  [key: string]: {
    [lang: string]: string;
  };
}

export const useTranslation = () => {
  const [currentLanguage, setCurrentLanguage] = useState<string>('tr');
  const [translations, setTranslations] = useState<TranslationData>({});
  const [isTranslating, setIsTranslating] = useState(false);

  // Manual translations for all languages
  const manualTranslations = {
    tr: {
      // Hero Section
      welcome: 'Hoş Geldiniz',
      eisCafe: 'EisCafe',
      laVita: 'La Vita',
      heroSubtitle:
        'Sevgi ve gelenekle el yapımı. Birinci sınıf malzemelerin ve otantik tariflerin farkını tadın.',
      contactUs: 'Bize Ulaşın',

      // Categories Section
      ourSpecialties: 'Özel Ürünlerimiz',
      iceCreams: 'Dondurmalar',
      iceCreamDesc:
        "Günlük olarak premium malzemelerle yapılan 30'dan fazla otantik İtalyan dondurma çeşidi.",
      exploreIceCreams: 'Dondurmaları Keşfet',
      cakes: 'Pastalar',
      cakesDesc:
        'Dışı çıtır, içi yumuşak. Seçtiğiniz malzemelerle servis edilir.',
      seeCakes: 'Pastaları Gör',
      beverages: 'İçecekler',
      beveragesDesc:
        'İtalyan kahvesinden ferahlatıcı sodalar ve özel içeceklere kadar, ikramlarınızı tamamlayacak.',
      exploreBeverages: 'İçecekleri Keşfet',

      // Testimonials
      whatCustomersSay: 'Müşterilerimiz Ne Diyor',
      customer1:
        'Bu dondurmalar harika. Çoğu dondurma dükkanında olmayan farklı türde dondurmalar var.',
      customer2:
        'Çilek veya çikolata parçalı dondurma waffle ile çok iyi gidiyor.',
      customer3:
        'Harika bir atmosfer ve dostane personel. Dükkanın 24 saat açık olması da harika bir şey.',

      // Menu
      ourMenu: 'Menümüz',
      addToOrder: 'Siparişe Ekle',

      // Contact
      visitUs: 'Bizi Ziyaret Edin',
      contactInformation: 'İletişim Bilgileri',
      address: 'Adres',
      openingHours: 'Çalışma Saatleri',
      phone: 'Telefon',
      email: 'E-posta',
      getDirections: 'Yol Tarifi Al',
      visitorStatistics: 'Ziyaretçi İstatistikleri',
      frequentlyAskedQuestions: 'Sık Sorulan Sorular',
      faq1: 'Süt içermeyen seçenekler sunuyor musunuz?',
      faq1Answer: 'Evet, süt içermeyen seçeneklerimiz var.',
      faq2: 'Ev teslimatı veya paket servis yapıyor musunuz?',
      faq2Answer:
        'Evet, Cuma, Cumartesi ve Pazar günleri ev servisimiz var. Detaylı bilgi için +49 176 323 002 30',
      faq3: 'Dondurmayı paket olarak alabilir miyim?',
      faq3Answer:
        'Evet, dondurmamızı çantada eve götürebilirsiniz. Ağırlık sınırımız yok.',
      faq4: 'Evcil hayvanla gelebilir miyim?',
      faq4Answer:
        'Dış mekan oturma alanımız evcil hayvan dostudur. Tüylü arkadaşlarınız da hoş geldiniz!',

      // Footer
      footerDescription:
        "1995'ten beri otantik İtalyan dondurması ve ikramları sunuyoruz. Tariflerimiz nesiller boyunca aktarılmıştır.",
      quickLinks: 'Hızlı Bağlantılar',
      home: 'Ana Sayfa',
      menu: 'Menü',
      aboutUs: 'Hakkımızda',
      contact: 'İletişim',
      careers: 'Kariyer',
      openingHoursFooter: 'Çalışma Saatleri',
      everyday: 'Her gün: 10:00 - 22:00',
      allRightsReserved: 'Tüm hakları saklıdır.',
      privacyPolicy: 'Gizlilik Politikası',
      termsOfService: 'Kullanım Şartları',

      // Service Modal
      homeService: 'Eve Servis İmkanları',
      homeServiceDesc:
        'Cuma, Cumartesi ve Pazar günleri evinize kadar geliyoruz! Detaylı bilgi için bizi arayın.',
      ok: 'Tamam',

      // Language Modal
      chooseLanguage: 'Dil Seçin',
      pleaseSelectLanguage: 'Lütfen tercih ettiğiniz dili seçin',
    },

    de: {
      // Hero Section
      welcome: 'Willkommen',
      eisCafe: 'EisCafe',
      laVita: 'La Vita',
      heroSubtitle:
        'Handgefertigt mit Liebe und Tradition. Schmecken Sie den Unterschied erstklassiger Zutaten und authentischer Rezepte.',
      contactUs: 'Kontaktieren Sie uns',

      // Categories Section
      ourSpecialties: 'Unsere Spezialitäten',
      iceCreams: 'Eiscreme',
      iceCreamDesc:
        'Über 30 Sorten authentisches italienisches Gelato, täglich frisch mit Premium-Zutaten hergestellt.',
      exploreIceCreams: 'Eiscreme entdecken',
      cakes: 'Kuchen',
      cakesDesc:
        'Außen knusprig, innen fluffig. Serviert mit Ihrer Wahl an Toppings.',
      seeCakes: 'Kuchen ansehen',
      beverages: 'Getränke',
      beveragesDesc:
        'Von italienischem Kaffee bis zu erfrischenden Sodas und Spezialgetränken, die Ihre Leckereien ergänzen.',
      exploreBeverages: 'Getränke entdecken',

      // Testimonials
      whatCustomersSay: 'Was unsere Kunden sagen',
      customer1:
        'Diese Eiscreme ist fantastisch. Sie haben verschiedene Eissorten, die die meisten Eisdielen nicht haben.',
      customer2:
        'Erdbeer- oder Schokoladenchip-Eiscreme passt sehr gut zu Waffeln.',
      customer3:
        'Großartige Atmosphäre und freundliches Personal. Dass der Laden 24 Stunden geöffnet ist, ist auch eine tolle Sache.',

      // Menu
      ourMenu: 'Unsere Speisekarte',
      addToOrder: 'Zur Bestellung hinzufügen',

      // Contact
      visitUs: 'Besuchen Sie uns',
      contactInformation: 'Kontaktinformationen',
      address: 'Adresse',
      openingHours: 'Öffnungszeiten',
      phone: 'Telefon',
      email: 'E-Mail',
      getDirections: 'Wegbeschreibung',
      visitorStatistics: 'Besucherstatistiken',
      frequentlyAskedQuestions: 'Häufig gestellte Fragen',
      faq1: 'Bieten Sie laktosefreie Optionen an?',
      faq1Answer: 'Ja, wir haben laktosefreie Optionen.',
      faq2: 'Liefern Sie nach Hause oder bieten Sie Takeaway an?',
      faq2Answer:
        'Ja, wir haben Heimservice an Freitag, Samstag und Sonntag. Für detaillierte Informationen +49 176 323 002 30',
      faq3: 'Kann ich Eiscreme zum Mitnehmen kaufen?',
      faq3Answer:
        'Ja, Sie können unsere Eiscreme in einer Tüte mit nach Hause nehmen. Wir haben keine Gewichtsbeschränkung.',
      faq4: 'Kann ich mit einem Haustier kommen?',
      faq4Answer:
        'Unser Außenbereich ist haustierfreundlich. Ihre pelzigen Freunde sind auch willkommen!',

      // Footer
      footerDescription:
        'Seit 1995 servieren wir authentisches italienisches Gelato und Leckereien. Unsere Rezepte wurden über Generationen weitergegeben.',
      quickLinks: 'Schnelllinks',
      home: 'Startseite',
      menu: 'Speisekarte',
      aboutUs: 'Über uns',
      contact: 'Kontakt',
      careers: 'Karriere',
      openingHoursFooter: 'Öffnungszeiten',
      everyday: 'Täglich: 10:00 - 22:00',
      allRightsReserved: 'Alle Rechte vorbehalten.',
      privacyPolicy: 'Datenschutzrichtlinie',
      termsOfService: 'Nutzungsbedingungen',

      // Service Modal
      homeService: 'Heimservice-Möglichkeiten',
      homeServiceDesc:
        'Freitag, Samstag und Sonntag kommen wir zu Ihnen nach Hause! Rufen Sie uns für detaillierte Informationen an.',
      ok: 'OK',

      // Language Modal
      chooseLanguage: 'Sprache wählen',
      pleaseSelectLanguage: 'Bitte wählen Sie Ihre bevorzugte Sprache',
    },

    en: {
      // Hero Section
      welcome: 'Welcome to',
      eisCafe: 'EisCafe',
      laVita: 'La Vita',
      heroSubtitle:
        'Handmade with love and tradition. Taste the difference of first-class ingredients and authentic recipes.',
      contactUs: 'Contact Us',

      // Categories Section
      ourSpecialties: 'Our Specialties',
      iceCreams: 'Ice Creams',
      iceCreamDesc:
        'Over 30 flavors of authentic Italian gelato made fresh daily with premium ingredients.',
      exploreIceCreams: 'Explore Ice Creams',
      cakes: 'Cakes',
      cakesDesc:
        'Crispy on the outside, fluffy on the inside. Served with your choice of toppings.',
      seeCakes: 'See Cakes',
      beverages: 'Beverages',
      beveragesDesc:
        'From Italian coffee to refreshing sodas and specialty drinks to complement your treats.',
      exploreBeverages: 'Explore Beverages',

      // Testimonials
      whatCustomersSay: 'What Our Customers Say',
      customer1:
        "These ice creams are amazing. They have different types of ice cream that most ice cream shops don't have.",
      customer2:
        'Strawberry or chocolate chip ice cream goes very well with waffles.',
      customer3:
        'There is a great atmosphere and friendly staff. The fact that the shop is open 24 hours a day is also a great thing.',

      // Menu
      ourMenu: 'Our Menu',
      addToOrder: 'Add to Order',

      // Contact
      visitUs: 'Visit Us',
      contactInformation: 'Contact Information',
      address: 'Address',
      openingHours: 'Opening Hours',
      phone: 'Phone',
      email: 'Email',
      getDirections: 'Get Directions',
      visitorStatistics: 'Visitor Statistics',
      frequentlyAskedQuestions: 'Frequently Asked Questions',
      faq1: 'Do you offer dairy-free options?',
      faq1Answer: 'Yes, we have dairy-free options.',
      faq2: 'Do you do home delivery or takeout?',
      faq2Answer:
        'Yes, we have home service on Friday, Saturday and Sunday. For detailed information +49 176 323 002 30',
      faq3: 'Can I buy ice cream as a takeaway?',
      faq3Answer:
        'Yes, you can take our ice cream home in a bag. We have no weight limit.',
      faq4: 'Can I come with a pet?',
      faq4Answer:
        'Our outdoor seating area is pet-friendly. Your furry friends are welcome too!',

      // Footer
      footerDescription:
        'Serving authentic Italian gelato and treats since 1995. Our recipes have been passed down through generations.',
      quickLinks: 'Quick Links',
      home: 'Home',
      menu: 'Menu',
      aboutUs: 'About Us',
      contact: 'Contact',
      careers: 'Careers',
      openingHoursFooter: 'Opening Hours',
      everyday: 'Everyday: 10:00 - 22:00',
      allRightsReserved: 'All rights reserved.',
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of Service',

      // Service Modal
      homeService: 'Home Service Options',
      homeServiceDesc:
        'Friday, Saturday and Sunday we come to your home! Call us for detailed information.',
      ok: 'OK',

      // Language Modal
      chooseLanguage: 'Choose Language',
      pleaseSelectLanguage: 'Please select your preferred language',
    },

    es: {
      // Hero Section
      welcome: 'Bienvenido a',
      eisCafe: 'EisCafe',
      laVita: 'La Vita',
      heroSubtitle:
        'Hecho a mano con amor y tradición. Prueba la diferencia de ingredientes de primera clase y recetas auténticas.',
      contactUs: 'Contáctanos',

      // Categories Section
      ourSpecialties: 'Nuestras Especialidades',
      iceCreams: 'Helados',
      iceCreamDesc:
        'Más de 30 sabores de gelato italiano auténtico hecho fresco diariamente con ingredientes premium.',
      exploreIceCreams: 'Explorar Helados',
      cakes: 'Pasteles',
      cakesDesc:
        'Crujiente por fuera, esponjoso por dentro. Servido con tu elección de coberturas.',
      seeCakes: 'Ver Pasteles',
      beverages: 'Bebidas',
      beveragesDesc:
        'Desde café italiano hasta sodas refrescantes y bebidas especiales para complementar tus golosinas.',
      exploreBeverages: 'Explorar Bebidas',

      // Testimonials
      whatCustomersSay: 'Lo que dicen nuestros clientes',
      customer1:
        'Estos helados son increíbles. Tienen diferentes tipos de helado que la mayoría de las heladerías no tienen.',
      customer2:
        'El helado de fresa o con chips de chocolate va muy bien con los waffles.',
      customer3:
        'Hay una gran atmósfera y personal amigable. El hecho de que la tienda esté abierta 24 horas al día también es algo genial.',

      // Menu
      ourMenu: 'Nuestro Menú',
      addToOrder: 'Agregar al Pedido',

      // Contact
      visitUs: 'Visítanos',
      contactInformation: 'Información de Contacto',
      address: 'Dirección',
      openingHours: 'Horario de Apertura',
      phone: 'Teléfono',
      email: 'Correo Electrónico',
      getDirections: 'Obtener Direcciones',
      visitorStatistics: 'Estadísticas de Visitantes',
      frequentlyAskedQuestions: 'Preguntas Frecuentes',
      faq1: '¿Ofrecen opciones sin lácteos?',
      faq1Answer: 'Sí, tenemos opciones sin lácteos.',
      faq2: '¿Hacen entrega a domicilio o para llevar?',
      faq2Answer:
        'Sí, tenemos servicio a domicilio los viernes, sábados y domingos. Para información detallada +49 176 323 002 30',
      faq3: '¿Puedo comprar helado para llevar?',
      faq3Answer:
        'Sí, puedes llevar nuestro helado a casa en una bolsa. No tenemos límite de peso.',
      faq4: '¿Puedo venir con una mascota?',
      faq4Answer:
        'Nuestra área de asientos al aire libre es pet-friendly. ¡Tus amigos peludos también son bienvenidos!',

      // Footer
      footerDescription:
        'Sirviendo gelato italiano auténtico y golosinas desde 1995. Nuestras recetas han sido transmitidas a través de generaciones.',
      quickLinks: 'Enlaces Rápidos',
      home: 'Inicio',
      menu: 'Menú',
      aboutUs: 'Sobre Nosotros',
      contact: 'Contacto',
      careers: 'Carreras',
      openingHoursFooter: 'Horario de Apertura',
      everyday: 'Todos los días: 10:00 - 22:00',
      allRightsReserved: 'Todos los derechos reservados.',
      privacyPolicy: 'Política de Privacidad',
      termsOfService: 'Términos de Servicio',

      // Service Modal
      homeService: 'Opciones de Servicio a Domicilio',
      homeServiceDesc:
        '¡Viernes, sábado y domingo vamos a tu casa! Llámanos para información detallada.',
      ok: 'OK',

      // Language Modal
      chooseLanguage: 'Seleccionar idioma',
      pleaseSelectLanguage: 'Por favor selecciona tu idioma preferido',
    },
  };

  const changeLanguage = useCallback(
    async (newLanguage: string) => {
      if (newLanguage === currentLanguage) return;

      setIsTranslating(true);
      setCurrentLanguage(newLanguage);

      try {
        const newTranslations: TranslationData = {};
        const currentLangTexts =
          manualTranslations[newLanguage as keyof typeof manualTranslations];

        if (currentLangTexts) {
          Object.keys(currentLangTexts).forEach((key) => {
            newTranslations[key] = {
              ...(newTranslations[key] || {}),
              [newLanguage]: currentLangTexts[key],
            };
          });
        }

        setTranslations((prev) => ({ ...prev, ...newTranslations }));
      } catch (error) {
        console.error('Language change error:', error);
      } finally {
        setIsTranslating(false);
      }
    },
    [currentLanguage]
  );

  const t = useCallback(
    (key: string): string => {
      if (currentLanguage === 'tr') {
        return (
          manualTranslations.tr[key as keyof typeof manualTranslations.tr] ||
          key
        );
      }

      const result =
        translations[key]?.[currentLanguage] ||
        manualTranslations.tr[key as keyof typeof manualTranslations.tr] ||
        key;

      return result;
    },
    [currentLanguage, translations]
  );

  useEffect(() => {
    setCurrentLanguage('tr');
  }, []);

  return {
    currentLanguage,
    changeLanguage,
    t,
    isTranslating,
  };
};
