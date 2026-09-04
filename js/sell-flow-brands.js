/* ============================================================
   sell-flow-brands.js — Brand page catalog loader
   Dynamically loads phones from admin catalog onto brand pages
   ============================================================ */

// Complete model list from sell-flow.js (converted to catalog format)
const DEFAULT_MODELS = [
  // Apple - expanded range
  { id: 'iphone-6s', name: 'Apple iPhone 6S', brand: 'Apple', price: '2310', condition: 'Good', image: 'https://images.unsplash.com/photo-1573148195906-32dffe7b9d38?auto=format&fit=crop&w=500&q=80', spec: '2 GB / 32 GB' },
  { id: 'iphone-6', name: 'Apple iPhone 6', brand: 'Apple', price: '1850', condition: 'Good', image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=500&q=80', spec: '16 GB' },
  { id: 'iphone-6-plus', name: 'Apple iPhone 6 Plus', brand: 'Apple', price: '2100', condition: 'Good', image: 'https://images.unsplash.com/photo-1601784551446-20c9e07d3f8b?auto=format&fit=crop&w=500&q=80', spec: '16 GB' },
  { id: 'iphone-7', name: 'Apple iPhone 7', brand: 'Apple', price: '2880', condition: 'Good', image: 'https://images.unsplash.com/photo-1580910051074-3eb7f5f0f6c6?auto=format&fit=crop&w=500&q=80', spec: '32 GB' },
  { id: 'iphone-8', name: 'Apple iPhone 8', brand: 'Apple', price: '4200', condition: 'Good', image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=500&q=80', spec: '64 GB' },
  { id: 'iphone-xr', name: 'Apple iPhone XR', brand: 'Apple', price: '18500', condition: 'Good', image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=500&q=80', spec: '64 GB' },
  { id: 'iphone-xs', name: 'Apple iPhone XS', brand: 'Apple', price: '17000', condition: 'Good', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80', spec: '64 GB' },
  { id: 'iphone-xs-max', name: 'Apple iPhone XS Max', brand: 'Apple', price: '19700', condition: 'Good', image: 'https://images.unsplash.com/photo-1611472173362-3f53dbf3b1d6?auto=format&fit=crop&w=500&q=80', spec: '64 GB' },
  { id: 'iphone-11', name: 'Apple iPhone 11', brand: 'Apple', price: '16200', condition: 'Superb', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80', spec: '64 GB' },
  { id: 'iphone-12', name: 'Apple iPhone 12', brand: 'Apple', price: '32999', condition: 'Superb', image: 'https://images.unsplash.com/photo-1611472173362-3f53dbf3b1d6?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'iphone-13', name: 'Apple iPhone 13', brand: 'Apple', price: '38500', condition: 'Superb', image: 'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'iphone-14', name: 'Apple iPhone 14', brand: 'Apple', price: '42500', condition: 'Superb', image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'iphone-14-plus', name: 'Apple iPhone 14 Plus', brand: 'Apple', price: '45900', condition: 'Superb', image: 'https://images.unsplash.com/photo-1601784551446-20c9e07d3f8b?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'iphone-14-pro', name: 'Apple iPhone 14 Pro', brand: 'Apple', price: '49900', condition: 'Superb', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'iphone-15', name: 'Apple iPhone 15', brand: 'Apple', price: '56400', condition: 'Superb', image: 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'iphone-15-pro', name: 'Apple iPhone 15 Pro', brand: 'Apple', price: '64900', condition: 'Superb', image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'iphone-se-2022', name: 'Apple iPhone SE (2022)', brand: 'Apple', price: '21900', condition: 'Superb', image: 'https://images.unsplash.com/photo-1573148195906-32dffe7b9d38?auto=format&fit=crop&w=500&q=80', spec: '64 GB' },
  { id: 'iphone-se', name: 'Apple iPhone SE', brand: 'Apple', price: '17900', condition: 'Superb', image: 'https://images.unsplash.com/photo-1573148195906-32dffe7b9d38?auto=format&fit=crop&w=500&q=80', spec: '64 GB' },
  // Samsung - expanded range
  { id: 'galaxy-s10', name: 'Samsung Galaxy S10', brand: 'Samsung', price: '15200', condition: 'Good', image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'galaxy-s10-plus', name: 'Samsung Galaxy S10 Plus', brand: 'Samsung', price: '16500', condition: 'Good', image: 'https://images.unsplash.com/photo-1610792516307-ea5acd5d1d60?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'galaxy-s20', name: 'Samsung Galaxy S20', brand: 'Samsung', price: '11800', condition: 'Good', image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'galaxy-s20-fe', name: 'Samsung Galaxy S20 FE', brand: 'Samsung', price: '11900', condition: 'Good', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'galaxy-s21', name: 'Samsung Galaxy S21', brand: 'Samsung', price: '14200', condition: 'Superb', image: 'https://images.unsplash.com/photo-1610792516307-ea5acd5d1d60?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'galaxy-s21-fe', name: 'Samsung Galaxy S21 FE', brand: 'Samsung', price: '14600', condition: 'Superb', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'galaxy-s22', name: 'Samsung Galaxy S22', brand: 'Samsung', price: '18800', condition: 'Superb', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'galaxy-s22-plus', name: 'Samsung Galaxy S22 Plus', brand: 'Samsung', price: '19700', condition: 'Superb', image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'galaxy-s22-ultra', name: 'Samsung Galaxy S22 Ultra', brand: 'Samsung', price: '24900', condition: 'Superb', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80', spec: '256 GB' },
  { id: 'galaxy-s23', name: 'Samsung Galaxy S23', brand: 'Samsung', price: '27900', condition: 'Superb', image: 'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'galaxy-s23-ultra', name: 'Samsung Galaxy S23 Ultra', brand: 'Samsung', price: '39800', condition: 'Superb', image: 'https://images.unsplash.com/photo-1611472173362-3f53dbf3b1d6?auto=format&fit=crop&w=500&q=80', spec: '256 GB' },
  { id: 'galaxy-note-10', name: 'Samsung Galaxy Note 10', brand: 'Samsung', price: '15900', condition: 'Good', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80', spec: '256 GB' },
  { id: 'galaxy-note-20', name: 'Samsung Galaxy Note 20', brand: 'Samsung', price: '13600', condition: 'Good', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'galaxy-a13', name: 'Samsung Galaxy A13', brand: 'Samsung', price: '7800', condition: 'Fair', image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=500&q=80', spec: '64 GB' },
  { id: 'galaxy-a14', name: 'Samsung Galaxy A14', brand: 'Samsung', price: '8900', condition: 'Good', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'galaxy-a15', name: 'Samsung Galaxy A15', brand: 'Samsung', price: '10900', condition: 'Good', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'galaxy-a52', name: 'Samsung Galaxy A52', brand: 'Samsung', price: '10900', condition: 'Good', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'galaxy-a53', name: 'Samsung Galaxy A53', brand: 'Samsung', price: '15400', condition: 'Good', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'galaxy-m13', name: 'Samsung Galaxy M13', brand: 'Samsung', price: '7600', condition: 'Fair', image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=500&q=80', spec: '64 GB' },
  { id: 'galaxy-m14', name: 'Samsung Galaxy M14', brand: 'Samsung', price: '9400', condition: 'Good', image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'galaxy-m32', name: 'Samsung Galaxy M32', brand: 'Samsung', price: '7200', condition: 'Fair', image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=500&q=80', spec: '64 GB' },
  // OnePlus - expanded range
  { id: 'oneplus-6t', name: 'OnePlus 6T', brand: 'OnePlus', price: '10800', condition: 'Good', image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'oneplus-7', name: 'OnePlus 7', brand: 'OnePlus', price: '11600', condition: 'Good', image: 'https://images.unsplash.com/photo-1573148195906-32dffe7b9d38?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'oneplus-7t', name: 'OnePlus 7T', brand: 'OnePlus', price: '11600', condition: 'Good', image: 'https://images.unsplash.com/photo-1573148195906-32dffe7b9d38?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'oneplus-7-pro', name: 'OnePlus 7 Pro', brand: 'OnePlus', price: '12100', condition: 'Superb', image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'oneplus-8', name: 'OnePlus 8', brand: 'OnePlus', price: '12400', condition: 'Good', image: 'https://images.unsplash.com/photo-1601784551446-20c9e07d3f8b?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'oneplus-8t', name: 'OnePlus 8T', brand: 'OnePlus', price: '12700', condition: 'Superb', image: 'https://images.unsplash.com/photo-1573148195906-32dffe7b9d38?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'oneplus-9', name: 'OnePlus 9', brand: 'OnePlus', price: '11800', condition: 'Good', image: 'https://images.unsplash.com/photo-1601784551446-20c9e07d3f8b?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'oneplus-9r', name: 'OnePlus 9R', brand: 'OnePlus', price: '14600', condition: 'Good', image: 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'oneplus-9-pro', name: 'OnePlus 9 Pro', brand: 'OnePlus', price: '17900', condition: 'Superb', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80', spec: '256 GB' },
  { id: 'oneplus-10r', name: 'OnePlus 10R', brand: 'OnePlus', price: '19900', condition: 'Good', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'oneplus-10-pro', name: 'OnePlus 10 Pro', brand: 'OnePlus', price: '23900', condition: 'Superb', image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=500&q=80', spec: '256 GB' },
  { id: 'oneplus-10t', name: 'OnePlus 10T', brand: 'OnePlus', price: '22900', condition: 'Good', image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=500&q=80', spec: '256 GB' },
  { id: 'oneplus-nord', name: 'OnePlus Nord', brand: 'OnePlus', price: '9200', condition: 'Good', image: 'https://images.unsplash.com/photo-1573148195906-32dffe7b9d38?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'oneplus-nord-2', name: 'OnePlus Nord 2', brand: 'OnePlus', price: '9300', condition: 'Good', image: 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'oneplus-nord-ce', name: 'OnePlus Nord CE', brand: 'OnePlus', price: '9800', condition: 'Good', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'oneplus-nord-3', name: 'OnePlus Nord 3', brand: 'OnePlus', price: '20900', condition: 'Superb', image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  // Nokia - expanded range
  { id: 'nokia-c10', name: 'Nokia C10', brand: 'Nokia', price: '5200', condition: 'Good', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80', spec: '32 GB' },
  { id: 'nokia-c20', name: 'Nokia C20', brand: 'Nokia', price: '6100', condition: 'Good', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=500&q=80', spec: '32 GB' },
  { id: 'nokia-c30', name: 'Nokia C30', brand: 'Nokia', price: '7600', condition: 'Good', image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=500&q=80', spec: '64 GB' },
  { id: 'nokia-g10', name: 'Nokia G10', brand: 'Nokia', price: '8300', condition: 'Good', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80', spec: '64 GB' },
  { id: 'nokia-g20', name: 'Nokia G20', brand: 'Nokia', price: '8200', condition: 'Good', image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=500&q=80', spec: '64 GB' },
  { id: 'nokia-g21', name: 'Nokia G21', brand: 'Nokia', price: '10900', condition: 'Good', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'nokia-g50', name: 'Nokia G50', brand: 'Nokia', price: '13999', condition: 'Superb', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'nokia-g60', name: 'Nokia G60', brand: 'Nokia', price: '16900', condition: 'Superb', image: 'https://images.unsplash.com/photo-1611472173362-3f53dbf3b1d6?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'nokia-x20', name: 'Nokia X20', brand: 'Nokia', price: '14900', condition: 'Good', image: 'https://images.unsplash.com/photo-1573148195906-32dffe7b9d38?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'nokia-c32', name: 'Nokia C32', brand: 'Nokia', price: '7600', condition: 'Good', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80', spec: '64 GB' },
  { id: 'nokia-c60', name: 'Nokia C60', brand: 'Nokia', price: '8400', condition: 'Good', image: 'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  // POCO - expanded range under Xiaomi family
  { id: 'poco-f1', name: 'POCO F1', brand: 'Poco', price: '9000', condition: 'Good', image: 'https://images.unsplash.com/photo-1573148195906-32dffe7b9d38?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'poco-f2-pro', name: 'POCO F2 Pro', brand: 'Poco', price: '11500', condition: 'Good', image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'poco-f3', name: 'POCO F3', brand: 'Poco', price: '15900', condition: 'Good', image: 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'poco-f4', name: 'POCO F4', brand: 'Poco', price: '18900', condition: 'Good', image: 'https://images.unsplash.com/photo-1611472173362-3f53dbf3b1d6?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'poco-x2', name: 'POCO X2', brand: 'Poco', price: '11800', condition: 'Good', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'poco-x3', name: 'POCO X3', brand: 'Poco', price: '9800', condition: 'Good', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'poco-x3-pro', name: 'POCO X3 Pro', brand: 'Poco', price: '10500', condition: 'Good', image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'poco-x4', name: 'POCO X4', brand: 'Poco', price: '9700', condition: 'Good', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'poco-x4-pro', name: 'POCO X4 Pro', brand: 'Poco', price: '8800', condition: 'Good', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'poco-x5', name: 'POCO X5', brand: 'Poco', price: '15200', condition: 'Good', image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'poco-m2', name: 'POCO M2', brand: 'Poco', price: '6400', condition: 'Good', image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=500&q=80', spec: '64 GB' },
  { id: 'poco-m3', name: 'POCO M3', brand: 'Poco', price: '6800', condition: 'Good', image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=500&q=80', spec: '64 GB' },
  { id: 'poco-m4', name: 'POCO M4', brand: 'Poco', price: '7600', condition: 'Good', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'poco-m5', name: 'POCO M5', brand: 'Poco', price: '8200', condition: 'Good', image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'poco-m6', name: 'POCO M6', brand: 'Poco', price: '9300', condition: 'Good', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  // Motorola - 4 models
  { id: 'motorola-g32', name: 'Motorola G32', brand: 'Motorola', price: '8400', condition: 'Good', image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'motorola-g52', name: 'Motorola G52', brand: 'Motorola', price: '9700', condition: 'Good', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'motorola-edge-40', name: 'Motorola Edge 40', brand: 'Motorola', price: '15900', condition: 'Superb', image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=500&q=80', spec: '256 GB' },
  { id: 'motorola-e13', name: 'Motorola E13', brand: 'Motorola', price: '6200', condition: 'Good', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80', spec: '64 GB' },
  // OPPO - 4 models
  { id: 'oppo-a78', name: 'OPPO A78', brand: 'OPPO', price: '9800', condition: 'Good', image: 'https://images.unsplash.com/photo-1573148195906-32dffe7b9d38?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'oppo-reno-8', name: 'OPPO Reno 8', brand: 'OPPO', price: '14500', condition: 'Superb', image: 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'oppo-f21', name: 'OPPO F21', brand: 'OPPO', price: '11800', condition: 'Good', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'oppo-a57', name: 'OPPO A57', brand: 'OPPO', price: '7600', condition: 'Fair', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=500&q=80', spec: '64 GB' },
  // Xiaomi - 6 models
  { id: 'redmi-note-11-pro', name: 'Redmi Note 11 Pro', brand: 'Xiaomi', price: '6900', condition: 'Good', image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'redmi-10', name: 'Redmi 10', brand: 'Xiaomi', price: '7600', condition: 'Good', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=500&q=80', spec: '64 GB' },
  { id: 'poco-x4-pro', name: 'POCO X4 Pro', brand: 'Xiaomi', price: '8800', condition: 'Good', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'mi-11x', name: 'Mi 11X', brand: 'Xiaomi', price: '9400', condition: 'Good', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'mi-11-lite', name: 'Mi 11 Lite', brand: 'Xiaomi', price: '8900', condition: 'Good', image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'xiaomi-12', name: 'Xiaomi 12', brand: 'Xiaomi', price: '18300', condition: 'Superb', image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'redmi-note-5', name: 'Redmi Note 5', brand: 'Xiaomi', price: '4500', condition: 'Good', image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=500&q=80', spec: '64 GB' },
  { id: 'redmi-note-6-pro', name: 'Redmi Note 6 Pro', brand: 'Xiaomi', price: '4700', condition: 'Good', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=500&q=80', spec: '64 GB' },
  { id: 'redmi-note-7', name: 'Redmi Note 7', brand: 'Xiaomi', price: '5200', condition: 'Good', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=500&q=80', spec: '64 GB' },
  { id: 'redmi-note-7-pro', name: 'Redmi Note 7 Pro', brand: 'Xiaomi', price: '6100', condition: 'Good', image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'redmi-note-8', name: 'Redmi Note 8', brand: 'Xiaomi', price: '5600', condition: 'Good', image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=500&q=80', spec: '64 GB' },
  { id: 'redmi-note-8-pro', name: 'Redmi Note 8 Pro', brand: 'Xiaomi', price: '6500', condition: 'Good', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'redmi-note-9', name: 'Redmi Note 9', brand: 'Xiaomi', price: '7900', condition: 'Good', image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'redmi-note-9-pro', name: 'Redmi Note 9 Pro', brand: 'Xiaomi', price: '8600', condition: 'Good', image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'redmi-note-9s', name: 'Redmi Note 9S', brand: 'Xiaomi', price: '8400', condition: 'Good', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'redmi-note-10', name: 'Redmi Note 10', brand: 'Xiaomi', price: '9200', condition: 'Good', image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'redmi-note-10-pro', name: 'Redmi Note 10 Pro', brand: 'Xiaomi', price: '10300', condition: 'Good', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'redmi-note-10s', name: 'Redmi Note 10S', brand: 'Xiaomi', price: '9800', condition: 'Good', image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'redmi-note-11', name: 'Redmi Note 11', brand: 'Xiaomi', price: '10900', condition: 'Good', image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'redmi-note-11s', name: 'Redmi Note 11S', brand: 'Xiaomi', price: '11200', condition: 'Good', image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'redmi-note-11t', name: 'Redmi Note 11T', brand: 'Xiaomi', price: '11800', condition: 'Good', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'redmi-note-12', name: 'Redmi Note 12', brand: 'Xiaomi', price: '13500', condition: 'Superb', image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'redmi-note-12-pro', name: 'Redmi Note 12 Pro', brand: 'Xiaomi', price: '14900', condition: 'Superb', image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'redmi-6', name: 'Redmi 6', brand: 'Xiaomi', price: '4600', condition: 'Good', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=500&q=80', spec: '64 GB' },
  { id: 'redmi-7', name: 'Redmi 7', brand: 'Xiaomi', price: '4900', condition: 'Good', image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=500&q=80', spec: '64 GB' },
  { id: 'redmi-8', name: 'Redmi 8', brand: 'Xiaomi', price: '5300', condition: 'Good', image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=500&q=80', spec: '64 GB' },
  { id: 'redmi-9', name: 'Redmi 9', brand: 'Xiaomi', price: '7600', condition: 'Good', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'redmi-9a', name: 'Redmi 9A', brand: 'Xiaomi', price: '5800', condition: 'Good', image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=500&q=80', spec: '32 GB' },
  { id: 'redmi-9c', name: 'Redmi 9C', brand: 'Xiaomi', price: '6200', condition: 'Good', image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=500&q=80', spec: '64 GB' },
  { id: 'redmi-10a', name: 'Redmi 10A', brand: 'Xiaomi', price: '6700', condition: 'Good', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=500&q=80', spec: '64 GB' },
  { id: 'redmi-10c', name: 'Redmi 10C', brand: 'Xiaomi', price: '7300', condition: 'Good', image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=500&q=80', spec: '64 GB' },
  { id: 'redmi-k20', name: 'Redmi K20', brand: 'Xiaomi', price: '9900', condition: 'Good', image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'redmi-k20-pro', name: 'Redmi K20 Pro', brand: 'Xiaomi', price: '12100', condition: 'Superb', image: 'https://images.unsplash.com/photo-1573148195906-32dffe7b9d38?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'redmi-k30', name: 'Redmi K30', brand: 'Xiaomi', price: '11200', condition: 'Good', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'redmi-k40', name: 'Redmi K40', brand: 'Xiaomi', price: '15800', condition: 'Superb', image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'poco-f1', name: 'POCO F1', brand: 'Xiaomi', price: '9000', condition: 'Good', image: 'https://images.unsplash.com/photo-1573148195906-32dffe7b9d38?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'poco-f2-pro', name: 'POCO F2 Pro', brand: 'Xiaomi', price: '11500', condition: 'Good', image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'poco-x3', name: 'POCO X3', brand: 'Xiaomi', price: '9800', condition: 'Good', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'poco-x3-pro', name: 'POCO X3 Pro', brand: 'Xiaomi', price: '10500', condition: 'Good', image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'poco-x4', name: 'POCO X4', brand: 'Xiaomi', price: '9700', condition: 'Good', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'poco-m2', name: 'POCO M2', brand: 'Xiaomi', price: '6400', condition: 'Good', image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=500&q=80', spec: '64 GB' },
  { id: 'poco-m3', name: 'POCO M3', brand: 'Xiaomi', price: '6800', condition: 'Good', image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=500&q=80', spec: '64 GB' },
  { id: 'poco-m4', name: 'POCO M4', brand: 'Xiaomi', price: '7600', condition: 'Good', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'poco-m5', name: 'POCO M5', brand: 'Xiaomi', price: '8200', condition: 'Good', image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'mi-10', name: 'Mi 10', brand: 'Xiaomi', price: '12800', condition: 'Superb', image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'mi-10t', name: 'Mi 10T', brand: 'Xiaomi', price: '11800', condition: 'Good', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'mi-11', name: 'Mi 11', brand: 'Xiaomi', price: '16800', condition: 'Superb', image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'xiaomi-mi-note-10', name: 'Xiaomi Mi Note 10', brand: 'Xiaomi', price: '10500', condition: 'Good', image: 'https://images.unsplash.com/photo-1573148195906-32dffe7b9d38?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'xiaomi-mi-note-10-lite', name: 'Xiaomi Mi Note 10 Lite', brand: 'Xiaomi', price: '9300', condition: 'Good', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  // Vivo - 6 models
  { id: 'vivo-y20', name: 'Vivo Y20', brand: 'Vivo', price: '8300', condition: 'Fair', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80', spec: '64 GB' },
  { id: 'vivo-v20', name: 'Vivo V20', brand: 'Vivo', price: '11400', condition: 'Good', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'vivo-v21', name: 'Vivo V21', brand: 'Vivo', price: '13500', condition: 'Superb', image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'vivo-y51', name: 'Vivo Y51', brand: 'Vivo', price: '9800', condition: 'Good', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'vivo-y73', name: 'Vivo Y73', brand: 'Vivo', price: '11200', condition: 'Good', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  { id: 'vivo-x60', name: 'Vivo X60', brand: 'Vivo', price: '17600', condition: 'Superb', image: 'https://images.unsplash.com/photo-1601784551446-20c9e07d3f8b?auto=format&fit=crop&w=500&q=80', spec: '128 GB' },
  // Nokia - 1 model
  { id: 'iphone-6s-plus', name: 'Apple iPhone 6S Plus', brand: 'Apple', price: '2500', condition: 'Good', spec: '32 GB' },
  { id: 'iphone-7-plus', name: 'Apple iPhone 7 Plus', brand: 'Apple', price: '3400', condition: 'Good', spec: '32 GB' },
  { id: 'iphone-8-plus', name: 'Apple iPhone 8 Plus', brand: 'Apple', price: '5200', condition: 'Good', spec: '64 GB' },
  { id: 'iphone-x', name: 'Apple iPhone X', brand: 'Apple', price: '14500', condition: 'Good', spec: '64 GB' },
  { id: 'iphone-16', name: 'Apple iPhone 16', brand: 'Apple', price: '47520', condition: 'Superb', spec: '128 GB' },
  { id: 'galaxy-a14-5g', name: 'Samsung Galaxy A14 5G', brand: 'Samsung', price: '9000', condition: 'Good', spec: '128 GB' },
  { id: 'galaxy-a03', name: 'Samsung Galaxy A03', brand: 'Samsung', price: '6200', condition: 'Good', spec: '32 GB' },
  { id: 'galaxy-a03-core', name: 'Samsung Galaxy A03 Core', brand: 'Samsung', price: '5400', condition: 'Good', spec: '32 GB' },
  { id: 'galaxy-a03s', name: 'Samsung Galaxy A03s', brand: 'Samsung', price: '5800', condition: 'Good', spec: '32 GB' },
  { id: 'galaxy-s22-ultra-5g', name: 'Samsung Galaxy S22 Ultra 5G', brand: 'Samsung', price: '24900', condition: 'Superb', spec: '256 GB' },
  { id: 'galaxy-s23-ultra-5g', name: 'Samsung Galaxy S23 Ultra 5G', brand: 'Samsung', price: '39800', condition: 'Superb', spec: '256 GB' },
  { id: 'oneplus-6', name: 'OnePlus 6', brand: 'OnePlus', price: '9800', condition: 'Good', spec: '128 GB' },
  { id: 'oneplus-5t', name: 'OnePlus 5T', brand: 'OnePlus', price: '7600', condition: 'Good', spec: '64 GB' },
  { id: 'oneplus-5', name: 'OnePlus 5', brand: 'OnePlus', price: '6800', condition: 'Good', spec: '64 GB' },
  { id: 'oneplus-3t', name: 'OnePlus 3T', brand: 'OnePlus', price: '5200', condition: 'Good', spec: '64 GB' },
  { id: 'oneplus-3', name: 'OnePlus 3', brand: 'OnePlus', price: '4600', condition: 'Good', spec: '64 GB' },
  { id: 'oneplus-6t-mclaren', name: 'OnePlus 6T McLaren', brand: 'OnePlus', price: '10500', condition: 'Good', spec: '256 GB' },
  { id: 'vivo-v9-pro', name: 'Vivo V9 Pro', brand: 'Vivo', price: '6500', condition: 'Good', spec: '64 GB' },
  { id: 'vivo-v11-pro', name: 'Vivo V11 Pro', brand: 'Vivo', price: '7200', condition: 'Good', spec: '64 GB' },
  { id: 'vivo-v11', name: 'Vivo V11', brand: 'Vivo', price: '6500', condition: 'Good', spec: '64 GB' },
  { id: 'vivo-y83-pro', name: 'Vivo Y83 Pro', brand: 'Vivo', price: '5600', condition: 'Good', spec: '64 GB' },
  { id: 'vivo-nex', name: 'Vivo NEX', brand: 'Vivo', price: '9000', condition: 'Good', spec: '128 GB' },
  { id: 'vivo-y71i', name: 'Vivo Y71i', brand: 'Vivo', price: '4300', condition: 'Good', spec: '16 GB' },
  { id: 'motorola-one-power', name: 'Motorola One Power', brand: 'Motorola', price: '6900', condition: 'Good', spec: '64 GB' },
  { id: 'moto-g6-plus', name: 'Motorola Moto G6 Plus', brand: 'Motorola', price: '5200', condition: 'Good', spec: '64 GB' },
  { id: 'moto-z2-force', name: 'Motorola Moto Z2 Force', brand: 'Motorola', price: '6200', condition: 'Good', spec: '64 GB' },
  { id: 'moto-g6', name: 'Motorola Moto G6', brand: 'Motorola', price: '4800', condition: 'Good', spec: '64 GB' },
  { id: 'moto-g7-power', name: 'Motorola Moto G7 Power', brand: 'Motorola', price: '5800', condition: 'Good', spec: '64 GB' },
  { id: 'moto-g7', name: 'Motorola Moto G7', brand: 'Motorola', price: '5600', condition: 'Good', spec: '64 GB' },
  { id: 'oppo-a7', name: 'OPPO A7', brand: 'OPPO', price: '5200', condition: 'Good', spec: '64 GB' },
  { id: 'oppo-f9-pro', name: 'OPPO F9 Pro', brand: 'OPPO', price: '6500', condition: 'Good', spec: '64 GB' },
  { id: 'oppo-f9', name: 'OPPO F9', brand: 'OPPO', price: '6000', condition: 'Good', spec: '64 GB' },
  { id: 'oppo-a3s', name: 'OPPO A3s', brand: 'OPPO', price: '4500', condition: 'Good', spec: '32 GB' },
  { id: 'oppo-find-x', name: 'OPPO Find X', brand: 'OPPO', price: '8500', condition: 'Good', spec: '256 GB' },
  { id: 'oppo-a5', name: 'OPPO A5', brand: 'OPPO', price: '4800', condition: 'Good', spec: '32 GB' },
  { id: 'realme-1', name: 'Realme 1', brand: 'Realme', price: '4200', condition: 'Good', spec: '32 GB' },
  { id: 'realme-2', name: 'Realme 2', brand: 'Realme', price: '4600', condition: 'Good', spec: '32 GB' },
  { id: 'realme-2-pro', name: 'Realme 2 Pro', brand: 'Realme', price: '5200', condition: 'Good', spec: '64 GB' },
  { id: 'realme-3', name: 'Realme 3', brand: 'Realme', price: '5000', condition: 'Good', spec: '64 GB' },
  { id: 'realme-c1', name: 'Realme C1', brand: 'Realme', price: '3900', condition: 'Good', spec: '32 GB' },
  { id: 'realme-u1', name: 'Realme U1', brand: 'Realme', price: '4800', condition: 'Good', spec: '64 GB' },
  { id: 'poco-m2-pro', name: 'POCO M2 Pro', brand: 'Poco', price: '7200', condition: 'Good', spec: '64 GB' },
  { id: 'poco-c3', name: 'POCO C3', brand: 'Poco', price: '4800', condition: 'Good', spec: '32 GB' },
  { id: 'poco-m4-5g', name: 'POCO M4 5G', brand: 'Poco', price: '8200', condition: 'Good', spec: '64 GB' },
  { id: 'poco-c31', name: 'POCO C31', brand: 'Poco', price: '4600', condition: 'Good', spec: '32 GB' },
  { id: 'nokia-6-1-plus', name: 'Nokia 6.1 Plus', brand: 'Nokia', price: '5600', condition: 'Good', spec: '64 GB' },
  { id: 'nokia-5-1-plus', name: 'Nokia 5.1 Plus', brand: 'Nokia', price: '4800', condition: 'Good', spec: '32 GB' },
  { id: 'nokia-8-sirocco', name: 'Nokia 8 Sirocco', brand: 'Nokia', price: '7200', condition: 'Good', spec: '128 GB' },
  { id: 'nokia-7-plus', name: 'Nokia 7 Plus', brand: 'Nokia', price: '6200', condition: 'Good', spec: '64 GB' },
  { id: 'nokia-8-1', name: 'Nokia 8.1', brand: 'Nokia', price: '6500', condition: 'Good', spec: '64 GB' },
  { id: 'realme-5', name: 'Realme 5', brand: 'Realme', price: '5200', condition: 'Good', spec: '64 GB' },
  { id: 'realme-6', name: 'Realme 6', brand: 'Realme', price: '6500', condition: 'Good', spec: '64 GB' },
  { id: 'realme-7', name: 'Realme 7', brand: 'Realme', price: '7200', condition: 'Good', spec: '128 GB' },
  { id: 'realme-8', name: 'Realme 8', brand: 'Realme', price: '7800', condition: 'Good', spec: '128 GB' },
  { id: 'realme-9', name: 'Realme 9', brand: 'Realme', price: '9200', condition: 'Good', spec: '128 GB' },
  { id: 'realme-10', name: 'Realme 10', brand: 'Realme', price: '10500', condition: 'Good', spec: '128 GB' },
  { id: 'realme-11', name: 'Realme 11', brand: 'Realme', price: '12500', condition: 'Good', spec: '128 GB' },
  { id: 'realme-narzo-50', name: 'Realme Narzo 50', brand: 'Realme', price: '7600', condition: 'Good', spec: '64 GB' },
  { id: 'realme-gt-neo-2', name: 'Realme GT Neo 2', brand: 'Realme', price: '14500', condition: 'Good', spec: '128 GB' },
  { id: 'lenovo-k8-note', name: 'Lenovo K8 Note', brand: 'Lenovo', price: '4200', condition: 'Good', spec: '64 GB' },
  { id: 'lenovo-k10-note', name: 'Lenovo K10 Note', brand: 'Lenovo', price: '4800', condition: 'Good', spec: '64 GB' },
  { id: 'honor-8x', name: 'Honor 8X', brand: 'Honor', price: '5800', condition: 'Good', spec: '64 GB' },
  { id: 'honor-10', name: 'Honor 10', brand: 'Honor', price: '6500', condition: 'Good', spec: '128 GB' },
  { id: 'asus-zenfone-max-pro-m1', name: 'Asus Zenfone Max Pro M1', brand: 'Asus', price: '4500', condition: 'Good', spec: '64 GB' },
  { id: 'asus-zenfone-5z', name: 'Asus Zenfone 5Z', brand: 'Asus', price: '5800', condition: 'Good', spec: '128 GB' },
  { id: 'google-pixel-4a', name: 'Google Pixel 4a', brand: 'Google', price: '10500', condition: 'Good', spec: '128 GB' },
  { id: 'google-pixel-6a', name: 'Google Pixel 6a', brand: 'Google', price: '18500', condition: 'Good', spec: '128 GB' },
  { id: 'lg-g8x-thinq', name: 'LG G8X ThinQ', brand: 'LG', price: '6200', condition: 'Good', spec: '128 GB' },
  { id: 'lg-v30-plus', name: 'LG V30 Plus', brand: 'LG', price: '4800', condition: 'Good', spec: '128 GB' },
  { id: 'infinix-hot-10', name: 'Infinix Hot 10', brand: 'Infinix', price: '5000', condition: 'Good', spec: '64 GB' },
  { id: 'infinix-note-12', name: 'Infinix Note 12', brand: 'Infinix', price: '7200', condition: 'Good', spec: '64 GB' },
  { id: 'tecno-spark-8', name: 'Tecno Spark 8', brand: 'Tecno', price: '4500', condition: 'Good', spec: '64 GB' },
  { id: 'tecno-camon-19', name: 'Tecno Camon 19', brand: 'Tecno', price: '6500', condition: 'Good', spec: '128 GB' },
  { id: 'iqoo-z3', name: 'iQOO Z3', brand: 'iQOO', price: '10500', condition: 'Good', spec: '128 GB' },
  { id: 'iqoo-7', name: 'iQOO 7', brand: 'iQOO', price: '14500', condition: 'Good', spec: '128 GB' },
  { id: 'nothing-phone-1', name: 'Nothing Phone (1)', brand: 'Nothing', price: '16500', condition: 'Good', spec: '128 GB' },
  { id: 'nothing-phone-2', name: 'Nothing Phone (2)', brand: 'Nothing', price: '23500', condition: 'Good', spec: '256 GB' }
];

window.DEFAULT_MODELS = DEFAULT_MODELS;

function normalizeBrandName(value) {
  return String(value || '').trim().toLowerCase().replace(/[^a-z0-9]+/g, '');
}

function getCatalogModelKey(model) {
  return `${normalizeBrandName(model.brand)}:${normalizeBrandName(model.name)}`;
}

function getBrandFallbackImage(brandName) {
  const normalized = normalizeBrandName(brandName);
  const imageMap = {
    apple: 'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?auto=format&fit=crop&w=900&q=80',
    samsung: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=900&q=80',
    xiaomi: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=900&q=80',
    poco: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
    oneplus: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=900&q=80',
    motorola: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=900&q=80',
    oppo: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80',
    nokia: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=900&q=80',
    vivo: 'https://images.unsplash.com/photo-1601784551446-20c9e07d3f8b?auto=format&fit=crop&w=900&q=80'
  };

  return imageMap[normalized] || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80';
}

// Read from the same catalog that admin.js writes to
function readPhoneCatalog(){
  let storedCatalog = [];
  try {
    storedCatalog = JSON.parse(localStorage.getItem('swapioPhoneCatalog') || '[]');
  } catch (error) {
    storedCatalog = [];
  }

  let sellCatalog = [];
  try {
    sellCatalog = JSON.parse(localStorage.getItem('swapioSellCatalog') || '[]');
  } catch (error) {
    sellCatalog = [];
  }

  const merged = new Map();
  [...storedCatalog, ...sellCatalog, ...DEFAULT_MODELS].forEach(phone => {
    if (!phone || !phone.name || !phone.brand) return;
    const normalizedName = String(phone.name).trim();
    const normalizedBrand = /^poco\b/i.test(normalizedName) ? 'Poco' : phone.brand;
    const overrides = JSON.parse(localStorage.getItem('swapioSellModels') || '{}');
    const normalizedPhone = { ...phone, brand: normalizedBrand };
    const override = overrides[normalizedPhone.id];
    if (override) Object.assign(normalizedPhone, override, { brand: /^poco\b/i.test(String(override.name || normalizedName)) ? 'Poco' : (override.brand || normalizedBrand) });
    const key = getCatalogModelKey(normalizedPhone);
    if (!merged.has(key)) merged.set(key, normalizedPhone);
  });

  const catalog = Array.from(merged.values()).filter(phone => !phone.hidden);
  if (JSON.stringify(storedCatalog) !== JSON.stringify(catalog)) {
    localStorage.setItem('swapioPhoneCatalog', JSON.stringify(catalog));
  }
  return catalog;
}

function getPhonesByBrand(brand){
  const targetBrand = normalizeBrandName(brand);
  const all = readPhoneCatalog();
  return all.filter(phone => normalizeBrandName(phone.brand) === targetBrand);
}

function getOtherBrandPhones(){
  const all = readPhoneCatalog();
  const mainBrands = ['apple', 'samsung', 'xiaomi', 'vivo', 'oneplus', 'poco', 'motorola', 'oppo', 'nokia'];
  return all.filter(phone => !mainBrands.includes(normalizeBrandName(phone.brand)));
}

function getInventoryActiveModelKeys() {
  const inventory = JSON.parse(localStorage.getItem('swapioInventory') || '[]');
  const active = new Set();

  inventory.forEach(item => {
    if (!item || !item.model) return;
    const status = String(item.status || 'in-stock').toLowerCase();
    if (['in-stock', 'reserved'].includes(status)) {
      active.add(String(item.model).trim().toLowerCase());
    }
  });

  return active;
}

function renderBrandCatalog(brandName, containerId){
  const container = document.getElementById(containerId);
  if(!container) return;

  const normalizedBrand = normalizeBrandName(brandName);
  const phones = normalizedBrand === 'other' ? getOtherBrandPhones() : getPhonesByBrand(normalizedBrand);

  if(!phones.length){
    container.innerHTML = '<p style="grid-column:1/-1; color:#8b91a0; text-align:center; padding:40px;">No phones in this brand yet. Check back soon!</p>';
    return;
  }

  container.innerHTML = phones.map(phone => {
    const modelSlug = phone.id || phone.name.toLowerCase().replace(/\s+/g, '-');
    const brandKey = normalizeBrandName(phone.brand || brandName || '');
    const imageSrc = phone.image || getBrandFallbackImage(brandKey);
    const href = `../sell-flow/variant.html?model=${modelSlug}&brand=${encodeURIComponent(brandKey)}`;
    return `
      <a class="model-card" href="${href}">
        <img src="${imageSrc}" alt="${phone.name}" />
        <span>${phone.name}</span>
      </a>
    `;
  }).join('');
}

function initBrandCatalog(){
  const gridElement = document.querySelector('[data-brand-catalog]');
  if(gridElement){
    const brand = gridElement.getAttribute('data-brand-catalog');
    const containerId = gridElement.id || 'model-grid';
    renderBrandCatalog(brand, containerId);
    renderSellBenefits(gridElement);
  }
}

function renderSellBenefits(gridElement){
  if (gridElement.parentElement.querySelector('[data-sell-benefits]')) return;
  const section = document.createElement('section');
  section.className = 'benefits-band';
  section.dataset.sellBenefits = '';
  section.innerHTML = `
    <div class="benefits-heading"><span class="eyebrow">SmartSwap.Store</span><h2>Why sell with SmartSwap?</h2></div>
    <div class="benefits-grid">
      <article><span class="benefit-icon">&#10003;</span><h3>Safe &amp; Secure</h3><p>Every phone and customer detail is handled through a verified process.</p></article>
      <article><span class="benefit-icon">&#8377;</span><h3>Instant Payment</h3><p>Get a clear price and quick payment after the device check.</p></article>
      <article><span class="benefit-icon">&#9733;</span><h3>Best Price</h3><p>Transparent grading and competitive market-based pricing.</p></article>
    </div>`;
  gridElement.insertAdjacentElement('afterend', section);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initBrandCatalog, { once: true });
} else {
  initBrandCatalog();
}
