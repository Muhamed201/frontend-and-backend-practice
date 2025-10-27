// theme.js

class ThemeSwitcher {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.setTheme(this.theme);
        this.bindEvents();
        this.addThemeSwitcherToAllPages();
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        this.theme = theme;
        console.log('Theme changed to:', theme);
    }

    bindEvents() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.theme-switcher__btn')) {
                const theme = e.target.closest('.theme-switcher__btn').dataset.theme;
                this.setTheme(theme);
            }
        });
    }

    addThemeSwitcherToAllPages() {
        const header = document.querySelector('.header');
        if (header && !document.querySelector('.theme-switcher')) {
            const themeSwitcherHTML = `
                <div class="theme-switcher">
                    <button class="theme-switcher__btn theme-switcher__btn--light" data-theme="light" title="Светлая тема">
                        ☀️
                    </button>
                    <button class="theme-switcher__btn theme-switcher__btn--dark" data-theme="dark" title="Темная тема">
                        🌙
                    </button>
                </div>
            `;
            header.style.position = 'relative';
            header.insertAdjacentHTML('beforeend', themeSwitcherHTML);
        }
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    new ThemeSwitcher();
});