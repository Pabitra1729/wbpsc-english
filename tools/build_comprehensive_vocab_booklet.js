const fs = require('fs');
const path = require('path');

const raw = JSON.parse(fs.readFileSync('tools/raw_vocab_dump.json', 'utf8'));
const bookletDir = path.join(__dirname, '..', 'data', 'booklet');

// --- Bengali dictionaries for the new tables ---

const owsBengali = {
  1: "উচ্চতাভীতি", 2: "উন্মুক্ত বা জনাকীর্ণ স্থানের ভীতি", 3: "পরোপকারী ব্যক্তি", 4: "উভমুখী স্বভাবের ব্যক্তি", 5: "নৈরাজ্যবাদী",
  6: "নৃতত্ত্ববিদ", 7: "প্রত্নতত্ত্ব সংগ্রাহক", 8: "জলচর প্রাণীর কৃত্রিম জলাশয়", 9: "সালিশকারী / মধ্যস্থতাকারী", 10: "অস্ত্রাগার",
  11: "কৃচ্ছ্রসাধনকারী / তপস্বী", 12: "নাস্তিক", 13: "আত্মজীবনী", 14: "স্বৈরতন্ত্র", 15: "বইপ্রেমী / গ্রন্থকীট",
  16: "দ্বিভাষিক", 17: "জীবনী", 18: "সুদৃশ্য রাজপথ", 19: "সুন্দর হস্তলিপিবিদ্যা", 20: "নরমাংসভোজী",
  21: "মাংসাশী প্রাণী", 22: "শতবর্ষজীবী ব্যক্তি", 23: "ব্যক্তিগত গাড়িচালক", 24: "আবদ্ধ স্থানের ভীতি", 25: "সমসাময়িক",
  26: "রোগমুক্তির পথে থাকা ব্যক্তি", 27: "বিশ্বনাগরিক", 28: "মানবচরিত্রের সততায় অবিশ্বাসী", 29: "গণতন্ত্র", 30: "চর্মরোগবিদ্যা",
  31: "শৌখিন অপেশাদার ব্যক্তি", 32: "বাস্তুবিদ্যা", 33: "আত্মকেন্দ্রিক ব্যক্তি", 34: "যোগ্য বা উপযুক্ত", 35: "দেশত্যাগী",
  36: "কীটপতঙ্গবিদ্যা", 37: "ক্ষণস্থায়ী", 38: "সমাধিলিপি", 39: "ঘোড়াসদৃশ / অশ্বসংক্রান্ত", 40: "শব্দব্যুৎপত্তিবিদ্যা",
  41: "উচ্চ প্রশংসামূলক রচনা", 42: "দোষমুক্ত করা", 43: "তাৎক্ষণিক প্রস্তুতিহীন বক্তৃতা", 44: "খুঁতখুঁতে", 45: "অদৃষ্টবাদী / নিয়তিবাদী",
  46: "প্রাণিকুল", 47: "উদ্ভিদকুল", 48: "পলাতক", 49: "বংশবৃত্তান্তবিদ্যা", 50: "অতিভোজী / পেটুক",
  51: "দলবদ্ধভাবে বসবাসকারী", 52: "তৃণভোজী প্রাণী", 53: "বিজাতীয় / অসমসত্ত্ব", 54: "ষড়ভুজ", 55: "সমজাতীয়",
  56: "জলাতঙ্ক", 57: "ভণ্ড বা কপট ব্যক্তি", 58: "প্রচলিত প্রথা ভঙ্গকারী", 59: "অপাঠ্য", 60: "নিরক্ষর",
  61: "অভিবাসী", 62: "অশ্রাব্য", 63: "অশোধনীয়", 64: "অমোচনীয় / অমলিন", 65: "অভ্রান্ত",
  66: "শিশুহত্যা", 67: "দেউলিয়া", 68: "অনিদ্রা", 69: "অপরাজয়", 70: "অদৃশ্য",
  71: "অভেদ্য / অক্ষত", 72: "অপরিবর্তনীয়", 73: "চুরির মানসিক ব্যাধি", 74: "ভাষাবিদ", 75: "সুস্পষ্ট / প্রাঞ্জল",
  76: "প্রথম বক্তৃতা", 77: "শহীদ", 78: "মানববিদ্বেষী", 79: "নারীবিদ্বেষী", 80: "রাজতন্ত্র",
  81: "একবিবাহ প্রথা", 82: "মর্গ / শবগার", 83: "শিক্ষানবিস / অনভিজ্ঞ", 84: "মুদ্রাতত্ত্ববিদ্যা", 85: "শোকসংবাদ",
  86: "সর্বশক্তিমান", 87: "সর্বব্যাপী", 88: "সর্বজ্ঞ", 89: "অস্বচ্ছ", 90: "আশাবাদী ব্যক্তি",
  91: "পক্ষীবিদ্যা", 92: "সর্বরোগহর মহৌষধ", 93: "হতাশাবাদী ব্যক্তি", 94: "লোকহিতৈষী / মানবপ্রেমিক", 95: "ডাকটিকিট সংগ্রাহক",
  96: "বহুভাষী", 97: "মরণোত্তর", 98: "ধর্মতন্ত্র", 99: "স্বচ্ছ", 100: "বিদেশিভীতি বা বিদ্বেষ"
};

