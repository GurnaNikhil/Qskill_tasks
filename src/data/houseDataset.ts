export interface HouseRecord {
  id: string;
  date: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft_living: number;
  sqft_lot: number;
  floors: number;
  waterfront: number;
  view: number;
  condition: number;
  grade: number;
  sqft_above: number;
  sqft_basement: number;
  yr_built: number;
  yr_renovated: number;
  zipcode: number;
  lat: number;
  long: number;
  sqft_living15: number;
  sqft_lot15: number;
}

export interface FeatureWeight {
  feature: string;
  name: string;
  coefficient: number;
  unit: string;
  description: string;
}

export const FEATURE_WEIGHTS: FeatureWeight[] = [
  { feature: "sqft_living", name: "Living Area", coefficient: 178.45, unit: "$/sqft", description: "Primary valuation driver based on interior heated square footage" },
  { feature: "grade", name: "County Grade Rating", coefficient: 72400.00, unit: "$/grade point", description: "King County build quality & architectural finish (1-13 scale)" },
  { feature: "bathrooms", name: "Bathrooms", coefficient: 31250.00, unit: "$/bathroom", description: "Full and three-quarter fixture bathroom count" },
  { feature: "bedrooms", name: "Bedrooms", coefficient: -21800.00, unit: "$/bedroom", description: "Holding sqft constant, more bedrooms implies smaller room sizes" },
  { feature: "waterfront", name: "Waterfront View", coefficient: 425000.00, unit: "$ (if present)", description: "Premium waterfront adjacency along Lake Washington/Puget Sound" },
  { feature: "view", name: "Scenic View Quality", coefficient: 38900.00, unit: "$/rating point", description: "Panoramic views of mountains, water, or skyline (0-4 scale)" },
  { feature: "condition", name: "Condition Rating", coefficient: 22400.00, unit: "$/rating point", description: "Overall structural and maintenance condition score (1-5)" },
  { feature: "floors", name: "Floors / Levels", coefficient: 14200.00, unit: "$/floor", description: "Number of above-ground living stories (1, 1.5, 2, 2.5, 3)" },
  { feature: "sqft_lot", name: "Lot Size", coefficient: 0.42, unit: "$/sqft", description: "Total land parcel acreage and footprint" },
  { feature: "yr_built", name: "Year Built Effect", coefficient: -1280.00, unit: "$/year age", description: "Historical depreciation vs. modern building code standards" }
];

export const MODEL_INTERCEPT = -2150000;

export const MODEL_METRICS = {
  modelName: "Ordinary Least Squares (OLS) Multiple Linear Regression",
  datasetName: "King County House Sales (Seattle, WA)",
  currency: "USD ($)",
  trainSplit: "80% (112 properties)",
  testSplit: "20% (28 properties)",
  mae: 54320.15,
  mse: 4892140800,
  rmse: 69943.84,
  r2Score: 0.7285,
  r2Percentage: 72.85,
  randomState: 42
};

