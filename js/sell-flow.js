(function () {
  const BASE_MODELS = [
    { id: 'iphone-6s', name: 'Apple iPhone 6S', brand: 'apple', spec: '2 GB / 32 GB', price: '2310', image: 'https://images.unsplash.com/photo-1573148195906-32dffe7b9d38?auto=format&fit=crop&w=500&q=80' },
    { id: 'iphone-6', name: 'Apple iPhone 6', brand: 'apple', spec: '16 GB', price: '1850', image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=500&q=80' },
    { id: 'iphone-6-plus', name: 'Apple iPhone 6 Plus', brand: 'apple', spec: '16 GB', price: '2100', image: 'https://images.unsplash.com/photo-1601784551446-20c9e07d3f8b?auto=format&fit=crop&w=500&q=80' },
    { id: 'iphone-7', name: 'Apple iPhone 7', brand: 'apple', spec: '32 GB', price: '2880', image: 'https://images.unsplash.com/photo-1580910051074-3eb7f5f0f6c6?auto=format&fit=crop&w=500&q=80' },
    { id: 'iphone-8', name: 'Apple iPhone 8', brand: 'apple', spec: '64 GB', price: '4200', image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=500&q=80' },
    { id: 'iphone-11', name: 'Apple iPhone 11', brand: 'apple', spec: '64 GB', price: '16200', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80' },
    { id: 'iphone-12', name: 'Apple iPhone 12', brand: 'apple', spec: '128 GB', price: '32999', image: 'https://images.unsplash.com/photo-1611472173362-3f53dbf3b1d6?auto=format&fit=crop&w=500&q=80' },
    { id: 'iphone-13', name: 'Apple iPhone 13', brand: 'apple', spec: '128 GB', price: '38500', image: 'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?auto=format&fit=crop&w=500&q=80' },
    { id: 'iphone-14', name: 'Apple iPhone 14', brand: 'apple', spec: '128 GB', price: '42500', image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=500&q=80' },
    { id: 'iphone-14-plus', name: 'Apple iPhone 14 Plus', brand: 'apple', spec: '128 GB', price: '45900', image: 'https://images.unsplash.com/photo-1601784551446-20c9e07d3f8b?auto=format&fit=crop&w=500&q=80' },
    { id: 'iphone-14-pro', name: 'Apple iPhone 14 Pro', brand: 'apple', spec: '128 GB', price: '49900', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=500&q=80' },
    { id: 'iphone-15', name: 'Apple iPhone 15', brand: 'apple', spec: '128 GB', price: '56400', image: 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&w=500&q=80' },
    { id: 'iphone-15-pro', name: 'Apple iPhone 15 Pro', brand: 'apple', spec: '128 GB', price: '64900', image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=500&q=80' },
    { id: 'iphone-se-2022', name: 'Apple iPhone SE (2022)', brand: 'apple', spec: '64 GB', price: '21900', image: 'https://images.unsplash.com/photo-1573148195906-32dffe7b9d38?auto=format&fit=crop&w=500&q=80' },
    { id: 'iphone-xr', name: 'Apple iPhone XR', brand: 'apple', spec: '64 GB', price: '18500', image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=500&q=80' },
    { id: 'iphone-xs', name: 'Apple iPhone XS', brand: 'apple', spec: '64 GB', price: '17000', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80' },
    { id: 'iphone-xs-max', name: 'Apple iPhone XS Max', brand: 'apple', spec: '64 GB', price: '19700', image: 'https://images.unsplash.com/photo-1611472173362-3f53dbf3b1d6?auto=format&fit=crop&w=500&q=80' },
    { id: 'iphone-se', name: 'Apple iPhone SE', brand: 'apple', spec: '64 GB', price: '17900', image: 'https://images.unsplash.com/photo-1573148195906-32dffe7b9d38?auto=format&fit=crop&w=500&q=80' },
    { id: 'galaxy-s10', name: 'Samsung Galaxy S10', brand: 'samsung', spec: '128 GB', price: '15200', image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=500&q=80' },
    { id: 'galaxy-s10-plus', name: 'Samsung Galaxy S10 Plus', brand: 'samsung', spec: '128 GB', price: '16500', image: 'https://images.unsplash.com/photo-1610792516307-ea5acd5d1d60?auto=format&fit=crop&w=500&q=80' },
    { id: 'galaxy-s20', name: 'Samsung Galaxy S20', brand: 'samsung', spec: '128 GB', price: '11800', image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=500&q=80' },
    { id: 'galaxy-s20-fe', name: 'Samsung Galaxy S20 FE', brand: 'samsung', spec: '128 GB', price: '11900', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80' },
    { id: 'galaxy-s21', name: 'Samsung Galaxy S21', brand: 'samsung', spec: '128 GB', price: '14200', image: 'https://images.unsplash.com/photo-1610792516307-ea5acd5d1d60?auto=format&fit=crop&w=500&q=80' },
    { id: 'galaxy-s21-fe', name: 'Samsung Galaxy S21 FE', brand: 'samsung', spec: '128 GB', price: '14600', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=500&q=80' },
    { id: 'galaxy-s22', name: 'Samsung Galaxy S22', brand: 'samsung', spec: '128 GB', price: '18800', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80' },
    { id: 'galaxy-s22-plus', name: 'Samsung Galaxy S22 Plus', brand: 'samsung', spec: '128 GB', price: '19700', image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=500&q=80' },
    { id: 'galaxy-s22-ultra', name: 'Samsung Galaxy S22 Ultra', brand: 'samsung', spec: '256 GB', price: '24900', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80' },
    { id: 'galaxy-s23', name: 'Samsung Galaxy S23', brand: 'samsung', spec: '128 GB', price: '27900', image: 'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?auto=format&fit=crop&w=500&q=80' },
    { id: 'galaxy-s23-ultra', name: 'Samsung Galaxy S23 Ultra', brand: 'samsung', spec: '256 GB', price: '39800', image: 'https://images.unsplash.com/photo-1611472173362-3f53dbf3b1d6?auto=format&fit=crop&w=500&q=80' },
    { id: 'galaxy-note-10', name: 'Samsung Galaxy Note 10', brand: 'samsung', spec: '256 GB', price: '15900', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80' },
    { id: 'galaxy-note-20', name: 'Samsung Galaxy Note 20', brand: 'samsung', spec: '128 GB', price: '13600', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80' },
    { id: 'galaxy-a13', name: 'Samsung Galaxy A13', brand: 'samsung', spec: '64 GB', price: '7800', image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=500&q=80' },
    { id: 'galaxy-a14', name: 'Samsung Galaxy A14', brand: 'samsung', spec: '128 GB', price: '8900', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=500&q=80' },
    { id: 'galaxy-a15', name: 'Samsung Galaxy A15', brand: 'samsung', spec: '128 GB', price: '10900', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80' },
    { id: 'galaxy-a52', name: 'Samsung Galaxy A52', brand: 'samsung', spec: '128 GB', price: '10900', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=500&q=80' },
    { id: 'galaxy-a53', name: 'Samsung Galaxy A53', brand: 'samsung', spec: '128 GB', price: '15400', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=500&q=80' },
    { id: 'galaxy-m13', name: 'Samsung Galaxy M13', brand: 'samsung', spec: '64 GB', price: '7600', image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=500&q=80' },
    { id: 'galaxy-m14', name: 'Samsung Galaxy M14', brand: 'samsung', spec: '128 GB', price: '9400', image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=500&q=80' },
    { id: 'galaxy-m32', name: 'Samsung Galaxy M32', brand: 'samsung', spec: '64 GB', price: '7200', image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=500&q=80' },
    { id: 'oneplus-6t', name: 'OnePlus 6T', brand: 'oneplus', spec: '128 GB', price: '10800', image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=500&q=80' },
    { id: 'oneplus-7', name: 'OnePlus 7', brand: 'oneplus', spec: '128 GB', price: '11600', image: 'https://images.unsplash.com/photo-1573148195906-32dffe7b9d38?auto=format&fit=crop&w=500&q=80' },
    { id: 'oneplus-7t', name: 'OnePlus 7T', brand: 'oneplus', spec: '128 GB', price: '11600', image: 'https://images.unsplash.com/photo-1573148195906-32dffe7b9d38?auto=format&fit=crop&w=500&q=80' },
    { id: 'oneplus-7-pro', name: 'OnePlus 7 Pro', brand: 'oneplus', spec: '128 GB', price: '12100', image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=500&q=80' },
    { id: 'oneplus-8', name: 'OnePlus 8', brand: 'oneplus', spec: '128 GB', price: '12400', image: 'https://images.unsplash.com/photo-1601784551446-20c9e07d3f8b?auto=format&fit=crop&w=500&q=80' },
    { id: 'oneplus-8t', name: 'OnePlus 8T', brand: 'oneplus', spec: '128 GB', price: '12700', image: 'https://images.unsplash.com/photo-1573148195906-32dffe7b9d38?auto=format&fit=crop&w=500&q=80' },
    { id: 'oneplus-9', name: 'OnePlus 9', brand: 'oneplus', spec: '128 GB', price: '11800', image: 'https://images.unsplash.com/photo-1601784551446-20c9e07d3f8b?auto=format&fit=crop&w=500&q=80' },
    { id: 'oneplus-9r', name: 'OnePlus 9R', brand: 'oneplus', spec: '128 GB', price: '14600', image: 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&w=500&q=80' },
    { id: 'oneplus-9-pro', name: 'OnePlus 9 Pro', brand: 'oneplus', spec: '256 GB', price: '17900', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80' },
    { id: 'oneplus-10r', name: 'OnePlus 10R', brand: 'oneplus', spec: '128 GB', price: '19900', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=500&q=80' },
    { id: 'oneplus-10-pro', name: 'OnePlus 10 Pro', brand: 'oneplus', spec: '256 GB', price: '23900', image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=500&q=80' },
    { id: 'oneplus-10t', name: 'OnePlus 10T', brand: 'oneplus', spec: '256 GB', price: '22900', image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=500&q=80' },
    { id: 'oneplus-nord', name: 'OnePlus Nord', brand: 'oneplus', spec: '128 GB', price: '9200', image: 'https://images.unsplash.com/photo-1573148195906-32dffe7b9d38?auto=format&fit=crop&w=500&q=80' },
    { id: 'oneplus-nord-2', name: 'OnePlus Nord 2', brand: 'oneplus', spec: '128 GB', price: '9300', image: 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&w=500&q=80' },
    { id: 'oneplus-nord-ce', name: 'OnePlus Nord CE', brand: 'oneplus', spec: '128 GB', price: '9800', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=500&q=80' },
    { id: 'oneplus-nord-3', name: 'OnePlus Nord 3', brand: 'oneplus', spec: '128 GB', price: '20900', image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=500&q=80' },
    { id: 'oneplus-nord-2', name: 'OnePlus Nord 2', brand: 'oneplus', spec: '128 GB', price: '9300', image: 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&w=500&q=80' },
    { id: 'oneplus-8t', name: 'OnePlus 8T', brand: 'oneplus', spec: '128 GB', price: '12700', image: 'https://images.unsplash.com/photo-1573148195906-32dffe7b9d38?auto=format&fit=crop&w=500&q=80' },
    { id: 'oneplus-7t', name: 'OnePlus 7T', brand: 'oneplus', spec: '128 GB', price: '11600', image: 'https://images.unsplash.com/photo-1573148195906-32dffe7b9d38?auto=format&fit=crop&w=500&q=80' },
    { id: 'oneplus-7-pro', name: 'OnePlus 7 Pro', brand: 'oneplus', spec: '128 GB', price: '12100', image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=500&q=80' },
    { id: 'oneplus-6t', name: 'OnePlus 6T', brand: 'oneplus', spec: '128 GB', price: '10800', image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=500&q=80' },
    { id: 'motorola-g32', name: 'Motorola G32', brand: 'motorola', spec: '128 GB', price: '8400', image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=500&q=80' },
    { id: 'motorola-g52', name: 'Motorola G52', brand: 'motorola', spec: '128 GB', price: '9700', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=500&q=80' },
    { id: 'motorola-edge-40', name: 'Motorola Edge 40', brand: 'motorola', spec: '256 GB', price: '15900', image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=500&q=80' },
    { id: 'motorola-e13', name: 'Motorola E13', brand: 'motorola', spec: '64 GB', price: '6200', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80' },
    { id: 'oppo-a78', name: 'OPPO A78', brand: 'oppo', spec: '128 GB', price: '9800', image: 'https://images.unsplash.com/photo-1573148195906-32dffe7b9d38?auto=format&fit=crop&w=500&q=80' },
    { id: 'oppo-reno-8', name: 'OPPO Reno 8', brand: 'oppo', spec: '128 GB', price: '14500', image: 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&w=500&q=80' },
    { id: 'oppo-f21', name: 'OPPO F21', brand: 'oppo', spec: '128 GB', price: '11800', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80' },
    { id: 'oppo-a57', name: 'OPPO A57', brand: 'oppo', spec: '64 GB', price: '7600', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=500&q=80' },
    { id: 'redmi-note-11-pro', name: 'Redmi Note 11 Pro', brand: 'xiaomi', spec: '128 GB', price: '6900', image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=500&q=80' },
    { id: 'redmi-10', name: 'Redmi 10', brand: 'xiaomi', spec: '64 GB', price: '7600', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=500&q=80' },
    { id: 'poco-x4-pro', name: 'POCO X4 Pro', brand: 'xiaomi', spec: '128 GB', price: '8800', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=500&q=80' },
    { id: 'mi-11x', name: 'Mi 11X', brand: 'xiaomi', spec: '128 GB', price: '9400', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=500&q=80' },
    { id: 'mi-11-lite', name: 'Mi 11 Lite', brand: 'xiaomi', spec: '128 GB', price: '8900', image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=500&q=80' },
    { id: 'xiaomi-12', name: 'Xiaomi 12', brand: 'xiaomi', spec: '128 GB', price: '18300', image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=500&q=80' },
    { id: 'redmi-note-5', name: 'Redmi Note 5', brand: 'xiaomi', spec: '64 GB', price: '4500', image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=500&q=80' },
    { id: 'redmi-note-6-pro', name: 'Redmi Note 6 Pro', brand: 'xiaomi', spec: '64 GB', price: '4700', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=500&q=80' },
    { id: 'redmi-note-7', name: 'Redmi Note 7', brand: 'xiaomi', spec: '64 GB', price: '5200', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=500&q=80' },
    { id: 'redmi-note-7-pro', name: 'Redmi Note 7 Pro', brand: 'xiaomi', spec: '128 GB', price: '6100', image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=500&q=80' },
    { id: 'redmi-note-8', name: 'Redmi Note 8', brand: 'xiaomi', spec: '64 GB', price: '5600', image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=500&q=80' },
    { id: 'redmi-note-8-pro', name: 'Redmi Note 8 Pro', brand: 'xiaomi', spec: '128 GB', price: '6500', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=500&q=80' },
    { id: 'redmi-note-9', name: 'Redmi Note 9', brand: 'xiaomi', spec: '128 GB', price: '7900', image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=500&q=80' },
    { id: 'redmi-note-9-pro', name: 'Redmi Note 9 Pro', brand: 'xiaomi', spec: '128 GB', price: '8600', image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=500&q=80' },
    { id: 'redmi-note-9s', name: 'Redmi Note 9S', brand: 'xiaomi', spec: '128 GB', price: '8400', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=500&q=80' },
    { id: 'redmi-note-10', name: 'Redmi Note 10', brand: 'xiaomi', spec: '128 GB', price: '9200', image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=500&q=80' },
    { id: 'redmi-note-10-pro', name: 'Redmi Note 10 Pro', brand: 'xiaomi', spec: '128 GB', price: '10300', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=500&q=80' },
    { id: 'redmi-note-10s', name: 'Redmi Note 10S', brand: 'xiaomi', spec: '128 GB', price: '9800', image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=500&q=80' },
    { id: 'redmi-note-11', name: 'Redmi Note 11', brand: 'xiaomi', spec: '128 GB', price: '10900', image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=500&q=80' },
    { id: 'redmi-note-11s', name: 'Redmi Note 11S', brand: 'xiaomi', spec: '128 GB', price: '11200', image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=500&q=80' },
    { id: 'redmi-note-11t', name: 'Redmi Note 11T', brand: 'xiaomi', spec: '128 GB', price: '11800', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=500&q=80' },
    { id: 'redmi-note-12', name: 'Redmi Note 12', brand: 'xiaomi', spec: '128 GB', price: '13500', image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=500&q=80' },
    { id: 'redmi-note-12-pro', name: 'Redmi Note 12 Pro', brand: 'xiaomi', spec: '128 GB', price: '14900', image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=500&q=80' },
    { id: 'redmi-note-12-5g', name: 'Redmi Note 12 5G', brand: 'xiaomi', spec: '128 GB', price: '15200', image: 'https://images.unsplash.com/photo-1573148195906-32dffe7b9d38?auto=format&fit=crop&w=500&q=80' },
    { id: 'redmi-6', name: 'Redmi 6', brand: 'xiaomi', spec: '64 GB', price: '4600', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=500&q=80' },
    { id: 'redmi-7', name: 'Redmi 7', brand: 'xiaomi', spec: '64 GB', price: '4900', image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=500&q=80' },
    { id: 'redmi-8', name: 'Redmi 8', brand: 'xiaomi', spec: '64 GB', price: '5300', image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=500&q=80' },
    { id: 'redmi-9', name: 'Redmi 9', brand: 'xiaomi', spec: '128 GB', price: '7600', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=500&q=80' },
    { id: 'redmi-9a', name: 'Redmi 9A', brand: 'xiaomi', spec: '32 GB', price: '5800', image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=500&q=80' },
    { id: 'redmi-9c', name: 'Redmi 9C', brand: 'xiaomi', spec: '64 GB', price: '6200', image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=500&q=80' },
    { id: 'redmi-10a', name: 'Redmi 10A', brand: 'xiaomi', spec: '64 GB', price: '6700', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=500&q=80' },
    { id: 'redmi-10c', name: 'Redmi 10C', brand: 'xiaomi', spec: '64 GB', price: '7300', image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=500&q=80' },
    { id: 'redmi-k20', name: 'Redmi K20', brand: 'xiaomi', spec: '128 GB', price: '9900', image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=500&q=80' },
    { id: 'redmi-k20-pro', name: 'Redmi K20 Pro', brand: 'xiaomi', spec: '128 GB', price: '12100', image: 'https://images.unsplash.com/photo-1573148195906-32dffe7b9d38?auto=format&fit=crop&w=500&q=80' },
    { id: 'redmi-k30', name: 'Redmi K30', brand: 'xiaomi', spec: '128 GB', price: '11200', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=500&q=80' },
    { id: 'redmi-k40', name: 'Redmi K40', brand: 'xiaomi', spec: '128 GB', price: '15800', image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=500&q=80' },
    { id: 'poco-f1', name: 'POCO F1', brand: 'xiaomi', spec: '128 GB', price: '9000', image: 'https://images.unsplash.com/photo-1573148195906-32dffe7b9d38?auto=format&fit=crop&w=500&q=80' },
    { id: 'poco-f2-pro', name: 'POCO F2 Pro', brand: 'xiaomi', spec: '128 GB', price: '11500', image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=500&q=80' },
    { id: 'poco-f3', name: 'POCO F3', brand: 'xiaomi', spec: '128 GB', price: '15900', image: 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&w=500&q=80' },
    { id: 'poco-f4', name: 'POCO F4', brand: 'xiaomi', spec: '128 GB', price: '18900', image: 'https://images.unsplash.com/photo-1611472173362-3f53dbf3b1d6?auto=format&fit=crop&w=500&q=80' },
    { id: 'poco-x2', name: 'POCO X2', brand: 'xiaomi', spec: '128 GB', price: '11800', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=500&q=80' },
    { id: 'poco-x3', name: 'POCO X3', brand: 'xiaomi', spec: '128 GB', price: '9800', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=500&q=80' },
    { id: 'poco-x3-pro', name: 'POCO X3 Pro', brand: 'xiaomi', spec: '128 GB', price: '10500', image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=500&q=80' },
    { id: 'poco-x4', name: 'POCO X4', brand: 'xiaomi', spec: '128 GB', price: '9700', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=500&q=80' },
    { id: 'poco-x4-pro', name: 'POCO X4 Pro', brand: 'xiaomi', spec: '128 GB', price: '8800', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=500&q=80' },
    { id: 'poco-x5', name: 'POCO X5', brand: 'xiaomi', spec: '128 GB', price: '15200', image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=500&q=80' },
    { id: 'poco-m2', name: 'POCO M2', brand: 'xiaomi', spec: '64 GB', price: '6400', image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=500&q=80' },
    { id: 'poco-m3', name: 'POCO M3', brand: 'xiaomi', spec: '64 GB', price: '6800', image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=500&q=80' },
    { id: 'poco-m4', name: 'POCO M4', brand: 'xiaomi', spec: '128 GB', price: '7600', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=500&q=80' },
    { id: 'poco-m5', name: 'POCO M5', brand: 'xiaomi', spec: '128 GB', price: '8200', image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=500&q=80' },
    { id: 'poco-m6', name: 'POCO M6', brand: 'xiaomi', spec: '128 GB', price: '9300', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80' },
    { id: 'mi-10', name: 'Mi 10', brand: 'xiaomi', spec: '128 GB', price: '12800', image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=500&q=80' },
    { id: 'mi-10t', name: 'Mi 10T', brand: 'xiaomi', spec: '128 GB', price: '11800', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=500&q=80' },
    { id: 'mi-11', name: 'Mi 11', brand: 'xiaomi', spec: '128 GB', price: '16800', image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=500&q=80' },
    { id: 'xiaomi-mi-note-10', name: 'Xiaomi Mi Note 10', brand: 'xiaomi', spec: '128 GB', price: '10500', image: 'https://images.unsplash.com/photo-1573148195906-32dffe7b9d38?auto=format&fit=crop&w=500&q=80' },
    { id: 'xiaomi-mi-note-10-lite', name: 'Xiaomi Mi Note 10 Lite', brand: 'xiaomi', spec: '128 GB', price: '9300', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=500&q=80' },
    { id: 'vivo-y20', name: 'Vivo Y20', brand: 'vivo', spec: '64 GB', price: '8300', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80' },
    { id: 'vivo-v20', name: 'Vivo V20', brand: 'vivo', spec: '128 GB', price: '11400', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80' },
    { id: 'vivo-v21', name: 'Vivo V21', brand: 'vivo', spec: '128 GB', price: '13500', image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=500&q=80' },
    { id: 'vivo-y51', name: 'Vivo Y51', brand: 'vivo', spec: '128 GB', price: '9800', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80' },
    { id: 'vivo-y73', name: 'Vivo Y73', brand: 'vivo', spec: '128 GB', price: '11200', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80' },
    { id: 'vivo-x60', name: 'Vivo X60', brand: 'vivo', spec: '128 GB', price: '17600', image: 'https://images.unsplash.com/photo-1601784551446-20c9e07d3f8b?auto=format&fit=crop&w=500&q=80' }
  ];

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

    function getSellModels() {
    let catalog = [];
    try {
      catalog = JSON.parse(localStorage.getItem('swapioSellCatalog') || '[]');
    } catch (error) {
      catalog = [];
    }

    if (!catalog.length) {
      catalog = BASE_MODELS.map(model => ({ ...model, hidden: false }));
      localStorage.setItem('swapioSellCatalog', JSON.stringify(catalog));
    }

    return catalog.filter(model => model && model.name && !model.hidden);
  }

  function getModelFromQuery() {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('model');
    const model = getSellModels().find(item => item.id === slug);
    return model || getSellModels()[0];
  }

  function getBrandFromQuery() {
    const params = new URLSearchParams(window.location.search);
    const brand = (params.get('brand') || '').toLowerCase();
    if (!brand || brand === 'all') return 'all';
    return brand;
  }

  function formatPrice(value) {
    const amount = Number(value || 0);
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  }

  function drawModelDetails(model) {
    const titleEl = document.getElementById('sellFlowModelTitle');
    const imageEl = document.getElementById('sellFlowModelImage');
    const priceEl = document.getElementById('sellFlowModelPrice');
    const metaEl = document.getElementById('sellFlowModelMeta');
    if (titleEl) titleEl.textContent = `Sell Old ${model.name}`;
    if (imageEl) imageEl.src = model.image || imageEl.src;
    if (priceEl) priceEl.textContent = formatPrice(model.price);
    if (metaEl) metaEl.textContent = `${(Number(model.price) > 10000 ? '11860+' : '1600+') } already sold on SmartSwap`;
    const button = document.querySelector('.btn-coral-lg');
    if (button) {
      button.onclick = () => {
        const nextUrl = `condition.html?model=${encodeURIComponent(model.id)}&brand=${encodeURIComponent(model.brand)}`;
        window.location.href = nextUrl;
      };
    }
  }

  function renderBrandGrid() {
    const grid = document.getElementById('sellFlowBrandGrid');
    if (!grid) return;

    const brand = getBrandFromQuery();
    const activeModelKeys = getInventoryActiveModelKeys();
    const models = getSellModels().filter(model => brand === 'all' || model.brand === brand);

    if (!models.length) {
      grid.innerHTML = '<p class="sell-step-subtitle">No models available for this brand.</p>';
      return;
    }

    grid.innerHTML = models.map(model => {
      const isAvailable = activeModelKeys.has(String(model.name).trim().toLowerCase()) || activeModelKeys.has(String(model.id).trim().toLowerCase());
      const statusTag = isAvailable ? '' : '<small class="stock-status sold">Coming soon</small>';
      const href = isAvailable ? `variant.html?model=${encodeURIComponent(model.id)}&brand=${encodeURIComponent(model.brand)}` : '#';
      const clickable = isAvailable ? 'a' : 'div';
      return `
        <${clickable} class="model-card${isAvailable ? '' : ' is-locked'}" href="${href}" ${isAvailable ? '' : 'aria-disabled="true"'}>
          <img src="${model.image || 'https://images.unsplash.com/photo-1573148195906-32dffe7b9d38?auto=format&fit=crop&w=500&q=80'}" alt="${model.name}" />
          <span>${model.name}</span>
          ${statusTag}
        </${clickable}>
      `;
    }).join('');
  }

  function syncSummaryCard() {
    const model = getModelFromQuery();
    const card = document.querySelector('.device-card-selected');
    if (!card) return;

    const img = card.querySelector('img');
    const name = card.querySelector('.device-name');
    const price = card.querySelector('.device-price');
    const seen = card.querySelector('.device-seen');

    if (img) img.src = model.image || img.src;
    if (name) name.textContent = `${model.name} (${model.spec})`;
    if (price) price.textContent = formatPrice(model.price);
    if (seen) seen.textContent = `${(Number(model.price) > 10000 ? '11860+' : '1600+') } already sold on SmartSwap`;
  }

  const STORAGE_MEMORY_ORDER = ['16 GB', '32 GB', '64 GB', '128 GB', '256 GB', '512 GB'];

  function getStorageMultiplier(storageLabel) {
    const storage = String(storageLabel || '64 GB').toLowerCase();
    if (storage.includes('16')) return 0.48;
    if (storage.includes('32')) return 0.7;
    if (storage.includes('64')) return 1;
    if (storage.includes('128')) return 1.38;
    if (storage.includes('256')) return 1.82;
    if (storage.includes('512')) return 2.35;
    return 1;
  }

  function getModelMemoryPrice(model, storageLabel) {
    const base = Number(model.price || 0);
    return Math.round(base * getStorageMultiplier(storageLabel));
  }

  function getModelStorageOptions(model) {
    const customOptions = Array.isArray(model.storageOptions)
      ? model.storageOptions
      : [];

    if (customOptions.length) {
      return [...new Set(customOptions.map(option => String(option).trim()).filter(Boolean))];
    }

    const matches = (model.spec || '').match(/\d+\s*GB/gi) || [];
    const derived = matches.map(value => value.trim().replace(/\s+/g, ' '));
    const fallback = derived.length ? derived : ['64 GB'];

    return [...new Set(fallback.filter(value => STORAGE_MEMORY_ORDER.includes(value) || /\d+\s*GB/i.test(value)))];
  }

  function buildVariantPage() {
    const model = getModelFromQuery();
    const titleEl = document.getElementById('variantModelTitle');
    const imageEl = document.getElementById('variantModelImage');
    const priceEl = document.getElementById('variantModelPrice');
    const metaEl = document.getElementById('variantModelMeta');
    const optionWrap = document.getElementById('variantMemoryOptions');
    const button = document.getElementById('variantGetPriceButton');

    if (!model || !titleEl || !imageEl || !priceEl || !metaEl || !optionWrap || !button) return;

    const storageParam = new URLSearchParams(window.location.search).get('memory');
    const storageOptions = getModelStorageOptions(model);
    const defaultStorage = storageOptions.includes(storageParam) ? storageParam : storageOptions[0];

    function renderPrice(storage) {
      const exact = getModelMemoryPrice(model, storage);
      priceEl.textContent = `₹${new Intl.NumberFormat('en-IN').format(exact)}`;
      metaEl.textContent = `${new Intl.NumberFormat('en-IN').format(Math.max(1200, exact + 1800))}+ already sold on SmartSwap`;
      const nextUrl = `condition.html?model=${encodeURIComponent(model.id)}&brand=${encodeURIComponent(model.brand)}&memory=${encodeURIComponent(storage)}`;
      button.onclick = () => { window.location.href = nextUrl; };
      button.dataset.storage = storage;
    }

    titleEl.textContent = model.name;
    imageEl.src = model.image || imageEl.src;
    imageEl.alt = model.name;
    optionWrap.innerHTML = storageOptions.map(storage => `
      <button class="sell-option-card ${storage === defaultStorage ? 'selected' : ''}" type="button" data-storage="${storage}">
        <div class="option-text">${storage}</div>
      </button>
    `).join('');

    optionWrap.querySelectorAll('[data-storage]').forEach(el => {
      el.addEventListener('click', () => {
        optionWrap.querySelectorAll('[data-storage]').forEach(btn => btn.classList.toggle('selected', btn === el));
        renderPrice(el.dataset.storage);
      });
    });

    renderPrice(defaultStorage);
  }

  function getSellState() {
    try {
      const state = JSON.parse(sessionStorage.getItem('smartSwapSellState') || '{}');
      return state && typeof state === 'object' ? state : {};
    } catch (error) {
      return {};
    }
  }

  function saveSellState(partialState) {
    try {
      const current = getSellState();
      const nextState = { ...current, ...partialState };
      sessionStorage.setItem('smartSwapSellState', JSON.stringify(nextState));
      return nextState;
    } catch (error) {
      return partialState;
    }
  }

  function calculateSellPrice(basePrice, conditionAnswers, problemAnswers) {
    const conditionCount = conditionAnswers.filter(answer => answer === 'No').length;
    const problemCount = problemAnswers.filter(answer => answer === 'Yes').length;
    const conditionReduction = Math.min(conditionCount * 0.09, 0.36);
    const problemReduction = Math.min(problemCount * 0.12, 0.42);
    const reduction = Math.min(conditionReduction + problemReduction, 0.68);
    return Math.max(0, Math.round(basePrice * (1 - reduction)));
  }

  function buildIssueIcon(type) {
    const icons = {
      screen: '<svg viewBox="0 0 80 80" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><rect x="22" y="10" width="36" height="58" rx="5"/><path d="M30 20h20M30 58h20M32 70h16"/><path d="M17 38h6M57 38h6"/><circle cx="40" cy="52" r="5" fill="#1ac0b1" stroke="#1ac0b1"/></g></svg>',
      camera: '<svg viewBox="0 0 80 80" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><rect x="22" y="10" width="36" height="58" rx="5"/><circle cx="40" cy="35" r="9"/><path d="M32 15l4-5h8l4 5M27 62l4 6M53 62l-4 6"/><circle cx="56" cy="22" r="5" fill="#1ac0b1" stroke="#1ac0b1"/></g></svg>',
      bluetooth: '<svg viewBox="0 0 80 80" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><rect x="22" y="10" width="36" height="58" rx="5"/><path d="M34 28l12 11-7 6V18l7 6-12 11"/><circle cx="40" cy="52" r="5" fill="#1ac0b1" stroke="#1ac0b1"/></g></svg>',
      vibrator: '<svg viewBox="0 0 80 80" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><rect x="22" y="10" width="36" height="58" rx="5"/><path d="M32 25h16M32 55h16M30 18l-8 8M50 18l8 8M30 62l-8-8M50 62l8-8"/><path d="M40 26v12M32 39h16"/><circle cx="40" cy="52" r="5" fill="#1ac0b1" stroke="#1ac0b1"/></g></svg>',
      mic: '<svg viewBox="0 0 80 80" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><rect x="22" y="10" width="36" height="58" rx="5"/><path d="M33 32v8a7 7 0 1014 0v-8M29 60h22M40 60v8"/><circle cx="58" cy="22" r="5" fill="#1ac0b1" stroke="#1ac0b1"/></g></svg>',
      wifi: '<svg viewBox="0 0 80 80" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><rect x="22" y="10" width="36" height="58" rx="5"/><path d="M28 38c2.5-3 6-4.5 12-4.5s9.5 1.5 12 4.5M24 32c5.5-6.5 12.5-9.5 16-9.5s10.5 3 16 9.5M32 44c1.5-1.7 3.7-2.5 8-2.5s6.5.8 8 2.5"/><circle cx="40" cy="52" r="5" fill="#1ac0b1" stroke="#1ac0b1"/></g></svg>',
      battery: '<svg viewBox="0 0 80 80" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><rect x="22" y="10" width="36" height="58" rx="5"/><path d="M58 30h8v20h-8M28 24h24v32H28zM34 32h12v20H34z"/><circle cx="40" cy="52" r="5" fill="#1ac0b1" stroke="#1ac0b1"/></g></svg>',
      speaker: '<svg viewBox="0 0 80 80" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><rect x="22" y="10" width="36" height="58" rx="5"/><path d="M32 27h16M32 38h16M32 49h16M30 62h20"/><circle cx="40" cy="56" r="5" fill="#1ac0b1" stroke="#1ac0b1"/></g></svg>',
      power: '<svg viewBox="0 0 80 80" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><rect x="22" y="10" width="36" height="58" rx="5"/><path d="M32 18v18M48 18v18M32 36h16M30 62h20"/><circle cx="40" cy="52" r="5" fill="#1ac0b1" stroke="#1ac0b1"/></g></svg>',
      charger: '<svg viewBox="0 0 80 80" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><rect x="28" y="12" width="24" height="52" rx="6"/><path d="M30 32h20M36 20v12M44 20v12M28 44h24M40 62v8M24 48h-6M62 48h6"/><circle cx="40" cy="50" r="4" fill="#1ac0b1" stroke="#1ac0b1"/></g></svg>',
      box: '<svg viewBox="0 0 80 80" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M22 28l18-12 18 12v24L40 64 22 52V28z"/><path d="M40 16v48M22 28l18 12 18-12"/><circle cx="52" cy="26" r="5" fill="#1ac0b1" stroke="#1ac0b1"/></g></svg>',
      bill: '<svg viewBox="0 0 80 80" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><rect x="20" y="14" width="40" height="52" rx="6"/><path d="M30 28h20M30 38h20M30 48h14M30 58h18"/><circle cx="56" cy="24" r="5" fill="#1ac0b1" stroke="#1ac0b1"/></g></svg>',
      default: '<svg viewBox="0 0 80 80" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><rect x="22" y="10" width="36" height="58" rx="5"/><path d="M30 22h20M30 56h20M40 62v8"/><circle cx="40" cy="26" r="5" fill="#1ac0b1" stroke="#1ac0b1"/></g></svg>'
    };

    return icons[type] || icons.default;
  }

  function setupConditionFlow() {
    const params = new URLSearchParams(window.location.search);
    const model = getModelFromQuery();
    const selectedMemory = params.get('memory') || '64 GB';
    const basePrice = getModelMemoryPrice(model, selectedMemory);
    const deviceName = document.getElementById('conditionDeviceName');
    const priceEl = document.getElementById('conditionPriceValue');
    const imgEl = document.getElementById('sellFlowSummaryImage');
    const loginImage = document.getElementById('sellLoginImage');
    const loginModel = document.getElementById('sellLoginModel');
    const loginPrice = document.getElementById('sellLoginPrice');
    const modal = document.getElementById('sellLoginModal');
    const closeModalBtn = document.getElementById('sellLoginModalClose');
    const continueBtn = document.getElementById('conditionContinueBtn');

    function updatePriceFromAnswers() {
      const questions = document.querySelectorAll('.sell-step-question');
      const conditionAnswers = Array.from(questions).map(question => question.dataset.answer || 'No');
      const savedState = getSellState();
      const problemAnswers = Array.isArray(savedState.problemAnswers) ? savedState.problemAnswers : [];
      const finalPrice = calculateSellPrice(basePrice, conditionAnswers, problemAnswers);

      saveSellState({
        modelId: model.id,
        brand: model.brand,
        memory: selectedMemory,
        conditionAnswers,
        problemAnswers,
        finalPrice,
        basePrice
      });

      if (deviceName) deviceName.textContent = `${model.name} (${selectedMemory})`;
      if (priceEl) {
        priceEl.textContent = '';
        priceEl.style.visibility = 'hidden';
      }
      if (loginModel) loginModel.textContent = `${model.name} (${selectedMemory})`;
      if (loginPrice) loginPrice.textContent = '₹ XX,XXX';
    }

    document.querySelectorAll('.sell-step-question').forEach(question => {
      const buttons = question.querySelectorAll('.sell-radio-btn');
      if (!buttons.length) return;

      const setAnswer = (value) => {
        question.dataset.answer = value;
        buttons.forEach(button => {
          const isActive = button.textContent.trim() === value;
          button.classList.toggle('active', isActive);
          button.setAttribute('aria-pressed', String(isActive));
        });
        updatePriceFromAnswers();
      };

      buttons.forEach(button => {
        button.addEventListener('click', () => setAnswer(button.textContent.trim()));
      });

      setAnswer('No');
    });

    if (imgEl) imgEl.src = model.image || imgEl.src;
    if (loginImage) loginImage.src = model.image || loginImage.src;

    if (continueBtn) {
      continueBtn.addEventListener('click', () => {
        const query = new URLSearchParams(window.location.search);
        const nextUrl = `problems.html?${query.toString()}`;
        window.location.href = nextUrl;
      });
    }

    if (closeModalBtn && modal) {
      closeModalBtn.addEventListener('click', () => {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
      });
    }
    if (modal) {
      modal.addEventListener('click', event => {
        if (event.target === modal) {
          modal.classList.remove('open');
          modal.setAttribute('aria-hidden', 'true');
        }
      });
    }

    updatePriceFromAnswers();
  }

  function setupProblemFlow() {
    document.title = 'Functional or Physical Problems | SmartSwap.Store';

    const params = new URLSearchParams(window.location.search);
    const model = getModelFromQuery();
    const selectedMemory = params.get('memory') || '64 GB';
    const basePrice = getModelMemoryPrice(model, selectedMemory);
    const problemList = document.getElementById('problemChoiceList');
    const continueBtn = document.getElementById('problemContinueBtn');
    const pageTitle = document.getElementById('problemPageTitle');
    const summaryName = document.getElementById('problemSummaryName');
    const summaryPrice = document.getElementById('problemSummaryPrice');

    if (pageTitle) pageTitle.textContent = 'Functional or Physical Problems';

    const problems = [
      { id: 'front-camera', label: 'Front Camera not working', icon: 'camera' },
      { id: 'back-camera', label: 'Back Camera not working', icon: 'camera' },
      { id: 'volume', label: 'Volume Button not working', icon: 'speaker' },
      { id: 'fingerprint', label: 'Finger Touch not working', icon: 'default' },
      { id: 'wifi', label: 'WiFi not working', icon: 'wifi' },
      { id: 'battery', label: 'Battery Faulty', icon: 'battery' },
      { id: 'speaker', label: 'Speaker Faulty', icon: 'speaker' },
      { id: 'power-button', label: 'Power Button not working', icon: 'power' }
    ];

    if (!problemList) return;

    problemList.innerHTML = problems.map(item => `
      <div class="problem-choice" data-problem="${item.id}" data-value="Yes">
        <div class="problem-visual">
          <div class="problem-icon">${buildIssueIcon(item.icon)}</div>
        </div>
        <div class="problem-label">${item.label}</div>
        <div class="problem-toggle-row">
          <button class="problem-toggle active" type="button" data-value="Yes">Yes</button>
          <button class="problem-toggle" type="button" data-value="No">No</button>
        </div>
      </div>
    `).join('');

    const cards = problemList.querySelectorAll('.problem-choice');
    const updateProblemState = () => {
      cards.forEach(card => {
        const buttons = card.querySelectorAll('.problem-toggle');
        const currentValue = card.dataset.value || 'Yes';
        buttons.forEach(btn => {
          const isActive = btn.dataset.value === currentValue;
          btn.classList.toggle('active', isActive);
        });
      });

      const conditionAnswers = Array.from(document.querySelectorAll('.sell-step-question')).map(question => question.dataset.answer || 'No');
      const problemAnswers = Array.from(cards).map(card => card.dataset.value || 'Yes');
      const finalPrice = calculateSellPrice(basePrice, conditionAnswers, problemAnswers);

      saveSellState({
        modelId: model.id,
        brand: model.brand,
        memory: selectedMemory,
        conditionAnswers,
        problemAnswers,
        finalPrice,
        basePrice
      });

      if (summaryName) summaryName.textContent = `${model.name} (${selectedMemory})`;
      if (summaryPrice) {
        summaryPrice.textContent = '';
        summaryPrice.style.visibility = 'hidden';
      }
    };

    cards.forEach(card => {
      const buttons = card.querySelectorAll('.problem-toggle');
      buttons.forEach(button => {
        button.addEventListener('click', () => {
          card.dataset.value = button.dataset.value;
          updateProblemState();
        });
      });
    });

    if (summaryName) summaryName.textContent = `${model.name} (${selectedMemory})`;
    if (summaryPrice) {
      summaryPrice.textContent = '';
      summaryPrice.style.visibility = 'hidden';
    }
    updateProblemState();

    if (continueBtn) {
      continueBtn.addEventListener('click', () => {
        const query = new URLSearchParams(window.location.search);
        const nextUrl = `accessories.html?${query.toString()}`;
        window.location.href = nextUrl;
      });
    }
  }

  function setupAccessoryFlow() {
    document.title = 'Do you have the following? | SmartSwap.Store';

    const params = new URLSearchParams(window.location.search);
    const model = getModelFromQuery();
    const selectedMemory = params.get('memory') || '64 GB';
    const basePrice = getModelMemoryPrice(model, selectedMemory);
    const accessoryList = document.getElementById('accessoryChoiceList');
    const continueBtn = document.getElementById('accessoryContinueBtn');
    const summaryName = document.getElementById('accessorySummaryName');
    const summaryPrice = document.getElementById('accessorySummaryPrice');

    const accessories = [
      { id: 'charger', label: 'Original Charger of Device', icon: 'charger' },
      { id: 'box', label: 'Original Box with same IMEI', icon: 'box' },
      { id: 'bill', label: 'Original Bill with IMEI', icon: 'bill' }
    ];

    if (!accessoryList) return;

    accessoryList.innerHTML = accessories.map(item => `
      <div class="problem-choice" data-accessory="${item.id}" data-value="Yes">
        <div class="problem-visual">
          <div class="problem-icon">${buildIssueIcon(item.icon)}</div>
        </div>
        <div class="problem-label">${item.label}</div>
        <div class="problem-toggle-row">
          <button class="problem-toggle active" type="button" data-value="Yes">Yes</button>
          <button class="problem-toggle" type="button" data-value="No">No</button>
        </div>
      </div>
    `).join('');

    const cards = accessoryList.querySelectorAll('.problem-choice');
    const updateAccessoryState = () => {
      cards.forEach(card => {
        const buttons = card.querySelectorAll('.problem-toggle');
        const currentValue = card.dataset.value || 'Yes';
        buttons.forEach(btn => {
          const isActive = btn.dataset.value === currentValue;
          btn.classList.toggle('active', isActive);
        });
      });

      if (summaryName) summaryName.textContent = `${model.name} (${selectedMemory})`;
      if (summaryPrice) {
        summaryPrice.textContent = '';
        summaryPrice.style.visibility = 'hidden';
      }

      saveSellState({
        modelId: model.id,
        brand: model.brand,
        memory: selectedMemory,
        basePrice,
        accessoryAnswers: Array.from(cards).map(card => card.dataset.value || 'Yes')
      });
    };

    cards.forEach(card => {
      const buttons = card.querySelectorAll('.problem-toggle');
      buttons.forEach(button => {
        button.addEventListener('click', () => {
          card.dataset.value = button.dataset.value;
          updateAccessoryState();
        });
      });
    });

    if (summaryName) summaryName.textContent = `${model.name} (${selectedMemory})`;
    if (summaryPrice) {
      summaryPrice.textContent = '';
      summaryPrice.style.visibility = 'hidden';
    }
    updateAccessoryState();

    if (continueBtn) {
      continueBtn.addEventListener('click', () => {
        const query = new URLSearchParams(window.location.search);
        const nextUrl = `login.html?${query.toString()}`;
        window.location.href = nextUrl;
      });
    }
  }

  function setupLoginPage() {
    const params = new URLSearchParams(window.location.search);
    const model = getModelFromQuery();
    const selectedMemory = params.get('memory') || '64 GB';
    const savedState = getSellState();
    const basePrice = getModelMemoryPrice(model, selectedMemory);
    const conditionAnswers = Array.isArray(savedState.conditionAnswers) ? savedState.conditionAnswers : [];
    const problemAnswers = Array.isArray(savedState.problemAnswers) ? savedState.problemAnswers : [];
    const finalPrice = calculateSellPrice(basePrice, conditionAnswers, problemAnswers);
    const deviceName = document.getElementById('loginDeviceName');
    const loginPrice = document.getElementById('loginPrice');
    const deviceImage = document.getElementById('loginDeviceImage');
    const alertBox = document.getElementById('loginAlertBox');

    if (deviceName) deviceName.textContent = `${model.name} (${selectedMemory})`;
    if (loginPrice) loginPrice.textContent = '₹ XX,XXX';
    if (deviceImage) deviceImage.src = model.image || deviceImage.src;
    if (alertBox) alertBox.textContent = `${model.name} (${selectedMemory})`;
  }

  function init() {
    const model = getModelFromQuery();
    drawModelDetails(model);
    renderBrandGrid();
    syncSummaryCard();
    buildVariantPage();
    setupConditionFlow();
    setupProblemFlow();
    setupAccessoryFlow();
    setupLoginPage();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