const synBengali = {
  1: "ত্যাগ করা", 2: "হ্রাস পাওয়া / কমা", 3: "প্রচুর / পর্যাপ্ত", 4: "অর্জন করা", 5: "প্রতিকূলতা / দুর্দশা",
  6: "বিত্তবান / ধনী", 7: "চটপটে / ক্ষিপ্র", 8: "উপশম বা লাঘব করা", 9: "অস্পষ্ট / দ্ব্যর্থবোধক", 10: "অমায়িক / বন্ধুভাবাপন্ন",
  11: "ধ্বংস করা", 12: "বেনামী / নামহীন", 13: "পূর্বাভাস পাওয়া", 14: "স্পষ্ট / প্রতীয়মান", 15: "উৎসাহী / উদ্দীপ্ত",
  16: "উদ্ধত / অহংকারী", 17: "বিস্মিত করা", 18: "খাঁটি / আসল", 19: "দয়ালু / হিতৈষী", 20: "মারাত্মক ভুল",
  21: "সংক্ষিপ্ত", 22: "ভঙ্গুর", 23: "বিপর্যয় / দুর্যোগ", 24: "অকপট / স্পষ্টভাষী", 25: "সতর্ক / সাবধানী",
  26: "বিরতি / অবসান", 27: "খসখসে / স্থূল", 28: "শুরু করা", 29: "যোগ্য / দক্ষ", 30: "গোপন করা",
  31: "নিন্দা করা", 32: "সীমাবদ্ধ রাখা", 33: "ষড়যন্ত্র করা", 34: "সাহসী", 35: "ছাঁটাই বা সংক্ষিপ্ত করা",
  36: "প্রতারণা", 37: "ঘাটতিযুক্ত", 38: "ইচ্ছাকৃত", 39: "কোমল / নাজুক", 40: "ভেঙে ফেলা / ধ্বংস করা",
  41: "ঘন / নিবিড়", 42: "ঘৃণা করা", 43: "পরিশ্রমী", 44: "কমানো / হ্রাস পাওয়া", 45: "প্রকাশ বা ফাঁস করা",
  46: "তাচ্ছিল্য / অবজ্ঞা", 47: "সন্দেহজনক", 48: "তন্দ্রাচ্ছন্ন", 49: "ব্যগ্র / আগ্রহী", 50: "খামখেয়ালী / অদ্ভুত",
  51: "বিস্তারিত / বিশদ", 52: "বাগ্মী / স্পষ্টভাষী", 53: "প্রখ্যাত / বিশিষ্ট", 54: "প্রচেষ্টা চালানো", 55: "বিশাল / প্রকাণ্ড",
  56: "প্রলুব্ধ করা", 57: "ন্যায্য / সমদর্শী", 58: "নির্মূল করা", 59: "চিরন্তন / অনন্ত", 60: "অনবদ্য / চমৎকার",
  61: "বানিয়ে তোলা / জাল করা", 62: "দুর্বল", 63: "বাস্তবায়নযোগ্য", 64: "ত্রুটিহীন", 65: "ভবিষ্যদ্বাণী করা",
  66: "ভয়ঙ্কর / দুর্ভেদ্য", 67: "মিতব্যয়ী", 68: "ক্ষিপ্ত / ক্রুদ্ধ", 69: "ব্যর্থ / পণ্ড", 70: "উদার / দানশীল",
  71: "বিষাদ / অন্ধকার", 72: "বিপজ্জনক", 73: "হাস্যকর / প্রফুল্ল", 74: "শত্রুভাবাপন্ন", 75: "বিনয়ী / নম্র",
  76: "মায়া / বিভ্রান্তি", 77: "অসীম / বিশাল", 78: "ক্ষতিসাধন করা", 79: "নিঃস্ব / হতদরিদ্র", 80: "অনিচ্ছাকৃত ভুল",
  81: "অযোগ্য / অক্ষম", 82: "অলস / কুঁড়ে", 83: "কুখ্যাত", 84: "জটিল", 85: "অপরাজয়",
  86: "কিশোর / তরুণ", 87: "আত্মীয়তা / সম্পর্ক", 88: "শোক প্রকাশ করা", 89: "মারাত্মক / প্রাণঘাতী", 90: "সুস্পষ্ট / প্রাঞ্জল",
  91: "মহিমান্বিত / জাঁকজমকপূর্ণ", 92: "অতি সতর্ক / নিখুঁত", 93: "কুখ্যাত", 94: "সতর্ক / সজাগ", 95: "তীব্র ক্রোধ"
};