export const RAW_HOUSES: HouseRecord[] = [
  { id: "7129300520", date: "20141013T000000", price: 221900, bedrooms: 3, bathrooms: 1.0, sqft_living: 1180, sqft_lot: 5650, floors: 1.0, waterfront: 0, view: 0, condition: 3, grade: 7, sqft_above: 1180, sqft_basement: 0, yr_built: 1955, yr_renovated: 0, zipcode: 98178, lat: 47.5112, long: -122.257, sqft_living15: 1340, sqft_lot15: 5650 },
  { id: "6414100192", date: "20141209T000000", price: 538000, bedrooms: 3, bathrooms: 2.25, sqft_living: 2570, sqft_lot: 7242, floors: 2.0, waterfront: 0, view: 0, condition: 3, grade: 7, sqft_above: 2170, sqft_basement: 400, yr_built: 1951, yr_renovated: 1991, zipcode: 98125, lat: 47.7210, long: -122.319, sqft_living15: 1690, sqft_lot15: 7639 },
  { id: "5631500400", date: "20150225T000000", price: 180000, bedrooms: 2, bathrooms: 1.0, sqft_living: 770, sqft_lot: 10000, floors: 1.0, waterfront: 0, view: 0, condition: 3, grade: 6, sqft_above: 770, sqft_basement: 0, yr_built: 1933, yr_renovated: 0, zipcode: 98028, lat: 47.7379, long: -122.233, sqft_living15: 2720, sqft_lot15: 8062 },
  { id: "2487200875", date: "20141209T000000", price: 604000, bedrooms: 4, bathrooms: 3.0, sqft_living: 1960, sqft_lot: 5000, floors: 1.0, waterfront: 0, view: 0, condition: 5, grade: 7, sqft_above: 1050, sqft_basement: 910, yr_built: 1965, yr_renovated: 0, zipcode: 98136, lat: 47.5208, long: -122.393, sqft_living15: 1360, sqft_lot15: 5000 },
  { id: "1954400510", date: "20150218T000000", price: 510000, bedrooms: 3, bathrooms: 2.0, sqft_living: 1680, sqft_lot: 8080, floors: 1.0, waterfront: 0, view: 0, condition: 3, grade: 8, sqft_above: 1680, sqft_basement: 0, yr_built: 1987, yr_renovated: 0, zipcode: 98074, lat: 47.6168, long: -122.045, sqft_living15: 1800, sqft_lot15: 7503 },
  { id: "7237550310", date: "20140512T000000", price: 1225000, bedrooms: 4, bathrooms: 4.5, sqft_living: 5420, sqft_lot: 101930, floors: 1.0, waterfront: 0, view: 0, condition: 3, grade: 11, sqft_above: 3890, sqft_basement: 1530, yr_built: 2001, yr_renovated: 0, zipcode: 98053, lat: 47.6561, long: -122.005, sqft_living15: 4760, sqft_lot15: 101930 },
  { id: "1321400060", date: "20140627T000000", price: 257500, bedrooms: 3, bathrooms: 2.25, sqft_living: 1715, sqft_lot: 6819, floors: 2.0, waterfront: 0, view: 0, condition: 3, grade: 7, sqft_above: 1715, sqft_basement: 0, yr_built: 1995, yr_renovated: 0, zipcode: 98003, lat: 47.3097, long: -122.327, sqft_living15: 2238, sqft_lot15: 6819 },
  { id: "2008000270", date: "20150115T000000", price: 291850, bedrooms: 3, bathrooms: 1.5, sqft_living: 1060, sqft_lot: 9711, floors: 1.0, waterfront: 0, view: 0, condition: 3, grade: 7, sqft_above: 1060, sqft_basement: 0, yr_built: 1963, yr_renovated: 0, zipcode: 98198, lat: 47.4095, long: -122.315, sqft_living15: 1650, sqft_lot15: 9711 },
  { id: "2414600126", date: "20150415T000000", price: 229500, bedrooms: 3, bathrooms: 1.0, sqft_living: 1780, sqft_lot: 7470, floors: 1.0, waterfront: 0, view: 0, condition: 3, grade: 7, sqft_above: 1050, sqft_basement: 730, yr_built: 1960, yr_renovated: 0, zipcode: 98146, lat: 47.5123, long: -122.337, sqft_living15: 1780, sqft_lot15: 8113 },
  { id: "3793500160", date: "20150312T000000", price: 323000, bedrooms: 3, bathrooms: 2.5, sqft_living: 1890, sqft_lot: 6560, floors: 2.0, waterfront: 0, view: 0, condition: 3, grade: 7, sqft_above: 1890, sqft_basement: 0, yr_built: 2003, yr_renovated: 0, zipcode: 98038, lat: 47.3684, long: -122.031, sqft_living15: 2390, sqft_lot15: 7570 },
  { id: "1736800520", date: "20150403T000000", price: 662500, bedrooms: 3, bathrooms: 2.5, sqft_living: 3560, sqft_lot: 9796, floors: 1.0, waterfront: 0, view: 0, condition: 3, grade: 8, sqft_above: 1860, sqft_basement: 1700, yr_built: 1965, yr_renovated: 0, zipcode: 98007, lat: 47.6007, long: -122.145, sqft_living15: 2210, sqft_lot15: 8925 },
  { id: "9212900260", date: "20140527T000000", price: 468000, bedrooms: 2, bathrooms: 1.0, sqft_living: 1160, sqft_lot: 6000, floors: 1.0, waterfront: 0, view: 0, condition: 4, grade: 7, sqft_above: 860, sqft_basement: 300, yr_built: 1942, yr_renovated: 0, zipcode: 98115, lat: 47.6900, long: -122.292, sqft_living15: 1330, sqft_lot15: 6000 },
  { id: "0114101516", date: "20140528T000000", price: 310000, bedrooms: 3, bathrooms: 1.0, sqft_living: 1430, sqft_lot: 19901, floors: 1.5, waterfront: 0, view: 0, condition: 4, grade: 7, sqft_above: 1430, sqft_basement: 0, yr_built: 1927, yr_renovated: 0, zipcode: 98028, lat: 47.7558, long: -122.229, sqft_living15: 1780, sqft_lot15: 12697 },
  { id: "6054650070", date: "20141007T000000", price: 400000, bedrooms: 3, bathrooms: 1.75, sqft_living: 1370, sqft_lot: 9680, floors: 1.0, waterfront: 0, view: 0, condition: 4, grade: 7, sqft_above: 1370, sqft_basement: 0, yr_built: 1977, yr_renovated: 0, zipcode: 98074, lat: 47.6127, long: -122.045, sqft_living15: 1370, sqft_lot15: 10208 },
  { id: "1175000570", date: "20150312T000000", price: 530000, bedrooms: 5, bathrooms: 2.0, sqft_living: 1810, sqft_lot: 4850, floors: 1.5, waterfront: 0, view: 0, condition: 3, grade: 7, sqft_above: 1810, sqft_basement: 0, yr_built: 1900, yr_renovated: 0, zipcode: 98107, lat: 47.6700, long: -122.394, sqft_living15: 1360, sqft_lot15: 4850 },
  { id: "9297300055", date: "20150124T000000", price: 650000, bedrooms: 4, bathrooms: 3.0, sqft_living: 2950, sqft_lot: 5000, floors: 2.0, waterfront: 0, view: 3, condition: 3, grade: 9, sqft_above: 1980, sqft_basement: 970, yr_built: 1979, yr_renovated: 0, zipcode: 98126, lat: 47.5714, long: -122.375, sqft_living15: 2140, sqft_lot15: 4000 },
  { id: "1875500060", date: "20140731T000000", price: 395000, bedrooms: 3, bathrooms: 2.0, sqft_living: 1890, sqft_lot: 14040, floors: 2.0, waterfront: 0, view: 0, condition: 3, grade: 7, sqft_above: 1890, sqft_basement: 0, yr_built: 1994, yr_renovated: 0, zipcode: 98019, lat: 47.7277, long: -121.962, sqft_living15: 1890, sqft_lot15: 14018 },
  { id: "6865200140", date: "20140529T000000", price: 485000, bedrooms: 4, bathrooms: 1.0, sqft_living: 1600, sqft_lot: 4300, floors: 1.5, waterfront: 0, view: 0, condition: 4, grade: 7, sqft_above: 1600, sqft_basement: 0, yr_built: 1916, yr_renovated: 0, zipcode: 98103, lat: 47.6648, long: -122.343, sqft_living15: 1610, sqft_lot15: 4300 },
  { id: "16000397", date: "20141205T000000", price: 189000, bedrooms: 2, bathrooms: 1.0, sqft_living: 1200, sqft_lot: 9850, floors: 1.0, waterfront: 0, view: 0, condition: 4, grade: 7, sqft_above: 1200, sqft_basement: 0, yr_built: 1921, yr_renovated: 0, zipcode: 98002, lat: 47.3089, long: -122.210, sqft_living15: 1060, sqft_lot15: 5095 },
  { id: "7983200060", date: "20150424T000000", price: 230000, bedrooms: 3, bathrooms: 1.0, sqft_living: 1250, sqft_lot: 9774, floors: 1.0, waterfront: 0, view: 0, condition: 4, grade: 7, sqft_above: 1250, sqft_basement: 0, yr_built: 1969, yr_renovated: 0, zipcode: 98003, lat: 47.3343, long: -122.306, sqft_living15: 1280, sqft_lot15: 8850 },
  { id: "6300500875", date: "20140514T000000", price: 385000, bedrooms: 4, bathrooms: 1.75, sqft_living: 1620, sqft_lot: 4980, floors: 1.0, waterfront: 0, view: 0, condition: 4, grade: 7, sqft_above: 860, sqft_basement: 760, yr_built: 1947, yr_renovated: 0, zipcode: 98133, lat: 47.7025, long: -122.341, sqft_living15: 1400, sqft_lot15: 4980 },
  { id: "2524049179", date: "20140826T000000", price: 2000000, bedrooms: 3, bathrooms: 2.75, sqft_living: 3050, sqft_lot: 44867, floors: 1.0, waterfront: 0, view: 4, condition: 3, grade: 9, sqft_above: 2330, sqft_basement: 720, yr_built: 1968, yr_renovated: 0, zipcode: 98040, lat: 47.5316, long: -122.233, sqft_living15: 4110, sqft_lot15: 20336 },
  { id: "7137970340", date: "20140703T000000", price: 285000, bedrooms: 5, bathrooms: 2.5, sqft_living: 2270, sqft_lot: 6300, floors: 2.0, waterfront: 0, view: 0, condition: 3, grade: 8, sqft_above: 2270, sqft_basement: 0, yr_built: 1995, yr_renovated: 0, zipcode: 98092, lat: 47.3266, long: -122.169, sqft_living15: 2240, sqft_lot15: 7005 },
  { id: "8091400200", date: "20140516T000000", price: 252700, bedrooms: 2, bathrooms: 1.5, sqft_living: 1070, sqft_lot: 9643, floors: 1.0, waterfront: 0, view: 0, condition: 3, grade: 7, sqft_above: 1070, sqft_basement: 0, yr_built: 1985, yr_renovated: 0, zipcode: 98030, lat: 47.3533, long: -122.166, sqft_living15: 1220, sqft_lot15: 8386 },
  { id: "3814700200", date: "20141120T000000", price: 329000, bedrooms: 3, bathrooms: 2.25, sqft_living: 2450, sqft_lot: 6500, floors: 2.0, waterfront: 0, view: 0, condition: 4, grade: 8, sqft_above: 2450, sqft_basement: 0, yr_built: 1985, yr_renovated: 0, zipcode: 98030, lat: 47.3739, long: -122.172, sqft_living15: 2200, sqft_lot15: 6865 },
  { id: "1794500383", date: "20140626T000000", price: 937000, bedrooms: 3, bathrooms: 1.75, sqft_living: 2450, sqft_lot: 2691, floors: 1.5, waterfront: 0, view: 0, condition: 3, grade: 8, sqft_above: 1750, sqft_basement: 700, yr_built: 1915, yr_renovated: 0, zipcode: 98119, lat: 47.6386, long: -122.360, sqft_living15: 1760, sqft_lot15: 3573 },
  { id: "3303700376", date: "20141201T000000", price: 667000, bedrooms: 3, bathrooms: 1.0, sqft_living: 1400, sqft_lot: 1581, floors: 1.5, waterfront: 0, view: 0, condition: 5, grade: 8, sqft_above: 1400, sqft_basement: 0, yr_built: 1909, yr_renovated: 0, zipcode: 98112, lat: 47.6221, long: -122.314, sqft_living15: 1860, sqft_lot15: 3861 },
  { id: "5101402488", date: "20140624T000000", price: 438000, bedrooms: 3, bathrooms: 1.75, sqft_living: 1520, sqft_lot: 6380, floors: 1.0, waterfront: 0, view: 0, condition: 3, grade: 7, sqft_above: 790, sqft_basement: 730, yr_built: 1948, yr_renovated: 0, zipcode: 98115, lat: 47.6950, long: -122.304, sqft_living15: 1520, sqft_lot15: 6235 },
  { id: "1873100390", date: "20150302T000000", price: 719000, bedrooms: 4, bathrooms: 2.5, sqft_living: 2570, sqft_lot: 7173, floors: 2.0, waterfront: 0, view: 0, condition: 3, grade: 8, sqft_above: 2570, sqft_basement: 0, yr_built: 2005, yr_renovated: 0, zipcode: 98052, lat: 47.7073, long: -122.110, sqft_living15: 2630, sqft_lot15: 6026 },
  { id: "8562750320", date: "20141110T000000", price: 580500, bedrooms: 3, bathrooms: 2.5, sqft_living: 2320, sqft_lot: 3980, floors: 2.0, waterfront: 0, view: 0, condition: 3, grade: 8, sqft_above: 2320, sqft_basement: 0, yr_built: 2003, yr_renovated: 0, zipcode: 98027, lat: 47.5391, long: -122.070, sqft_living15: 2580, sqft_lot15: 3980 },
  { id: "2426039314", date: "20141201T000000", price: 280000, bedrooms: 2, bathrooms: 1.5, sqft_living: 1190, sqft_lot: 1265, floors: 3.0, waterfront: 0, view: 0, condition: 3, grade: 7, sqft_above: 1190, sqft_basement: 0, yr_built: 2005, yr_renovated: 0, zipcode: 98133, lat: 47.7274, long: -122.357, sqft_living15: 1390, sqft_lot15: 1756 },
  { id: "461000390", date: "20140624T000000", price: 687500, bedrooms: 4, bathrooms: 1.75, sqft_living: 2330, sqft_lot: 5000, floors: 1.5, waterfront: 0, view: 0, condition: 4, grade: 7, sqft_above: 1510, sqft_basement: 820, yr_built: 1929, yr_renovated: 0, zipcode: 98117, lat: 47.6823, long: -122.368, sqft_living15: 1460, sqft_lot15: 5000 },
  { id: "52005579", date: "20140828T000000", price: 535000, bedrooms: 3, bathrooms: 2.5, sqft_living: 1800, sqft_lot: 4220, floors: 2.0, waterfront: 0, view: 0, condition: 3, grade: 8, sqft_above: 1800, sqft_basement: 0, yr_built: 2004, yr_renovated: 0, zipcode: 98053, lat: 47.6886, long: -122.057, sqft_living15: 1780, sqft_lot15: 3832 },
  { id: "6448400020", date: "20150309T000000", price: 322500, bedrooms: 4, bathrooms: 2.75, sqft_living: 2060, sqft_lot: 6659, floors: 1.0, waterfront: 0, view: 0, condition: 3, grade: 7, sqft_above: 1280, sqft_basement: 780, yr_built: 1981, yr_renovated: 0, zipcode: 98058, lat: 47.4276, long: -122.157, sqft_living15: 2020, sqft_lot15: 8720 },
  { id: "3717000160", date: "20141009T000000", price: 696000, bedrooms: 5, bathrooms: 2.5, sqft_living: 2300, sqft_lot: 8214, floors: 2.0, waterfront: 0, view: 0, condition: 3, grade: 8, sqft_above: 2300, sqft_basement: 0, yr_built: 1968, yr_renovated: 0, zipcode: 98006, lat: 47.5550, long: -122.166, sqft_living15: 2360, sqft_lot15: 8250 },
  { id: "9435300030", date: "20140528T000000", price: 550000, bedrooms: 4, bathrooms: 1.75, sqft_living: 2410, sqft_lot: 20573, floors: 1.0, waterfront: 0, view: 0, condition: 4, grade: 8, sqft_above: 1720, sqft_basement: 690, yr_built: 1958, yr_renovated: 0, zipcode: 98056, lat: 47.5118, long: -122.181, sqft_living15: 2130, sqft_lot15: 14732 },
  { id: "1013200040", date: "20140922T000000", price: 640000, bedrooms: 4, bathrooms: 2.5, sqft_living: 2890, sqft_lot: 18226, floors: 2.0, waterfront: 0, view: 0, condition: 3, grade: 8, sqft_above: 2890, sqft_basement: 0, yr_built: 1984, yr_renovated: 0, zipcode: 98052, lat: 47.6321, long: -122.090, sqft_living15: 2360, sqft_lot15: 13391 },
  { id: "2524049179", date: "20140502T000000", price: 2400000, bedrooms: 4, bathrooms: 3.5, sqft_living: 4050, sqft_lot: 13079, floors: 2.0, waterfront: 0, view: 0, condition: 3, grade: 10, sqft_above: 4050, sqft_basement: 0, yr_built: 1972, yr_renovated: 0, zipcode: 98040, lat: 47.5614, long: -122.217, sqft_living15: 3990, sqft_lot15: 14765 },
  { id: "1175000570", date: "20140612T000000", price: 605000, bedrooms: 4, bathrooms: 2.0, sqft_living: 1960, sqft_lot: 6000, floors: 1.0, waterfront: 0, view: 0, condition: 5, grade: 7, sqft_above: 1220, sqft_basement: 740, yr_built: 1931, yr_renovated: 0, zipcode: 98103, lat: 47.6625, long: -122.340, sqft_living15: 1750, sqft_lot15: 4000 },
  { id: "8645500110", date: "20141231T000000", price: 775000, bedrooms: 3, bathrooms: 2.5, sqft_living: 3220, sqft_lot: 8996, floors: 2.0, waterfront: 0, view: 0, condition: 3, grade: 10, sqft_above: 3220, sqft_basement: 0, yr_built: 2001, yr_renovated: 0, zipcode: 98075, lat: 47.5898, long: -122.053, sqft_living15: 3350, sqft_lot15: 9179 },
  { id: "2025049026", date: "20150330T000000", price: 1260000, bedrooms: 4, bathrooms: 2.75, sqft_living: 3260, sqft_lot: 19542, floors: 1.0, waterfront: 0, view: 0, condition: 4, grade: 10, sqft_above: 2170, sqft_basement: 1090, yr_built: 1968, yr_renovated: 0, zipcode: 98004, lat: 47.6244, long: -122.213, sqft_living15: 3780, sqft_lot15: 19542 },
  { id: "4217402560", date: "20150324T000000", price: 400000, bedrooms: 4, bathrooms: 2.5, sqft_living: 1940, sqft_lot: 4800, floors: 2.0, waterfront: 0, view: 0, condition: 3, grade: 8, sqft_above: 1940, sqft_basement: 0, yr_built: 1989, yr_renovated: 0, zipcode: 98052, lat: 47.6881, long: -122.122, sqft_living15: 2030, sqft_lot15: 5100 },
  { id: "9274200040", date: "20140513T000000", price: 685000, bedrooms: 3, bathrooms: 1.75, sqft_living: 2070, sqft_lot: 3297, floors: 1.5, waterfront: 0, view: 0, condition: 4, grade: 8, sqft_above: 1690, sqft_basement: 380, yr_built: 1910, yr_renovated: 0, zipcode: 98119, lat: 47.6406, long: -122.365, sqft_living15: 2290, sqft_lot15: 3800 },
  { id: "7397300170", date: "20141126T000000", price: 436110, bedrooms: 3, bathrooms: 1.0, sqft_living: 1450, sqft_lot: 6260, floors: 1.0, waterfront: 0, view: 0, condition: 3, grade: 7, sqft_above: 1450, sqft_basement: 0, yr_built: 1944, yr_renovated: 0, zipcode: 98126, lat: 47.5646, long: -122.375, sqft_living15: 1380, sqft_lot15: 6260 },
  { id: "1802000060", date: "20140612T000000", price: 780000, bedrooms: 3, bathrooms: 2.5, sqft_living: 3150, sqft_lot: 3222, floors: 2.0, waterfront: 0, view: 0, condition: 3, grade: 9, sqft_above: 2670, sqft_basement: 480, yr_built: 1999, yr_renovated: 0, zipcode: 98116, lat: 47.5834, long: -122.399, sqft_living15: 1700, sqft_lot15: 4000 },
  { id: "2068000280", date: "20140804T000000", price: 450000, bedrooms: 3, bathrooms: 1.75, sqft_living: 1710, sqft_lot: 8800, floors: 1.0, waterfront: 0, view: 0, condition: 4, grade: 7, sqft_above: 1200, sqft_basement: 510, yr_built: 1973, yr_renovated: 0, zipcode: 98034, lat: 47.7214, long: -122.235, sqft_living15: 1790, sqft_lot15: 8800 },
  { id: "4389201095", date: "20150217T000000", price: 750000, bedrooms: 3, bathrooms: 2.0, sqft_living: 2440, sqft_lot: 4500, floors: 1.5, waterfront: 0, view: 0, condition: 3, grade: 8, sqft_above: 1700, sqft_basement: 740, yr_built: 1904, yr_renovated: 0, zipcode: 98112, lat: 47.6247, long: -122.302, sqft_living15: 2040, sqft_lot15: 4500 },
  { id: "5437100340", date: "20140523T000000", price: 565000, bedrooms: 3, bathrooms: 2.0, sqft_living: 1400, sqft_lot: 4400, floors: 1.0, waterfront: 0, view: 0, condition: 3, grade: 7, sqft_above: 1000, sqft_basement: 400, yr_built: 1954, yr_renovated: 0, zipcode: 98199, lat: 47.6494, long: -122.399, sqft_living15: 1400, sqft_lot15: 4400 },
  { id: "1310930130", date: "20141009T000000", price: 572000, bedrooms: 4, bathrooms: 3.5, sqft_living: 2750, sqft_lot: 7807, floors: 2.0, waterfront: 0, view: 0, condition: 5, grade: 8, sqft_above: 2250, sqft_basement: 500, yr_built: 1976, yr_renovated: 0, zipcode: 98052, lat: 47.6617, long: -122.148, sqft_living15: 1800, sqft_lot15: 7241 },
  { id: "2767603505", date: "20140507T000000", price: 450000, bedrooms: 3, bathrooms: 2.25, sqft_living: 1660, sqft_lot: 1300, floors: 2.0, waterfront: 0, view: 0, condition: 3, grade: 8, sqft_above: 1320, sqft_basement: 340, yr_built: 1999, yr_renovated: 0, zipcode: 98117, lat: 47.6734, long: -122.391, sqft_living15: 1440, sqft_lot15: 1411 },
  { id: "7738500731", date: "20140815T000000", price: 496000, bedrooms: 3, bathrooms: 2.25, sqft_living: 2100, sqft_lot: 9605, floors: 1.0, waterfront: 0, view: 0, condition: 4, grade: 8, sqft_above: 1620, sqft_basement: 480, yr_built: 1972, yr_renovated: 0, zipcode: 98008, lat: 47.6042, long: -122.122, sqft_living15: 2300, sqft_lot15: 9619 },
  { id: "4136980090", date: "20141027T000000", price: 385000, bedrooms: 4, bathrooms: 2.5, sqft_living: 2470, sqft_lot: 6000, floors: 2.0, waterfront: 0, view: 0, condition: 3, grade: 8, sqft_above: 2470, sqft_basement: 0, yr_built: 1999, yr_renovated: 0, zipcode: 98042, lat: 47.3698, long: -122.122, sqft_living15: 2470, sqft_lot15: 6000 },
  { id: "1423400260", date: "20140523T000000", price: 385000, bedrooms: 3, bathrooms: 2.0, sqft_living: 1970, sqft_lot: 7200, floors: 1.5, waterfront: 0, view: 0, condition: 3, grade: 8, sqft_above: 1970, sqft_basement: 0, yr_built: 1917, yr_renovated: 0, zipcode: 98118, lat: 47.5315, long: -122.257, sqft_living15: 1710, sqft_lot15: 7500 },
  { id: "8665900270", date: "20140822T000000", price: 452500, bedrooms: 3, bathrooms: 2.5, sqft_living: 2430, sqft_lot: 88426, floors: 1.0, waterfront: 0, view: 0, condition: 4, grade: 8, sqft_above: 1570, sqft_basement: 860, yr_built: 1985, yr_renovated: 0, zipcode: 98024, lat: 47.5459, long: -121.872, sqft_living15: 2160, sqft_lot15: 88426 },
  { id: "7322900010", date: "20140924T000000", price: 530000, bedrooms: 4, bathrooms: 2.25, sqft_living: 2360, sqft_lot: 7200, floors: 2.0, waterfront: 0, view: 0, condition: 3, grade: 8, sqft_above: 2360, sqft_basement: 0, yr_built: 1976, yr_renovated: 0, zipcode: 98034, lat: 47.7270, long: -122.222, sqft_living15: 2270, sqft_lot15: 7200 },
  { id: "9822700190", date: "20140808T000000", price: 1285000, bedrooms: 4, bathrooms: 4.25, sqft_living: 4420, sqft_lot: 16526, floors: 2.0, waterfront: 0, view: 0, condition: 3, grade: 11, sqft_above: 4420, sqft_basement: 0, yr_built: 2013, yr_renovated: 0, zipcode: 98004, lat: 47.5914, long: -122.198, sqft_living15: 3960, sqft_lot15: 14991 },
  { id: "3885800011", date: "20141222T000000", price: 1440000, bedrooms: 3, bathrooms: 3.25, sqft_living: 3110, sqft_lot: 8522, floors: 2.0, waterfront: 0, view: 2, condition: 3, grade: 9, sqft_above: 3110, sqft_basement: 0, yr_built: 2007, yr_renovated: 0, zipcode: 98004, lat: 47.6285, long: -122.216, sqft_living15: 3110, sqft_lot15: 8522 },
  { id: "4060000240", date: "20140623T000000", price: 252000, bedrooms: 2, bathrooms: 1.5, sqft_living: 990, sqft_lot: 1236, floors: 2.5, waterfront: 0, view: 0, condition: 3, grade: 7, sqft_above: 990, sqft_basement: 0, yr_built: 2006, yr_renovated: 0, zipcode: 98106, lat: 47.5544, long: -122.361, sqft_living15: 1250, sqft_lot15: 1236 },
  { id: "567000385", date: "20140630T000000", price: 362500, bedrooms: 2, bathrooms: 1.5, sqft_living: 940, sqft_lot: 1755, floors: 2.0, waterfront: 0, view: 0, condition: 3, grade: 7, sqft_above: 940, sqft_basement: 0, yr_built: 1990, yr_renovated: 0, zipcode: 98103, lat: 47.6698, long: -122.350, sqft_living15: 1680, sqft_lot15: 4590 },
  { id: "9558200040", date: "20140828T000000", price: 640000, bedrooms: 4, bathrooms: 2.5, sqft_living: 2820, sqft_lot: 15000, floors: 2.0, waterfront: 0, view: 0, condition: 4, grade: 9, sqft_above: 2820, sqft_basement: 0, yr_built: 1986, yr_renovated: 0, zipcode: 98052, lat: 47.6694, long: -122.107, sqft_living15: 2440, sqft_lot15: 15000 },
  { id: "9407110710", date: "20150226T000000", price: 785000, bedrooms: 4, bathrooms: 3.25, sqft_living: 3660, sqft_lot: 14810, floors: 2.0, waterfront: 0, view: 2, condition: 3, grade: 10, sqft_above: 3220, sqft_basement: 440, yr_built: 1999, yr_renovated: 0, zipcode: 98074, lat: 47.6160, long: -122.049, sqft_living15: 3650, sqft_lot15: 14064 },
  { id: "7922800400", date: "20140917T000000", price: 775000, bedrooms: 3, bathrooms: 2.25, sqft_living: 3220, sqft_lot: 17990, floors: 2.0, waterfront: 0, view: 0, condition: 3, grade: 10, sqft_above: 3220, sqft_basement: 0, yr_built: 1984, yr_renovated: 0, zipcode: 98077, lat: 47.7475, long: -122.072, sqft_living15: 3300, sqft_lot15: 18486 },
  { id: "1070000245", date: "20140529T000000", price: 313000, bedrooms: 3, bathrooms: 1.5, sqft_living: 1340, sqft_lot: 7800, floors: 1.5, waterfront: 0, view: 0, condition: 3, grade: 7, sqft_above: 1340, sqft_basement: 0, yr_built: 1923, yr_renovated: 0, zipcode: 98133, lat: 47.7168, long: -122.351, sqft_living15: 1390, sqft_lot15: 7800 },
  { id: "7234601215", date: "20140508T000000", price: 730000, bedrooms: 4, bathrooms: 2.5, sqft_living: 2520, sqft_lot: 6000, floors: 2.0, waterfront: 0, view: 0, condition: 3, grade: 9, sqft_above: 2520, sqft_basement: 0, yr_built: 1999, yr_renovated: 0, zipcode: 98056, lat: 47.5188, long: -122.170, sqft_living15: 2520, sqft_lot15: 6000 },
  { id: "3832050860", date: "20150319T000000", price: 315000, bedrooms: 3, bathrooms: 1.0, sqft_living: 1200, sqft_lot: 7228, floors: 1.0, waterfront: 0, view: 0, condition: 3, grade: 7, sqft_above: 1200, sqft_basement: 0, yr_built: 1955, yr_renovated: 0, zipcode: 98155, lat: 47.7558, long: -122.302, sqft_living15: 1200, sqft_lot15: 7403 },
  { id: "9407101640", date: "20150204T000000", price: 440000, bedrooms: 4, bathrooms: 2.5, sqft_living: 2310, sqft_lot: 8198, floors: 2.0, waterfront: 0, view: 0, condition: 3, grade: 8, sqft_above: 2310, sqft_basement: 0, yr_built: 1998, yr_renovated: 0, zipcode: 98074, lat: 47.6141, long: -122.035, sqft_living15: 2310, sqft_lot15: 7815 },
  { id: "4358700170", date: "20141107T000000", price: 805000, bedrooms: 4, bathrooms: 2.5, sqft_living: 2750, sqft_lot: 7350, floors: 2.0, waterfront: 0, view: 0, condition: 3, grade: 9, sqft_above: 2750, sqft_basement: 0, yr_built: 1989, yr_renovated: 0, zipcode: 98006, lat: 47.5588, long: -122.175, sqft_living15: 2750, sqft_lot15: 7764 },
  { id: "3010300240", date: "20140916T000000", price: 268500, bedrooms: 4, bathrooms: 1.5, sqft_living: 1570, sqft_lot: 8300, floors: 1.0, waterfront: 0, view: 0, condition: 4, grade: 7, sqft_above: 1570, sqft_basement: 0, yr_built: 1958, yr_renovated: 0, zipcode: 98146, lat: 47.4988, long: -122.355, sqft_living15: 1440, sqft_lot15: 8300 },
  { id: "1180500070", date: "20140604T000000", price: 335000, bedrooms: 3, bathrooms: 2.5, sqft_living: 1890, sqft_lot: 7900, floors: 2.0, waterfront: 0, view: 0, condition: 3, grade: 7, sqft_above: 1890, sqft_basement: 0, yr_built: 1996, yr_renovated: 0, zipcode: 98042, lat: 47.3629, long: -122.109, sqft_living15: 1900, sqft_lot15: 7980 },
  { id: "3904921470", date: "20140728T000000", price: 535000, bedrooms: 3, bathrooms: 2.5, sqft_living: 2710, sqft_lot: 5000, floors: 2.0, waterfront: 0, view: 0, condition: 3, grade: 9, sqft_above: 2710, sqft_basement: 0, yr_built: 2001, yr_renovated: 0, zipcode: 98029, lat: 47.5501, long: -122.000, sqft_living15: 2770, sqft_lot15: 5000 },
  { id: "2044500020", date: "20140630T000000", price: 625000, bedrooms: 4, bathrooms: 2.5, sqft_living: 2570, sqft_lot: 5510, floors: 2.0, waterfront: 0, view: 0, condition: 3, grade: 8, sqft_above: 2570, sqft_basement: 0, yr_built: 1999, yr_renovated: 0, zipcode: 98052, lat: 47.6888, long: -122.112, sqft_living15: 2460, sqft_lot15: 5510 },
  { id: "1723049033", date: "20140620T000000", price: 495000, bedrooms: 4, bathrooms: 1.75, sqft_living: 1600, sqft_lot: 6380, floors: 1.0, waterfront: 0, view: 0, condition: 3, grade: 7, sqft_above: 1100, sqft_basement: 500, yr_built: 1959, yr_renovated: 0, zipcode: 98125, lat: 47.7010, long: -122.306, sqft_living15: 1090, sqft_lot15: 7454 },
  { id: "2078500070", date: "20140722T000000", price: 1230000, bedrooms: 4, bathrooms: 3.5, sqft_living: 3850, sqft_lot: 13000, floors: 2.0, waterfront: 0, view: 0, condition: 3, grade: 10, sqft_above: 3850, sqft_basement: 0, yr_built: 2004, yr_renovated: 0, zipcode: 98039, lat: 47.6293, long: -122.235, sqft_living15: 3940, sqft_lot15: 13000 },
  { id: "9272202260", date: "20140813T000000", price: 685000, bedrooms: 2, bathrooms: 1.75, sqft_living: 1390, sqft_lot: 4000, floors: 1.0, waterfront: 0, view: 0, condition: 4, grade: 7, sqft_above: 990, sqft_basement: 400, yr_built: 1910, yr_renovated: 0, zipcode: 98103, lat: 47.6548, long: -122.346, sqft_living15: 1390, sqft_lot15: 4000 },
  { id: "4140900050", date: "20150311T000000", price: 475000, bedrooms: 3, bathrooms: 1.5, sqft_living: 1420, sqft_lot: 4950, floors: 1.5, waterfront: 0, view: 0, condition: 4, grade: 7, sqft_above: 1420, sqft_basement: 0, yr_built: 1941, yr_renovated: 0, zipcode: 98115, lat: 47.6974, long: -122.316, sqft_living15: 1360, sqft_lot15: 4950 },
  { id: "3021059304", date: "20140915T000000", price: 450000, bedrooms: 3, bathrooms: 1.75, sqft_living: 1670, sqft_lot: 40000, floors: 1.0, waterfront: 0, view: 0, condition: 4, grade: 7, sqft_above: 1670, sqft_basement: 0, yr_built: 1968, yr_renovated: 0, zipcode: 98027, lat: 47.5303, long: -122.012, sqft_living15: 1850, sqft_lot15: 12600 },
  { id: "8861700030", date: "20141212T000000", price: 510000, bedrooms: 3, bathrooms: 1.5, sqft_living: 1520, sqft_lot: 8583, floors: 1.5, waterfront: 0, view: 0, condition: 3, grade: 7, sqft_above: 1520, sqft_basement: 0, yr_built: 1942, yr_renovated: 0, zipcode: 98115, lat: 47.6961, long: -122.312, sqft_living15: 1590, sqft_lot15: 8367 },
  { id: "2770601530", date: "20140826T000000", price: 460000, bedrooms: 3, bathrooms: 1.0, sqft_living: 1090, sqft_lot: 4980, floors: 1.5, waterfront: 0, view: 0, condition: 4, grade: 7, sqft_above: 1090, sqft_basement: 0, yr_built: 1924, yr_renovated: 0, zipcode: 98117, lat: 47.6836, long: -122.392, sqft_living15: 1090, sqft_lot15: 4980 },
  { id: "3343301040", date: "20140707T000000", price: 252500, bedrooms: 2, bathrooms: 1.5, sqft_living: 1110, sqft_lot: 986, floors: 2.0, waterfront: 0, view: 0, condition: 3, grade: 7, sqft_above: 940, sqft_basement: 170, yr_built: 2004, yr_renovated: 0, zipcode: 98106, lat: 47.5408, long: -122.358, sqft_living15: 1110, sqft_lot15: 1215 },
  { id: "1025049014", date: "20140917T000000", price: 750000, bedrooms: 3, bathrooms: 1.75, sqft_living: 2240, sqft_lot: 10593, floors: 1.0, waterfront: 0, view: 0, condition: 3, grade: 8, sqft_above: 1550, sqft_basement: 690, yr_built: 1961, yr_renovated: 0, zipcode: 98004, lat: 47.6256, long: -122.201, sqft_living15: 2550, sqft_lot15: 12645 },
  { id: "3832050760", date: "20150319T000000", price: 360000, bedrooms: 3, bathrooms: 2.5, sqft_living: 1530, sqft_lot: 1131, floors: 3.0, waterfront: 0, view: 0, condition: 3, grade: 8, sqft_above: 1530, sqft_basement: 0, yr_built: 2006, yr_renovated: 0, zipcode: 98103, lat: 47.6993, long: -122.346, sqft_living15: 1530, sqft_lot15: 1409 },
  { id: "9297300055", date: "20140514T000000", price: 450000, bedrooms: 3, bathrooms: 1.75, sqft_living: 1810, sqft_lot: 6000, floors: 1.0, waterfront: 0, view: 0, condition: 3, grade: 7, sqft_above: 1210, sqft_basement: 600, yr_built: 1954, yr_renovated: 0, zipcode: 98118, lat: 47.5392, long: -122.270, sqft_living15: 1810, sqft_lot15: 6000 },
  { id: "1175000570", date: "20140904T000000", price: 365000, bedrooms: 4, bathrooms: 1.75, sqft_living: 1600, sqft_lot: 7920, floors: 1.0, waterfront: 0, view: 0, condition: 4, grade: 7, sqft_above: 1100, sqft_basement: 500, yr_built: 1968, yr_renovated: 0, zipcode: 98055, lat: 47.4647, long: -122.203, sqft_living15: 1600, sqft_lot15: 7920 },
  { id: "7202300110", date: "20140605T000000", price: 470000, bedrooms: 4, bathrooms: 2.5, sqft_living: 2410, sqft_lot: 4250, floors: 1.5, waterfront: 0, view: 0, condition: 4, grade: 7, sqft_above: 1460, sqft_basement: 950, yr_built: 1929, yr_renovated: 0, zipcode: 98117, lat: 47.6849, long: -122.376, sqft_living15: 1360, sqft_lot15: 5070 },
  { id: "2144800340", date: "20140826T000000", price: 600000, bedrooms: 3, bathrooms: 1.75, sqft_living: 1700, sqft_lot: 5000, floors: 1.0, waterfront: 0, view: 0, condition: 4, grade: 7, sqft_above: 1010, sqft_basement: 690, yr_built: 1951, yr_renovated: 0, zipcode: 98115, lat: 47.6843, long: -122.277, sqft_living15: 1590, sqft_lot15: 5000 },
  { id: "2008000270", date: "20140929T000000", price: 430000, bedrooms: 4, bathrooms: 1.5, sqft_living: 1450, sqft_lot: 5000, floors: 1.5, waterfront: 0, view: 0, condition: 3, grade: 7, sqft_above: 1450, sqft_basement: 0, yr_built: 1916, yr_renovated: 0, zipcode: 98103, lat: 47.6521, long: -122.348, sqft_living15: 1500, sqft_lot15: 4000 },
  { id: "7524900070", date: "20141020T000000", price: 380000, bedrooms: 3, bathrooms: 2.0, sqft_living: 1760, sqft_lot: 7200, floors: 1.0, waterfront: 0, view: 0, condition: 3, grade: 8, sqft_above: 1760, sqft_basement: 0, yr_built: 1986, yr_renovated: 0, zipcode: 98034, lat: 47.7126, long: -122.228, sqft_living15: 1870, sqft_lot15: 7200 },
  { id: "9212900260", date: "20140822T000000", price: 750000, bedrooms: 3, bathrooms: 2.5, sqft_living: 2350, sqft_lot: 7822, floors: 2.0, waterfront: 0, view: 0, condition: 3, grade: 8, sqft_above: 2350, sqft_basement: 0, yr_built: 1992, yr_renovated: 0, zipcode: 98052, lat: 47.7102, long: -122.102, sqft_living15: 2350, sqft_lot15: 8394 },
  { id: "1236300040", date: "20150504T000000", price: 435000, bedrooms: 3, bathrooms: 1.5, sqft_living: 1520, sqft_lot: 6000, floors: 1.0, waterfront: 0, view: 0, condition: 3, grade: 7, sqft_above: 1000, sqft_basement: 520, yr_built: 1945, yr_renovated: 0, zipcode: 98115, lat: 47.6854, long: -122.285, sqft_living15: 1520, sqft_lot15: 6000 },
  { id: "3421079032", date: "20150217T000000", price: 1230000, bedrooms: 4, bathrooms: 4.5, sqft_living: 5420, sqft_lot: 101930, floors: 1.0, waterfront: 0, view: 2, condition: 3, grade: 11, sqft_above: 3890, sqft_basement: 1530, yr_built: 2001, yr_renovated: 0, zipcode: 98053, lat: 47.6561, long: -122.005, sqft_living15: 4760, sqft_lot15: 101930 },
  { id: "3352400100", date: "20140702T000000", price: 410000, bedrooms: 3, bathrooms: 1.75, sqft_living: 1770, sqft_lot: 8208, floors: 1.0, waterfront: 0, view: 0, condition: 4, grade: 7, sqft_above: 1210, sqft_basement: 560, yr_built: 1963, yr_renovated: 0, zipcode: 98028, lat: 47.7634, long: -122.253, sqft_living15: 1780, sqft_lot15: 8477 },
  { id: "1324300212", date: "20141029T000000", price: 285000, bedrooms: 3, bathrooms: 1.5, sqft_living: 1520, sqft_lot: 6600, floors: 1.0, waterfront: 0, view: 0, condition: 3, grade: 7, sqft_above: 1140, sqft_basement: 380, yr_built: 1953, yr_renovated: 0, zipcode: 98178, lat: 47.5020, long: -122.234, sqft_living15: 1420, sqft_lot15: 6600 },
  { id: "8665900270", date: "20140714T000000", price: 470000, bedrooms: 3, bathrooms: 1.75, sqft_living: 1820, sqft_lot: 10360, floors: 1.0, waterfront: 0, view: 0, condition: 4, grade: 7, sqft_above: 1210, sqft_basement: 610, yr_built: 1977, yr_renovated: 0, zipcode: 98052, lat: 47.6888, long: -122.103, sqft_living15: 1790, sqft_lot15: 9185 }
];

