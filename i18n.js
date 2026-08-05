const I18N_CONFIG = {
    defaultLang: 'pt',
    supportedLangs: ['pt', 'en'],
    basePath: 'assets/json'
};

function getCurrentLanguage() {
    return localStorage.getItem('user_lang') || I18N_CONFIG.defaultLang;
}

async function loadTranslations(lang, page) {
    try {
        const isSubfolder = window.location.pathname.includes('/paginas/');
        const prefix = isSubfolder ? '../../' : './';

        const response = await fetch(`${prefix}${I18N_CONFIG.basePath}/${page}/${lang}.json`);
        
        if (!response.ok) {
            throw new Error(`Arquivo não encontrado: ${prefix}${I18N_CONFIG.basePath}/${page}/${lang}.json`);
        }
        
        return await response.json();
    } catch (error) {
        console.error("Erro ao carregar traduções:", error);
        return null;
    }
}

async function applyTranslations() {
    const lang = getCurrentLanguage();
    const page = document.body.getAttribute('data-page') || 'main';

    const translations = await loadTranslations(lang, page);
    if (!translations) return;

    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[key] !== undefined) {
            element.innerHTML = translations[key];
        }
    });

    const btnLang = document.getElementById('btn-lang');
    if (btnLang) {
        btnLang.textContent = lang.toUpperCase();
    }
}

async function toggleLanguage() {
    const currentLang = getCurrentLanguage();
    const newLang = currentLang === 'pt' ? 'en' : 'pt';
    
    localStorage.setItem('user_lang', newLang);
    await applyTranslations();
}

window.toggleLanguage = toggleLanguage;

document.addEventListener('DOMContentLoaded', () => {
    applyTranslations();
});