const antBengali = {
  1: "অনুপস্থিত vs উপস্থিত", 2: "প্রচুর vs স্বল্প / অপর্যাপ্ত", 3: "গ্রহণ করা vs বর্জন করা", 4: "সক্রিয় vs নিষ্ক্রিয়", 5: "প্রশংসা করা vs ঘৃণা করা",
  6: "অগ্রসর হওয়া vs পিছু হটা", 7: "সমৃদ্ধি vs দারিদ্র্য", 8: "একমত হওয়া vs দ্বিমত হওয়া", 9: "বিদেশি vs স্বদেশি", 10: "অপেশাদার vs পেশাদার",
  11: "প্রাচীন vs আধুনিক", 12: "স্পষ্ট vs লুক্কায়িত", 13: "আগমন vs প্রস্থান", 14: "অহংকারী vs বিনয়ী", 15: "আরোহণ vs অবতরণ",
  16: "আক্রমণ করা vs রক্ষা করা", 17: "আকর্ষণ করা vs বিকর্ষণ করা", 18: "খাঁটি vs নকল", 19: "অনুর্বর vs উর্বর", 20: "সুন্দর vs কুৎসিত",
  21: "হিতৈষী vs অনিষ্টকারী", 22: "তিক্ত vs মধুর", 23: "ভোঁতা vs ধারালো", 24: "সাহসী vs ভীরু", 25: "বীরত্ব vs কাপুরুষতা",
  26: "সংক্ষিপ্ত vs দীর্ঘ", 27: "প্রশস্ত vs সংকীর্ণ", 28: "শান্ত vs উত্তাল", 29: "যত্নবান vs অসতর্ক", 30: "সস্তা vs মূল্যবান",
  31: "প্রফুল্ল vs বিষণ্ণ", 32: "পরিষ্কার vs নোংরা", 33: "চালাক vs বোকা", 34: "স্থূল vs সূক্ষ্ম", 35: "ঠান্ডা vs গরম",
  36: "যুক্ত করা vs পৃথক করা", 37: "আরাম vs অস্বস্তি", 38: "সাধারণ vs বিরল", 39: "জটিল vs সহজ", 40: "গোপন করা vs প্রকাশ করা",
  41: "নির্মাণ করা vs ধ্বংস করা", 42: "সাহস vs ভয়", 43: "নিষ্ঠুর vs দয়ালু", 44: "অন্ধকার vs আলো", 45: "গভীর vs অগভীর",
  46: "পরাজয় vs জয়", 47: "নির্দিষ্ট vs অস্পষ্ট", 48: "চাহিদা vs জোগান", 49: "হতাশা vs আশা", 50: "কঠিন vs সহজ",
  51: "হ্রাস পাওয়া vs বৃদ্ধি পাওয়া", 52: "ভাগ করা vs একত্রিত করা", 53: "নিষ্প্রভ vs উজ্জ্বল", 54: "তাড়াতাড়ি vs দেরিতে", 55: "খালি vs পূর্ণ",
  56: "বিশাল vs অতি ক্ষুদ্র", 57: "প্রবেশ vs প্রস্থান", 58: "প্রসারিত vs সংকুচিত", 59: "বাহ্যিক vs অভ্যন্তরীণ", 60: "ব্যর্থতা vs সাফল্য",
  61: "বিশ্বস্ত vs বিশ্বাসঘাতক", 62: "বিখ্যাত vs অখ্যাত", 63: "দ্রুত vs ধীর", 64: "প্রাণঘাতী vs ক্ষতিহীন", 65: "সম্ভবপর vs অসম্ভব",
  66: "দুর্বল vs বলিষ্ঠ", 67: "নমনীয় vs অনমনীয়", 68: "বিদেশি vs দেশীয়", 69: "ক্ষমা করা vs দোষারোপ করা", 70: "ভাগ্যবান vs দুর্ভাগ্যজনক",
  71: "স্বাধীনতা vs বন্দিদশা", 72: "টাটকা vs বাসি", 73: "বন্ধু vs শত্রু", 74: "উদার vs কৃপণ", 75: "নম্র vs রূঢ়",
  76: "খাঁটি vs কৃত্রিম", 77: "বিষাদ vs উল্লাস", 78: "দোষী vs নির্দোষ", 79: "কঠিন vs নরম", 80: "ঐক্য vs অনৈক্য",
  81: "ভারী vs হালকা", 82: "নায়ক vs খলনায়ক", 83: "সৎ vs অসৎ", 84: "সম্মান vs লজ্জা", 85: "শত্রুতাপূর্ণ vs বন্ধুত্বপূর্ণ",
  86: "বিশাল vs ক্ষুদ্র", 87: "আমদানি vs রপ্তানি", 88: "কনিষ্ঠ vs জ্যেষ্ঠ", 89: "ন্যায়বিচার vs অন্যায়", 90: "শীর্ষবিন্দু vs পাদবিন্দু"
};

