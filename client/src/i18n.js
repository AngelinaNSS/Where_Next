import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./translations/en.json";
import de from "./translations/de.json";
import fr from "./translations/fr.json";
import es from "./translations/es.json";
import it from "./translations/it.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      de: { translation: de },
      fr: { translation: fr },
      es: { translation: es },
      it: { translation: it },
    },
    lng: "en",        // default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

