const translations = {
    ru: {
        "hero.title": "Фронтенд Разработчик",
        "hero.subtitle": "Создаю современные веб-приложения",
        "hero.description": "Специализируюсь на React, Vue.js и Node.js разработке",
        "hero.button": "Смотреть работы",

        "skills.title": "Навыки",
        "skills.frontend": "Фронтенд",
        "skills.frontendDesc": "HTML, CSS, JavaScript, React, Vue.js",
        "skills.backend": "Бэкенд",
        "skills.backendDesc": "Node.js, Express, MongoDB, PostgreSQL",

        "portfolio.title": "Портфолио",
        "portfolio.project1.title": "Интернет-магазин",
        "portfolio.project1.desc": "React + Node.js приложение",

        "contact.title": "Контакты",
        "contact.email": "Email: example@dev.com",
        "contact.button": "Написать мне"
    },
    en: {
        "hero.title": "Frontend Developer",
        "hero.subtitle": "Creating modern web applications",
        "hero.description": "Specializing in React, Vue.js and Node.js development",
        "hero.button": "View Portfolio",

        "skills.title": "Skills",
        "skills.frontend": "Frontend",
        "skills.frontendDesc": "HTML, CSS, JavaScript, React, Vue.js",
        "skills.backend": "Backend",
        "skills.backendDesc": "Node.js, Express, MongoDB, PostgreSQL",

        "portfolio.title": "Portfolio",
        "portfolio.project1.title": "E-commerce Store",
        "portfolio.project1.desc": "React + Node.js application",

        "contact.title": "Contact",
        "contact.email": "Email: example@dev.com",
        "contact.button": "Get In Touch"
    }
};

function changeLanguage(lang) {
    // Обновляем активную кнопку
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    // Меняем язык страницы
    document.documentElement.lang = lang;

    // Обновляем текст
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
}