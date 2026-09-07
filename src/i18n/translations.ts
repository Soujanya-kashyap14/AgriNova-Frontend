export const LANGUAGES = [
  { code: "en", label: "English", native: "English" },
  { code: "kn", label: "Kannada", native: "ಕನ್ನಡ" },
  { code: "hi", label: "Hindi", native: "हिन्दी" },
  { code: "ta", label: "Tamil", native: "தமிழ்" },
  { code: "te", label: "Telugu", native: "తెలుగు" },
  { code: "ml", label: "Malayalam", native: "മലയാളം" },
] as const;

export type LangCode = (typeof LANGUAGES)[number]["code"];

/* =========================================================
   ENGLISH
========================================================= */

const en = {
  /* ---------- BRAND ---------- */
  "brand.name": "EcoAgri Intelligence",
  "brand.tagline": "AI for every farm",

  /* ---------- NAVIGATION ---------- */
  "nav.home": "Home",
  "nav.grading": "AI Crop Grading",
  "nav.mandi": "Nearby Mandi",
  "nav.price": "Price Prediction",
  "nav.weather": "Weather",
  "nav.dashboard": "Dashboard",
  "nav.about": "About",
  "nav.contact": "Contact",
  "nav.login": "Login",
  "nav.language": "Language",
  "nav.menu": "Menu",
  "nav.theme": "Toggle theme",
  "nav.alerts": "Weather alerts",
  "nav.alerts.empty": "No weather alerts right now",
  "nav.alerts.viewWeather": "View full forecast",

  /* ---------- HERO ---------- */
  "hero.badge": "AI powered agriculture platform",
  "hero.title": "Smart Farming Powered by Artificial Intelligence",
  "hero.subtitle":
    "Photograph your harvest and our AI grades quality in seconds, then recommends the best mandi, the best price and the best day to sell.",
  "hero.cta1": "Start Crop Analysis",
  "hero.cta2": "Explore Features",
  "hero.stat1": "Grading accuracy",
  "hero.stat2": "Mandis tracked",
  "hero.stat3": "Farmers served",

  /* ---------- FEATURES ---------- */
  "features.title": "Everything a farmer needs, in one app",
  "features.subtitle":
    "Simple tools, big decisions. Built for smartphones and for the field.",

  "features.grading.title": "AI Crop Grading",
  "features.grading.desc":
    "Snap a photo and get grade, freshness and quality scores instantly.",

  "features.mandi.title": "Mandi Finder",
  "features.mandi.desc":
    "Find nearby markets with live prices, distance and travel time.",

  "features.price.title": "Price Prediction",
  "features.price.desc":
    "Forecast tomorrow, next week and next month before you sell.",

  "features.weather.title": "Weather Forecast",
  "features.weather.desc":
    "Rain, humidity and wind alerts tuned for your crop stage.",

  "features.sell.title": "Sell Recommendation",
  "features.sell.desc":
    "Know the best day and market to sell for maximum profit.",

  "features.analytics.title": "Analytics Dashboard",
  "features.analytics.desc":
    "Track every analysis, price history and favourite market.",

  "features.learnMore": "Learn more",

  /* ---------- CROP GRADING ---------- */
  "grading.title": "AI Crop Grading",
  "grading.subtitle":
    "Upload a clear photo of your produce and get an instant quality report.",

  "grading.capture": "Capture Photo",
  "grading.gallery": "Upload from Gallery",
  "grading.hint":
    "JPG or PNG, good daylight, crop filling the frame.",

  "grading.analyzing": "Analysing your crop…",
  "grading.analyzingSub":
    "Checking colour, texture, size and defects",

  "grading.retake": "Analyse another photo",

  "grading.result": "Analysis Result",
  "grading.crop": "Crop Name",
  "grading.grade": "Grade",
  "grading.confidence": "Confidence",
  "grading.freshness": "Freshness Score",
  "grading.quality": "Quality Score",
  "grading.price": "Suggested Market Price",
  "grading.recommendation": "Recommendation",

  /* ---------- GRADE LABELS ---------- */
  "grading.gradeA": "Grade A",
  "grading.gradeB": "Grade B",
  "grading.gradeC": "Grade C",

  /* ---------- RESULT CARD ---------- */
  "grading.bestMarket": "Best Market",
  "grading.quintal": "/ quintal",
  "grading.distance": "Distance",
  "grading.away": "away",

  "grading.excellent":
    "Excellent quality produce. Suitable for sale as premium fresh produce.",

  "grading.good":
    "Good quality produce. Suitable for sale as fresh produce.",

  "grading.average":
    "Average quality produce. Consider selling soon for the best value.",

  "grading.sample":
    "Try it with a sample tomato photo",

  "grading.qualityReport":
    "Your quality report — grade, freshness, price and selling advice — appears here.",

  /* ---------- MANDI ---------- */
  "mandi.title": "Nearby Mandi",
  "mandi.subtitle":
    "Live market prices, distance and ratings around you.",
  "mandi.distance": "Distance",
  "mandi.price": "Current Price",
  "mandi.rating": "Market Rating",
  "mandi.travel": "Travel Time",
  "mandi.directions": "Get directions",
  "mandi.map": "Live market map",

  /* ---------- PRICE ---------- */
  "price.title": "Price Prediction",
  "price.subtitle":
    "AI forecasts built on mandi arrivals, weather and demand signals.",
  "price.today": "Today's Price",
  "price.tomorrow": "Tomorrow Prediction",
  "price.week": "7-Day Prediction",
  "price.month": "30-Day Trend",
  "price.best": "Best Selling Day",

  /* ---------- WEATHER ---------- */
  "weather.title": "Weather Dashboard",
  "weather.subtitle":
    "Field-level conditions and alerts for the next seven days.",
  "weather.temp": "Temperature",
  "weather.humidity": "Humidity",
  "weather.rain": "Rain Probability",
  "weather.wind": "Wind Speed",
  "weather.alerts": "Weather Alerts",
  "weather.forecast": "7-day forecast",

  /* ---------- DASHBOARD ---------- */
  "dash.title": "Farmer Dashboard",
  "dash.subtitle":
    "Your analyses, markets and earnings at a glance.",
  "dash.recent": "Recent Crop Analyses",
  "dash.uploads": "Uploaded Images",
  "dash.history": "Prediction History",
  "dash.favorites": "Favourite Markets",
  "dash.notifications": "Notifications",
  "dash.profile": "Profile Summary",

  /* ---------- AUTH ---------- */
  "auth.login": "Login",
  "auth.signup": "Sign Up",
  "auth.welcome": "Welcome back",
  "auth.create": "Create your account",
  "auth.phone": "Phone Number",
  "auth.email": "Email",
  "auth.name": "Full Name",
  "auth.password": "Password",
  "auth.google": "Continue with Google",
  "auth.or": "or",
  "auth.otp": "Send OTP",
  "auth.continue": "Continue",
  "auth.confirmPassword": "Confirm Password",
  "auth.register": "Register",
  "auth.noAccount": "New here?",
  "auth.haveAccount": "Already have an account?",
  "auth.showPassword": "Show password",
  "auth.hidePassword": "Hide password",

  /* ---------- ABOUT ---------- */
  "about.title": "About EcoAgri Intelligence",
  "about.subtitle":
    "We put agricultural science and AI into every farmer's pocket.",
  "about.mission": "Our Mission",
  "about.missionText":
    "Give every smallholder farmer the same market intelligence a large trader has, in their own language, on the phone they already own.",
  "about.vision": "Our Vision",
  "about.visionText":
    "A fair market where crop quality, not bargaining power, decides the price a farmer receives.",
  "about.team": "The Team",

  /* ---------- CONTACT ---------- */
  "contact.title": "Contact & Support",
  "contact.subtitle":
    "We answer in your language, seven days a week.",
  "contact.name": "Your Name",
  "contact.email": "Email Address",
  "contact.message": "Message",
  "contact.send": "Send Message",
  "contact.sent":
    "Thanks! Our support team will call you back shortly.",
  "contact.faq": "Frequently Asked Questions",
  "contact.support": "Support",

  /* ---------- FOOTER ---------- */
  "footer.quick": "Quick Links",
  "footer.emergency": "Emergency Agriculture Help",
  "footer.gov": "Government Links",
  "footer.social": "Follow us",
  "footer.rights": "All rights reserved.",
  "footer.about":
    "AI crop grading, mandi discovery and price forecasting for Indian farmers.",

  /* ---------- COMMON ---------- */
  "common.viewAll": "View all",
  "common.back": "Back to home",
};

/* =========================================================
   HINDI
========================================================= */

