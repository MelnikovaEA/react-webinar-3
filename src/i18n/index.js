import * as translations from "./translations";

class I18nService {
    constructor() {
        this.currentLanguage = localStorage.getItem('language') || 'ru';
        this.listeners = [];
    }

    translate(text, plural) {
        const lang = this.currentLanguage;
        let result = translations[lang] && text in translations[lang] ? translations[lang][text] : text;

        if (typeof plural !== 'undefined') {
            const key = new Intl.PluralRules(lang).select(plural);
            if (key in result) {
                result = result[key];
            }
        }

        return result;
    }

    setLanguage(newLang) {
        localStorage.setItem('language', newLang);
        this.currentLanguage = newLang;
        this.notifyListeners();
    }

    subscribe(listener) {
        this.listeners.push(listener);
    }

    unsubscribe(listener) {
        this.listeners = this.listeners.filter(l => l !== listener);
    }

    notifyListeners() {
        this.listeners.forEach(listener => listener(this.currentLanguage));
    }
}

export default I18nService;