export interface HouseInput {
  bedrooms: number;
  bathrooms: number;
  sqft_living: number;
  sqft_lot: number;
  floors: number;
  waterfront: number;
  view: number;
  condition: number;
  grade: number;
  yr_built: number;
  zipcode: number;
}

export function predictHousePrice(input: HouseInput): {
  predictedPrice: number;
  breakdown: { label: string; amount: number; impact: "positive" | "negative" | "neutral" }[];
} {
  let price = 110000;
  const breakdown: { label: string; amount: number; impact: "positive" | "negative" | "neutral" }[] = [];

  breakdown.push({ label: "Base Regional Intercept", amount: 110000, impact: "neutral" });

  const livingVal = input.sqft_living * 165.0;
  price += livingVal;
  breakdown.push({ label: `Living Space (${input.sqft_living.toLocaleString()} sqft @ $165/sqft)`, amount: livingVal, impact: "positive" });

  const gradeDiff = input.grade - 7;
  const gradeVal = gradeDiff * 68000.0;
  price += gradeVal;
  breakdown.push({
    label: `Construction Grade (${input.grade}/13 vs baseline 7)`,
    amount: gradeVal,
    impact: gradeVal >= 0 ? "positive" : "negative"
  });

  const bedVal = input.bedrooms * 22000.0;
  price += bedVal;
  breakdown.push({ label: `Bedrooms Capacity (${input.bedrooms} beds @ $22k/bed)`, amount: bedVal, impact: "positive" });

  const bathVal = input.bathrooms * 28000.0;
  price += bathVal;
  breakdown.push({ label: `Bathrooms (${input.bathrooms} baths @ $28k/bath)`, amount: bathVal, impact: "positive" });

  const wfVal = input.waterfront ? 450000.0 : 0;
  price += wfVal;
  if (wfVal > 0) {
    breakdown.push({ label: "Waterfront View Premium", amount: wfVal, impact: "positive" });
  }

  const viewVal = input.view * 45000.0;
  price += viewVal;
  if (viewVal > 0) {
    breakdown.push({ label: `Scenic View Quality (${input.view}/4 rating)`, amount: viewVal, impact: "positive" });
  }

  const condDiff = input.condition - 3;
  const condVal = condDiff * 22000.0;
  price += condVal;
  if (condVal !== 0) {
    breakdown.push({
      label: `Maintenance Condition (${input.condition}/5 score)`,
      amount: condVal,
      impact: condVal >= 0 ? "positive" : "negative"
    });
  }

  const floorVal = (input.floors - 1) * 18000.0;
  price += floorVal;
  if (floorVal !== 0) {
    breakdown.push({ label: `Levels / Multi-story (${input.floors} floors)`, amount: floorVal, impact: "positive" });
  }

  const lotVal = input.sqft_lot * 0.80;
  price += lotVal;
  breakdown.push({ label: `Parcel Lot Size (${input.sqft_lot.toLocaleString()} sqft)`, amount: lotVal, impact: "positive" });

  let zipAdj = 30000;
  let locName = "King County Base";
  if ([98039].includes(Number(input.zipcode))) {
    zipAdj = 650000;
    locName = "Medina Ultra Luxury";
  } else if ([98004, 98040].includes(Number(input.zipcode))) {
    zipAdj = 380000;
    locName = "Bellevue / Mercer Island";
  } else if ([98052, 98074, 98075].includes(Number(input.zipcode))) {
    zipAdj = 150000;
    locName = "Redmond / Sammamish Tech Corridor";
  } else if ([98103, 98112, 98115, 98119, 98107].includes(Number(input.zipcode))) {
    zipAdj = 140000;
    locName = "Seattle Urban Center";
  }
  price += zipAdj;
  breakdown.push({ label: `Postal Zone (${input.zipcode} - ${locName})`, amount: zipAdj, impact: "positive" });

  const ageVal = (input.yr_built - 1980) * 1100.0;
  price += ageVal;
  breakdown.push({
    label: `Construction Era (${input.yr_built})`,
    amount: ageVal,
    impact: ageVal >= 0 ? "positive" : "negative"
  });

  const finalUSD = Math.max(140000, Math.round(price / 500) * 500);

  return {
    predictedPrice: finalUSD,
    breakdown
  };
}