const spellingBengali = {
  1: "আবাসন / থাকার ব্যবস্থা", 2: "কৃতিত্ব / অর্জন", 3: "পরিচিত ব্যক্তি", 4: "ঠিকানা", 5: "আক্রমণাত্মক",
  6: "বরাদ্দকৃত", 7: "অপেশাদার", 8: "মূল্যায়ন", 9: "আমলাতন্ত্র", 10: "কবরস্থান",
  11: "সহকর্মীবৃন্দ", 12: "কমিটি / সমিতি", 13: "শিল্প সমঝদার", 14: "বিবেকবান / ন্যায়নিষ্ঠ", 15: "শৃঙ্খলা",
  16: "বিব্রত করা", 17: "অতিরঞ্জিত করা", 18: "নিশ্চয়তা / গ্যারান্টি", 19: "হয়রানি করা", 20: "পদসোপান / স্তরবিন্যাস",
  21: "স্বাস্থ্যবিধি", 22: "সামরিক পদমর্যাদা (লেফটেন্যান্ট)", 23: "রক্ষণাবেক্ষণ", 24: "সহস্রাব্দ", 25: "দুষ্টু / অনিষ্টকারী",
  26: "প্রয়োজনীয়", 27: "ঘটনা", 28: "সমান্তরাল", 29: "সুযোগ-সুবিধা", 30: "প্রশ্নমালা",
  31: "গ্রহণ করা", 32: "সুপারিশ করা", 33: "রেস্তোরাঁ", 34: "পৃথক / আলাদা", 35: "আগামীকাল",
  36: "স্বৈরাচারী শাসন", 37: "শূন্যস্থান", 38: "অদ্ভুত / অস্বাভাবিক", 39: "অনুপস্থিতি", 40: "অধিগ্রহণ",
  41: "উপদেষ্টা", 42: "সংযোজন / সংযুক্তি", 43: "অনুকূল / সুবিধাজনক", 44: "অনুসরণ / আনুগত্য", 45: "স্বীকারোক্তি",
  46: "উদ্বেগজনক / অপ্রীতিকর", 47: "স্পষ্ট / আপাতদৃষ্ট", 48: "আবেদনময়", 49: "প্রশংসনীয়", 50: "ব্যবস্থা / আয়োজন",
  51: "সহায়ক", 52: "উপস্থিতি", 53: "কর্তৃপক্ষ", 54: "সহায়ক / আনুষঙ্গিক", 55: "উপলব্ধিযোগ্য",
  56: "ব্যয়সংকোচন / বাজেট", 57: "পঞ্জিকা / ক্যালেন্ডার", 58: "ক্যাম্পেইন / প্রচারণা", 59: "বাতিলকরণ", 60: "সহনশীলতা / ক্ষমতা",
  61: "বিভাগ / শ্রেণী", 62: "সঙ্গীতদল", 63: "চক্রাকার", 64: "সহবাস / সহাবস্থান", 65: "সম্মিলিত / সমবেত",
  66: "কমিশন / প্রতিনিধি দল", 67: "উৎসর্গীকৃত / প্রতিশ্রুতিবদ্ধ", 68: "তুলনাযোগ্য", 69: "প্রতিযোগিতামূলক", 70: "অভিযোগকারী",
  71: "গঠনগত / যৌগিক", 72: "স্বীকারোক্তি", 73: "অভিনন্দন", 74: "অনুকূল / উপযোগী", 75: "অদ্ভুত / অলৌকিক"
};

