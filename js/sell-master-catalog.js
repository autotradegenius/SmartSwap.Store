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

  const referenceRows = [
    ['Apple', 'iPhone 4|iPhone 4s|iPhone 5|iPhone 5c|iPhone 5s', '8 GB|16 GB|32 GB|64 GB'],
    ['Apple', 'iPhone 6|iPhone 6 Plus', '16 GB|32 GB|64 GB|128 GB'],
    ['Apple', 'iPhone 7|iPhone 7 Plus', '32 GB|128 GB|256 GB'],
    ['Apple', 'iPhone 8|iPhone 8 Plus', '64 GB|128 GB|256 GB'],
    ['Apple', 'iPhone 11|iPhone 12 Mini|iPhone 12|iPhone 13 Mini|iPhone 13|iPhone SE (2020)|iPhone SE (2022)', '64 GB|128 GB|256 GB'],
    ['Apple', 'iPhone 14|iPhone 14 Plus|iPhone 15|iPhone 15 Plus|iPhone 16e', '128 GB|256 GB|512 GB'],
    ['Apple', 'iPhone 14 Pro|iPhone 14 Pro Max|iPhone 15 Pro', '128 GB|256 GB|512 GB|1 TB'],
    ['Apple', 'iPhone 15 Pro Max|iPhone 16 Pro|iPhone 16 Pro Max', '256 GB|512 GB|1 TB'],
    ['Apple', 'iPhone 16|iPhone 16 Plus', '128 GB|256 GB|512 GB'],
    ['Apple', 'iPhone 17|iPhone Air', '256 GB|512 GB'],
    ['Xiaomi', 'Redmi 1S|Redmi 2|Redmi 3S|Redmi 3S Prime|Redmi 4|Redmi 4A', '8 GB|16 GB|32 GB|64 GB'],
    ['Xiaomi', 'Redmi 12|Redmi 12 5G|Redmi 12C|Redmi 13|Redmi 13 5G|Redmi 13C', '64 GB|128 GB|256 GB'],
    ['Xiaomi', 'Redmi A1|Redmi A2|Redmi A2+|Redmi A3|Redmi A3x|Redmi A4 5G', '32 GB|64 GB|128 GB|256 GB'],
    ['Xiaomi', 'Redmi K30 Pro|Redmi K50i|Redmi K60i|Redmi K70 Ultra|Redmi K80|Redmi K80 Pro', '128 GB|256 GB|512 GB'],
    ['Xiaomi', 'Mi 4|Mi 4i|Mi 5|Mi Max|Mi A1', '16 GB|32 GB|64 GB|128 GB'],
    ['Xiaomi', 'Redmi 5|Redmi 5A|Redmi 6|Redmi 6A|Redmi 7|Redmi 7A|Redmi 8|Redmi 8A|Redmi 9|Redmi 9A|Redmi 9i', '16 GB|32 GB|64 GB|128 GB'],
    ['Xiaomi', 'Redmi 9 Prime|Redmi 10|Redmi 10 Prime|Redmi 11 Prime|Redmi 11 Prime 5G', '32 GB|64 GB|128 GB'],
    ['Xiaomi', 'Redmi Note 6 Pro|Redmi Note 7|Redmi Note 7 Pro|Redmi Note 7S', '32 GB|64 GB|128 GB'],
    ['Xiaomi', 'Redmi Note 8|Redmi Note 8 Pro|Redmi Note 9|Redmi Note 9 Pro|Redmi Note 9 Pro Max|Redmi Note 10|Redmi Note 10S|Redmi Note 10 Pro|Redmi Note 10 Pro Max', '64 GB|128 GB'],
    ['Xiaomi', 'Redmi Note 11|Redmi Note 11S|Redmi Note 11 Pro|Redmi Note 12|Redmi Note 12 Pro', '64 GB|128 GB|256 GB'],
    ['Xiaomi', 'Redmi K20|Redmi K20 Pro|Redmi K30|Redmi K40|Mi A2|Mi A3', '64 GB|128 GB|256 GB'],
    ['Samsung', 'Galaxy S3|Galaxy S4|Galaxy S5|Galaxy S6|Galaxy S6 Edge|Galaxy S7|Galaxy S7 Edge', '16 GB|32 GB|64 GB|128 GB'],
    ['Samsung', 'Galaxy S23 FE|Galaxy S24 FE|Galaxy S25 FE|Galaxy A34|Galaxy A54|Galaxy A35|Galaxy A55|Galaxy A36|Galaxy A56|Galaxy A37|Galaxy A57', '64 GB|128 GB|256 GB'],
    ['Samsung', 'Galaxy Note 1|Galaxy Note 2|Galaxy Note 3|Galaxy Note 4|Galaxy Note 5|Galaxy Note FE', '8 GB|16 GB|32 GB|64 GB'],
    ['Samsung', 'Galaxy Z Fold|Galaxy Z Fold 2|Galaxy Z Fold 3|Galaxy Z Fold 4|Galaxy Z Fold 5|Galaxy Z Fold 6|Galaxy Z Fold 7|Galaxy Z Fold Special Edition', '256 GB|512 GB|1 TB'],
    ['Samsung', 'Galaxy Z Flip|Galaxy Z Flip 3|Galaxy Z Flip 4|Galaxy Z Flip 5|Galaxy Z Flip 6|Galaxy Z Flip 7|Galaxy Z Flip Special Edition', '128 GB|256 GB|512 GB'],
    ['Samsung', 'Galaxy A50|Galaxy A51|Galaxy A52|Galaxy A52s 5G|Galaxy A53 5G|Galaxy A70|Galaxy A71|Galaxy A72|Galaxy A73 5G', '64 GB|128 GB|256 GB'],
    ['Samsung', 'Galaxy A14|Galaxy A15|Galaxy A34|Galaxy A54|Galaxy A35|Galaxy A55|Galaxy A36|Galaxy A56|Galaxy A37|Galaxy A57', '64 GB|128 GB|256 GB'],
    ['Samsung', 'Galaxy F41|Galaxy F23 5G|Galaxy M20|Galaxy M30|Galaxy M40|Galaxy M31|Galaxy M51|Galaxy M32', '32 GB|64 GB|128 GB|256 GB'],
    ['Samsung', 'Galaxy S10|Galaxy S20|Galaxy S20 FE|Galaxy S21 FE|Galaxy S22|Galaxy S23', '128 GB|256 GB|512 GB'],
    ['Samsung', 'Galaxy S21|Galaxy S22 Ultra|Galaxy S23 Ultra', '128 GB|256 GB|512 GB|1 TB'],
    ['OnePlus', 'OnePlus One|OnePlus 2|OnePlus X', '16 GB|64 GB|128 GB'],
    ['OnePlus', 'OnePlus 14|OnePlus 15 Pro|OnePlus Open (Fold)', '256 GB|512 GB|1 TB'],
    ['Google', 'Nexus 4|Nexus 5|Nexus 6|Nexus 5X|Nexus 6P', '8 GB|16 GB|32 GB|64 GB'],
    ['Motorola', 'Moto G (1st Gen)|Moto G2|Moto G3|Moto G4|Moto G4 Plus|Moto G5|Moto G5 Plus', '8 GB|16 GB|32 GB|64 GB'],
    ['Nokia', 'Nokia Lumia 520|Nokia Lumia 620|Nokia Lumia 720|Nokia Lumia 920|Nokia Lumia 1020|Nokia Lumia 1320|Nokia Lumia 1520', '8 GB|16 GB|32 GB'],
    ['Lenovo', 'Lenovo A6000|Lenovo A7000|Lenovo K3 Note|Lenovo K4 Note|Lenovo K5 Note|Lenovo K6 Power', '8 GB|16 GB|32 GB'],
    ['LG', 'LG Optimus G|LG G2|LG G3|LG G4|LG G5|LG G6|LG G7 ThinQ|LG V20|LG V30+|LG V40 ThinQ|LG V60 ThinQ|LG Velvet|LG Wing 5G', '16 GB|32 GB|64 GB|128 GB'],
    ['Nothing', 'Nothing Phone (1)|Nothing Phone (2)|Nothing Phone (2a)|Nothing Phone (2a) Plus|Nothing Phone (3)|Nothing Phone (4)|Nothing Phone (4a)', '128 GB|256 GB|512 GB'],
    ['OPPO', 'OPPO A37|OPPO A57 (Old)|OPPO A83|OPPO A74|OPPO A79 5G|OPPO A59 5G|OPPO A3 Pro|OPPO A5 Pro|OPPO A60|OPPO A80', '128 GB|256 GB|512 GB'],
    ['OPPO', 'OPPO F1|OPPO F19|OPPO F19 Pro+|OPPO F21 Pro|OPPO F21s Pro|OPPO F23 5G|OPPO F25 Pro 5G|OPPO F27|OPPO F27 Pro+|OPPO F29|OPPO F31 Pro+|OPPO F33|OPPO F33 Pro', '128 GB|256 GB|512 GB'],
    ['OPPO', 'OPPO Reno 6|OPPO Reno 6 Pro|OPPO Reno 7|OPPO Reno 7 Pro|OPPO Reno 8 Pro|OPPO Reno 9|OPPO Reno 10|OPPO Reno 10 Pro+|OPPO Reno 11|OPPO Reno 12|OPPO Reno 13|OPPO Reno 14|OPPO Reno 15|OPPO Reno 16|OPPO Reno 17 Pro', '128 GB|256 GB|512 GB'],
    ['OPPO', 'OPPO Find X2|OPPO Find X3 Pro|OPPO Find X5 Pro|OPPO Find X6 Pro|OPPO Find X7 Ultra|OPPO Find X8|OPPO Find X9|OPPO Find N|OPPO Find N2|OPPO Find N3 Fold|OPPO Find N2 Flip|OPPO Find N3 Flip|OPPO Find N5|OPPO Find N6|OPPO K10|OPPO K10 5G|OPPO K11x|OPPO K12|OPPO K12 Play|OPPO K14|OPPO K15', '128 GB|256 GB|512 GB|1 TB'],
    ['Vivo', 'NEX 2|NEX 3|NEX 3S|Y02|Y02t|Y03|Y20i|Y21|Y31|Y53|Y56|Y75|Y100 5G|Y200 5G|Y200 Pro|Y300 5G|Y300 Pro|Y400|Y500|V3|V5s|V20 Pro|V23 5G|V23 Pro|V25|V25 Pro|V27|V27 Pro|V29|V29 Pro|V30|V30 Pro|V40|V40 Pro|V45|V45 Pro|V45e|T1 5G|T1 Pro|T1x|T2 5G|T2 Pro|T2x|T3 5G|T3 Pro|T3 Ultra|T3x|T4 5G|T4 Pro|T5', '128 GB|256 GB|512 GB'],
    ['Vivo', 'X21|X50|X50 Pro|X60 Pro|X60 Pro+|X70 Pro|X70 Pro+', '64 GB|128 GB|256 GB|512 GB'],
    ['Vivo', 'X80|X80 Pro|X90|X90 Pro|X90 Pro+|X100|X100 Pro|X100 Ultra|X200|X200 Pro|X300 Series|X Fold|X Fold+|X Fold 2|X Flip|X Fold 3 Pro|X Fold 4|X Fold 5', '128 GB|256 GB|512 GB|1 TB'],
    ['Realme', 'Realme 8 5G|Realme 9 Pro|Realme 9 Pro+|Realme 10 Pro+|Realme 11|Realme 11 Pro|Realme 11 Pro+|Realme 12|Realme 12 Pro|Realme 12 Pro+|Realme 13|Realme 14|Realme 15', '128 GB|256 GB|512 GB'],
    ['Realme', 'Realme C35|Realme C53|Realme C55|Realme C65', '16 GB|32 GB|64 GB|128 GB|256 GB'],
    ['Realme', 'Realme Narzo 50|Realme Narzo 60|Realme Narzo 70 Pro 5G|Realme GT Master Edition|Realme GT Neo 2|Realme GT Neo 3|Realme GT 2|Realme GT 2 Pro|Realme GT 3|Realme GT 5|Realme GT 6|Realme GT 7 Pro|Realme GT 8', '128 GB|256 GB|512 GB'],
    ['Motorola', 'Moto G54|Moto G64|Moto G84|Moto G85 5G|Moto G86|Moto Edge 40 Pro|Moto Edge 40 Neo|Moto Edge 50|Moto Edge 50 Pro|Moto Edge 50 Neo|Moto Edge 60|Moto Edge 60 Pro|Moto Edge 60 Fusion', '128 GB|256 GB|512 GB'],
    ['Motorola', 'Moto Razr 40|Moto Razr 40 Ultra|Moto Razr 50|Moto Razr 50 Ultra|Moto Razr 60|Moto Razr 60 Ultra', '256 GB|512 GB'],
    ['Honor', 'Honor 4X|Honor 5X|Honor 6X|Honor 10 Lite|Honor 8|Honor 9|Honor View 10|Honor View 20', '16 GB|32 GB|64 GB|128 GB|256 GB'],
    ['Honor', 'Honor 90|Honor 200|Honor 200 Pro|Honor 200 Lite|Honor Magic 5 Pro|Honor Magic 6 Pro|Honor Magic 7|Honor Magic 8 Pro|Honor X9b|Honor X9c 5G', '128 GB|256 GB|512 GB'],
    ['Asus', 'Asus Zenfone 4|Asus Zenfone 5|Asus Zenfone 6|Asus Zenfone 2|Asus Zenfone 3|Asus Zenfone 4 Pro', '8 GB|16 GB|32 GB|64 GB|128 GB'],
    ['Asus', 'Asus Zenfone 6Z|Asus Zenfone 7|Asus Zenfone 8|Asus Zenfone 9|Asus Zenfone 10', '64 GB|128 GB|256 GB'],
    ['Asus', 'Asus ROG Phone|Asus ROG Phone 2|Asus ROG Phone 3|Asus ROG Phone 5|Asus ROG Phone 5s|Asus ROG Phone 6|Asus ROG Phone 6 Pro|Asus ROG Phone 7|Asus ROG Phone 7 Ultimate|Asus ROG Phone 8 Pro|Asus ROG Phone 9|Asus ROG Phone 10', '128 GB|256 GB|512 GB|1 TB'],
    ['Poco', 'POCO F1 Armored|POCO F4 GT|POCO F5|POCO F5 Pro|POCO F6|POCO F6 Pro|POCO F7|POCO F8 Pro|POCO F9 Ultra', '128 GB|256 GB|512 GB|1 TB'],
    ['Poco', 'POCO X8|POCO X8 Pro|POCO M5s|POCO C40|POCO C85|POCO M8 Pro 5G', '32 GB|64 GB|128 GB|256 GB'],
    ['Infinix', 'Infinix Hot 4 Pro|Infinix Hot S3|Infinix Hot 6 Pro|Infinix Hot 40|Infinix Hot 50|Infinix Note 4|Infinix Note 5|Infinix Note 40 Pro|Infinix Note 40 Pro+|Infinix Note 50|Infinix Note 60 Pro|Infinix Zero 5|Infinix Zero X Pro|Infinix Zero 30 5G|Infinix Zero 40|Infinix GT 20 Pro|Infinix Zero 50 Ultra', '64 GB|128 GB|256 GB|512 GB'],
    ['Tecno', 'Tecno i3|Tecno i5|Tecno i7|Tecno Camon i|Tecno Camon X|Tecno Camon 20|Tecno Camon 20 Pro|Tecno Camon 30|Tecno Camon 30 Pro', '16 GB|32 GB|64 GB|128 GB|256 GB'],
    ['Tecno', 'Tecno Spark Go|Tecno Spark 10|Tecno Spark 10 Pro|Tecno Spark 20|Tecno Spark 20 Pro|Tecno Spark 30 Pro|Tecno Pova 5|Tecno Pova 6 Pro', '64 GB|128 GB|256 GB'],
    ['Tecno', 'Tecno Phantom V Fold|Tecno Phantom V Flip', '256 GB|512 GB'],
    ['iQOO', 'iQOO 3|iQOO 3 5G', '128 GB|256 GB'],
    ['iQOO', 'iQOO 14 Pro|iQOO 15|iQOO Neo 11 Pro|iQOO Z9 Pro|iQOO Z11 Pro 5G', '128 GB|256 GB|512 GB']
  ];
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

  referenceRows.forEach(([brand, names, storage]) => {
    names.split('|').forEach(name => {
      additions.push({
        id: `reference-${slugify(brand)}-${slugify(name)}`,
        name: brand === 'Google' ? `Google ${name}` : name,
        brand,
        price: String(prices[brand] || 5000),
        condition: 'Good',
        spec: storage.replace(/\|/g, ' / '),
        storageOptions: storage.split('|')
      });
    });
  });

  const existing = Array.isArray(window.DEFAULT_MODELS) ? window.DEFAULT_MODELS : [];
  const modelKey = model => {
    const brand = String(model.brand || '').trim().toLowerCase().replace(/[^a-z0-9]+/g, '');
    let name = String(model.name || '').trim().toLowerCase().replace(/[^a-z0-9]+/g, '');
    if (brand && name.startsWith(brand)) name = name.slice(brand.length);
    return `${brand}:${name}`;
  };
  const keys = new Set(existing.map(modelKey));
  additions.forEach(model => {
    const key = modelKey(model);
    const current = existing.find(item => modelKey(item) === key);
    if (current && model.storageOptions) {
      current.storageOptions = model.storageOptions;
      current.spec = model.spec;
    } else if (!keys.has(key)) {
      existing.push(model);
      keys.add(key);
    }
  });

  const naturalNameOrder = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
  existing.sort((first, second) => {
    const brandDifference = naturalNameOrder.compare(String(first.brand || ''), String(second.brand || ''));
    if (brandDifference) return brandDifference;
    return naturalNameOrder.compare(String(first.name || ''), String(second.name || ''));
  });
  window.DEFAULT_MODELS = existing;
}());
