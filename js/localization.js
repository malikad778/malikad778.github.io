
document.addEventListener('DOMContentLoaded', async () => {
    // Check localStorage first
    const savedLang = localStorage.getItem('language');
    if (savedLang) {
        setLanguage(savedLang);
        return;
    }

    // IP Detection
    if (window.location.protocol === 'file:') {
        // console.log('Local file detected, skipping IP check');
        setLanguage('en'); // Default to EN for local
        return;
    }

    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        const country = data.country_code; // e.g., 'DE', 'US', 'PK'

        // console.log('Detected Country:', country);

        if (country === 'DE' || country === 'AT' || country === 'CH') {
            setLanguage('de');
            localStorage.setItem('language', 'de');
        } else {
            // Default EN
            setLanguage('en');
            localStorage.setItem('language', 'en');
        }
    } catch (error) {
        // console.log('IP Detection failed, defaulting to EN');
        // Silent fail for local dev / CORS
        setLanguage('en');
    }
});

const translations = {
    en: {
        'nav-work': 'WORK',
        'nav-about': 'ABOUT',
        'nav-contact': 'CONTACT',
        'hero-role': 'Senior PHP/Laravel Developer & <br><span class="font-semibold text-black dark:text-white">UI/UX Architect.</span>',
        'btn-initiate': 'Initiate Project <span class="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>',
        'cv-download': 'Download CV <span class="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">download</span>',
        'system-status-text': 'System Status: Optimal',
        'about-heading': 'SENIOR PHP DEVELOPER',
        'about-text-1': "I'm a professional PHP web developer specializing in Laravel, custom web applications, and database-driven solutions. With over 5 years of experience, I don't just write code; I solve real business problems.",
        'expertise-cta-title': 'READY TO SCALE?',
        'expertise-cta-text': "Let's build something exceptional.",
        'reviews-heading': 'FIVERR REVIEWS',
        'fiverr-load-more': '<span class="relative z-10 font-manrope font-bold text-sm tracking-[0.2em] uppercase">Show Next Batch</span>',
        'footer-terminate': '06 // TERMINATE SESSION',
        'footer-avail': 'Available for freelance opportunities and long-term contracts.'
    },
    de: {
        'nav-work': 'PROJEKTE',
        'nav-about': 'ÜBER MICH',
        'nav-contact': 'KONTAKT',
        'hero-role': 'Senior PHP/Laravel Entwickler & <br><span class="font-semibold text-black dark:text-white">UI/UX Architekt.</span>',
        'btn-initiate': 'Projekt Starten <span class="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>',
        'cv-download': 'Lebenslauf <span class="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">download</span>',
        'system-status-text': 'SYSTEM STATUS: OPTIMAL',
        'about-heading': 'SENIOR PHP ENTWICKLER',
        'about-text-1': 'Ich bin ein professioneller PHP-Webentwickler, spezialisiert auf Laravel, maßgeschneiderte Webanwendungen und datenbankgestützte Lösungen. Mit über 5 Jahren Erfahrung schreibe ich nicht nur Code; ich löse echte Geschäftsprobleme.',
        'expertise-cta-title': 'BEREIT ZU SKALIEREN?',
        'expertise-cta-text': 'LASS UNS ETWAS AUSSERGEWÖHNLICHES BAUEN.',
        'reviews-heading': 'KUNDENSTIMMEN',
        'fiverr-load-more': '<span class="relative z-10 font-manrope font-bold text-sm tracking-[0.2em] uppercase">Nächste laden</span>',
        'footer-terminate': '06 // SITZUNG BEENDEN',
        'footer-avail': 'Verfügbar für Freelance-Projekte und langfristige Verträge.'
    }
};

function setLanguage(lang) {
    if (!translations[lang]) return;

    const t = translations[lang];
    // Helper to safely set HTML or Text
    const setContent = (id, content) => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = content;
    };

    Object.keys(t).forEach(id => {
        setContent(id, t[id]);
    });

    // Update Button Text
    const btnText = lang === 'en' ? 'DE' : 'EN';
    document.querySelectorAll('.lang-toggle-btn').forEach(btn => {
        btn.innerHTML = `<span class="font-mono font-bold">${btnText}</span>`;
    });
}

window.toggleLanguage = function () {
    const current = localStorage.getItem('language') || 'en';
    const next = current === 'en' ? 'de' : 'en';
    localStorage.setItem('language', next);
    setLanguage(next);
};