const idiomsBengali = {
  1: "দুর্বল দিক", 2: "নয়নের মণি / অতি আদরের ব্যক্তি", 3: "তীব্র মতবিরোধে লিপ্ত", 4: "কিংকর্তব্যবিমূঢ় / দিশেহারা", 5: "পুনরায় প্রথম অবস্থায় ফিরে যাওয়া",
  6: "তিক্ত শত্রুতা", 7: "কুসুমাস্তীর্ণ শয্যা / আরামদায়ক অবস্থা", 8: "ঘুরিয়ে ফিরিয়ে কথা বলা", 9: "কারারুদ্ধ / জেলে বন্দি", 10: "অন্যায় আঘাত হানা",
  11: "অপ্রিয় পরিস্থিতি মেনে নেওয়া", 12: "নিজের ঢাক নিজে পেটানো", 13: "বিবাদের মূল কারণ", 14: "আড়ষ্টতা ভেঙে কথা শুরু করা", 15: "রাত জেগে কঠোর পরিশ্রম করা",
  16: "বিবাদ মিটিয়ে বন্ধুত্ব করা", 17: "অনিয়মিতভাবে / মাঝে মাঝে", 18: "যে কোনো প্রকারে", 19: "অত্যন্ত দ্রুতগতিতে", 20: "স্পষ্ট ও অকপট কথা বলা",
  21: "দিনের মতো কাজ শেষ করা", 22: "হাতে-নাতে ধরা পড়া", 23: "পিতামাতার স্বভাবের মতো", 24: "আজগুবি গাঁজাখুরি গল্প", 25: "হঠাৎ সাহস হারিয়ে ফেলা",
  26: "মায়াকান্না / কৃত্রিম কান্না", 27: "অতীত ক্ষতি নিয়ে বৃথা অনুশোচনা", 28: "মিথ্যা বিপদের ভয় দেখানো", 29: "নিজের পছন্দের বিষয়", 30: "অপ্রত্যাশিত প্রতিভাবান ব্যক্তি",
  31: "মহাসমুদ্রে এক ফোঁটা জল / অতি সামান্য", 32: "সুসময়ের বন্ধু", 33: "গৌরবের নতুন পালক", 34: "অস্বস্তিকর পরিস্থিতিতে পড়া", 35: "হঠাৎ প্রচণ্ড রেগে যাওয়া",
  36: "এক স্থান থেকে অন্য স্থানে ছোটাছুটি", 37: "ভয় পাওয়া / দ্বিধান্বিত হওয়া", 38: "সুন্দর কথা বলার সহজাত ক্ষমতা", 39: "সঠিক সময়ে একদম খাঁটি কথা বলা", 40: "অতি সংক্ষেপে",
  41: "অত্যন্ত উৎফুল্ল মেজাজে", 42: "একেবারে শেষ মুহূর্তে", 43: "এক ঢিলে দুই পাখি মারা", 44: "বিপদে ফেলে পালিয়ে যাওয়া", 45: "গোপন তথ্য ফাঁস করে দেওয়া",
  46: "কোনোমতে দিন গুজরান করা", 47: "কদাচিৎ / ডুমুরের ফুল", 48: "স্মরণীয় শুভ দিন", 49: "গোপন কথা ফাঁস করা", 50: "সামান্য কারণে তুলকালাম কাণ্ড",
  51: "সন্দেহের চোখে দেখা", 52: "সুখে-দুঃখে সর্বাবস্থায়", 53: "কথা কানে না তোলা / অগ্রাহ্য করা", 54: "অসুস্থ বা দুর্বল বোধ করা", 55: "পণ্ডশ্রম",
  56: "চূড়ান্ত মাহেন্দ্রক্ষণ", 57: "অপ্রত্যাশিত ভাগ্যলাভ", 58: "উপযুক্ত ব্যক্তি উপযুক্ত স্থানে", 59: "একমত হওয়া", 60: "নাক গলানো / হস্তক্ষেপ করা",
  61: "সহজসাধ্য কাজ / খুব সহজ", 62: "সন্দেহজনক কিছু আঁচ করা", 63: "গোপন শত্রু", 64: "দ্বিধাদ্বন্দ্বে থাকা", 65: "অন্যের কৃতিত্ব চুরি করা",
  66: "অনমনীয় থাকা", 67: "উত্তেজনাপূর্ণ চরম মুহূর্ত", 68: "সুনাম রক্ষা করা", 69: "বিপদের ঝুঁকি নেওয়া", 70: "অসম্ভব প্রত্যাশা করা",
  71: "কঠোর শাসন করা", 72: "লজ্জায় লাল হওয়া", 73: "ব্যর্থতায় পর্যবসিত হওয়া", 74: "উদ্বেগহীন শান্ত থাকা", 75: "কৌতূহলবশত বিপদ ডেকে আনা",
  76: "অসম্ভব কোনো কিছু কল্পনা করা", 77: "সতর্ক দৃষ্টি রাখা", 78: "ভুল পথে অনুসন্ধান চালানো", 79: "অতীত স্মৃতি রোমন্থন করা", 80: "নিজের স্বার্থ উদ্ধার করা",
  81: "আসল বিষয়ে আসা", 82: "সতর্কতা অবলম্বন করা", 83: "কষ্ট সহ্য করা", 84: "অতি কষ্টে জীবনধারণ করা", 85: "ধূমপানের মতো নিঃশেষ হওয়া",
  86: "কোনো সিদ্ধান্তের অপেক্ষায় থাকা", 87: "অন্যের কথায় প্রভাবিত হওয়া", 88: "বিপদে পাশে থাকা", 89: "সমস্যা এড়িয়ে যাওয়া", 90: "অসম্ভব আশা ত্যাগ করা",
  91: "নিজের ভুলে ফেঁসে যাওয়া", 92: "হাল ছেড়ে দেওয়া", 93: "আশা জাগানিয়া দিক", 94: "পরিস্থিতি পর্যবেক্ষণ করা", 95: "স্পষ্টবাদী হওয়া",
  96: "সুযোগ হাতছাড়া না করা", 97: "ধীরে সুস্থে এগিয়ে চলা", 98: "বিপদের মুখোমুখি হওয়া", 99: "ভুল বুঝতে পারা", 100: "ধৈর্য ধারণ করা",
  101: "সফলতার চূড়ায় পৌঁছানো", 102: "চূড়ান্ত সময় / ডেডলাইন"
};