const hi: Dict = {
  "brand.tagline": "हर खेत के लिए एआई",

  "nav.home": "होम",
  "nav.grading": "एआई फसल ग्रेडिंग",
  "nav.mandi": "नज़दीकी मंडी",
  "nav.price": "मूल्य पूर्वानुमान",
  "nav.weather": "मौसम",
  "nav.dashboard": "डैशबोर्ड",
  "nav.about": "हमारे बारे में",
  "nav.contact": "संपर्क",
  "nav.login": "लॉगिन",
  "nav.language": "भाषा",
  "nav.menu": "मेन्यू",
  "nav.theme": "थीम बदलें",
  "nav.alerts": "मौसम चेतावनियाँ",
  "nav.alerts.empty": "अभी कोई मौसम चेतावनी नहीं है",
  "nav.alerts.viewWeather": "पूरा पूर्वानुमान देखें",

  "hero.badge": "एआई आधारित कृषि प्लेटफ़ॉर्म",
  "hero.title": "आर्टिफिशियल इंटेलिजेंस से स्मार्ट खेती",
  "hero.subtitle":
    "अपनी फसल की फ़ोटो लें और एआई कुछ ही सेकंड में गुणवत्ता आँकता है, फिर सबसे अच्छी मंडी, कीमत और बेचने का दिन बताता है।",
  "hero.cta1": "फसल विश्लेषण शुरू करें",
  "hero.cta2": "सुविधाएँ देखें",
  "hero.stat1": "ग्रेडिंग सटीकता",
  "hero.stat2": "मंडियाँ",
  "hero.stat3": "किसान",

  "features.title": "किसान की हर ज़रूरत, एक ऐप में",
  "features.subtitle":
    "सरल उपकरण, बड़े फ़ैसले। मोबाइल और खेत के लिए बनाया गया।",

  "features.grading.title": "एआई फसल ग्रेडिंग",
  "features.grading.desc":
    "फ़ोटो लें और तुरंत ग्रेड, ताजगी और गुणवत्ता स्कोर पाएँ।",

  "features.mandi.title": "मंडी खोजें",
  "features.mandi.desc":
    "लाइव भाव, दूरी और यात्रा समय के साथ नज़दीकी मंडियाँ।",

  "features.price.title": "मूल्य पूर्वानुमान",
  "features.price.desc":
    "बेचने से पहले कल, अगले हफ़्ते और महीने का भाव जानें।",

  "features.weather.title": "मौसम पूर्वानुमान",
  "features.weather.desc":
    "बारिश, नमी और हवा की चेतावनी आपकी फसल के अनुसार।",

  "features.sell.title": "बिक्री सुझाव",
  "features.sell.desc":
    "अधिकतम लाभ के लिए सही दिन और मंडी चुनें।",

  "features.analytics.title": "एनालिटिक्स डैशबोर्ड",
  "features.analytics.desc":
    "हर विश्लेषण, भाव इतिहास और पसंदीदा मंडी देखें.",

  "features.learnMore": "और जानें",

  "grading.title": "एआई फसल ग्रेडिंग",
  "grading.subtitle":
    "अपनी उपज की साफ़ फ़ोटो अपलोड करें और तुरंत गुणवत्ता रिपोर्ट पाएँ।",
  "grading.capture": "फ़ोटो लें",
  "grading.gallery": "गैलरी से अपलोड करें",
  "grading.hint":
    "JPG या PNG, अच्छी रोशनी में और फसल को फ्रेम में भरकर रखें।",

  "grading.analyzing": "आपकी फसल का विश्लेषण हो रहा है…",
  "grading.analyzingSub":
    "रंग, बनावट, आकार और दोषों की जाँच की जा रही है",

  "grading.retake": "दूसरी फ़ोटो जाँचें",
  "grading.result": "विश्लेषण परिणाम",
  "grading.crop": "फसल",
  "grading.grade": "ग्रेड",
  "grading.confidence": "विश्वास स्तर",
  "grading.freshness": "ताजगी स्कोर",
  "grading.quality": "गुणवत्ता स्कोर",
  "grading.price": "सुझाया गया बाज़ार भाव",
  "grading.recommendation": "सिफ़ारिश",

  "grading.gradeA": "ग्रेड A",
  "grading.gradeB": "ग्रेड B",
  "grading.gradeC": "ग्रेड C",

  "grading.bestMarket": "सर्वोत्तम मंडी",
  "grading.quintal": "/ क्विंटल",
  "grading.distance": "दूरी",
  "grading.away": "दूर",

  "grading.excellent":
    "उत्कृष्ट गुणवत्ता की उपज। प्रीमियम ताज़ी उपज के रूप में बिक्री के लिए उपयुक्त।",

  "grading.good":
    "अच्छी गुणवत्ता की उपज। ताज़ी उपज के रूप में बिक्री के लिए उपयुक्त।",

  "grading.average":
    "औसत गुणवत्ता की उपज। बेहतर मूल्य के लिए जल्द बेचने पर विचार करें।",

  "grading.sample":
    "सैंपल टमाटर फ़ोटो के साथ आज़माएँ",

  "grading.qualityReport":
    "आपकी गुणवत्ता रिपोर्ट — ग्रेड, ताजगी, कीमत और बिक्री सलाह — यहाँ दिखाई देगी।",

  "mandi.title": "नज़दीकी मंडी",
  "mandi.subtitle":
    "लाइव बाजार भाव, दूरी और आपके आसपास की रेटिंग।",
  "mandi.distance": "दूरी",
  "mandi.price": "मौजूदा भाव",
  "mandi.rating": "मंडी रेटिंग",
  "mandi.travel": "यात्रा समय",
  "mandi.directions": "रास्ता देखें",
  "mandi.map": "लाइव मंडी मानचित्र",

  "price.title": "मूल्य पूर्वानुमान",
  "price.subtitle":
    "मंडी आवक, मौसम और मांग के आधार पर एआई पूर्वानुमान।",
  "price.today": "आज का भाव",
  "price.tomorrow": "कल का अनुमान",
  "price.week": "7-दिन अनुमान",
  "price.month": "30-दिन रुझान",
  "price.best": "बेचने का सर्वोत्तम दिन",

  "weather.title": "मौसम डैशबोर्ड",
  "weather.subtitle":
    "अगले सात दिनों के खेत-स्तरीय मौसम और चेतावनियाँ।",
  "weather.temp": "तापमान",
  "weather.humidity": "नमी",
  "weather.rain": "बारिश की संभावना",
  "weather.wind": "हवा की गति",
  "weather.alerts": "मौसम चेतावनी",
  "weather.forecast": "7-दिन पूर्वानुमान",

  "dash.title": "किसान डैशबोर्ड",
  "dash.subtitle":
    "अपने विश्लेषण, मंडियाँ और कमाई एक नज़र में देखें।",
  "dash.recent": "हाल के फसल विश्लेषण",
  "dash.uploads": "अपलोड की गई तस्वीरें",
  "dash.history": "पूर्वानुमान इतिहास",
  "dash.favorites": "पसंदीदा मंडियाँ",
  "dash.notifications": "सूचनाएँ",
  "dash.profile": "प्रोफ़ाइल",

  "auth.login": "लॉगिन",
  "auth.signup": "साइन अप",
  "auth.welcome": "फिर से स्वागत है",
  "auth.create": "अपना खाता बनाएँ",
  "auth.phone": "मोबाइल नंबर",
  "auth.email": "ईमेल",
  "auth.name": "पूरा नाम",
  "auth.password": "पासवर्ड",
  "auth.google": "Google से जारी रखें",
  "auth.or": "या",
  "auth.otp": "ओटीपी भेजें",
  "auth.continue": "जारी रखें",
  "auth.confirmPassword": "पासवर्ड की पुष्टि करें",
  "auth.register": "रजिस्टर करें",
  "auth.noAccount": "नए हैं?",
  "auth.haveAccount": "पहले से खाता है?",
  "auth.showPassword": "पासवर्ड दिखाएँ",
  "auth.hidePassword": "पासवर्ड छिपाएँ",

  "about.title": "EcoAgri Intelligence के बारे में",
  "about.subtitle":
    "हम कृषि विज्ञान और एआई को हर किसान की जेब तक पहुँचाते हैं।",
  "about.mission": "हमारा मिशन",
  "about.missionText":
    "हर छोटे किसान को बड़े व्यापारी जैसी बाजार जानकारी उसकी अपनी भाषा में उपलब्ध कराना।",
  "about.vision": "हमारा विज़न",
  "about.visionText":
    "ऐसा निष्पक्ष बाजार जहाँ किसान को मिलने वाली कीमत उसकी फसल की गुणवत्ता से तय हो।",
  "about.team": "हमारी टीम",

  "contact.title": "संपर्क और सहायता",
  "contact.subtitle":
    "हम सप्ताह के सातों दिन आपकी भाषा में जवाब देते हैं।",
  "contact.name": "आपका नाम",
  "contact.email": "ईमेल पता",
  "contact.message": "संदेश",
  "contact.send": "संदेश भेजें",
  "contact.sent":
    "धन्यवाद! हमारी सहायता टीम जल्द ही आपको कॉल करेगी।",
  "contact.faq": "अक्सर पूछे जाने वाले प्रश्न",
  "contact.support": "सहायता",

  "footer.quick": "त्वरित लिंक",
  "footer.emergency": "आपातकालीन कृषि सहायता",
  "footer.gov": "सरकारी लिंक",
  "footer.social": "हमें फॉलो करें",
  "footer.rights": "सर्वाधिकार सुरक्षित।",
  "footer.about":
    "भारतीय किसानों के लिए एआई फसल ग्रेडिंग, मंडी खोज और मूल्य पूर्वानुमान।",

  "common.viewAll": "सभी देखें",
  "common.back": "होम पर वापस जाएँ",
};

/* =========================================================
   KANNADA
========================================================= */

