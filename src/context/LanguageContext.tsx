import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { translations, Lang } from "../i18n";

const detectLang = (): Lang => {
  if (typeof navigator === "undefined") return "es";
  const lang = navigator.language.toLowerCase();
  if (lang.startsWith("pt")) return "pt";
  if (lang.startsWith("en")) return "en";
  return "es";
};

const LanguageContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  t: typeof translations.es;
}>({ lang: "es", setLang: () => {}, t: translations.es });

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>(detectLang);
  const t = translations[lang];

  // Keep lang in sync across the app (optional: persist to localStorage)
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