const pvBengali = {
  1: "প্রতিশ্রুতি থেকে পিছিয়ে আসা", 2: "অকেজো হওয়া / কান্নায় ভেঙে পড়া", 3: "ঘটন ঘটানো / কারণে পরিণত হওয়া", 4: "স্থগিত বা বাতিল করা", 5: "চালিয়ে যাওয়া",
  6: "তাল মিলিয়ে সমান হওয়া", 7: "পরিষ্কার করা / সমাধান করা", 8: "হঠাৎ দেখা পাওয়া", 9: "ছাঁটাই করা বা কমানো", 10: "বিলোপ সাধন করা",
  11: "অপ্রত্যাশিতভাবে বেড়াতে আসা", 12: "ঝগড়া বা বিবাদ করা", 13: "বোঝা বা সমাধান করা", 14: "কারও সাথে মিলেমিশে থাকা", 15: "নতি স্বীকার করা",
  16: "অপেক্ষা করা", 17: "তাল বজায় রাখা", 18: "দেখাশোনা বা যত্ন নেওয়া", 19: "উদ্ধার করা বা বুঝতে পারা", 20: "মারা যাওয়া",
  21: "স্থগিত রাখা", 22: "সহ্য করা", 23: "হঠাৎ মুখোমুখি হওয়া", 24: "স্থাপন বা প্রতিষ্ঠা করা", 25: "পিতামাতার সদৃশ হওয়া",
  26: "প্রত্যাখ্যান করা", 27: "সমাধান করা বা ব্যায়াম করা", 28: "অনুরোধ করা", 29: "ভেঙে প্রবেশ করা", 30: "ঘটে যাওয়া",
  31: "অনুসন্ধান করা", 32: "বিদায় জানানো", 33: "প্রকাশ করা / তৈরি করা", 34: "শেষ হওয়া বা ফুরিয়ে যাওয়া", 35: "আশ্রয় নেওয়া",
  36: "চালু করা", 37: "বন্ধ করা", 38: "দায়িত্ব গ্রহণ করা", 39: "পালন পোষণ করা", 40: "ব্যায়াম করা / সফল সমাধান পাওয়া"
};

// --- 1. Generate OWS-100 ---
const ows100 = raw.ows100.map(item => ({
  num: item.no,
  term: item.word,
  meaning: item.phrase,
  bengali: owsBengali[item.no] || "এক কথায় প্রকাশ",
  category: "One Word Substitution"
}));
fs.writeFileSync(path.join(bookletDir, 'one-word-substitution-100.json'), JSON.stringify(ows100, null, 2), 'utf8');

// --- 2. Generate Synonyms-95 ---
const syn95 = raw.synonyms95.map(item => ({
  num: item.no,
  term: item.word,
  meaning: `Synonym: ${item.synonym}`,
  bengali: synBengali[item.no] || "সমার্থক শব্দ",
  category: "Synonym"
}));
fs.writeFileSync(path.join(bookletDir, 'synonyms-95.json'), JSON.stringify(syn95, null, 2), 'utf8');

// --- 3. Generate Antonyms-90 ---
const ant90 = raw.antonyms90.map(item => ({
  num: item.no,
  term: item.word,
  meaning: `Antonym: ${item.antonym}`,
  bengali: antBengali[item.no] || "বিপরীতার্থক শব্দ",
  category: "Antonym"
}));
fs.writeFileSync(path.join(bookletDir, 'antonyms-90.json'), JSON.stringify(ant90, null, 2), 'utf8');

// --- 4. Generate Spelling-75 ---
const spell75 = raw.spelling75.map(item => ({
  num: item.no,
  term: item.word,
  meaning: `Common Misspellings: ${item.misspellings}`,
  bengali: spellingBengali[item.no] || "সঠিক বানান",
  category: "Spelling"
}));
fs.writeFileSync(path.join(bookletDir, 'spelling-75.json'), JSON.stringify(spell75, null, 2), 'utf8');

// --- 5. Generate Homophones-70 ---
const homophonesList = [];
let hNum = 1;
// 3 key terms
raw.terms6.forEach(t => {
  homophonesList.push({
    num: hNum++,
    term: t.term,
    meaning: `${t.meaning} (e.g. ${t.examples})`,
    bengali: t.term === 'Homographs' ? 'একই বানান কিন্তু ভিন্ন উচ্চারণ ও অর্থ' : t.term === 'Homonyms' ? 'একই বানান ও উচ্চারণ কিন্তু ভিন্ন অর্থ' : 'একই উচ্চারণ কিন্তু ভিন্ন বানান ও অর্থ',
    category: "Homophones & Homonyms"
  });
});
// 5 homonyms
raw.homonyms7.forEach(h => {
  homophonesList.push({
    num: hNum++,
    term: h.word,
    meaning: `Multiple Meanings: ${h.meanings}`,
    bengali: "ভিন্নার্থক সমোচ্চারিত শব্দ",
    category: "Homophones & Homonyms"
  });
});
// 30 homophone pairs
raw.homophones8.forEach(p => {
  homophonesList.push({
    num: hNum++,
    term: `${p.word}  /  ${p.homophone}`,
    meaning: `Homophone Pair: '${p.word}' sounds identical to '${p.homophone}'`,
    bengali: `সমোচ্চারিত শব্দযুগল (${p.word} ও ${p.homophone})`,
    category: "Homophones & Homonyms"
  });
});
// 32 context sentences
raw.keyWordSentences9.forEach(s => {
  homophonesList.push({
    num: hNum++,
    term: s.word,
    meaning: `Context Example: ${s.sentence}`,
    bengali: "বাক্য প্রয়োগ ও বিভ্রান্তিকর শব্দের সঠিক ব্যবহার",
    category: "Homophones & Homonyms"
  });
});
fs.writeFileSync(path.join(bookletDir, 'homophones-70.json'), JSON.stringify(homophonesList, null, 2), 'utf8');