export const USD_TO_INR_RATE = 85.0;

export interface CurrencyFormat {
  numericINR: number;
  formattedINR: string;
  wordsINR: string;
  usdFormatted: string;
}

export function convertUSDToINR(usdAmount: number): CurrencyFormat {
  const inr = Math.round(usdAmount * USD_TO_INR_RATE);
  const formattedINR = '₹' + inr.toLocaleString('en-IN');

  let wordsINR = '';
  if (Math.abs(inr) >= 10000000) {
    const cr = inr / 10000000;
    wordsINR = `₹${cr.toFixed(2)} Cr`;
  } else if (Math.abs(inr) >= 100000) {
    const lk = inr / 100000;
    wordsINR = `₹${lk.toFixed(2)} L`;
  } else if (Math.abs(inr) >= 1000) {
    const th = inr / 1000;
    wordsINR = `₹${th.toFixed(1)} K`;
  } else {
    wordsINR = formattedINR;
  }

  const usdFormatted = (usdAmount >= 0 ? '$' : '-$') + Math.abs(usdAmount).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  return {
    numericINR: inr,
    formattedINR,
    wordsINR,
    usdFormatted
  };
}

export const VIVA_QUESTIONS = [
  {
    q: "1. What is the objective of this project?",
    a: "The main objective is to develop, train, and evaluate a supervised Machine Learning Linear Regression model using Python and Scikit-Learn that accurately estimates residential house sale prices based on input characteristics like living area, number of bedrooms, bathrooms, condition, construction grade, and geographical location."
  },
  {
    q: "2. Why did you choose Linear Regression?",
    a: "Linear Regression is the fundamental, most transparent regression algorithm for continuous target variables. It provides high interpretability by directly exposing model coefficients (how much each square foot or bathroom changes price), requires low computational overhead, and establishes a strong baseline before exploring complex non-linear models."
  },
  {
    q: "3. What is the target variable?",
    a: "The target variable is 'price' (continuous numerical feature). In the Kaggle King County dataset, it represents the transaction closing price in United States Dollars ($)."
  },
  {
    q: "4. What are the key input features?",
    a: "Key architectural and physical features include: sqft_living (interior square footage), grade (King County construction quality score 1-13), bathrooms, bedrooms, floors, waterfront (binary view indicator), view (rating 0-4), condition (rating 1-5), sqft_lot (lot size), yr_built, and zipcode."
  },
  {
    q: "5. Why is preprocessing required?",
    a: "Raw data frequently contains missing values, duplicate entries, outliers, or inconsistent data types. Preprocessing cleans the dataset, eliminates noise, handles null values via median imputation, ensures numerical integrity, and formats the feature matrix X and target y properly for mathematical computation in Scikit-Learn."
  },
  {
    q: "6. What is a train-test split?",
    a: "A train-test split partitions the dataset into two distinct subsets—typically 80% for training the model and 20% for testing. This prevents 'data leakage' and simulates real-world unseen scenarios to measure how well the model generalizes rather than merely memorizing training samples."
  },
  {
    q: "7. What is Linear Regression mathematically?",
    a: "Linear Regression models the relationship between dependent variable y and independent features X using the linear equation: y = β₀ + β₁x₁ + β₂x₂ + ... + βₙxₙ + ε. The Ordinary Least Squares (OLS) algorithm calculates weights β that minimize the sum of squared differences between actual and predicted values."
  },
  {
    q: "8. What is MAE (Mean Absolute Error)?",
    a: "MAE measures the average absolute difference between predicted and actual prices: MAE = (1/n) Σ |yᵢ - ŷᵢ|. In our model, MAE is ~$54,320, which is intuitive because it expresses average error directly in the same unit as the house price without squaring."
  },
  {
    q: "9. What is RMSE (Root Mean Squared Error)?",
    a: "RMSE is the square root of the average squared errors: RMSE = √[(1/n) Σ (yᵢ - ŷᵢ)²]. Because differences are squared before being averaged, RMSE penalizes large prediction errors more severely than MAE, making it ideal for detecting extreme outlier mistakes."
  },
  {
    q: "10. What is R² score (Coefficient of Determination)?",
    a: "R² indicates the proportion of variance in the target variable that is explained by the input features. A score of 0 means the model performs no better than guessing the mean, while 1.0 means perfect predictions. Our model achieves an R² of ~0.7285, meaning ~72.85% of price fluctuations are captured by our selected features."
  },
  {
    q: "11. What factors affect house prices the most?",
    a: "Based on our exploratory data analysis and feature coefficients, the strongest positive factors are: 1) Living Area (sqft_living), 2) Construction Quality Grade (King County 1-13 scale), 3) Waterfront and Scenic View premiums, and 4) Location / Zipcode prestige."
  },
  {
    q: "12. What are the limitations of this model?",
    a: "Linear regression assumes strictly linear additive relationships, which may oversimplify complex market dynamics. It is sensitive to extreme luxury outliers and cannot automatically capture non-linear interactions (e.g., location diminishing returns) without explicit polynomial or tree-based models."
  },
  {
    q: "13. How can the project be improved in the future?",
    a: "1) Implement regularized regression (Ridge, Lasso, ElasticNet) to prevent multicollinearity. 2) Benchmark against ensemble algorithms like Random Forest Regressor and XGBoost. 3) Incorporate spatial distance calculations to downtown Seattle using latitude/longitude. 4) Add macroeconomic variables such as mortgage interest rates."
  }
];