const kn: Dict = {
  "brand.tagline": "ಪ್ರತಿ ಹೊಲಕ್ಕೂ ಎಐ",

  "nav.home": "ಮುಖಪುಟ",
  "nav.grading": "ಎಐ ಬೆಳೆ ಗ್ರೇಡಿಂಗ್",
  "nav.mandi": "ಹತ್ತಿರದ ಮಂಡಿ",
  "nav.price": "ಬೆಲೆ ಮುನ್ಸೂಚನೆ",
  "nav.weather": "ಹವಾಮಾನ",
  "nav.dashboard": "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
  "nav.about": "ನಮ್ಮ ಬಗ್ಗೆ",
  "nav.contact": "ಸಂಪರ್ಕ",
  "nav.login": "ಲಾಗಿನ್",
  "nav.language": "ಭಾಷೆ",
  "nav.menu": "ಮೆನು",
  "nav.theme": "ಥೀಮ್ ಬದಲಿಸಿ",
  "nav.alerts": "ಹವಾಮಾನ ಎಚ್ಚರಿಕೆಗಳು",
  "nav.alerts.empty": "ಈಗ ಯಾವುದೇ ಹವಾಮಾನ ಎಚ್ಚರಿಕೆ ಇಲ್ಲ",
  "nav.alerts.viewWeather": "ಪೂರ್ಣ ಮುನ್ಸೂಚನೆ ನೋಡಿ",

  "hero.badge": "ಎಐ ಆಧಾರಿತ ಕೃಷಿ ವೇದಿಕೆ",
  "hero.title": "ಕೃತಕ ಬುದ್ಧಿಮತ್ತೆಯಿಂದ ಸ್ಮಾರ್ಟ್ ಕೃಷಿ",
  "hero.subtitle":
    "ನಿಮ್ಮ ಬೆಳೆಯ ಫೋಟೋ ತೆಗೆಯಿರಿ; ಎಐ ಕ್ಷಣಾರ್ಧದಲ್ಲಿ ಗುಣಮಟ್ಟ ಅಳೆದು ಉತ್ತಮ ಮಂಡಿ, ಬೆಲೆ ಮತ್ತು ಮಾರಾಟದ ದಿನವನ್ನು ಸೂಚಿಸುತ್ತದೆ.",
  "hero.cta1": "ಬೆಳೆ ವಿಶ್ಲೇಷಣೆ ಪ್ರಾರಂಭಿಸಿ",
  "hero.cta2": "ವೈಶಿಷ್ಟ್ಯಗಳನ್ನು ನೋಡಿ",
  "hero.stat1": "ಗ್ರೇಡಿಂಗ್ ನಿಖರತೆ",
  "hero.stat2": "ಮಂಡಿಗಳು",
  "hero.stat3": "ರೈತರು",

  "features.title": "ರೈತನಿಗೆ ಬೇಕಾದ ಎಲ್ಲವೂ ಒಂದೇ ಆಪ್‌ನಲ್ಲಿ",
  "features.subtitle": "ಸರಳ ಸಾಧನಗಳು, ದೊಡ್ಡ ನಿರ್ಧಾರಗಳು.",

  "features.grading.title": "ಎಐ ಬೆಳೆ ಗ್ರೇಡಿಂಗ್",
  "features.grading.desc":
    "ಫೋಟೋ ತೆಗೆದು ತಕ್ಷಣ ಗ್ರೇಡ್, ತಾಜಾತನ ಮತ್ತು ಗುಣಮಟ್ಟ ಪಡೆಯಿರಿ.",

  "features.mandi.title": "ಮಂಡಿ ಹುಡುಕಿ",
  "features.mandi.desc":
    "ಲೈವ್ ಬೆಲೆ, ದೂರ ಮತ್ತು ಪ್ರಯಾಣ ಸಮಯದೊಂದಿಗೆ ಹತ್ತಿರದ ಮಾರುಕಟ್ಟೆಗಳು.",

  "features.price.title": "ಬೆಲೆ ಮುನ್ಸೂಚನೆ",
  "features.price.desc":
    "ಮಾರಾಟಕ್ಕೂ ಮೊದಲು ನಾಳೆ, ವಾರ ಮತ್ತು ತಿಂಗಳ ಬೆಲೆ ತಿಳಿಯಿರಿ.",

  "features.weather.title": "ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ",
  "features.weather.desc":
    "ಮಳೆ, ತೇವಾಂಶ ಮತ್ತು ಗಾಳಿ ಎಚ್ಚರಿಕೆಗಳು.",

  "features.sell.title": "ಮಾರಾಟ ಶಿಫಾರಸು",
  "features.sell.desc":
    "ಗರಿಷ್ಠ ಲಾಭಕ್ಕಾಗಿ ಸರಿಯಾದ ದಿನ ಮತ್ತು ಮಂಡಿ.",

  "features.analytics.title": "ಅನಾಲಿಟಿಕ್ಸ್ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
  "features.analytics.desc":
    "ಪ್ರತಿ ವಿಶ್ಲೇಷಣೆ ಮತ್ತು ಬೆಲೆ ಇತಿಹಾಸ ಟ್ರ್ಯಾಕ್ ಮಾಡಿ.",

  "features.learnMore": "ಇನ್ನಷ್ಟು",

  "grading.title": "ಎಐ ಬೆಳೆ ಗ್ರೇಡಿಂಗ್",
  "grading.subtitle":
    "ನಿಮ್ಮ ಬೆಳೆಯ ಸ್ಪಷ್ಟ ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ ಮತ್ತು ತಕ್ಷಣ ಗುಣಮಟ್ಟದ ವರದಿ ಪಡೆಯಿರಿ.",
  "grading.capture": "ಫೋಟೋ ತೆಗೆಯಿರಿ",
  "grading.gallery": "ಗ್ಯಾಲರಿಯಿಂದ ಅಪ್‌ಲೋಡ್",
  "grading.hint":
    "JPG ಅಥವಾ PNG, ಉತ್ತಮ ಬೆಳಕು ಮತ್ತು ಬೆಳೆಯನ್ನು ಫ್ರೇಮ್‌ನಲ್ಲಿ ತುಂಬಿಸಿ.",

  "grading.analyzing": "ನಿಮ್ಮ ಬೆಳೆ ವಿಶ್ಲೇಷಣೆಯಾಗುತ್ತಿದೆ…",
  "grading.analyzingSub":
    "ಬಣ್ಣ, ವಿನ್ಯಾಸ, ಗಾತ್ರ ಮತ್ತು ದೋಷಗಳನ್ನು ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ",

  "grading.retake": "ಇನ್ನೊಂದು ಫೋಟೋ",
  "grading.result": "ವಿಶ್ಲೇಷಣಾ ಫಲಿತಾಂಶ",
  "grading.crop": "ಬೆಳೆ",
  "grading.grade": "ಗ್ರೇಡ್",
  "grading.confidence": "ವಿಶ್ವಾಸ",
  "grading.freshness": "ತಾಜಾತನ ಸ್ಕೋರ್",
  "grading.quality": "ಗುಣಮಟ್ಟ ಸ್ಕೋರ್",
  "grading.price": "ಸೂಚಿತ ಮಾರುಕಟ್ಟೆ ಬೆಲೆ",
  "grading.recommendation": "ಶಿಫಾರಸು",

  "grading.gradeA": "ಗ್ರೇಡ್ A",
  "grading.gradeB": "ಗ್ರೇಡ್ B",
  "grading.gradeC": "ಗ್ರೇಡ್ C",

  "grading.bestMarket": "ಅತ್ಯುತ್ತಮ ಮಾರುಕಟ್ಟೆ",
  "grading.quintal": "/ ಕ್ವಿಂಟಲ್",
  "grading.distance": "ದೂರ",
  "grading.away": "ದೂರದಲ್ಲಿದೆ",

  "grading.excellent":
    "ಅತ್ಯುತ್ತಮ ಗುಣಮಟ್ಟದ ಬೆಳೆ. ಪ್ರೀಮಿಯಂ ತಾಜಾ ಉತ್ಪನ್ನವಾಗಿ ಮಾರಾಟಕ್ಕೆ ಸೂಕ್ತವಾಗಿದೆ.",

  "grading.good":
    "ಉತ್ತಮ ಗುಣಮಟ್ಟದ ಬೆಳೆ. ತಾಜಾ ಉತ್ಪನ್ನವಾಗಿ ಮಾರಾಟಕ್ಕೆ ಸೂಕ್ತವಾಗಿದೆ.",

  "grading.average":
    "ಸರಾಸರಿ ಗುಣಮಟ್ಟದ ಬೆಳೆ. ಉತ್ತಮ ಬೆಲೆಗಾಗಿ ಶೀಘ್ರದಲ್ಲೇ ಮಾರಾಟ ಮಾಡುವುದನ್ನು ಪರಿಗಣಿಸಿ.",

  "grading.sample":
    "ಸ್ಯಾಂಪಲ್ ಟೊಮೆಟೊ ಫೋಟೋದೊಂದಿಗೆ ಪ್ರಯತ್ನಿಸಿ",

  "grading.qualityReport":
    "ನಿಮ್ಮ ಗುಣಮಟ್ಟದ ವರದಿ — ಗ್ರೇಡ್, ತಾಜಾತನ, ಬೆಲೆ ಮತ್ತು ಮಾರಾಟ ಸಲಹೆ — ಇಲ್ಲಿ ಕಾಣಿಸುತ್ತದೆ.",

  "mandi.title": "ಹತ್ತಿರದ ಮಂಡಿ",
  "mandi.subtitle":
    "ನಿಮ್ಮ ಸುತ್ತಮುತ್ತಲಿನ ಲೈವ್ ಮಾರುಕಟ್ಟೆ ಬೆಲೆ, ದೂರ ಮತ್ತು ರೇಟಿಂಗ್.",
  "mandi.distance": "ದೂರ",
  "mandi.price": "ಪ್ರಸ್ತುತ ಬೆಲೆ",
  "mandi.rating": "ಮಾರುಕಟ್ಟೆ ರೇಟಿಂಗ್",
  "mandi.travel": "ಪ್ರಯಾಣ ಸಮಯ",
  "mandi.directions": "ದಾರಿ ತೋರಿಸಿ",
  "mandi.map": "ಲೈವ್ ಮಾರುಕಟ್ಟೆ ನಕ್ಷೆ",

  "price.title": "ಬೆಲೆ ಮುನ್ಸೂಚನೆ",
  "price.subtitle":
    "ಮಂಡಿ ಆಗಮನ, ಹವಾಮಾನ ಮತ್ತು ಬೇಡಿಕೆಯ ಆಧಾರದ ಮೇಲೆ ಎಐ ಮುನ್ಸೂಚನೆ.",
  "price.today": "ಇಂದಿನ ಬೆಲೆ",
  "price.tomorrow": "ನಾಳೆಯ ಅಂದಾಜು",
  "price.week": "7-ದಿನಗಳ ಅಂದಾಜು",
  "price.month": "30-ದಿನಗಳ ಪ್ರವೃತ್ತಿ",
  "price.best": "ಮಾರಾಟಕ್ಕೆ ಉತ್ತಮ ದಿನ",

  "weather.title": "ಹವಾಮಾನ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
  "weather.subtitle":
    "ಮುಂದಿನ ಏಳು ದಿನಗಳ ಹೊಲದ ಹವಾಮಾನ ಮತ್ತು ಎಚ್ಚರಿಕೆಗಳು.",
  "weather.temp": "ತಾಪಮಾನ",
  "weather.humidity": "ತೇವಾಂಶ",
  "weather.rain": "ಮಳೆ ಸಾಧ್ಯತೆ",
  "weather.wind": "ಗಾಳಿಯ ವೇಗ",
  "weather.alerts": "ಹವಾಮಾನ ಎಚ್ಚರಿಕೆ",
  "weather.forecast": "7-ದಿನಗಳ ಮುನ್ಸೂಚನೆ",

  "dash.title": "ರೈತ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
  "dash.subtitle":
    "ನಿಮ್ಮ ವಿಶ್ಲೇಷಣೆ, ಮಾರುಕಟ್ಟೆ ಮತ್ತು ಆದಾಯವನ್ನು ಒಂದೇ ನೋಟದಲ್ಲಿ ನೋಡಿ.",
  "dash.recent": "ಇತ್ತೀಚಿನ ವಿಶ್ಲೇಷಣೆಗಳು",
  "dash.uploads": "ಅಪ್‌ಲೋಡ್ ಮಾಡಿದ ಚಿತ್ರಗಳು",
  "dash.history": "ಮುನ್ಸೂಚನೆ ಇತಿಹಾಸ",
  "dash.favorites": "ಮೆಚ್ಚಿನ ಮಂಡಿಗಳು",
  "dash.notifications": "ಅಧಿಸೂಚನೆಗಳು",
  "dash.profile": "ಪ್ರೊಫೈಲ್",

  "auth.login": "ಲಾಗಿನ್",
  "auth.signup": "ಸೈನ್ ಅಪ್",
  "auth.welcome": "ಮತ್ತೆ ಸ್ವಾಗತ",
  "auth.create": "ಖಾತೆ ರಚಿಸಿ",
  "auth.phone": "ಮೊಬೈಲ್ ಸಂಖ್ಯೆ",
  "auth.email": "ಇಮೇಲ್",
  "auth.name": "ಪೂರ್ಣ ಹೆಸರು",
  "auth.password": "ಪಾಸ್‌ವರ್ಡ್",
  "auth.google": "Google ಮೂಲಕ ಮುಂದುವರಿಯಿರಿ",
  "auth.or": "ಅಥವಾ",
  "auth.otp": "ಒಟಿಪಿ ಕಳುಹಿಸಿ",
  "auth.continue": "ಮುಂದುವರಿಸಿ",
  "auth.confirmPassword": "ಪಾಸ್‌ವರ್ಡ್ ದೃಢೀಕರಿಸಿ",
  "auth.register": "ನೋಂದಣಿ ಮಾಡಿ",
  "auth.noAccount": "ಹೊಸದಾಗಿ ಬಂದಿದ್ದೀರಾ?",
  "auth.haveAccount": "ಈಗಾಗಲೇ ಖಾತೆ ಇದೆಯೇ?",
  "auth.showPassword": "ಪಾಸ್‌ವರ್ಡ್ ತೋರಿಸಿ",
  "auth.hidePassword": "ಪಾಸ್‌ವರ್ಡ್ ಮರೆಮಾಡಿ",

  "about.title": "EcoAgri Intelligence ಬಗ್ಗೆ",
  "about.subtitle":
    "ಕೃಷಿ ವಿಜ್ಞಾನ ಮತ್ತು ಎಐ ಅನ್ನು ಪ್ರತಿಯೊಬ್ಬ ರೈತನ ಕೈಗೆ ತಲುಪಿಸುವುದು ನಮ್ಮ ಗುರಿ.",
  "about.mission": "ನಮ್ಮ ಧ್ಯೇಯ",
  "about.missionText":
    "ಪ್ರತಿ ಸಣ್ಣ ರೈತನಿಗೂ ದೊಡ್ಡ ವ್ಯಾಪಾರಿಯಂತೆಯೇ ಮಾರುಕಟ್ಟೆ ಮಾಹಿತಿಯನ್ನು ಅವರ ಸ್ವಂತ ಭಾಷೆಯಲ್ಲಿ ನೀಡುವುದು.",
  "about.vision": "ನಮ್ಮ ದೃಷ್ಟಿ",
  "about.visionText":
    "ರೈತನಿಗೆ ಸಿಗುವ ಬೆಲೆ ಮಾತುಕತೆ ಶಕ್ತಿಯಿಂದಲ್ಲ, ಬೆಳೆಯ ಗುಣಮಟ್ಟದಿಂದ ನಿರ್ಧರಿಸುವ ನ್ಯಾಯಯುತ ಮಾರುಕಟ್ಟೆ.",
  "about.team": "ನಮ್ಮ ತಂಡ",

  "contact.title": "ಸಂಪರ್ಕ ಮತ್ತು ಬೆಂಬಲ",
  "contact.subtitle":
    "ವಾರದ ಏಳು ದಿನವೂ ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿ ನಾವು ಉತ್ತರಿಸುತ್ತೇವೆ.",
  "contact.name": "ನಿಮ್ಮ ಹೆಸರು",
  "contact.email": "ಇಮೇಲ್ ವಿಳಾಸ",
  "contact.message": "ಸಂದೇಶ",
  "contact.send": "ಸಂದೇಶ ಕಳುಹಿಸಿ",
  "contact.sent":
    "ಧನ್ಯವಾದಗಳು! ನಮ್ಮ ಬೆಂಬಲ ತಂಡವು ಶೀಘ್ರದಲ್ಲೇ ನಿಮಗೆ ಕರೆ ಮಾಡುತ್ತದೆ.",
  "contact.faq": "ಪದೇ ಪದೇ ಕೇಳುವ ಪ್ರಶ್ನೆಗಳು",
  "contact.support": "ಬೆಂಬಲ",

  "footer.quick": "ತ್ವರಿತ ಲಿಂಕ್‌ಗಳು",
  "footer.emergency": "ತುರ್ತು ಕೃಷಿ ಸಹಾಯ",
  "footer.gov": "ಸರ್ಕಾರಿ ಲಿಂಕ್‌ಗಳು",
  "footer.social": "ನಮ್ಮನ್ನು ಅನುಸರಿಸಿ",
  "footer.rights": "ಎಲ್ಲ ಹಕ್ಕುಗಳು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.",
  "footer.about":
    "ಭಾರತೀಯ ರೈತರಿಗಾಗಿ ಎಐ ಬೆಳೆ ಗ್ರೇಡಿಂಗ್, ಮಂಡಿ ಹುಡುಕಾಟ ಮತ್ತು ಬೆಲೆ ಮುನ್ಸೂಚನೆ.",

  "common.viewAll": "ಎಲ್ಲವನ್ನೂ ನೋಡಿ",
  "common.back": "ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ",
};

