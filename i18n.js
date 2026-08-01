window.getLanguage = function () {
    const savedLang = localStorage.getItem('site_lang');
    if (savedLang) return savedLang;

    const userLang = navigator.language || navigator.userLanguage;
    return userLang.startsWith('en') ? 'en' : 'pt';
};

window.loadTranslations = async function (lang) {
    if (window.location.protocol === 'file:') {
        console.warn('⚠️ ATENÇÃO: Requisições de arquivos JSON não funcionam com protocolo file://. Use a extensão Live Server no VS Code!');
    }

    try {
        const pageName = document.body.getAttribute('data-page') || 'main';
        const response = await fetch(`assets/json/${pageName}/${lang}.json`);

        if (!response.ok) {
            throw new Error(`Arquivo não encontrado: assets/json/${pageName}/${lang}.json`);
        }

        const translations = await response.json();

        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[key]) {
                element.innerHTML = translations[key];
            }
        });

        localStorage.setItem('site_lang', lang);
        document.documentElement.lang = lang === 'en' ? 'en' : 'pt-BR';

        const btnLang = document.getElementById('btn-lang');
        if (btnLang) {
            btnLang.innerText = lang.toUpperCase();
        }

    } catch (error) {
        console.error('Erro no sistema de i18n:', error);
    }
};

window.toggleLanguage = function () {
    const currentLang = localStorage.getItem('site_lang') || window.getLanguage();
    const newLang = currentLang === 'pt' ? 'en' : 'pt';
    window.loadTranslations(newLang);
};

document.addEventListener('DOMContentLoaded', () => {
    window.loadTranslations(window.getLanguage());
});