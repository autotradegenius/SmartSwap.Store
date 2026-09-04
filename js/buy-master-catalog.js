/* Buy-only starter catalog. These are separate from Sell acceptance models. */
window.BUY_MASTER_MODELS = [
  ['Apple','iPhone 15','128 GB',45999], ['Apple','iPhone 14','128 GB',34999],
  ['Xiaomi','Redmi Note 13','128 GB',14999], ['Xiaomi','Xiaomi 13','256 GB',32999],
  ['Samsung','Galaxy S23','128 GB',27999], ['Samsung','Galaxy A54','128 GB',15999],
  ['Vivo','Vivo V29','128 GB',24999], ['Vivo','Vivo Y200','128 GB',17999],
  ['OnePlus','OnePlus 12','256 GB',54999], ['OnePlus','OnePlus Nord 3','128 GB',23999],
  ['OPPO','OPPO Reno 11','128 GB',28999], ['OPPO','OPPO A79','128 GB',17999],
  ['Realme','Realme 12 Pro','256 GB',25999], ['Realme','Realme Narzo 70','128 GB',15999],
  ['Motorola','Motorola Edge 50','256 GB',29999], ['Motorola','Moto G85','128 GB',17999],
  ['Lenovo','Lenovo K14 Plus','128 GB',11999], ['Lenovo','Lenovo K13 Note','128 GB',9999],
  ['Nokia','Nokia G42 5G','128 GB',14999], ['Nokia','Nokia X30 5G','256 GB',24999],
  ['Honor','Honor 200','256 GB',29999], ['Honor','Honor X9b','256 GB',22999],
  ['Asus','Asus ROG Phone 8 Pro','512 GB',99999], ['Asus','Asus 8z','128 GB',29999],
  ['Google','Google Pixel 8','128 GB',45999], ['Google','Google Pixel 7a','128 GB',29999],
  ['Poco','POCO X6 Pro 5G','256 GB',26999], ['Poco','POCO F6 5G','256 GB',29999],
  ['LG','LG G8X ThinQ','128 GB',13999], ['LG','LG V30 Plus','128 GB',9999],
  ['Infinix','Infinix Note 40','256 GB',15999], ['Infinix','Infinix GT 20 Pro','256 GB',24999],
  ['Tecno','Tecno Camon 30','256 GB',18999], ['Tecno','Tecno POVA 6 Pro','256 GB',21999],
  ['iQOO','iQOO 12 5G','256 GB',49999], ['iQOO','iQOO Z9 5G','128 GB',19999],
  ['Nothing','Nothing Phone 2','256 GB',35999], ['Nothing','Nothing Phone 2a','128 GB',23999]
].map(([brand, name, storage, price]) => ({
  id: `buy-master-${brand.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
  name,
  brand,
  spec: `${storage} · ${brand}`,
  price: String(price),
  oldPrice: '',
  grade: 'Superb',
  warranty: '30-day'
}));