/* =========================================================
   TAMIL
========================================================= */

const ta: Dict = {
  "brand.tagline": "ஒவ்வொரு பண்ணைக்கும் AI",

  "nav.home": "முகப்பு",
  "nav.grading": "AI பயிர் தரப்படுத்தல்",
  "nav.mandi": "அருகிலுள்ள மண்டி",
  "nav.price": "விலை முன்னறிவிப்பு",
  "nav.weather": "வானிலை",
  "nav.dashboard": "டாஷ்போர்டு",
  "nav.about": "எங்களை பற்றி",
  "nav.contact": "தொடர்பு",
  "nav.login": "உள்நுழை",
  "nav.language": "மொழி",
  "nav.menu": "பட்டி",
  "nav.theme": "தீம் மாற்று",
  "nav.alerts": "வானிலை எச்சரிக்கைகள்",
  "nav.alerts.empty": "இப்போது எந்த வானிலை எச்சரிக்கையும் இல்லை",
  "nav.alerts.viewWeather": "முழு முன்னறிவிப்பைப் பார்க்கவும்",

  "hero.badge": "AI அடிப்படையிலான விவசாய தளம்",
  "hero.title": "செயற்கை நுண்ணறிவால் ஸ்மார்ட் விவசாயம்",
  "hero.subtitle":
    "உங்கள் விளைபொருளை புகைப்படம் எடுங்கள்; AI சில வினாடிகளில் தரத்தை மதிப்பிட்டு சிறந்த மண்டி, விலை மற்றும் விற்பனை நாளை பரிந்துரைக்கும்.",
  "hero.cta1": "பயிர் பகுப்பாய்வைத் தொடங்கு",
  "hero.cta2": "அம்சங்களைப் பார்",
  "hero.stat1": "தரப்படுத்தல் துல்லியம்",
  "hero.stat2": "மண்டிகள்",
  "hero.stat3": "விவசாயிகள்",

  "features.title": "விவசாயிக்கு தேவையான அனைத்தும் ஒரே செயலியில்",
  "features.subtitle": "எளிய கருவிகள், பெரிய முடிவுகள்.",

  "features.grading.title": "AI பயிர் தரப்படுத்தல்",
  "features.grading.desc":
    "புகைப்படம் எடுத்து உடனே தரம், புத்துணர்வு மற்றும் தர மதிப்பெண் பெறுங்கள்.",

  "features.mandi.title": "மண்டி தேடல்",
  "features.mandi.desc":
    "நேரடி விலை, தூரம் மற்றும் பயண நேரத்துடன் அருகிலுள்ள சந்தைகள்.",

  "features.price.title": "விலை முன்னறிவிப்பு",
  "features.price.desc":
    "விற்பதற்கு முன் நாளை, வாரம், மாத விலையை அறியுங்கள்.",

  "features.weather.title": "வானிலை முன்னறிவிப்பு",
  "features.weather.desc":
    "மழை, ஈரப்பதம் மற்றும் காற்று எச்சரிக்கைகள்.",

  "features.sell.title": "விற்பனை பரிந்துரை",
  "features.sell.desc":
    "அதிக லாபத்திற்கான சிறந்த நாள் மற்றும் சந்தை.",

  "features.analytics.title": "பகுப்பாய்வு டாஷ்போர்டு",
  "features.analytics.desc":
    "ஒவ்வொரு பகுப்பாய்வையும் விலை வரலாற்றையும் கண்காணிக்கவும்.",

  "features.learnMore": "மேலும் அறிக",

  "grading.title": "AI பயிர் தரப்படுத்தல்",
  "grading.subtitle":
    "உங்கள் விளைபொருளின் தெளிவான புகைப்படத்தைப் பதிவேற்றி உடனடி தர அறிக்கையைப் பெறுங்கள்.",
  "grading.capture": "புகைப்படம் எடு",
  "grading.gallery": "கேலரியிலிருந்து பதிவேற்று",
  "grading.hint":
    "JPG அல்லது PNG, நல்ல வெளிச்சம் மற்றும் பயிர் முழு ஃப்ரேமிலும் இருக்க வேண்டும்.",

  "grading.analyzing": "உங்கள் பயிர் பகுப்பாய்வு செய்யப்படுகிறது…",
  "grading.analyzingSub":
    "நிறம், அமைப்பு, அளவு மற்றும் குறைபாடுகள் சரிபார்க்கப்படுகின்றன",

  "grading.retake": "மற்றொரு படம்",
  "grading.result": "பகுப்பாய்வு முடிவு",
  "grading.crop": "பயிர்",
  "grading.grade": "தரம்",
  "grading.confidence": "நம்பகத்தன்மை",
  "grading.freshness": "புத்துணர்வு மதிப்பெண்",
  "grading.quality": "தர மதிப்பெண்",
  "grading.price": "பரிந்துரைக்கப்பட்ட சந்தை விலை",
  "grading.recommendation": "பரிந்துரை",

  "grading.gradeA": "தரம் A",
  "grading.gradeB": "தரம் B",
  "grading.gradeC": "தரம் C",

  "grading.bestMarket": "சிறந்த சந்தை",
  "grading.quintal": "/ குவிண்டால்",
  "grading.distance": "தூரம்",
  "grading.away": "தொலைவில்",

  "grading.excellent":
    "மிகச்சிறந்த தரமான விளைபொருள். பிரீமியம் புதிய விளைபொருளாக விற்பனை செய்ய ஏற்றது.",

  "grading.good":
    "நல்ல தரமான விளைபொருள். புதிய விளைபொருளாக விற்பனை செய்ய ஏற்றது.",

  "grading.average":
    "சராசரி தரமான விளைபொருள். சிறந்த விலைக்காக விரைவில் விற்பனை செய்ய பரிசீலிக்கவும்.",

  "grading.sample":
    "மாதிரி தக்காளி புகைப்படத்துடன் முயற்சிக்கவும்",

  "grading.qualityReport":
    "உங்கள் தர அறிக்கை — தரம், புத்துணர்வு, விலை மற்றும் விற்பனை ஆலோசனை — இங்கே தோன்றும்.",

  "mandi.title": "அருகிலுள்ள மண்டி",
  "mandi.subtitle":
    "உங்களைச் சுற்றியுள்ள நேரடி சந்தை விலைகள், தூரம் மற்றும் மதிப்பீடுகள்.",
  "mandi.distance": "தூரம்",
  "mandi.price": "தற்போதைய விலை",
  "mandi.rating": "சந்தை மதிப்பீடு",
  "mandi.travel": "பயண நேரம்",
  "mandi.directions": "வழி காட்டு",
  "mandi.map": "நேரடி சந்தை வரைபடம்",

  "price.title": "விலை முன்னறிவிப்பு",
  "price.subtitle":
    "மண்டி வரத்து, வானிலை மற்றும் தேவையின் அடிப்படையில் AI முன்னறிவிப்பு.",
  "price.today": "இன்றைய விலை",
  "price.tomorrow": "நாளைய கணிப்பு",
  "price.week": "7-நாள் கணிப்பு",
  "price.month": "30-நாள் போக்கு",
  "price.best": "விற்க சிறந்த நாள்",

  "weather.title": "வானிலை டாஷ்போர்டு",
  "weather.subtitle":
    "அடுத்த ஏழு நாட்களுக்கான வயல் வானிலை மற்றும் எச்சரிக்கைகள்.",
  "weather.temp": "வெப்பநிலை",
  "weather.humidity": "ஈரப்பதம்",
  "weather.rain": "மழை வாய்ப்பு",
  "weather.wind": "காற்றின் வேகம்",
  "weather.alerts": "வானிலை எச்சரிக்கைகள்",
  "weather.forecast": "7-நாள் முன்னறிவிப்பு",

  "dash.title": "விவசாயி டாஷ்போர்டு",
  "dash.subtitle":
    "உங்கள் பகுப்பாய்வுகள், சந்தைகள் மற்றும் வருமானத்தை ஒரே பார்வையில் காணுங்கள்.",
  "dash.recent": "சமீபத்திய பகுப்பாய்வுகள்",
  "dash.uploads": "பதிவேற்றிய படங்கள்",
  "dash.history": "கணிப்பு வரலாறு",
  "dash.favorites": "பிடித்த சந்தைகள்",
  "dash.notifications": "அறிவிப்புகள்",
  "dash.profile": "சுயவிவரம்",

  "auth.login": "உள்நுழை",
  "auth.signup": "பதிவு செய்",
  "auth.welcome": "மீண்டும் வரவேற்கிறோம்",
  "auth.create": "கணக்கை உருவாக்கு",
  "auth.phone": "கைபேசி எண்",
  "auth.email": "மின்னஞ்சல்",
  "auth.name": "முழு பெயர்",
  "auth.password": "கடவுச்சொல்",
  "auth.google": "Google மூலம் தொடரவும்",
  "auth.or": "அல்லது",
  "auth.otp": "OTP அனுப்பு",
  "auth.continue": "தொடரவும்",
  "auth.confirmPassword": "கடவுச்சொல்லை உறுதிப்படுத்தவும்",
  "auth.register": "பதிவு செய்யவும்",
  "auth.noAccount": "புதியவரா?",
  "auth.haveAccount": "ஏற்கனவே கணக்கு உள்ளதா?",
  "auth.showPassword": "கடவுச்சொல்லைக் காட்டு",
  "auth.hidePassword": "கடவுச்சொல்லை மறை",

  "about.title": "EcoAgri Intelligence பற்றி",
  "about.subtitle":
    "விவசாய அறிவியலையும் AI-யையும் ஒவ்வொரு விவசாயியின் கைகளிலும் கொண்டு வருகிறோம்.",
  "about.mission": "எங்கள் நோக்கம்",
  "about.missionText":
    "பெரிய வணிகரிடம் உள்ள சந்தைத் தகவலை ஒவ்வொரு சிறு விவசாயிக்கும் அவர்களின் சொந்த மொழியில் வழங்குவது.",
  "about.vision": "எங்கள் பார்வை",
  "about.visionText":
    "பேரம் பேசும் சக்தியால் அல்ல, பயிரின் தரத்தால் விவசாயிக்கு கிடைக்கும் விலை தீர்மானிக்கப்படும் நியாயமான சந்தை.",
  "about.team": "எங்கள் குழு",

  "contact.title": "தொடர்பு மற்றும் ஆதரவு",
  "contact.subtitle":
    "வாரத்தின் ஏழு நாட்களும் உங்கள் மொழியில் பதிலளிக்கிறோம்.",
  "contact.name": "உங்கள் பெயர்",
  "contact.email": "மின்னஞ்சல் முகவரி",
  "contact.message": "செய்தி",
  "contact.send": "செய்தி அனுப்பு",
  "contact.sent":
    "நன்றி! எங்கள் ஆதரவு குழு விரைவில் உங்களை அழைக்கும்.",
  "contact.faq": "அடிக்கடி கேட்கப்படும் கேள்விகள்",
  "contact.support": "ஆதரவு",

  "footer.quick": "விரைவு இணைப்புகள்",
  "footer.emergency": "அவசர விவசாய உதவி",
  "footer.gov": "அரசு இணைப்புகள்",
  "footer.social": "எங்களைப் பின்தொடரவும்",
  "footer.rights": "அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",
  "footer.about":
    "இந்திய விவசாயிகளுக்கான AI பயிர் தரப்படுத்தல், மண்டி தேடல் மற்றும் விலை முன்னறிவிப்பு.",

  "common.viewAll": "அனைத்தையும் காண்க",
  "common.back": "முகப்புக்குத் திரும்பு",
};

