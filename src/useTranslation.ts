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
      // Navigation & Tabs
      home: 'Ana Sayfa',
      menu: 'Menü',
      order: 'Sipariş',
      contact: 'İletişim',

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

      // Menu Page
      ourMenu: 'Menümüz',
      addToOrder: 'Siparişe Ekle',
      icecream: 'Dondurma', // Menu tab
      // Menu Items - Ice Cream
      classicVanillaBeanName: 'Klasik Vanilya',
      classicVanillaBeanDesc:
        'Madagaskar vanilya çubukları ile yapılmış pürüzsüz ve kremsi vanilyalı dondurma.',
      spaghettiClassicName: 'Spagetti Klasik',
      spaghettiClassicDesc:
        'Premium Belçika çikolatası ile yapılmış zengin çikolatalı dondurma.',
      fruitCupName: 'Meyve Kupası',
      fruitCupDesc:
        'Sicilya antep fıstığı ile yapılmış otantik antep fıstıklı dondurma.',
      pizzaIceName: 'Pizza Dondurma',
      pizzaIceDesc: 'Mevsimlik çileklerle yapılmış taze çilekli dondurma.',
      mixedFruitCupName: 'Karışık Meyve Kupası',
      mixedFruitCupDesc: 'Karamel soslu tatlı ve tuzlu karamelli dondurma.',
      lemonSorbetName: 'Limon Sorbe',
      lemonSorbetDesc:
        'Sıcak günler için mükemmel, ferahlatıcı, sütsüz limon sorbe.',
      // Menu Items - Cakes
      bananaCakeName: 'Muzlu-Vanilyalı Pasta',
      bananaCakeDesc:
        'Dilim fiyatı: 4.50€! Bütün pasta için lütfen ön sipariş verin.',
      priceForAll: 'Tümü: {price}',
      cakePopName: 'Cake Pop',
      cakePopDesc:
        'Çikolata sosu ve çikolatalı dondurma ile kaplanmış Belçika waffle.',
      pricePerPiece: 'Adet: {price}',
      waffleNutellaName: 'Nutellalı ve Meyveli Waffle',
      waffleNutellaDesc:
        'Karışık meyveler ve vanilyalı dondurma ile kaplanmış Belçika waffle.',
      waffleCompleteName: 'Waffle Komple',
      waffleCompleteDesc:
        'Muz dilimleri, üç top dondurma ve krem şanti ile kaplanmış Belçika waffle.',
      // Menu Items - Beverages
      espressoName: 'Espresso',
      espressoDesc: 'Sert ve yoğun bir kahve deneyimi.',
      cappuccinoName: 'Cappuccino',
      cappuccinoDesc: 'Espresso, süt ve süt köpüğünün mükemmel uyumu.',
      iceCoffee1Name: 'Buzlu Kahve - 1',
      iceCoffee1Desc: 'Soğuk kahve, vanilyalı dondurma, kahve sosu ve krema.',
      priceSmall: 'Küçük: {price}',
      italianSodaName: 'İtalyan Sodası',
      italianSodaDesc: 'Seçtiğiniz meyve şurubu ile köpüklü su.',
      iceCoffee2Name: 'Buzlu Kahve - 2',
      iceCoffee2Desc: 'Soğuk kahve, karamel sosu, kahve sosu ve buz küpleri.',

      // Order Page
      placeYourOrder: 'Siparişinizi Verin',
      menuItems: 'Menü Öğeleri',
      name: 'İsim',
      yourNamePlaceholder: 'Adınız',
      yourPhonePlaceholder: 'Telefon numaranız',
      deliveryOption: 'Teslimat Seçeneği',
      delivery: 'Eve Servis',
      pickup: 'Gel Al',
      deliveryAddress: 'Teslimat Adresi',
      yourDeliveryAddressPlaceholder: 'Teslimat adresiniz',
      orderSummary: 'Sipariş Özeti',
      totalAmount: 'Toplam Tutar:',
      paymentMethod: 'Ödeme Yöntemi',
      creditCard: 'Kredi Kartı',
      payPal: 'PayPal',
      cancel: 'İptal',
      placeOrder: 'Sipariş Ver',
      orderSuccessMessage: 'Siparişiniz başarıyla alındı!',

      // Contact Page
      visitUs: 'Bizi Ziyaret Edin',
      contactInformation: 'İletişim Bilgileri',
      address: 'Adres',
      openingHours: 'Çalışma Saatleri',
      Everyday: 'Her gün',
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
      aboutUs: 'Hakkımızda',
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
      // Navigation & Tabs
      home: 'Startseite',
      menu: 'Speisekarte',
      order: 'Bestellung',
      contact: 'Kontakt',

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

      // Menu Page
      ourMenu: 'Unsere Speisekarte',
      addToOrder: 'Zur Bestellung hinzufügen',
      icecream: 'Eis', // Menu tab
      // Menu Items - Ice Cream
      classicVanillaBeanName: 'Klassische Vanille',
      classicVanillaBeanDesc:
        'Glattes und cremiges Vanilleeis, hergestellt mit Madagaskar-Vanilleschoten.',
      spaghettiClassicName: 'Spaghetti Klassik',
      spaghettiClassicDesc:
        'Dekadentes Schokoladengelato, hergestellt mit erstklassiger belgischer Schokolade.',
      fruitCupName: 'Fruchtbecher',
      fruitCupDesc:
        'Authentisches Pistaziengelato, hergestellt mit sizilianischen Pistazien.',
      pizzaIceName: 'Pizzaeis',
      pizzaIceDesc:
        'Frisches Erdbeergelato, hergestellt mit saisonalen Beeren.',
      mixedFruitCupName: 'Gemischter Fruchtbecher',
      mixedFruitCupDesc:
        'Süßes und salziges Karamellgelato mit Karamellwirbeln.',
      lemonSorbetName: 'Zitronensorbet',
      lemonSorbetDesc:
        'Erfrischendes, milchfreies Zitronensorbet, perfekt für heiße Tage.',
      // Menu Items - Cakes
      bananaCakeName: 'Vanille-Bananen-Torte',
      bananaCakeDesc: 'Ein Stück: 4.50€! Torte bitte vorbestellen.',
      priceForAll: 'Alles: {price}',
      cakePopName: 'Cake Pop',
      cakePopDesc:
        'Belgische Waffel mit Schokoladensauce und Schokoladengelato.',
      pricePerPiece: 'Ein Stück: {price}',
      waffleNutellaName: 'Waffel Nutella und Früchte',
      waffleNutellaDesc:
        'Belgische Waffel mit gemischten Beeren und Vanillegelato.',
      waffleCompleteName: 'Waffel Komplett',
      waffleCompleteDesc:
        'Belgische Waffel mit Bananenscheiben, drei Eissorten und Schlagsahne.',
      // Menu Items - Beverages
      espressoName: 'Espresso',
      espressoDesc: 'Ein starkes und intensives Kaffeeerlebnis.',
      cappuccinoName: 'Cappuccino',
      cappuccinoDesc: 'Espresso, Milch und Milchschaum in perfekter Harmonie.',
      iceCoffee1Name: 'Eiskaffee - 1',
      iceCoffee1Desc: 'Kalter Kaffee, Vanilleeis, Kaffeesoße und Sahne.',
      priceSmall: 'Klein: {price}',
      italianSodaName: 'Italienische Soda',
      italianSodaDesc: 'Sprudelwasser mit Fruchtsirup Ihrer Wahl.',
      iceCoffee2Name: 'Eiskaffee - 2',
      iceCoffee2Desc: 'Kalter Kaffee, Karamellsoße, Kaffeesoße und Eiswürfel.',

      // Order Page
      placeYourOrder: 'Ihre Bestellung aufgeben',
      menuItems: 'Menüpunkte',
      name: 'Name',
      yourNamePlaceholder: 'Ihr Name',
      yourPhonePlaceholder: 'Ihre Telefonnummer',
      deliveryOption: 'Lieferoption',
      delivery: 'Lieferung',
      pickup: 'Abholung',
      deliveryAddress: 'Lieferadresse',
      yourDeliveryAddressPlaceholder: 'Ihre Lieferadresse',
      orderSummary: 'Bestellübersicht',
      totalAmount: 'Gesamtbetrag:',
      paymentMethod: 'Zahlungsmethode',
      creditCard: 'Kreditkarte',
      payPal: 'PayPal',
      cancel: 'Abbrechen',
      placeOrder: 'Bestellung aufgeben',
      orderSuccessMessage: 'Ihre Bestellung wurde erfolgreich aufgegeben!',

      // Contact Page
      visitUs: 'Besuchen Sie uns',
      contactInformation: 'Kontaktinformationen',
      address: 'Adresse',
      openingHours: 'Öffnungszeiten',
      Everyday: 'Täglich',
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
      aboutUs: 'Über uns',
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
      // Navigation & Tabs
      home: 'Home',
      menu: 'Menu',
      order: 'Order',
      contact: 'Contact',

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

      // Menu Page
      ourMenu: 'Our Menu',
      addToOrder: 'Add to Order',
      icecream: 'Ice Cream', // Menu tab
      // Menu Items - Ice Cream
      classicVanillaBeanName: 'Classic Vanilla Bean',
      classicVanillaBeanDesc:
        'Smooth and creamy vanilla gelato made with Madagascar vanilla beans.',
      spaghettiClassicName: 'Spaghetti Classic',
      spaghettiClassicDesc:
        'Decadent chocolate gelato made with premium Belgian chocolate.',
      fruitCupName: 'Fruit Cup',
      fruitCupDesc: 'Authentic pistachio gelato made with Sicilian pistachios.',
      pizzaIceName: 'Pizza Ice Cream',
      pizzaIceDesc: 'Fresh strawberry gelato made with seasonal berries.',
      mixedFruitCupName: 'Mixed Fruit Cup',
      mixedFruitCupDesc: 'Sweet and salty caramel gelato with caramel swirls.',
      lemonSorbetName: 'Lemon Sorbet',
      lemonSorbetDesc:
        'Refreshing dairy-free lemon sorbet, perfect for hot days.',
      // Menu Items - Cakes
      bananaCakeName: 'Vanilla Banana Cake',
      bananaCakeDesc: 'One piece: €4.50! Please pre-order for a whole cake.',
      priceForAll: 'All: {price}',
      cakePopName: 'Cake Pop',
      cakePopDesc:
        'Belgian waffle topped with chocolate sauce and chocolate gelato.',
      pricePerPiece: 'One piece: {price}',
      waffleNutellaName: 'Waffle with Nutella and Fruits',
      waffleNutellaDesc:
        'Belgian waffle topped with mixed berries and vanilla gelato.',
      waffleCompleteName: 'Complete Waffle',
      waffleCompleteDesc:
        'Belgian waffle topped with banana slices, three gelato scoops, and whipped cream.',
      // Menu Items - Beverages
      espressoName: 'Espresso',
      espressoDesc: 'A strong and intense coffee experience.',
      cappuccinoName: 'Cappuccino',
      cappuccinoDesc: 'Espresso, milk, and milk foam in perfect harmony.',
      iceCoffee1Name: 'Iced Coffee - 1',
      iceCoffee1Desc:
        'Cold coffee, vanilla ice cream, coffee sauce, and cream.',
      priceSmall: 'Small: {price}',
      italianSodaName: 'Italian Soda',
      italianSodaDesc: 'Sparkling water with your choice of fruit syrup.',
      iceCoffee2Name: 'Iced Coffee - 2',
      iceCoffee2Desc:
        'Cold coffee, caramel sauce, coffee sauce, and ice cubes.',

      // Order Page
      placeYourOrder: 'Place Your Order',
      menuItems: 'Menu Items',
      name: 'Name',
      yourNamePlaceholder: 'Your name',
      yourPhonePlaceholder: 'Your phone number',
      deliveryOption: 'Delivery Option',
      delivery: 'Delivery',
      pickup: 'Pickup',
      deliveryAddress: 'Delivery Address',
      yourDeliveryAddressPlaceholder: 'Your delivery address',
      orderSummary: 'Order Summary',
      totalAmount: 'Total Amount:',
      paymentMethod: 'Payment Method',
      creditCard: 'Credit Card',
      payPal: 'PayPal',
      cancel: 'Cancel',
      placeOrder: 'Place Order',
      orderSuccessMessage: 'Your order has been placed successfully!',

      // Contact Page
      visitUs: 'Visit Us',
      contactInformation: 'Contact Information',
      address: 'Address',
      openingHours: 'Opening Hours',
      Everyday: 'Everyday',
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
      aboutUs: 'About Us',
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
      // Navigation & Tabs
      home: 'Inicio',
      menu: 'Menú',
      order: 'Pedido',
      contact: 'Contacto',

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

      // Menu Page
      ourMenu: 'Nuestro Menú',
      addToOrder: 'Agregar al Pedido',
      icecream: 'Helado', // Menu tab
      // Menu Items - Ice Cream
      classicVanillaBeanName: 'Vainilla Clásica',
      classicVanillaBeanDesc:
        'Helado de vainilla suave y cremoso hecho con vainas de vainilla de Madagascar.',
      spaghettiClassicName: 'Spaghetti Clásico',
      spaghettiClassicDesc:
        'Decadente helado de chocolate hecho con chocolate belga de primera calidad.',
      fruitCupName: 'Copa de Frutas',
      fruitCupDesc:
        'Auténtico helado de pistacho hecho con pistachos de Sicilia.',
      pizzaIceName: 'Helado de Pizza',
      pizzaIceDesc: 'Fresco helado de fresa hecho con bayas de temporada.',
      mixedFruitCupName: 'Copa de Frutas Mixtas',
      mixedFruitCupDesc:
        'Helado de caramelo dulce y salado con remolinos de caramelo.',
      lemonSorbetName: 'Sorbete de Limón',
      lemonSorbetDesc:
        'Refrescante sorbete de limón sin lácteos, perfecto para los días calurosos.',
      // Menu Items - Cakes
      bananaCakeName: 'Pastel de Vainilla y Plátano',
      bananaCakeDesc:
        '¡Una porción: 4,50€! Por favor, pre-ordene para un pastel entero.',
      priceForAll: 'Todo: {price}',
      cakePopName: 'Cake Pop',
      cakePopDesc:
        'Gofre belga cubierto con salsa de chocolate y helado de chocolate.',
      pricePerPiece: 'Una pieza: {price}',
      waffleNutellaName: 'Gofre con Nutella y Frutas',
      waffleNutellaDesc:
        'Gofre belga cubierto con bayas mixtas y helado de vainilla.',
      waffleCompleteName: 'Gofre Completo',
      waffleCompleteDesc:
        'Gofre belga con rodajas de plátano, tres bolas de helado y nata montada.',
      // Menu Items - Beverages
      espressoName: 'Espresso',
      espressoDesc: 'Una experiencia de café fuerte e intensa.',
      cappuccinoName: 'Cappuccino',
      cappuccinoDesc: 'Espresso, leche y espuma de leche en perfecta armonía.',
      iceCoffee1Name: 'Café Helado - 1',
      iceCoffee1Desc: 'Café frío, helado de vainilla, salsa de café y nata.',
      priceSmall: 'Pequeño: {price}',
      italianSodaName: 'Soda Italiana',
      italianSodaDesc: 'Agua con gas con el sirope de frutas de tu elección.',
      iceCoffee2Name: 'Café Helado - 2',
      iceCoffee2Desc:
        'Café frío, salsa de caramelo, salsa de café y cubitos de hielo.',

      // Order Page
      placeYourOrder: 'Realizar su Pedido',
      menuItems: 'Artículos del Menú',
      name: 'Nombre',
      yourNamePlaceholder: 'Su nombre',
      yourPhonePlaceholder: 'Su número de teléfono',
      deliveryOption: 'Opción de Entrega',
      delivery: 'A Domicilio',
      pickup: 'Recoger',
      deliveryAddress: 'Dirección de Entrega',
      yourDeliveryAddressPlaceholder: 'Su dirección de entrega',
      orderSummary: 'Resumen del Pedido',
      totalAmount: 'Importe Total:',
      paymentMethod: 'Método de Pago',
      creditCard: 'Tarjeta de Crédito',
      payPal: 'PayPal',
      cancel: 'Cancelar',
      placeOrder: 'Realizar Pedido',
      orderSuccessMessage: '¡Su pedido ha sido realizado con éxito!',

      // Contact Page
      visitUs: 'Visítanos',
      contactInformation: 'Información de Contacto',
      address: 'Dirección',
      openingHours: 'Horario de Apertura',
      Everyday: 'Todos los días',
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
        'Nuestra área de asientos al aire libre es apta para mascotas. ¡Tus amigos peludos también son bienvenidos!',

      // Footer
      footerDescription:
        'Sirviendo gelato italiano auténtico y golosinas desde 1995. Nuestras recetas han sido transmitidas a través de generaciones.',
      quickLinks: 'Enlaces Rápidos',
      aboutUs: 'Sobre Nosotros',
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

      // Since we are using a comprehensive manual translation object,
      // we don't need to fetch or dynamically build translations here.
      // The `t` function will directly access the correct language object.
      // We just need to update the state to trigger a re-render.

      // Simulating async operation for consistency if needed in the future
      await new Promise((resolve) => setTimeout(resolve, 0));

      setIsTranslating(false);
    },
    [currentLanguage]
  );

  const t = useCallback(
    (key: string, options?: { [key: string]: string | number }): string => {
      const langKey = currentLanguage as keyof typeof manualTranslations;
      const translationsForLang = manualTranslations[langKey];

      let translation =
        translationsForLang[key as keyof typeof translationsForLang] || key;

      if (options) {
        Object.keys(options).forEach((optionKey) => {
          translation = translation.replace(
            `{${optionKey}}`,
            String(options[optionKey])
          );
        });
      }

      return translation;
    },
    [currentLanguage]
  );

  useEffect(() => {
    // Set a default language on initial load. You might want this to be 'de' or 'en'
    // depending on your primary audience, or detect from browser settings.
    setCurrentLanguage('tr');
  }, []);

  return {
    currentLanguage,
    changeLanguage,
    t,
    isTranslating,
  };
};
