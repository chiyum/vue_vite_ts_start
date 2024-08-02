import { createI18n, I18nOptions } from "@arshown/vue3-i18n";
import messages from "@/_app/locales";
import storage from "store2";

const initLocale = (() => {
  const keepLocale = storage.get("locale");
  if (keepLocale) return keepLocale;

  // 偵測使用者所在地區來去判斷語言
  let userLang = navigator.languages && navigator.languages.length > 0 ? navigator.languages[0] : navigator.language;


  switch (true) {
    case userLang.includes("en"):
        userLang = "en";
        break;
    case userLang.includes("zh"):
        userLang = "zh-tw";
        break;
    default:
        userLang = "zh-tw";
        break;
  }
  /** 不支援語系使用預設值 */
  userLang = userLang in messages ? userLang : import.meta.env.VITE_LOCALE;

  return userLang;
})();

const i18nOptions: I18nOptions = {
  locale: initLocale, // 使用語系
  fallbackLocale: import.meta.env.VITE_DEFAULT_LANG ?? "zh-tw", // 語系無資料時，備用語系
  messages // 語系資料
};

const i18n = createI18n(i18nOptions);

export default i18n;