/* =========================================================
   TELUGU
========================================================= */

const te: Dict = {
  "brand.tagline": "ప్రతి పొలానికి AI",

  "nav.home": "హోమ్",
  "nav.grading": "AI పంట గ్రేడింగ్",
  "nav.mandi": "సమీప మండి",
  "nav.price": "ధర అంచనా",
  "nav.weather": "వాతావరణం",
  "nav.dashboard": "డాష్‌బోర్డ్",
  "nav.about": "మా గురించి",
  "nav.contact": "సంప్రదించండి",
  "nav.login": "లాగిన్",
  "nav.language": "భాష",
  "nav.menu": "మెనూ",
  "nav.theme": "థీమ్ మార్చండి",
  "nav.alerts": "వాతావరణ హెచ్చరికలు",
  "nav.alerts.empty": "ప్రస్తుతం ఎలాంటి వాతావరణ హెచ్చరికలు లేవు",
  "nav.alerts.viewWeather": "పూర్తి సూచనను చూడండి",

  "hero.badge": "AI ఆధారిత వ్యవసాయ వేదిక",
  "hero.title": "కృత్రిమ మేధతో స్మార్ట్ వ్యవసాయం",
  "hero.subtitle":
    "మీ పంట ఫోటో తీయండి; AI క్షణాల్లో నాణ్యతను అంచనా వేసి ఉత్తమ మండి, ధర మరియు అమ్మకపు రోజును సూచిస్తుంది.",
  "hero.cta1": "పంట విశ్లేషణ ప్రారంభించండి",
  "hero.cta2": "ఫీచర్లు చూడండి",
  "hero.stat1": "గ్రేడింగ్ ఖచ్చితత్వం",
  "hero.stat2": "మండీలు",
  "hero.stat3": "రైతులు",

  "features.title": "రైతుకు కావాల్సినవన్నీ ఒకే యాప్‌లో",
  "features.subtitle": "సరళమైన సాధనాలు, పెద్ద నిర్ణయాలు.",

  "features.grading.title": "AI పంట గ్రేడింగ్",
  "features.grading.desc":
    "ఫోటో తీసి వెంటనే గ్రేడ్, తాజాదనం మరియు నాణ్యత స్కోర్ పొందండి.",

  "features.mandi.title": "మండి వెతకండి",
  "features.mandi.desc":
    "ప్రత్యక్ష ధరలు, దూరం మరియు ప్రయాణ సమయంతో సమీప మార్కెట్లు.",

  "features.price.title": "ధర అంచనా",
  "features.price.desc":
    "అమ్మే ముందు రేపు, వారం, నెల ధరలు తెలుసుకోండి.",

  "features.weather.title": "వాతావరణ సూచన",
  "features.weather.desc":
    "వర్షం, తేమ మరియు గాలి హెచ్చరికలు.",

  "features.sell.title": "అమ్మకపు సిఫార్సు",
  "features.sell.desc":
    "గరిష్ఠ లాభానికి సరైన రోజు మరియు మార్కెట్.",

  "features.analytics.title": "అనలిటిక్స్ డాష్‌బోర్డ్",
  "features.analytics.desc":
    "ప్రతి విశ్లేషణ, ధర చరిత్రను ట్రాక్ చేయండి.",

  "features.learnMore": "మరింత తెలుసుకోండి",

  "grading.title": "AI పంట గ్రేడింగ్",
  "grading.subtitle":
    "మీ పంట యొక్క స్పష్టమైన ఫోటోను అప్‌లోడ్ చేసి వెంటనే నాణ్యత నివేదిక పొందండి.",
  "grading.capture": "ఫోటో తీయండి",
  "grading.gallery": "గ్యాలరీ నుండి అప్‌లోడ్",
  "grading.hint":
    "JPG లేదా PNG, మంచి వెలుతురు మరియు పంట మొత్తం ఫ్రేమ్‌లో ఉండాలి.",

  "grading.analyzing": "మీ పంట విశ్లేషణ జరుగుతోంది…",
  "grading.analyzingSub":
    "రంగు, ఆకృతి, పరిమాణం మరియు లోపాలను తనిఖీ చేస్తున్నాము",

  "grading.retake": "మరో ఫోటో",
  "grading.result": "విశ్లేషణ ఫలితం",
  "grading.crop": "పంట",
  "grading.grade": "గ్రేడ్",
  "grading.confidence": "విశ్వాసం",
  "grading.freshness": "తాజాదనం స్కోర్",
  "grading.quality": "నాణ్యత స్కోర్",
  "grading.price": "సూచించిన మార్కెట్ ధర",
  "grading.recommendation": "సిఫార్సు",

  "grading.gradeA": "గ్రేడ్ A",
  "grading.gradeB": "గ్రేడ్ B",
  "grading.gradeC": "గ్రేడ్ C",

  "grading.bestMarket": "ఉత్తమ మార్కెట్",
  "grading.quintal": "/ క్వింటాల్",
  "grading.distance": "దూరం",
  "grading.away": "దూరంలో",

  "grading.excellent":
    "అద్భుతమైన నాణ్యత కలిగిన పంట. ప్రీమియం తాజా ఉత్పత్తిగా అమ్మడానికి అనుకూలం.",

  "grading.good":
    "మంచి నాణ్యత కలిగిన పంట. తాజా ఉత్పత్తిగా అమ్మడానికి అనుకూలం.",

  "grading.average":
    "సగటు నాణ్యత కలిగిన పంట. మంచి ధర కోసం త్వరగా అమ్మడం మంచిది.",

  "grading.sample":
    "నమూనా టమోటా ఫోటోతో ప్రయత్నించండి",

  "grading.qualityReport":
    "మీ నాణ్యత నివేదిక — గ్రేడ్, తాజాదనం, ధర మరియు అమ్మకపు సలహా — ఇక్కడ కనిపిస్తుంది.",

  "mandi.title": "సమీప మండి",
  "mandi.subtitle":
    "మీ చుట్టూ ఉన్న ప్రత్యక్ష మార్కెట్ ధరలు, దూరం మరియు రేటింగ్‌లు.",
  "mandi.distance": "దూరం",
  "mandi.price": "ప్రస్తుత ధర",
  "mandi.rating": "మార్కెట్ రేటింగ్",
  "mandi.travel": "ప్రయాణ సమయం",
  "mandi.directions": "మార్గం చూడండి",
  "mandi.map": "లైవ్ మార్కెట్ మ్యాప్",

  "price.title": "ధర అంచనా",
  "price.subtitle":
    "మండి రాకపోకలు, వాతావరణం మరియు డిమాండ్ ఆధారంగా AI అంచనాలు.",
  "price.today": "నేటి ధర",
  "price.tomorrow": "రేపటి అంచనా",
  "price.week": "7-రోజుల అంచనా",
  "price.month": "30-రోజుల ధోరణి",
  "price.best": "అమ్మడానికి ఉత్తమ రోజు",

  "weather.title": "వాతావరణ డాష్‌బోర్డ్",
  "weather.subtitle":
    "తదుపరి ఏడు రోజుల పొల వాతావరణం మరియు హెచ్చరికలు.",
  "weather.temp": "ఉష్ణోగ్రత",
  "weather.humidity": "తేమ",
  "weather.rain": "వర్ష సంభావ్యత",
  "weather.wind": "గాలి వేగం",
  "weather.alerts": "వాతావరణ హెచ్చరికలు",
  "weather.forecast": "7-రోజుల సూచన",

  "dash.title": "రైతు డాష్‌బోర్డ్",
  "dash.subtitle":
    "మీ విశ్లేషణలు, మార్కెట్లు మరియు ఆదాయాన్ని ఒకే చూపులో చూడండి.",
  "dash.recent": "ఇటీవలి విశ్లేషణలు",
  "dash.uploads": "అప్‌లోడ్ చేసిన చిత్రాలు",
  "dash.history": "అంచనా చరిత్ర",
  "dash.favorites": "ఇష్టమైన మార్కెట్లు",
  "dash.notifications": "నోటిఫికేషన్లు",
  "dash.profile": "ప్రొఫైల్",

  "auth.login": "లాగిన్",
  "auth.signup": "సైన్ అప్",
  "auth.welcome": "మళ్లీ స్వాగతం",
  "auth.create": "ఖాతా సృష్టించండి",
  "auth.phone": "మొబైల్ నంబర్",
  "auth.email": "ఇమెయిల్",
  "auth.name": "పూర్తి పేరు",
  "auth.password": "పాస్‌వర్డ్",
  "auth.google": "Googleతో కొనసాగించండి",
  "auth.or": "లేదా",
  "auth.otp": "OTP పంపండి",
  "auth.continue": "కొనసాగించండి",
  "auth.confirmPassword": "పాస్‌వర్డ్ నిర్ధారించండి",
  "auth.register": "నమోదు చేయండి",
  "auth.noAccount": "కొత్తవారా?",
  "auth.haveAccount": "ఇప్పటికే ఖాతా ఉందా?",
  "auth.showPassword": "పాస్‌వర్డ్ చూపించు",
  "auth.hidePassword": "పాస్‌వర్డ్ దాచు",

  "about.title": "EcoAgri Intelligence గురించి",
  "about.subtitle":
    "వ్యవసాయ శాస్త్రం మరియు AIని ప్రతి రైతు చేతుల్లోకి తీసుకురావడం మా లక్ష్యం.",
  "about.mission": "మా లక్ష్యం",
  "about.missionText":
    "పెద్ద వ్యాపారికి ఉన్న మార్కెట్ సమాచారాన్ని ప్రతి చిన్న రైతుకూ వారి స్వంత భాషలో అందించడం.",
  "about.vision": "మా దృష్టి",
  "about.visionText":
    "రైతుకు లభించే ధర బేరసారాల శక్తితో కాకుండా పంట నాణ్యతతో నిర్ణయించబడే న్యాయమైన మార్కెట్.",
  "about.team": "మా బృందం",

  "contact.title": "సంప్రదింపు & మద్దతు",
  "contact.subtitle":
    "వారంలో ఏడు రోజులు మీ భాషలో సమాధానం ఇస్తాము.",
  "contact.name": "మీ పేరు",
  "contact.email": "ఇమెయిల్ చిరునామా",
  "contact.message": "సందేశం",
  "contact.send": "సందేశం పంపండి",
  "contact.sent":
    "ధన్యవాదాలు! మా మద్దతు బృందం త్వరలో మీకు కాల్ చేస్తుంది.",
  "contact.faq": "తరచుగా అడిగే ప్రశ్నలు",
  "contact.support": "మద్దతు",

  "footer.quick": "త్వరిత లింక్‌లు",
  "footer.emergency": "అత్యవసర వ్యవసాయ సహాయం",
  "footer.gov": "ప్రభుత్వ లింక్‌లు",
  "footer.social": "మమ్మల్ని అనుసరించండి",
  "footer.rights": "అన్ని హక్కులు రిజర్వ్ చేయబడ్డాయి.",
  "footer.about":
    "భారతీయ రైతుల కోసం AI పంట గ్రేడింగ్, మండి శోధన మరియు ధర అంచనా.",

  "common.viewAll": "అన్నీ చూడండి",
  "common.back": "హోమ్‌కు తిరిగి వెళ్లండి",
};