// --- 6. Generate Context-70 ---
const context70 = raw.context70.map(item => ({
  num: item.no,
  term: item.word,
  meaning: item.sentence,
  bengali: `বাক্য প্রয়োগ: '${item.word}'-এর প্রাসঙ্গিক ব্যবহার`,
  category: "Vocabulary in Context"
}));
fs.writeFileSync(path.join(bookletDir, 'vocab-context-70.json'), JSON.stringify(context70, null, 2), 'utf8');

// --- 7. Generate Idioms-102 ---
const idioms102 = raw.idioms102.map(item => ({
  num: item.no,
  term: item.idiom,
  meaning: item.meaning,
  bengali: idiomsBengali[item.no] || "প্রবাদ ও বাগধারা",
  category: "Idiom / Phrase"
}));
fs.writeFileSync(path.join(bookletDir, 'idioms-102.json'), JSON.stringify(idioms102, null, 2), 'utf8');

// --- 8. Generate PhrasalVerbs-40 ---
const pv40 = raw.phrasalVerbs40.map(item => ({
  num: item.no,
  term: item.phrase,
  meaning: item.meaning,
  bengali: pvBengali[item.no] || "গ্রুপ ভার্ব / পদান্বয়ী ক্রিয়া",
  category: "Phrasal Verb"
}));
fs.writeFileSync(path.join(bookletDir, 'phrasal-verbs-40.json'), JSON.stringify(pv40, null, 2), 'utf8');

console.log('Generated individual booklet JSON files successfully.');

// --- 9. Build Master Clerkship Booklet ---
const existingBooklet = JSON.parse(fs.readFileSync(path.join(bookletDir, 'clerkship-booklet.json'), 'utf8'));

const masterBooklet = {
  title: "WBPSC Clerkship Official Comprehensive Vocabulary Booklet",
  exam: "WBPSC Clerkship Examination (Part I & Part II)",
  totalCount: 0,
  phrasalVerbs: existingBooklet.phrasalVerbs || [],
  idioms: existingBooklet.idioms || [],
  words: existingBooklet.words || [],
  oneWord: ows100,
  synonyms: syn95,
  antonyms: ant90,
  spelling: spell75,
  homophones: homophonesList,
  context: context70,
  idiomsNew: idioms102,
  phrasalVerbsNew: pv40
};

masterBooklet.totalCount = 
  masterBooklet.phrasalVerbs.length + 
  masterBooklet.idioms.length + 
  masterBooklet.words.length + 
  masterBooklet.oneWord.length + 
  masterBooklet.synonyms.length + 
  masterBooklet.antonyms.length + 
  masterBooklet.spelling.length + 
  masterBooklet.homophones.length + 
  masterBooklet.context.length + 
  masterBooklet.idiomsNew.length + 
  masterBooklet.phrasalVerbsNew.length;

fs.writeFileSync(path.join(bookletDir, 'clerkship-booklet.json'), JSON.stringify(masterBooklet, null, 2), 'utf8');
console.log(`Updated clerkship-booklet.json. Total items: ${masterBooklet.totalCount}`);

// --- 10. Update data/notes/vocabulary/*.json ---

// 01-synonyms.json
const synNotePath = 'data/notes/vocabulary/01-synonyms.json';
if (fs.existsSync(synNotePath)) {
  const d = JSON.parse(fs.readFileSync(synNotePath, 'utf8'));
  d.bookletTitle = "WBPSC Clerkship Verified Synonyms & Vocabulary Directory";
  // Combine the 95 exam synonyms and the 250 high-yield words
  const combinedSyn = [
    ...syn95.map(s => ({ term: s.term, meaning: s.meaning, bengali: s.bengali })),
    ...masterBooklet.words.map(w => ({ term: w.word, meaning: `Synonym: ${w.meaning}`, bengali: w.bengali }))
  ];
  d.bookletList = combinedSyn;
  fs.writeFileSync(synNotePath, JSON.stringify(d, null, 2), 'utf8');
  console.log(`Updated 01-synonyms.json with ${combinedSyn.length} booklet entries.`);
}

// 02-antonyms.json
const antNotePath = 'data/notes/vocabulary/02-antonyms.json';
if (fs.existsSync(antNotePath)) {
  const d = JSON.parse(fs.readFileSync(antNotePath, 'utf8'));
  d.bookletTitle = "WBPSC Clerkship 90 Essential Antonyms Directory";
  d.bookletList = ant90.map(a => ({ term: a.term, meaning: a.meaning, bengali: a.bengali }));
  fs.writeFileSync(antNotePath, JSON.stringify(d, null, 2), 'utf8');
  console.log(`Updated 02-antonyms.json with ${d.bookletList.length} booklet entries.`);
}

// 03-one-word-substitution.json
const owsNotePath = 'data/notes/vocabulary/03-one-word-substitution.json';
if (fs.existsSync(owsNotePath)) {
  const d = JSON.parse(fs.readFileSync(owsNotePath, 'utf8'));
  d.bookletTitle = "WBPSC Clerkship Top 100 One-Word Substitutions Directory";
  d.bookletList = ows100.map(o => ({ term: o.term, meaning: o.meaning, bengali: o.bengali }));
  fs.writeFileSync(owsNotePath, JSON.stringify(d, null, 2), 'utf8');
  console.log(`Updated 03-one-word-substitution.json with ${d.bookletList.length} booklet entries.`);
}