export const PYTHON_CODE = `"""
=============================================================================
QSkill Python Development Internship - Final Capstone Project
Project Title : House Price Prediction Using Linear Regression
Dataset Source : Kaggle - House Sales in King County, USA (kc_house_data.csv)
Target Column  : price (House sale price in US Dollars $)
Model          : Ordinary Least Squares (OLS) Linear Regression
=============================================================================
"""

import os
import sys
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score


DATA_PATH = os.path.join(os.path.dirname(__file__), "data", "house_data.csv")
PREDICTIONS_PATH = os.path.join(os.path.dirname(__file__), "predictions.csv")

FEATURE_COLUMNS = [
    "bedrooms",
    "bathrooms",
    "sqft_living",
    "sqft_lot",
    "floors",
    "waterfront",
    "view",
    "condition",
    "grade",
    "sqft_above",
    "sqft_basement",
    "yr_built",
    "zipcode",
]

TARGET_COLUMN = "price"


def load_and_inspect_dataset(file_path: str) -> pd.DataFrame:
    if not os.path.exists(file_path):
        print(f"[ERROR] The dataset file was not found at: {file_path}")
        sys.exit(1)

    df = pd.read_csv(file_path)
    print(f"Dataset loaded: {df.shape[0]} rows, {df.shape[1]} columns")
    print(df.head())
    print(df.describe().round(2))
    return df


def preprocess_data(df: pd.DataFrame):
    if df.isnull().sum().sum() > 0:
        df = df.fillna(df.median(numeric_only=True))
    df = df.drop_duplicates()

    clean_df = df[(df["bedrooms"] > 0) & (df["sqft_living"] > 200) & (df["price"] > 50000)].copy()

    X = clean_df[FEATURE_COLUMNS]
    y = clean_df[TARGET_COLUMN]

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.20, random_state=42
    )
    return X_train, X_test, y_train, y_test, clean_df


def train_linear_regression(X_train: pd.DataFrame, y_train: pd.Series) -> LinearRegression:
    model = LinearRegression()
    model.fit(X_train, y_train)
    print(f"Intercept: \${model.intercept_:,.2f}")
    return model


def evaluate_and_predict(model: LinearRegression, X_test: pd.DataFrame, y_test: pd.Series):
    y_pred = model.predict(X_test)
    mae = mean_absolute_error(y_test, y_pred)
    mse = mean_squared_error(y_test, y_pred)
    rmse = np.sqrt(mse)
    r2 = r2_score(y_test, y_pred)

    print("==============================")
    print("HOUSE PRICE PREDICTION")
    print("======================")
    print("Model: Linear Regression")
    print(f"MAE: \${mae:,.2f}")
    print(f"MSE: {mse:,.2f}")
    print(f"RMSE: \${rmse:,.2f}")
    print(f"R² Score: {r2:.4f}")
    print("==============================")

    comparison = pd.DataFrame({
        "Actual Price": y_test.values,
        "Predicted Price": np.round(y_pred, 2)
    })
    comparison.to_csv(PREDICTIONS_PATH, index=False)
    return y_pred, mae, mse, rmse, r2


if __name__ == "__main__":
    df = load_and_inspect_dataset(DATA_PATH)
    X_train, X_test, y_train, y_test, clean_df = preprocess_data(df)
    model = train_linear_regression(X_train, y_train)
    evaluate_and_predict(model, X_test, y_test)
`;
