/* Sell-only master model catalog supplied for SmartSwap acceptance. */
(function () {
  const groups = {
    Apple: `iPhone 6|iPhone 6 Plus|iPhone 6S|iPhone 6S Plus|iPhone SE (1st Gen)|iPhone 7|iPhone 7 Plus|iPhone 8|iPhone 8 Plus|iPhone X|iPhone XR|iPhone XS|iPhone XS Max|iPhone 11|iPhone 11 Pro|iPhone 11 Pro Max|iPhone SE (2020)|iPhone 12|iPhone 12 Mini|iPhone 12 Pro|iPhone 12 Pro Max|iPhone 13|iPhone 13 Mini|iPhone 13 Pro|iPhone 13 Pro Max|iPhone SE (2022)|iPhone 14|iPhone 14 Plus|iPhone 14 Pro|iPhone 14 Pro Max|iPhone 15|iPhone 15 Plus|iPhone 15 Pro|iPhone 15 Pro Max|iPhone 16|iPhone 16 Plus|iPhone 16 Pro|iPhone 16 Pro Max|iPhone 16e|iPhone 17|iPhone Air|iPhone 17 Pro|iPhone 17 Pro Max|iPhone 17e`,
    Xiaomi: `Redmi 5|Redmi 5A|Redmi 6|Redmi 6A|Redmi 6 Pro|Redmi 7|Redmi 7A|Redmi 8|Redmi 8A|Redmi 8A Dual|Redmi 9|Redmi 9A|Redmi 9 Prime|Redmi 9 Power|Redmi 9i|Redmi Note 5|Redmi Note 5 Pro|Redmi Note 6 Pro|Redmi Note 7|Redmi Note 7 Pro|Redmi Note 7S|Redmi Note 8|Redmi Note 8 Pro|Redmi Note 9|Redmi Note 9 Pro|Redmi Note 9 Pro Max|Redmi Note 10|Redmi Note 10 Pro|Redmi Note 10 Pro Max|Mi A2|Mi A3|Mi Mix 2|Mi Max 2|Mi 8|Mi 10T|Mi 10T Pro|Mi 10i|Mi 11X|Mi 11X Pro|Mi 11 Ultra|Mi 11 Lite|Mi K20|Mi K20 Pro|Mi Black Shark 2|Redmi Y1|Redmi Y1 Lite|Redmi Y2|Redmi Y3`,
    Samsung: `Galaxy A5 (2017)|Galaxy A6|Galaxy A6 Plus|Galaxy A7 (2017)|Galaxy A7 (2018)|Galaxy A8 Plus|Galaxy A8 Star|Galaxy A9 Pro|Galaxy A9 (2018)|Galaxy A10|Galaxy A10s|Galaxy A12|Galaxy A13|Galaxy A14 5G|Galaxy A20|Galaxy A20s|Galaxy A21s|Galaxy A22|Galaxy A22 5G|Galaxy A23|Galaxy A30|Galaxy A30s|Galaxy A31|Galaxy A32|Galaxy A50|Galaxy A50s|Galaxy A51|Galaxy A52|Galaxy A52s 5G|Galaxy A53 5G|Galaxy A70|Galaxy A70s|Galaxy A71|Galaxy A72|Galaxy A73 5G|Galaxy A80|Galaxy A03|Galaxy A03 Core|Galaxy A03s|Galaxy C5 Pro|Galaxy C7 Pro|Galaxy C9 Pro|Galaxy F02s|Galaxy F12|Galaxy F13|Galaxy F22|Galaxy F23 5G|Galaxy F41|Galaxy M Series|Galaxy J Series|Galaxy Note Series|Galaxy S Series|Galaxy Z Fold Series|Galaxy Z Flip Series`,
    Vivo: `V5|V5 Plus|V7|V7 Plus|V9|V9 Youth|V9 Pro|V11|V11 Pro|V15|V15 Pro|V17|V17 Pro|V19|V50|Y53i|Y55s|Y66|Y69|Y71|Y71i|Y81|Y81i|Y83|Y83 Pro|Y90|Y91|Y91i|Y93|Y95|Y11 (2019)|Y12|Y15 (2019)|Y17|Y19|Y30|Y50|Z1|Z1 Pro|Z1x|Z10|NEX|X9|X9s|X9s Plus|X21|S1|S1 Pro|U10|U20`,
    OnePlus: `OnePlus 3|OnePlus 3T|OnePlus 5|OnePlus 5T|OnePlus 6|OnePlus 6T|OnePlus 6T McLaren|OnePlus 7|OnePlus 7 Pro|OnePlus 7T|OnePlus 7T Pro|OnePlus 7T Pro McLaren Edition|OnePlus 8|OnePlus 8 Pro|OnePlus 8T|OnePlus 9 5G|OnePlus 9R 5G|OnePlus 9 Pro 5G|OnePlus 9RT 5G|OnePlus 10 Pro 5G|OnePlus 10R 5G|OnePlus 10T 5G|OnePlus 11 5G|OnePlus 11 Marble Edition|OnePlus 11R 5G|OnePlus 12|OnePlus 12R|OnePlus 13|OnePlus 13R|OnePlus 13s|OnePlus 15|OnePlus 15R|OnePlus Nord|OnePlus Nord 2 5G|OnePlus Nord 2T 5G|OnePlus Nord 3 5G|OnePlus Nord 4|OnePlus Nord 5|OnePlus Nord 6 5G|OnePlus Nord CE 5|OnePlus Nord CE 5G|OnePlus Nord CE 2 5G|OnePlus Nord CE 2 Lite 5G|OnePlus Nord CE 3 5G|OnePlus Nord CE 3 Lite 5G|OnePlus Nord CE 4 5G|OnePlus Nord CE 4 Lite 5G|OnePlus Open`,
    OPPO: `OPPO A3s|OPPO A5|OPPO A5 2020|OPPO A5s|OPPO A7|OPPO A9|OPPO A9 2020|OPPO A11K|OPPO A12|OPPO A15|OPPO A15s|OPPO A31|OPPO A33 2020|OPPO A52|OPPO A53|OPPO A57|OPPO A71|OPPO A71 (2018)|OPPO A77|OPPO F1s|OPPO F1 Plus|OPPO F3|OPPO F3 Plus|OPPO F5|OPPO F5 Youth|OPPO F7|OPPO F9|OPPO F9 Pro|OPPO F11|OPPO F11 Pro|OPPO F15|OPPO F17|OPPO F17 Pro|OPPO Find X|OPPO Find X2|OPPO K1|OPPO K3|OPPO Reno|OPPO Reno 2|OPPO Reno 2Z|OPPO Reno2 F|OPPO Reno 3 Pro 5G|OPPO Reno 4 Pro|OPPO Reno 5 Pro 5G|OPPO Reno 10x Zoom|OPPO R11|OPPO R17`,
    Realme: `Realme 1|Realme 2|Realme 2 Pro|Realme 3|Realme 3 Pro|Realme 3i|Realme 5|Realme 5i|Realme 5s|Realme 5 Pro|Realme 6|Realme 6i|Realme 6 Pro|Realme 7|Realme 7i|Realme 7 Pro|Realme 8|Realme 8 Pro|Realme X|Realme X2|Realme X2 Pro|Realme X3|Realme X3 SuperZoom|Realme X7|Realme X7 Pro|Realme XT|Realme U1|Realme C1|Realme C1 2019|Realme C2|Realme C3|Realme C11|Realme C12|Realme C15|Realme C15 Qualcomm Edition|Realme C20|Realme C21|Realme C25|Realme C25s|Realme Narzo 10|Realme Narzo 10A|Realme Narzo 20|Realme Narzo 20A|Realme Narzo 20 Pro|Realme Narzo 30A|Realme Narzo 30 Pro 5G|Realme X50 Pro`,
    Motorola: `Moto E6s|Moto E7 Plus|Moto E7 Power|Moto E40|Moto E13|Moto E32|Moto E32s|Moto E22s|Moto G6|Moto G6 Plus|Moto G7|Moto G7 Power|Moto G8 Power Lite|Moto G9|Moto G9 Power|Moto G 5G|Moto G10 Power|Moto G30|Moto G31|Moto G32|Moto G40 Fusion|Moto G42|Moto G51 5G|Moto G52|Moto G60|Moto G62 5G|Moto G71 5G|Moto G72|Moto G73 5G|Moto G82 5G|Moto G85 5G|Moto One|Moto One Action|Moto One Fusion Plus|Moto One Macro|Moto One Power|Moto One Vision|Moto Razr|Moto Razr 5G|Moto Edge 20|Moto Edge 20 Fusion|Moto Edge 20 Pro|Moto Edge 30|Moto Edge 30 Fusion|Moto Edge 30 Pro|Moto Edge 30 Ultra|Moto Edge 50 Fusion|Moto Edge Plus|Moto Z2 Force`,
    Lenovo: `Lenovo K9 Note|Lenovo A6 Note|Lenovo K10 Note|Lenovo K10 Plus|Lenovo Z6 Pro`,
    Nokia: `Nokia 2.2|Nokia 2.4|Nokia 3.2|Nokia 3.4|Nokia 4.2|Nokia 5.1 Plus|Nokia 5.3|Nokia 5.4|Nokia 6.1 Plus|Nokia 6.2|Nokia 7 Plus|Nokia 7.1|Nokia 7.2|Nokia 8.1|Nokia 8 Sirocco|Nokia C01 Plus|Nokia C12|Nokia C12 Pro|Nokia C20 Plus|Nokia C21 Plus|Nokia C22|Nokia C30|Nokia C31|Nokia C32|Nokia G10|Nokia G20|Nokia G21|Nokia G42 5G|Nokia G60 5G|Nokia XR20|Nokia X30 5G`,
    Honor: `Honor 7A|Honor 7X|Honor 8C|Honor 8X|Honor 9 Lite|Honor 9N|Honor 9X Pro|Honor 9A|Honor 10|Honor 20|Honor 20i|Honor 200 5G|Honor 200 Pro 5G|Honor 200 Lite 5G|Honor Play|Honor 90`,
    Asus: `Asus ROG Phone II ZS660KL|Asus ROG Phone 3|Asus ROG Phone 6 Pro|Asus ROG Phone 7|Asus ROG Phone 8 Pro|Asus 8z`,
    Google: `Pixel 4a|Pixel 6a|Pixel 7|Pixel 7a|Pixel 7 Pro|Pixel 8|Pixel 8a|Pixel 8 Pro|Pixel 9|Pixel 9a|Pixel 9 Pro|Pixel 9 Pro XL|Pixel 9 Pro Fold|Pixel 10|Pixel 10a|Pixel 10 Pro|Pixel 10 Pro XL|Pixel 10 Pro Fold`,
    Poco: `POCO F1|POCO F3 GT|POCO F4 5G|POCO F5 5G|POCO F6 5G|POCO F7 5G|POCO X2|POCO X3|POCO X3 Pro|POCO X4 Pro 5G|POCO X5 5G|POCO X5 Pro 5G|POCO X6 5G|POCO X6 Pro 5G|POCO X6 Neo 5G|POCO X7 5G|POCO X7 Pro 5G|POCO X8 Pro|POCO X8 Pro Max 5G|POCO M2|POCO M2 Pro|POCO M2 Reloaded|POCO M3|POCO M3 Pro 5G|POCO M4 5G|POCO M4 Pro|POCO M4 Pro 5G|POCO M5|POCO M6 5G|POCO M6 Pro 5G|POCO M6 Plus 5G|POCO M7 5G|POCO M7 Pro 5G|POCO M7 Plus 5G|POCO M8 5G|POCO C3|POCO C31|POCO C50|POCO C51|POCO C55|POCO C61|POCO C65|POCO C71|POCO C75 5G|POCO C81|POCO C85 5G|POCO C85x`,
    LG: `LG W10|LG G8S ThinQ|LG G8X ThinQ|LG Q60`,
    Infinix: `Hot 7 Pro|Hot 8|Hot 9|Hot 9 Pro|Hot 10|Hot 10 Play|Hot 10S|Hot 11|Hot 11 2022|Hot 11S|Hot 12|Hot 12 Play|Hot 12 Pro|Hot 20 5G|Hot 20 Play|Hot 30 5G|Hot 30i|Note 7|Note 10|Note 10 Pro|Note 11|Note 11S|Note 11S Free Fire Edition|Note 12|Note 12 5G|Note 12 Turbo|Note 12 Pro 4G|Note 12 Pro 5G|Note 12i|Note 30 5G|Zero 5 Pro|Zero 8i|Zero 5G|Zero 5G 2023|Zero 5G 2023 Turbo|Zero Ultra|Zero 20|Smart 4 Plus|Smart 5|Smart 6|Smart 6 HD|Smart 6 Plus|Smart 7|Smart 7 HD|Smart HD 2021|GT 10 Pro`,
    Tecno: `Spark 4|Spark 5|Spark 5 Pro|Spark 6 Air|Spark 7 Pro|Spark 8|Spark 8C|Spark 8P|Spark 8T|Spark 9|Spark 10 5G|Spark Go 2023|Spark GO 3|Spark 30C 5G|Camon 12 Air|Camon 15|Camon 15 Pro|Camon 16|Camon 16 Premier|Camon 17|Camon 17 Pro|Camon 18|Camon 19|Camon 19 Neo|Camon 19 Pro 5G|Camon 20|Camon 20 Premier 5G|Camon 20 Pro 5G|Camon 20s Pro 5G|Camon 30 5G|Camon 30 Premier 5G|POVA|POVA 2|POVA 3|POVA 4|POVA 5G|POVA 7 5G|POVA 7 Pro 5G|POVA Curve 5G|POVA Neo|Phantom X|Phantom X2 5G|Phantom X2 Pro 5G|Phantom V Fold 5G`,
    iQOO: `iQOO 3|iQOO 3 5G|iQOO 7 5G|iQOO 7 Legend 5G|iQOO 9 5G|iQOO 9 Pro 5G|iQOO 9 SE 5G|iQOO 9T 5G|iQOO 11 5G|iQOO 12 5G|iQOO 13 5G|iQOO 15 5G|iQOO Z3 5G|iQOO Z5 5G|iQOO Z6|iQOO Z6 5G|iQOO Z6 Lite 5G|iQOO Z6 Pro 5G|iQOO Z7 5G|iQOO Z7s 5G|iQOO Z7 Pro 5G|iQOO Z9 5G|iQOO Z9x 5G|iQOO Z9 Lite 5G|iQOO Z9s 5G|iQOO Z9s Pro 5G|iQOO Z10 5G|iQOO Z10x 5G|iQOO Z10 Lite 5G|iQOO Z10R 5G|iQOO Neo 6 5G|iQOO Neo 7 5G|iQOO Neo 7 Pro 5G|iQOO Neo 9 Pro 5G|iQOO Neo 10|iQOO Neo 10R 5G`,
    Nothing: `Nothing Phone 1|Nothing Phone 2|Nothing Phone 2a 5G|Nothing Phone 2a Plus|Nothing Phone 3a|Nothing Phone 3a Pro|Nothing Phone 3|Nothing Phone 3a Lite|Nothing Phone 4a|Nothing Phone 4a Pro|CMF Phone 1|CMF Phone 2 Pro`
  };

  const prices = { Apple: 12000, Xiaomi: 6500, Samsung: 9000, Vivo: 7000, OnePlus: 9000, OPPO: 6500, Realme: 5500, Motorola: 6000, Lenovo: 4500, Nokia: 5000, Honor: 6000, Asus: 7000, Google: 10000, Poco: 6000, LG: 5000, Infinix: 5000, Tecno: 5000, iQOO: 8000, Nothing: 10000 };
  const slugify = value => String(value).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const additions = [];

  Object.entries(groups).forEach(([brand, value]) => {
    value.split('|').forEach(name => {
      additions.push({
        id: `master-${slugify(brand)}-${slugify(name)}`,
        name: brand === 'Google' ? `Google ${name}` : name,
        brand,
        price: String(prices[brand] || 5000),
        condition: 'Good',
        spec: '64 GB / 128 GB / 256 GB',
        storageOptions: ['64 GB', '128 GB', '256 GB']
      });
    });
  });

  const existing = Array.isArray(window.DEFAULT_MODELS) ? window.DEFAULT_MODELS : [];
  const keys = new Set(existing.map(model => `${String(model.brand).toLowerCase()}:${String(model.name).toLowerCase()}`));
  additions.forEach(model => {
    const key = `${model.brand.toLowerCase()}:${model.name.toLowerCase()}`;
    if (!keys.has(key)) {
      existing.push(model);
      keys.add(key);
    }
  });
  window.DEFAULT_MODELS = existing;
}());
