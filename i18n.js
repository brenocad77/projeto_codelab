window.getLanguage = function () {
    const savedLang = localStorage.getItem('site_lang');
    if (savedLang) return savedLang;

    const userLang = navigator.language || navigator.userLanguage;
    return userLang.startsWith('en') ? 'en' : 'pt';
};

async function loadTranslations(lang, page) {
    try {
        const isSubfolder = window.location.pathname.includes('/paginas/');
        const prefix = isSubfolder ? '../../' : './';

        const response = await fetch(`${prefix}${I18N_CONFIG.basePath}/${page}/${lang}.json`);
        
        if (!response.ok) {
            throw new Error(`Arquivo não encontrado: ${I18N_CONFIG.basePath}/${page}/${lang}.json`);
        }
        
        return await response.json();
    } catch (error) {
        console.error("Erro ao carregar traduções:", error);
        return null;
    }
}

window.toggleLanguage = function () {
    const currentLang = localStorage.getItem('site_lang') || window.getLanguage();
    const newLang = currentLang === 'pt' ? 'en' : 'pt';
    window.loadTranslations(newLang);
};

document.addEventListener('DOMContentLoaded', () => {
    window.loadTranslations(window.getLanguage());
});