/* =========================================================
   MALAYALAM
========================================================= */

const ml: Dict = {
  "brand.tagline": "എല്ലാ കൃഷിയിടത്തിനും AI",

  "nav.home": "ഹോം",
  "nav.grading": "AI വിള ഗ്രേഡിംഗ്",
  "nav.mandi": "അടുത്തുള്ള മണ്ഡി",
  "nav.price": "വില പ്രവചനം",
  "nav.weather": "കാലാവസ്ഥ",
  "nav.dashboard": "ഡാഷ്ബോർഡ്",
  "nav.about": "ഞങ്ങളെക്കുറിച്ച്",
  "nav.contact": "ബന്ധപ്പെടുക",
  "nav.login": "ലോഗിൻ",
  "nav.language": "ഭാഷ",
  "nav.menu": "മെനു",
  "nav.theme": "തീം മാറ്റുക",
  "nav.alerts": "കാലാവസ്ഥാ മുന്നറിയിപ്പുകൾ",
  "nav.alerts.empty": "ഇപ്പോൾ കാലാവസ്ഥാ മുന്നറിയിപ്പുകൾ ഇല്ല",
  "nav.alerts.viewWeather": "പൂർണ്ണ പ്രവചനം കാണുക",

  "hero.badge": "AI അധിഷ്ഠിത കാർഷിക പ്ലാറ്റ്ഫോം",
  "hero.title": "നിർമ്മിത ബുദ്ധിയാൽ സ്മാർട്ട് കൃഷി",
  "hero.subtitle":
    "വിളയുടെ ഫോട്ടോ എടുക്കൂ; AI നിമിഷങ്ങൾക്കുള്ളിൽ ഗുണനിലവാരം വിലയിരുത്തി മികച്ച മണ്ഡിയും വിലയും വിൽപ്പന ദിവസവും നിർദ്ദേശിക്കും.",
  "hero.cta1": "വിള വിശകലനം തുടങ്ങുക",
  "hero.cta2": "സവിശേഷതകൾ കാണുക",
  "hero.stat1": "ഗ്രേഡിംഗ് കൃത്യത",
  "hero.stat2": "മണ്ഡികൾ",
  "hero.stat3": "കർഷകർ",

  "features.title": "കർഷകന് വേണ്ടതെല്ലാം ഒരൊറ്റ ആപ്പിൽ",
  "features.subtitle": "ലളിതമായ ഉപകരണങ്ങൾ, വലിയ തീരുമാനങ്ങൾ.",

  "features.grading.title": "AI വിള ഗ്രേഡിംഗ്",
  "features.grading.desc":
    "ഫോട്ടോ എടുത്ത് ഉടൻ ഗ്രേഡും പുതുമയും ഗുണനിലവാര സ്കോറും നേടുക.",

  "features.mandi.title": "മണ്ഡി കണ്ടെത്തുക",
  "features.mandi.desc":
    "തത്സമയ വില, ദൂരം, യാത്രാ സമയം സഹിതം അടുത്ത മാർക്കറ്റുകൾ.",

  "features.price.title": "വില പ്രവചനം",
  "features.price.desc":
    "വിൽക്കുന്നതിന് മുമ്പ് നാളെ, ആഴ്ച, മാസ വില അറിയുക.",

  "features.weather.title": "കാലാവസ്ഥാ പ്രവചനം",
  "features.weather.desc":
    "മഴ, ഈർപ്പം, കാറ്റ് മുന്നറിയിപ്പുകൾ.",

  "features.sell.title": "വിൽപ്പന ശുപാർശ",
  "features.sell.desc":
    "കൂടുതൽ ലാഭത്തിന് മികച്ച ദിവസവും മാർക്കറ്റും.",

  "features.analytics.title": "അനലിറ്റിക്സ് ഡാഷ്ബോർഡ്",
  "features.analytics.desc":
    "എല്ലാ വിശകലനവും വില ചരിത്രവും ട്രാക്ക് ചെയ്യുക.",

  "features.learnMore": "കൂടുതൽ അറിയുക",

  "grading.title": "AI വിള ഗ്രേഡിംഗ്",
  "grading.subtitle":
    "നിങ്ങളുടെ വിളയുടെ വ്യക്തമായ ഫോട്ടോ അപ്‌ലോഡ് ചെയ്ത് ഉടൻ ഗുണനിലവാര റിപ്പോർട്ട് നേടുക.",
  "grading.capture": "ഫോട്ടോ എടുക്കുക",
  "grading.gallery": "ഗാലറിയിൽ നിന്ന് അപ്‌ലോഡ്",
  "grading.hint":
    "JPG അല്ലെങ്കിൽ PNG, നല്ല വെളിച്ചം, വിള ഫ്രെയിമിൽ പൂർണ്ണമായി കാണണം.",

  "grading.analyzing": "നിങ്ങളുടെ വിള വിശകലനം ചെയ്യുന്നു…",
  "grading.analyzingSub":
    "നിറം, ഘടന, വലുപ്പം, തകരാറുകൾ എന്നിവ പരിശോധിക്കുന്നു",

  "grading.retake": "മറ്റൊരു ഫോട്ടോ",
  "grading.result": "വിശകലന ഫലം",
  "grading.crop": "വിള",
  "grading.grade": "ഗ്രേഡ്",
  "grading.confidence": "വിശ്വാസ്യത",
  "grading.freshness": "പുതുമ സ്കോർ",
  "grading.quality": "ഗുണനിലവാര സ്കോർ",
  "grading.price": "നിർദ്ദേശിച്ച വിപണി വില",
  "grading.recommendation": "ശുപാർശ",

  "grading.gradeA": "ഗ്രേഡ് A",
  "grading.gradeB": "ഗ്രേഡ് B",
  "grading.gradeC": "ഗ്രേഡ് C",

  "grading.bestMarket": "മികച്ച മാർക്കറ്റ്",
  "grading.quintal": "/ ക്വിന്റൽ",
  "grading.distance": "ദൂരം",
  "grading.away": "അകലെയാണ്",

  "grading.excellent":
    "മികച്ച ഗുണനിലവാരമുള്ള വിള. പ്രീമിയം പുതിയ ഉൽപ്പന്നമായി വിൽക്കാൻ അനുയോജ്യം.",

  "grading.good":
    "നല്ല ഗുണനിലവാരമുള്ള വിള. പുതിയ ഉൽപ്പന്നമായി വിൽക്കാൻ അനുയോജ്യം.",

  "grading.average":
    "ശരാശരി ഗുണനിലവാരമുള്ള വിള. മികച്ച വിലയ്ക്കായി ഉടൻ വിൽക്കുന്നത് പരിഗണിക്കുക.",

  "grading.sample":
    "സാമ്പിൾ തക്കാളി ഫോട്ടോ ഉപയോഗിച്ച് പരീക്ഷിക്കുക",

  "grading.qualityReport":
    "നിങ്ങളുടെ ഗുണനിലവാര റിപ്പോർട്ട് — ഗ്രേഡ്, പുതുമ, വില, വിൽപ്പന നിർദ്ദേശം — ഇവിടെ കാണിക്കും.",

  "mandi.title": "അടുത്തുള്ള മണ്ഡി",
  "mandi.subtitle":
    "നിങ്ങളുടെ ചുറ്റുമുള്ള തത്സമയ മാർക്കറ്റ് വിലകളും ദൂരവും റേറ്റിംഗുകളും.",
  "mandi.distance": "ദൂരം",
  "mandi.price": "നിലവിലെ വില",
  "mandi.rating": "മാർക്കറ്റ് റേറ്റിംഗ്",
  "mandi.travel": "യാത്രാ സമയം",
  "mandi.directions": "വഴി കാണിക്കുക",
  "mandi.map": "തത്സമയ മാർക്കറ്റ് മാപ്പ്",

  "price.title": "വില പ്രവചനം",
  "price.subtitle":
    "മണ്ഡി വരവ്, കാലാവസ്ഥ, ആവശ്യകത എന്നിവയെ അടിസ്ഥാനമാക്കിയുള്ള AI പ്രവചനങ്ങൾ.",
  "price.today": "ഇന്നത്തെ വില",
  "price.tomorrow": "നാളത്തെ പ്രവചനം",
  "price.week": "7-ദിവസ പ്രവചനം",
  "price.month": "30-ദിവസ പ്രവണത",
  "price.best": "വിൽക്കാൻ മികച്ച ദിവസം",

  "weather.title": "കാലാവസ്ഥാ ഡാഷ്ബോർഡ്",
  "weather.subtitle":
    "അടുത്ത ഏഴ് ദിവസത്തെ വയൽ കാലാവസ്ഥയും മുന്നറിയിപ്പുകളും.",
  "weather.temp": "താപനില",
  "weather.humidity": "ഈർപ്പം",
  "weather.rain": "മഴ സാധ്യത",
  "weather.wind": "കാറ്റിന്റെ വേഗത",
  "weather.alerts": "കാലാവസ്ഥാ മുന്നറിയിപ്പ്",
  "weather.forecast": "7-ദിവസ പ്രവചനം",

  "dash.title": "കർഷക ഡാഷ്ബോർഡ്",
  "dash.subtitle":
    "നിങ്ങളുടെ വിശകലനങ്ങളും മാർക്കറ്റുകളും വരുമാനവും ഒറ്റനോട്ടത്തിൽ കാണുക.",
  "dash.recent": "സമീപകാല വിശകലനങ്ങൾ",
  "dash.uploads": "അപ്‌ലോഡ് ചെയ്ത ചിത്രങ്ങൾ",
  "dash.history": "പ്രവചന ചരിത്രം",
  "dash.favorites": "പ്രിയ മാർക്കറ്റുകൾ",
  "dash.notifications": "അറിയിപ്പുകൾ",
  "dash.profile": "പ്രൊഫൈൽ",

  "auth.login": "ലോഗിൻ",
  "auth.signup": "സൈൻ അപ്പ്",
  "auth.welcome": "വീണ്ടും സ്വാഗതം",
  "auth.create": "അക്കൗണ്ട് സൃഷ്ടിക്കുക",
  "auth.phone": "മൊബൈൽ നമ്പർ",
  "auth.email": "ഇമെയിൽ",
  "auth.name": "പൂർണ്ണ നാമം",
  "auth.password": "പാസ്‌വേഡ്",
  "auth.google": "Google ഉപയോഗിച്ച് തുടരുക",
  "auth.or": "അല്ലെങ്കിൽ",
  "auth.otp": "OTP അയയ്ക്കുക",
  "auth.continue": "തുടരുക",
  "auth.confirmPassword": "പാസ്‌വേഡ് സ്ഥിരീകരിക്കുക",
  "auth.register": "രജിസ്റ്റർ ചെയ്യുക",
  "auth.noAccount": "പുതിയ ആളാണോ?",
  "auth.haveAccount": "ഇതിനകം അക്കൗണ്ട് ഉണ്ടോ?",
  "auth.showPassword": "പാസ്‌വേഡ് കാണിക്കുക",
  "auth.hidePassword": "പാസ്‌വേഡ് മറയ്ക്കുക",

  "about.title": "EcoAgri Intelligence കുറിച്ച്",
  "about.subtitle":
    "കാർഷിക ശാസ്ത്രവും AIയും ഓരോ കർഷകന്റെയും കൈകളിലെത്തിക്കുക എന്നതാണ് ഞങ്ങളുടെ ലക്ഷ്യം.",
  "about.mission": "ഞങ്ങളുടെ ദൗത്യം",
  "about.missionText":
    "വലിയ വ്യാപാരിക്ക് ലഭിക്കുന്ന വിപണി വിവരങ്ങൾ ഓരോ ചെറുകിട കർഷകനും അവരുടെ സ്വന്തം ഭാഷയിൽ നൽകുക.",
  "about.vision": "ഞങ്ങളുടെ കാഴ്ചപ്പാട്",
  "about.visionText":
    "കർഷകന് ലഭിക്കുന്ന വില വിലപേശൽ ശക്തിയാൽ അല്ല, വിളയുടെ ഗുണനിലവാരത്താൽ തീരുമാനിക്കപ്പെടുന്ന നീതിയുള്ള വിപണി.",
  "about.team": "ഞങ്ങളുടെ ടീം",

  "contact.title": "ബന്ധപ്പെടലും പിന്തുണയും",
  "contact.subtitle":
    "ആഴ്ചയിലെ ഏഴ് ദിവസവും നിങ്ങളുടെ ഭാഷയിൽ ഞങ്ങൾ മറുപടി നൽകുന്നു.",
  "contact.name": "നിങ്ങളുടെ പേര്",
  "contact.email": "ഇമെയിൽ വിലാസം",
  "contact.message": "സന്ദേശം",
  "contact.send": "സന്ദേശം അയയ്ക്കുക",
  "contact.sent":
    "നന്ദി! ഞങ്ങളുടെ പിന്തുണാ സംഘം ഉടൻ നിങ്ങളെ വിളിക്കും.",
  "contact.faq": "പതിവ് ചോദ്യങ്ങൾ",
  "contact.support": "പിന്തുണ",

  "footer.quick": "പെട്ടെന്നുള്ള ലിങ്കുകൾ",
  "footer.emergency": "അടിയന്തര കാർഷിക സഹായം",
  "footer.gov": "സർക്കാർ ലിങ്കുകൾ",
  "footer.social": "ഞങ്ങളെ പിന്തുടരുക",
  "footer.rights": "എല്ലാ അവകാശങ്ങളും നിക്ഷിപ്തം.",
  "footer.about":
    "ഇന്ത്യൻ കർഷകർക്കായുള്ള AI വിള ഗ്രേഡിംഗ്, മണ്ഡി കണ്ടെത്തൽ, വില പ്രവചനം.",

  "common.viewAll": "എല്ലാം കാണുക",
  "common.back": "ഹോമിലേക്ക് മടങ്ങുക",
};

/* =========================================================
   TYPES + DICTIONARIES
========================================================= */

export type TranslationKey = keyof typeof en;

type Dict = Partial<Record<TranslationKey, string>>;

export const dictionaries: Record<LangCode, Dict> = {
  en,
  kn,
  hi,
  ta,
  te,
  ml,
};

export const baseDictionary = en;