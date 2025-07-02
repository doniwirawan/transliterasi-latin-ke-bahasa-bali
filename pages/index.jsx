import Head from 'next/head'
import { useState, useEffect, useCallback } from 'react'
import {
    Moon,
    Sun,
    Github,
    Heart,
    Coffee,
    Languages,
    Wifi,
    WifiOff,
    ExternalLink,
    Linkedin,
    Globe2,
    Download,
    X,
    Smartphone,
    Bug
} from 'lucide-react'
import LatinBalineseConverter from '../components/LatinBalineseConverterv1'
import LanguageSwitcher, { translations } from '../components/LanguageSwitcher'

export default function Home({ locale, setLocale }) {
    const [darkMode, setDarkMode] = useState(false)
    const [isOnline, setIsOnline] = useState(true)
    const [isLoaded, setIsLoaded] = useState(false)
    const [deferredPrompt, setDeferredPrompt] = useState(null)
    const [showInstallPrompt, setShowInstallPrompt] = useState(false)
    const [isInstalled, setIsInstalled] = useState(false)

    const t = translations[locale] || translations.en

    useEffect(() => {
        let deferredPromptEvent = null;

        const handleBeforeInstallPrompt = (e) => {
            console.log('[PWA] beforeinstallprompt event fired');
            e.preventDefault();
            deferredPromptEvent = e;
            setDeferredPrompt(e);

            const installPromptDismissed = localStorage.getItem('pwa-install-dismissed');
            if (!installPromptDismissed) {
                setShowInstallPrompt(true);
            }
        };

        const handleAppInstalled = () => {
            console.log('[PWA] App was installed');
            setIsInstalled(true);
            setShowInstallPrompt(false);
            setDeferredPrompt(null);
            deferredPromptEvent = null;
        };

        const checkIfInstalled = () => {
            if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) {
                console.log('[PWA] App is running in standalone mode');
                setIsInstalled(true);
                return true;
            }

            if (window.navigator.standalone === true) {
                console.log('[PWA] App is running in iOS standalone mode');
                setIsInstalled(true);
                return true;
            }

            return false;
        };

        if (typeof window !== 'undefined') {
            if (checkIfInstalled()) {
                setShowInstallPrompt(false);
            }

            window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
            window.addEventListener('appinstalled', handleAppInstalled);

            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register('/sw.js')
                    .then((registration) => {
                        console.log('[PWA] Service Worker registered:', registration);

                        registration.addEventListener('updatefound', () => {
                            const newWorker = registration.installing;
                            newWorker.addEventListener('statechange', () => {
                                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                    console.log('[PWA] New content available');
                                }
                            });
                        });
                    })
                    .catch((error) => {
                        console.error('[PWA] Service Worker registration failed:', error);
                    });
            }

            return () => {
                window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
                window.removeEventListener('appinstalled', handleAppInstalled);
            };
        }
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) {
            console.log('[PWA] No deferred prompt available');
            return;
        }

        console.log('[PWA] Showing install prompt');

        try {
            const result = await deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;

            console.log(`[PWA] User response to install prompt: ${outcome}`);

            if (outcome === 'accepted') {
                console.log('[PWA] User accepted the install prompt');
            } else {
                console.log('[PWA] User dismissed the install prompt');
                localStorage.setItem('pwa-install-dismissed', Date.now().toString());
            }
        } catch (error) {
            console.error('[PWA] Error showing install prompt:', error);
        }

        setDeferredPrompt(null);
        setShowInstallPrompt(false);
    };

    const dismissInstallPrompt = () => {
        console.log('[PWA] Install prompt dismissed by user');
        setShowInstallPrompt(false);
        localStorage.setItem('pwa-install-dismissed', Date.now().toString());
    };

    useEffect(() => {
        if (typeof window !== 'undefined' && !isLoaded) {
            try {
                const savedTheme = localStorage.getItem('balinese-converter-theme')
                if (savedTheme === 'dark') {
                    setDarkMode(true)
                }
                setIsLoaded(true)
            } catch (error) {
                console.warn('Error loading theme:', error)
                setIsLoaded(true)
            }
        }
    }, [isLoaded])

    const toggleDarkMode = useCallback(() => {
        setDarkMode(prev => {
            const newMode = !prev
            if (typeof window !== 'undefined') {
                try {
                    localStorage.setItem('balinese-converter-theme', newMode ? 'dark' : 'light')
                    if (newMode) {
                        document.documentElement.setAttribute('data-bs-theme', 'dark')
                    } else {
                        document.documentElement.removeAttribute('data-bs-theme')
                    }
                } catch (error) {
                    console.warn('Error saving theme:', error)
                }
            }
            return newMode
        })
    }, [])

    useEffect(() => {
        if (typeof window !== 'undefined' && isLoaded) {
            try {
                if (darkMode) {
                    document.documentElement.setAttribute('data-bs-theme', 'dark')
                } else {
                    document.documentElement.removeAttribute('data-bs-theme')
                }
            } catch (error) {
                console.warn('Error applying theme:', error)
            }
        }
    }, [darkMode, isLoaded])

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const handleOnline = () => setIsOnline(true)
            const handleOffline = () => setIsOnline(false)

            setIsOnline(navigator.onLine)

            window.addEventListener('online', handleOnline)
            window.addEventListener('offline', handleOffline)

            return () => {
                window.removeEventListener('online', handleOnline)
                window.removeEventListener('offline', handleOffline)
            }
        }
    }, [])

    const pageTitle = locale === 'id'
        ? "Konverter Aksara Bali - Latin ke Aksara Bali dengan Dukungan Sansekerta"
        : "Balinese Script Converter - Latin to Aksara Bali with Sanskrit Support"

    const pageDescription = locale === 'id'
        ? "Konversi teks Latin ke aksara Bali yang indah dengan dukungan Sansekerta lengkap, equivalensi V=W, dan konversi real-time. Alat edukasi untuk melestarikan budaya Bali."
        : "Convert Latin text to beautiful Balinese script (Aksara Bali) with comprehensive Sanskrit support, V=W equivalency, and real-time conversion. Educational tool for preserving Balinese culture."

    if (!isLoaded) {
        return (
            <div className="d-flex justify-content-center align-items-center min-vh-100">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
                <meta name="keywords" content={locale === 'id'
                    ? "aksara bali, konverter aksara, bahasa bali, Sansekerta, budaya indonesia, transliterasi, alat edukasi, pelestarian budaya, hindu bali"
                    : "Balinese script, Aksara Bali, Sanskrit converter, Indonesia culture, Bali language, Hindu script, transliteration, educational tool, cultural preservation"
                } />

                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />

                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDescription} />
                <meta property="og:locale" content={locale === 'id' ? 'id_ID' : 'en_US'} />
                <meta property="og:locale:alternate" content={locale === 'id' ? 'en_US' : 'id_ID'} />
                <meta property="og:url" content="https://transliterasi-latin-ke-bahasa-bali.vercel.app/" />

                {locale === 'id' && (
                    <>
                        <meta name="geo.region" content="ID" />
                        <meta name="geo.country" content="Indonesia" />
                        <meta name="target-audience" content="Indonesian" />
                    </>
                )}

                <link rel="manifest" href="/site.webmanifest" />

                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "WebApplication",
                            "name": t.appTitle,
                            "description": pageDescription,
                            "url": "https://transliterasi-latin-ke-bahasa-bali.vercel.app/",
                            "applicationCategory": "EducationalApplication",
                            "operatingSystem": "Web Browser",
                            "inLanguage": locale === 'id' ? ['id-ID', 'ban'] : ['en-US', 'ban'],
                            "creator": {
                                "@type": "Person",
                                "name": "Doni Wirawan",
                                "url": "https://www.linkedin.com/in/doniwirawan/"
                            },
                            "audience": {
                                "@type": "Audience",
                                "audienceType": locale === 'id'
                                    ? ["Pelajar", "Peneliti", "Pecinta Budaya", "Pembelajar Bahasa"]
                                    : ["Students", "Researchers", "Cultural Enthusiasts", "Language Learners"],
                                "geographicArea": {
                                    "@type": "Place",
                                    "name": locale === 'id' ? "Indonesia" : "Worldwide"
                                }
                            },
                            "about": [
                                {
                                    "@type": "Thing",
                                    "name": locale === 'id' ? "Aksara Bali" : "Balinese Script",
                                    "sameAs": "https://en.wikipedia.org/wiki/Balinese_script"
                                },
                                {
                                    "@type": "Thing",
                                    "name": locale === 'id' ? "Bahasa Sansekerta" : "Sanskrit Language",
                                    "sameAs": "https://en.wikipedia.org/wiki/Sanskrit"
                                },
                                {
                                    "@type": "Thing",
                                    "name": locale === 'id' ? "Budaya Bali" : "Balinese Culture",
                                    "sameAs": "https://en.wikipedia.org/wiki/Balinese_culture"
                                }
                            ]
                        })
                    }}
                />
            </Head>

            <div className={`min-vh-100 ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
                {showInstallPrompt && !isInstalled && (
                    <div className="alert alert-success m-0 rounded-0 py-3 border-0 shadow-sm" style={{ background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)' }}>
                        <div className="container-fluid px-3">
                            <div className="d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center">
                                    <div className="text-white">
                                        <div className="fw-bold mb-1">
                                            <Smartphone size={16} className="me-2" />
                                            {locale === 'id' ? 'Install Aplikasi' : 'Install App'}
                                        </div>
                                        <small className="opacity-90 d-none d-sm-block">
                                            {locale === 'id'
                                                ? 'Dapatkan akses cepat dan gunakan offline!'
                                                : 'Get quick access and use offline!'
                                            }
                                        </small>
                                    </div>
                                </div>

                                <div className="d-flex align-items-center gap-2">
                                    <button
                                        onClick={handleInstallClick}
                                        className="btn btn-light btn-sm fw-medium d-flex align-items-center"
                                        style={{ minWidth: '80px' }}
                                    >
                                        <Download size={14} className="me-1" />
                                        {locale === 'id' ? 'Install' : 'Install'}
                                    </button>
                                    <button
                                        onClick={dismissInstallPrompt}
                                        className="btn btn-link text-white p-1 opacity-75"
                                        style={{ minWidth: 'auto' }}
                                        aria-label={locale === 'id' ? 'Tutup' : 'Close'}
                                    >
                                        <X size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {!isOnline && (
                    <div className="alert alert-warning m-0 rounded-0 text-center py-2">
                        <div className="d-flex align-items-center justify-content-center">
                            <WifiOff size={14} className="me-2" />
                            <small className="fw-medium">
                                {locale === 'id'
                                    ? 'Offline - Konversi dasar tetap berfungsi!'
                                    : 'Offline - Basic conversion still works!'
                                }
                            </small>
                        </div>
                    </div>
                )}

                <header className={`sticky-top shadow-sm border-bottom ${darkMode ? 'bg-dark border-secondary' : 'bg-white border-light'}`}>
                    <div className="container-fluid px-3">
                        <nav className="navbar navbar-expand-lg py-2 py-md-3">
                            <div className="d-flex d-lg-none w-100 justify-content-between align-items-center">
                                <div className="navbar-brand mb-0 d-flex align-items-center flex-grow-1">
                                    <div
                                        className="me-2 d-flex align-items-center justify-content-center rounded-2"
                                        style={{
                                            backgroundColor: '#ffffff',
                                            width: '60px',
                                            height: '60px',
                                            minWidth: '60px'
                                        }}
                                    >
                                        <img
                                            src="/icons/android-chrome-192x192.png"
                                            alt="Aksara Bali"
                                            width="60"
                                            height="60"
                                            style={{ display: 'block' }}
                                        />
                                    </div>

                                    <div className="d-none d-sm-block">
                                        <span className="fw-bold fs-6">{t.appTitle}</span>
                                        <small className={`d-block lh-1 ${darkMode ? 'text-light-emphasis' : 'text-muted'}`} style={{ fontSize: '0.65rem' }}>
                                            {t.appSubtitle}
                                        </small>
                                    </div>
                                </div>

                                <div className="d-flex align-items-center gap-1">
                                    <LanguageSwitcher
                                        locale={locale}
                                        setLocale={setLocale}
                                        darkMode={darkMode}
                                    />

                                    <button
                                        onClick={toggleDarkMode}
                                        className={`btn btn-sm ${darkMode ? 'btn-outline-light' : 'btn-outline-dark'}`}
                                        title={darkMode ? t.lightMode : t.darkMode}
                                        aria-label={darkMode ? t.lightMode : t.darkMode}
                                    >
                                        {darkMode ? <Sun size={14} /> : <Moon size={14} />}
                                    </button>
                                </div>
                            </div>

                            <div className="d-none d-lg-flex w-100 align-items-center">
                                <div className="d-flex align-items-center flex-grow-1">
                                    <div className="navbar-brand mb-0 d-flex align-items-center">
                                        <div
                                            className="me-2 d-flex align-items-center justify-content-center rounded-3"
                                            style={{
                                                backgroundColor: '#ffffff',
                                                width: '40px',
                                                height: '40px',
                                                minWidth: '40px'
                                            }}
                                        >
                                            <img
                                                src="/icons/android-chrome-192x192.png"
                                                alt="Aksara Bali"
                                                width="32"
                                                height="32"
                                                style={{ display: 'block' }}
                                            />
                                        </div>
                                        <div>
                                            <span className="fw-bold fs-5">{t.appTitle}</span>
                                            <small className={`d-block lh-1 ${darkMode ? 'text-light-emphasis' : 'text-muted'}`} style={{ fontSize: '0.7rem' }}>
                                                {t.appSubtitle}
                                            </small>
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex align-items-center gap-2">
                                    <LanguageSwitcher
                                        locale={locale}
                                        setLocale={setLocale}
                                        darkMode={darkMode}
                                    />

                                    <button
                                        onClick={toggleDarkMode}
                                        className={`btn btn-sm ${darkMode ? 'btn-outline-light' : 'btn-outline-dark'}`}
                                        title={darkMode ? t.lightMode : t.darkMode}
                                        aria-label={darkMode ? t.lightMode : t.darkMode}
                                    >
                                        {darkMode ? <Sun size={16} /> : <Moon size={16} />}
                                    </button>

                                    <a
                                        href="https://github.com/doniwirawan/transliterasi-latin-ke-bahasa-bali"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`btn btn-sm ${darkMode ? 'btn-outline-light' : 'btn-outline-dark'}`}
                                        title="View on GitHub"
                                        aria-label="View source code on GitHub"
                                    >
                                        <Github size={16} />
                                    </a>

                                    <a
                                        href="https://www.linkedin.com/in/doniwirawan/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`btn btn-sm ${darkMode ? 'btn-outline-primary' : 'btn-outline-primary'}`}
                                        title="Connect on LinkedIn"
                                        aria-label="Connect with Doni Wirawan on LinkedIn"
                                    >
                                        <Linkedin size={16} />
                                    </a>
                                </div>
                            </div>
                        </nav>
                    </div>
                </header>

                <main className="pb-4">
                    <LatinBalineseConverter locale={locale} darkMode={darkMode} />
                </main>

                <footer className={`mt-4 pt-4 border-top ${darkMode ? 'bg-dark border-secondary' : 'bg-light border-light'}`}>
                    <div className="container px-3">
                        <div className="d-block d-lg-none">
                            <div className="text-center mb-4">
                                <div className="mb-3 d-flex align-items-center justify-content-center">
                                    <div
                                        className="d-flex align-items-center justify-content-center rounded-2"
                                        style={{
                                            backgroundColor: '#ffffff',
                                            width: '60px',
                                            height: '60px',
                                            minWidth: '60px'
                                        }}
                                    >
                                        <img
                                            src="/icons/android-chrome-192x192.png"
                                            alt="Aksara Bali"
                                            width="60"
                                            height="60"
                                            style={{ objectFit: 'contain' }}
                                        />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <h6 className={`d-inline ${darkMode ? 'text-light' : 'text-dark'}`}>{t.appTitle}</h6>
                                </div>
                                <small className={`d-block ${darkMode ? 'text-light-emphasis' : 'text-muted'}`}>
                                    {t.openSource}
                                </small>
                            </div>

                            <div className={`text-center py-3 border-top ${darkMode ? 'border-secondary' : 'border-light'}`}>
                                <small className={`d-block mb-2 ${darkMode ? 'text-light-emphasis' : 'text-muted'}`} style={{ fontSize: '0.75rem' }}>
                                    {t.footerNote}
                                </small>
                                <small className={`d-block mb-2 ${darkMode ? 'text-light-emphasis' : 'text-muted'}`} style={{ fontSize: '0.7rem' }}>
                                    Created by Doni Wirawan • MIT License <br />
                                    {locale === 'id' ? 'Terinspirasi dari ' : 'Inspired by '}
                                    <a
                                        href="https://github.com/bennylin/transliterasijawa"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`text-decoration-none ${darkMode ? 'text-info' : 'text-primary'}`}
                                    >
                                        transliterasijawa
                                    </a>
                                    {locale === 'id' ? ' oleh bennylin' : ' by bennylin'}
                                </small>

                                <div className="mt-3">
                                    <small className={`d-block mb-2 ${darkMode ? 'text-light-emphasis' : 'text-muted'}`} style={{ fontSize: '0.7rem' }}>
                                        <Bug size={12} className="me-1" />
                                        {locale === 'id' ? 'Menemukan bug? Laporkan di:' : 'Found a bug? Report it at:'}
                                    </small>
                                    <div className="d-flex justify-content-center gap-2">
                                        <a
                                            href="https://github.com/doniwirawan/transliterasi-latin-ke-bahasa-bali/issues"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`btn btn-sm ${darkMode ? 'btn-outline-light' : 'btn-outline-dark'}`}
                                            title="Report bug on GitHub"
                                        >
                                            <Github size={12} className="me-1" />
                                            GitHub
                                        </a>
                                        <a
                                            href="https://www.linkedin.com/in/doniwirawan/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn-sm btn-outline-primary"
                                            title="Contact via LinkedIn"
                                        >
                                            <Linkedin size={12} className="me-1" />
                                            LinkedIn
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="d-none d-lg-block">
                            <div className="row">
                                <div className="col-lg-4 mb-4">
                                    <div className="align-items-center mb-3">
                                        <div
                                            className="me-2 d-flex align-items-center justify-content-center rounded-2"
                                            style={{
                                                backgroundColor: '#ffffff',
                                                width: '80px',
                                                height: '80px',
                                                minWidth: '80px',
                                                borderRadius: '50%',
                                                marginBottom: '0.5rem'
                                            }}
                                        >
                                            <img
                                                src="/icons/android-chrome-192x192.png"
                                                alt="Aksara Bali"
                                                width="80"
                                                height="80"
                                                style={{ display: 'block' }}
                                            />
                                        </div>
                                        <div>
                                            <h5 className={`mb-0 ${darkMode ? 'text-light' : 'text-dark'}`}>{t.appTitle}</h5>
                                            <small className={`${darkMode ? 'text-light-emphasis' : 'text-muted'}`}>
                                                {t.appSubtitle}
                                            </small>
                                        </div>
                                    </div>

                                    <small className={`${darkMode ? 'text-light-emphasis' : 'text-muted'}`}>
                                        {t.footerNote}
                                    </small>
                                </div>

                                <div className="col-lg-4 mb-4">
                                    <h5 className={`mb-3 ${darkMode ? 'text-light' : 'text-dark'}`}>
                                        {locale === 'id' ? 'Tautan Cepat' : 'Quick Links'}
                                    </h5>
                                    <ul className="list-unstyled">
                                        <li className="mb-2">
                                            <a
                                                href="https://github.com/doniwirawan/transliterasi-latin-ke-bahasa-bali"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`text-decoration-none d-flex align-items-center ${darkMode ? 'text-light-emphasis' : 'text-muted'}`}
                                            >
                                                <Github size={16} className="me-2" />
                                                {locale === 'id' ? 'Kode Sumber Terbuka' : 'Source Code'}
                                            </a>
                                        </li>
                                        <li className="mb-2">
                                            <a
                                                href="https://github.com/doniwirawan/transliterasi-latin-ke-bahasa-bali/issues"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`text-decoration-none d-flex align-items-center ${darkMode ? 'text-light-emphasis' : 'text-muted'}`}
                                            >
                                                <Bug size={16} className="me-2" />
                                                {locale === 'id' ? 'Laporkan Bug' : 'Report Bug'}
                                            </a>
                                        </li>
                                        <li className="mb-2">
                                            <a
                                                href="https://www.linkedin.com/in/doniwirawan/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`text-decoration-none d-flex align-items-center ${darkMode ? 'text-light-emphasis' : 'text-muted'}`}
                                            >
                                                <Linkedin size={16} className="me-2" />
                                                {locale === 'id' ? 'Kontak Developer' : 'Contact Developer'}
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                                <div className="col-lg-4 mb-4">
                                    <h5 className={`mb-3 ${darkMode ? 'text-light' : 'text-dark'}`}>
                                        {locale === 'id' ? 'Sumber Daya' : 'Resources'}
                                    </h5>
                                    <ul className="list-unstyled">
                                        {locale === 'id' ? (
                                            <>
                                                <li className="mb-2">
                                                    <a
                                                        href="https://id.wikipedia.org/wiki/Aksara_Bali"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className={`text-decoration-none d-flex align-items-center ${darkMode ? 'text-light-emphasis' : 'text-muted'}`}
                                                    >
                                                        <ExternalLink size={14} className="me-2" />
                                                        Aksara Bali (Wikipedia)
                                                    </a>
                                                </li>
                                                <li className="mb-2">
                                                    <a
                                                        href="https://id.wikipedia.org/wiki/Bahasa_Sansekerta"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className={`text-decoration-none d-flex align-items-center ${darkMode ? 'text-light-emphasis' : 'text-muted'}`}
                                                    >
                                                        <ExternalLink size={14} className="me-2" />
                                                        Bahasa Sansekerta
                                                    </a>
                                                </li>
                                                <li className="mb-2">
                                                    <a
                                                        href="https://id.wikipedia.org/wiki/Budaya_Bali"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className={`text-decoration-none d-flex align-items-center ${darkMode ? 'text-light-emphasis' : 'text-muted'}`}
                                                    >
                                                        <ExternalLink size={14} className="me-2" />
                                                        Budaya Bali
                                                    </a>
                                                </li>
                                            </>
                                        ) : (
                                            <>
                                                <li className="mb-2">
                                                    <a
                                                        href="https://en.wikipedia.org/wiki/Balinese_script"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className={`text-decoration-none d-flex align-items-center ${darkMode ? 'text-light-emphasis' : 'text-muted'}`}
                                                    >
                                                        <ExternalLink size={14} className="me-2" />
                                                        Balinese Script
                                                    </a>
                                                </li>
                                                <li className="mb-2">
                                                    <a
                                                        href="https://en.wikipedia.org/wiki/Sanskrit"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className={`text-decoration-none d-flex align-items-center ${darkMode ? 'text-light-emphasis' : 'text-muted'}`}
                                                    >
                                                        <ExternalLink size={14} className="me-2" />
                                                        Sanskrit Language
                                                    </a>
                                                </li>
                                                <li className="mb-2">
                                                    <a
                                                        href="https://en.wikipedia.org/wiki/Balinese_culture"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className={`text-decoration-none d-flex align-items-center ${darkMode ? 'text-light-emphasis' : 'text-muted'}`}
                                                    >
                                                        <ExternalLink size={14} className="me-2" />
                                                        Balinese Culture
                                                    </a>
                                                </li>
                                            </>
                                        )}
                                    </ul>
                                </div>
                            </div>

                            <div className={`py-3 border-top ${darkMode ? 'border-secondary' : 'border-light'}`}>
                                <div className="row mt-2">
                                    <div className="col-12 text-center">
                                        <small className={`d-block mb-2 ${darkMode ? 'text-light-emphasis' : 'text-muted'}`} style={{ fontSize: '0.75rem' }}>
                                            {locale === 'id'
                                                ? 'Terinspirasi dari '
                                                : 'Inspired by '
                                            }
                                            <a
                                                href="https://github.com/bennylin/transliterasijawa"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`text-decoration-none ${darkMode ? 'text-info' : 'text-primary'}`}
                                            >
                                                transliterasijawa
                                            </a>
                                            {locale === 'id'
                                                ? ' oleh bennylin'
                                                : ' by bennylin'
                                            }
                                        </small>

                                        <div className="mt-3">
                                            <small className={`d-block mb-2 ${darkMode ? 'text-light-emphasis' : 'text-muted'}`} style={{ fontSize: '0.7rem' }}>
                                                <Bug size={12} className="me-1" />
                                                {locale === 'id' ? 'Menemukan bug atau punya saran?' : 'Found a bug or have suggestions?'}
                                            </small>
                                            <div className="d-flex justify-content-center gap-2">
                                                <a
                                                    href="https://github.com/doniwirawan/transliterasi-latin-ke-bahasa-bali/issues"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={`btn btn-sm ${darkMode ? 'btn-outline-light' : 'btn-outline-dark'}`}
                                                    title={locale === 'id' ? 'Laporkan di GitHub Issues' : 'Report on GitHub Issues'}
                                                >
                                                    <Github size={12} className="me-1" />
                                                    {locale === 'id' ? 'GitHub Issues' : 'GitHub Issues'}
                                                </a>
                                                <a
                                                    href="https://www.linkedin.com/in/doniwirawan/"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="btn btn-sm btn-outline-primary"
                                                    title={locale === 'id' ? 'Hubungi via LinkedIn' : 'Contact via LinkedIn'}
                                                >
                                                    <Linkedin size={12} className="me-1" />
                                                    LinkedIn
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>

            <style jsx>{`
                .min-vh-100 {
                    overscroll-behavior: none;
                    min-height: 100vh;
                    min-height: 100dvh;
                }

                @supports (padding: max(0px)) {
                    .sticky-top {
                        padding-top: max(0.25rem, env(safe-area-inset-top));
                    }
                    
                    .container-fluid {
                        padding-left: max(1rem, env(safe-area-inset-left));
                        padding-right: max(1rem, env(safe-area-inset-right));
                    }
                }

                .btn, .alert {
                    transition: all 0.2s ease-in-out;
                }

                .btn, .navbar-brand {
                    user-select: none;
                    -webkit-user-select: none;
                    -webkit-touch-callout: none;
                }

                @media (hover: none) and (pointer: coarse) {
                    .btn {
                        min-height: 44px;
                        min-width: 44px;
                        padding: 0.5rem;
                    }
                    
                    .btn-sm {
                        min-height: 36px;
                        min-width: 36px;
                        padding: 0.375rem;
                    }
                }

                @media (max-width: 991.98px) {
                    .navbar {
                        padding-top: 0.5rem !important;
                        padding-bottom: 0.5rem !important;
                    }
                    
                    .container-fluid {
                        padding-left: 0.75rem;
                        padding-right: 0.75rem;
                    }
                }

                @media (max-width: 767.98px) {
                    .container {
                        padding-left: 0.75rem;
                        padding-right: 0.75rem;
                    }
                    
                    .navbar-brand {
                        font-size: 0.9rem;
                    }
                    
                    .navbar-brand span:first-child {
                        font-size: 1.25rem !important;
                    }
                    
                    .gap-1 {
                        gap: 0.25rem !important;
                    }
                    
                    .gap-3 {
                        gap: 0.75rem !important;
                    }
                }

                @media (max-width: 575.98px) {
                    .container-fluid {
                        padding-left: 0.5rem;
                        padding-right: 0.5rem;
                    }
                    
                    .navbar-brand .fw-bold {
                        font-size: 0.875rem !important;
                    }
                    
                    .navbar-brand small {
                        font-size: 0.6rem !important;
                    }
                    
                    .btn-sm {
                        padding: 0.25rem 0.375rem;
                        font-size: 0.75rem;
                    }
                    
                    .d-flex.gap-3 {
                        flex-direction: column;
                        align-items: center;
                        gap: 0.5rem !important;
                    }
                }

                [lang="id-ID"] {
                    font-family: 'Inter', system-ui, -apple-system, sans-serif;
                }

                [lang="en-US"] {
                    font-family: 'Inter', system-ui, -apple-system, sans-serif;
                }

                [data-cultural-context="indonesian"] .navbar-brand {
                    border-left: 2px solid #ff0000;
                    padding-left: 0.5rem;
                }

                @media (min-width: 768px) {
                    [data-cultural-context="indonesian"] .navbar-brand {
                        border-left: 3px solid #ff0000;
                        padding-left: 0.75rem;
                    }
                    
                    [data-cultural-context="indonesian"] .navbar-brand::after {
                        content: " 🇮🇩";
                        opacity: 0.7;
                        font-size: 0.8rem;
                    }
                }

                .sr-only {
                    position: absolute;
                    width: 1px;
                    height: 1px;
                    padding: 0;
                    margin: -1px;
                    overflow: hidden;
                    clip: rect(0, 0, 0, 0);
                    white-space: nowrap;
                    border: 0;
                }

                @media (prefers-contrast: high) {
                    .btn {
                        border-width: 2px;
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    *,
                    *::before,
                    *::after {
                        animation-duration: 0.01ms !important;
                        animation-iteration-count: 1 !important;
                        transition-duration: 0.01ms !important;
                    }
                }

                .btn:focus-visible {
                    outline: 2px solid currentColor;
                    outline-offset: 2px;
                }

                a {
                    text-decoration: none;
                    transition: color 0.15s ease-in-out;
                }

                a:hover {
                    text-decoration: underline;
                }

                @media (max-width: 767.98px) {
                    .alert {
                        border-radius: 0;
                        margin-bottom: 0;
                    }
                    
                    .card {
                        border-radius: 0.5rem;
                        margin-bottom: 1rem;
                    }
                    
                    .footer a {
                        padding: 0.25rem;
                        min-height: 32px;
                        display: inline-flex;
                        align-items: center;
                    }
                }

                .alert-success {
                    animation: slideDown 0.3s ease-out;
                }

                @keyframes slideDown {
                    from {
                        transform: translateY(-100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }

                .navbar-brand img {
                    filter: drop-shadow(0 1px 2px rgba(0,0,0,0.1));
                }

                .alert-success .btn-light:hover {
                    background-color: #f8f9fa;
                    border-color: #f8f9fa;
                    transform: translateY(-1px);
                }

                .alert-success .btn-link:hover {
                    opacity: 1 !important;
                }
            `}</style>
        </>
    )
}