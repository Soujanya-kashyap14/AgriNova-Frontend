export const MANDIS = [
  {
    name: "Yeshwanthpur APMC",
    city: "Bengaluru, Karnataka",
    distance: 12.4,
    price: 2450,
    rating: 4.7,
    travel: "28 min",
    trend: 4.2,
    crops: ["Tomato", "Onion", "Potato"],
  },
  {
    name: "Kolar Market Yard",
    city: "Kolar, Karnataka",
    distance: 31.8,
    price: 2620,
    rating: 4.5,
    travel: "52 min",
    trend: 6.8,
    crops: ["Tomato", "Mango"],
  },
  {
    name: "Chikkaballapur APMC",
    city: "Chikkaballapur",
    distance: 44.1,
    price: 2380,
    rating: 4.1,
    travel: "1 h 06 min",
    trend: -1.4,
    crops: ["Tomato", "Grapes"],
  },
  {
    name: "Doddaballapur Mandi",
    city: "Doddaballapur",
    distance: 22.6,
    price: 2295,
    rating: 3.9,
    travel: "41 min",
    trend: 0.8,
    crops: ["Ragi", "Tomato"],
  },
  {
    name: "Ramanagara Market",
    city: "Ramanagara",
    distance: 55.3,
    price: 2510,
    rating: 4.3,
    travel: "1 h 18 min",
    trend: 2.6,
    crops: ["Silk", "Tomato", "Coconut"],
  },
  {
    name: "Hoskote APMC",
    city: "Hoskote",
    distance: 18.9,
    price: 2340,
    rating: 4.0,
    travel: "34 min",
    trend: 1.1,
    crops: ["Tomato", "Beans"],
  },
];

export const WEEK_FORECAST = [
  { day: "Mon", price: 2450, low: 2380, high: 2510 },
  { day: "Tue", price: 2520, low: 2440, high: 2600 },
  { day: "Wed", price: 2585, low: 2490, high: 2670 },
  { day: "Thu", price: 2640, low: 2540, high: 2740 },
  { day: "Fri", price: 2710, low: 2600, high: 2820 },
  { day: "Sat", price: 2665, low: 2560, high: 2770 },
  { day: "Sun", price: 2590, low: 2480, high: 2700 },
];

export const MONTH_TREND = Array.from({ length: 30 }, (_, i) => ({
  day: `${i + 1}`,
  price: Math.round(2300 + Math.sin(i / 3.4) * 180 + i * 9 + (i % 4) * 22),
}));

export const WEATHER_WEEK = [
  { day: "Mon", temp: 29, rain: 20, icon: "sun" },
  { day: "Tue", temp: 31, rain: 10, icon: "sun" },
  { day: "Wed", temp: 27, rain: 65, icon: "rain" },
  { day: "Thu", temp: 26, rain: 80, icon: "rain" },
  { day: "Fri", temp: 28, rain: 35, icon: "cloud" },
  { day: "Sat", temp: 30, rain: 15, icon: "sun" },
  { day: "Sun", temp: 30, rain: 12, icon: "sun" },
];

export const RECENT_ANALYSES = [
  { crop: "Tomato", grade: "Grade 1", score: 92, date: "Today, 08:24", price: 2450 },
  { crop: "Onion", grade: "Grade 1", score: 88, date: "Yesterday, 17:10", price: 1870 },
  { crop: "Ragi", grade: "Grade 2", score: 74, date: "2 days ago", price: 3120 },
  { crop: "Green Chilli", grade: "Grade 1", score: 90, date: "4 days ago", price: 4260 },
];

export const EARNINGS = [
  { month: "Feb", earnings: 42000 },
  { month: "Mar", earnings: 51500 },
  { month: "Apr", earnings: 47800 },
  { month: "May", earnings: 62400 },
  { month: "Jun", earnings: 58900 },
  { month: "Jul", earnings: 71200 },
];