// 04-idioms-phrases.json
const idNotePath = 'data/notes/vocabulary/04-idioms-phrases.json';
if (fs.existsSync(idNotePath)) {
  const d = JSON.parse(fs.readFileSync(idNotePath, 'utf8'));
  d.bookletTitle = "WBPSC Clerkship Official 352 Idioms & Phrases Directory";
  const combinedIdioms = [
    ...idioms102.map(i => ({ term: i.term, meaning: i.meaning, bengali: i.bengali })),
    ...masterBooklet.idioms.map(i => ({ term: i.idiom, meaning: i.meaning, bengali: i.bengali }))
  ];
  d.bookletList = combinedIdioms;
  fs.writeFileSync(idNotePath, JSON.stringify(d, null, 2), 'utf8');
  console.log(`Updated 04-idioms-phrases.json with ${combinedIdioms.length} booklet entries.`);
}

// 05-phrasal-verbs.json
const pvNotePath = 'data/notes/vocabulary/05-phrasal-verbs.json';
if (fs.existsSync(pvNotePath)) {
  const d = JSON.parse(fs.readFileSync(pvNotePath, 'utf8'));
  d.bookletTitle = "WBPSC Clerkship Official 290 Phrasal Verbs Directory";
  const combinedPV = [
    ...pv40.map(p => ({ term: p.term, meaning: p.meaning, bengali: p.bengali })),
    ...masterBooklet.phrasalVerbs.map(p => ({ term: p.phrase, meaning: p.meaning, bengali: p.bengali }))
  ];
  d.bookletList = combinedPV;
  fs.writeFileSync(pvNotePath, JSON.stringify(d, null, 2), 'utf8');
  console.log(`Updated 05-phrasal-verbs.json with ${combinedPV.length} booklet entries.`);
}

// 06-spelling.json
const spellNotePath = 'data/notes/vocabulary/06-spelling.json';
if (fs.existsSync(spellNotePath)) {
  const d = JSON.parse(fs.readFileSync(spellNotePath, 'utf8'));
  d.bookletTitle = "WBPSC Clerkship 75 Most Tricky Exam Spellings Directory";
  d.bookletList = spell75.map(s => ({ term: s.term, meaning: s.meaning, bengali: s.bengali }));
  fs.writeFileSync(spellNotePath, JSON.stringify(d, null, 2), 'utf8');
  console.log(`Updated 06-spelling.json with ${d.bookletList.length} booklet entries.`);
}

// 07-confusing-words.json
const confNotePath = 'data/notes/vocabulary/07-confusing-words.json';
if (fs.existsSync(confNotePath)) {
  const d = JSON.parse(fs.readFileSync(confNotePath, 'utf8'));
  d.bookletTitle = "WBPSC Clerkship Confusing Words & Distinctions Directory";
  // Enrich with confusing pairs from homophones context list and pairs
  const confList = raw.keyWordSentences9.map(k => ({
    term: k.word,
    meaning: k.sentence,
    bengali: "বিভ্রান্তিকর শব্দের সঠিক বাক্য প্রয়োগ"
  }));
  d.bookletList = confList;
  fs.writeFileSync(confNotePath, JSON.stringify(d, null, 2), 'utf8');
  console.log(`Updated 07-confusing-words.json with ${d.bookletList.length} booklet entries.`);
}

// 08-homophones-homonyms.json
const homNotePath = 'data/notes/vocabulary/08-homophones-homonyms.json';
if (fs.existsSync(homNotePath)) {
  const d = JSON.parse(fs.readFileSync(homNotePath, 'utf8'));
  d.bookletTitle = "WBPSC Clerkship 70 High-Yield Homophones & Homonyms Directory";
  d.bookletList = homophonesList.map(h => ({ term: h.term, meaning: h.meaning, bengali: h.bengali }));
  fs.writeFileSync(homNotePath, JSON.stringify(d, null, 2), 'utf8');
  console.log(`Updated 08-homophones-homonyms.json with ${d.bookletList.length} booklet entries.`);
}

// 09-vocabulary-in-context.json
const ctxNotePath = 'data/notes/vocabulary/09-vocabulary-in-context.json';
if (fs.existsSync(ctxNotePath)) {
  const d = JSON.parse(fs.readFileSync(ctxNotePath, 'utf8'));
  d.bookletTitle = "WBPSC Clerkship 70 Vocabulary in Context Sentences Directory";
  d.bookletList = context70.map(c => ({ term: c.term, meaning: c.meaning, bengali: c.bengali }));
  fs.writeFileSync(ctxNotePath, JSON.stringify(d, null, 2), 'utf8');
  console.log(`Updated 09-vocabulary-in-context.json with ${d.bookletList.length} booklet entries.`);
}

console.log('All vocabulary notes enriched with bookletList successfully!');
