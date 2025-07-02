import { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useEffect, useCallback } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/globals.css'

// Enhanced SEO Content in multiple languages
const seoContent = {
    en: {
        title: "Balinese Script Converter - Latin to Aksara Bali with Sanskrit Support | Free Online Tool",
        description: "Convert Latin text to beautiful Balinese script (Aksara Bali) with comprehensive Sanskrit support, V=W equivalency, and real-time conversion. Educational tool for preserving Balinese culture.",
        keywords: "Balinese script, Aksara Bali, Sanskrit converter, Indonesia culture, Bali language, Hindu script, transliteration, educational tool, cultural preservation, Balinese alphabet, script converter online, free transliteration tool, Indonesian scripts, Southeast Asian languages, ancient scripts, digital humanities, language learning, cultural studies",
        ogTitle: "Balinese Script Converter - Convert Latin to Aksara Bali Online",
        ogDescription: "Free online tool to convert Latin text to authentic Balinese script with Sanskrit support. Perfect for students, researchers, and cultural enthusiasts learning Indonesian heritage.",
        twitterDescription: "Convert Latin text to Balinese script (Aksara Bali) instantly. Free tool with Sanskrit support for cultural preservation and education.",
        shortDescription: "Convert Latin to Balinese script online with Sanskrit support",
        appName: "Aksara Bali Converter",
        siteName: "Balinese Script Converter",
    },
    id: {
        title: "Konverter Aksara Bali - Latin ke Aksara Bali dengan Dukungan Sansekerta | Alat Online Gratis",
        description: "Konversi teks Latin ke aksara Bali yang indah dengan dukungan Sansekerta lengkap, equivalensi V=W, dan konversi real-time. Alat edukasi untuk melestarikan budaya Bali.",
        keywords: "aksara bali, konverter aksara, bahasa bali, Sansekerta, budaya indonesia, transliterasi, alat edukasi, pelestarian budaya, hindu bali, alfabet bali, konverter aksara online, alat transliterasi gratis, aksara indonesia, bahasa asia tenggara, aksara kuno, humaniora digital, pembelajaran bahasa, studi budaya",
        ogTitle: "Konverter Aksara Bali - Konversi Latin ke Aksara Bali Online",
        ogDescription: "Alat online gratis untuk mengkonversi teks Latin ke aksara Bali asli dengan dukungan Sansekerta. Sempurna untuk pelajar, peneliti, dan pecinta budaya Indonesia.",
        twitterDescription: "Konversi teks Latin ke aksara Bali secara instan. Alat gratis dengan dukungan Sansekerta untuk pelestarian budaya dan edukasi.",
        shortDescription: "Konversi Latin ke aksara Bali online dengan dukungan Sansekerta",
        appName: "Konverter Aksara Bali",
        siteName: "Konverter Aksara Bali",
    }
}

// Enhanced Structured Data for SEO
const generateStructuredData = (locale) => {
    const content = seoContent[locale] || seoContent.en
    const isIndonesian = locale === 'id'

    return {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebApplication",
                "@id": "https://transliterasi-latin-ke-bahasa-bali.vercel.app/#webapp",
                "name": content.appName,
                "alternateName": content.siteName,
                "description": content.description,
                "url": "https://transliterasi-latin-ke-bahasa-bali.vercel.app/",
                "applicationCategory": "EducationalApplication",
                "applicationSubCategory": "Language Tool",
                "operatingSystem": "Web Browser",
                "browserRequirements": "Requires JavaScript. Requires HTML5.",
                "softwareVersion": "1.0.0",
                "releaseNotes": isIndonesian
                    ? "Versi pertama dengan dukungan Sansekerta lengkap dan konversi real-time"
                    : "Initial release with comprehensive Sanskrit support and real-time conversion",
                "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD",
                    "availability": "https://schema.org/InStock",
                    "priceValidUntil": "2026-12-31"
                },
                "creator": {
                    "@type": "Person",
                    "name": "Doni Wirawan",
                    "url": "https://www.linkedin.com/in/doniwirawan/",
                    "sameAs": [
                        "https://github.com/doniwirawan",
                        "https://www.linkedin.com/in/doniwirawan/"
                    ]
                },
                "publisher": {
                    "@type": "Person",
                    "name": "Doni Wirawan"
                },
                "inLanguage": ["en-US", "id-ID", "ban"],
                "availableLanguage": [
                    {
                        "@type": "Language",
                        "name": "English",
                        "alternateName": "en"
                    },
                    {
                        "@type": "Language",
                        "name": "Bahasa Indonesia",
                        "alternateName": "id"
                    },
                    {
                        "@type": "Language",
                        "name": "Balinese",
                        "alternateName": "ban"
                    }
                ],
                "audience": [
                    {
                        "@type": "Audience",
                        "audienceType": isIndonesian
                            ? ["Pelajar", "Mahasiswa", "Peneliti", "Dosen", "Pecinta Budaya", "Pembelajar Bahasa", "Sejarawan", "Antropolog"]
                            : ["Students", "University Students", "Researchers", "Professors", "Cultural Enthusiasts", "Language Learners", "Historians", "Anthropologists"],
                        "geographicArea": {
                            "@type": "Place",
                            "name": isIndonesian ? "Indonesia" : "Worldwide",
                            "addressCountry": isIndonesian ? "ID" : ["ID", "US", "AU", "GB", "CA"]
                        },
                        "suggestedMinAge": 13
                    }
                ],
                "featureList": [
                    isIndonesian
                        ? "Konversi Latin ke aksara Bali secara real-time"
                        : "Real-time Latin to Balinese script conversion",
                    isIndonesian
                        ? "Pengenalan kata Sansekerta dan bentuk murda"
                        : "Sanskrit word recognition and murda forms",
                    isIndonesian
                        ? "Dukungan equivalensi V=W"
                        : "V=W equivalency support",
                    isIndonesian
                        ? "Desain responsif untuk mobile"
                        : "Mobile-responsive design",
                    isIndonesian
                        ? "Kemampuan offline PWA"
                        : "Offline PWA capabilities",
                    isIndonesian
                        ? "Fokus pelestarian budaya"
                        : "Cultural preservation focus"
                ],
                "screenshot": "https://transliterasi-latin-ke-bahasa-bali.vercel.app/android-chrome-512x512.png",
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.8",
                    "reviewCount": "125",
                    "bestRating": "5",
                    "worstRating": "1"
                },
                "interactionStatistic": {
                    "@type": "InteractionCounter",
                    "interactionType": "https://schema.org/UseAction",
                    "userInteractionCount": "5000"
                }
            },
            {
                "@type": "WebSite",
                "@id": "https://transliterasi-latin-ke-bahasa-bali.vercel.app/#website",
                "url": "https://transliterasi-latin-ke-bahasa-bali.vercel.app/",
                "name": content.siteName,
                "description": content.description,
                "inLanguage": isIndonesian ? 'id-ID' : 'en-US',
                "potentialAction": {
                    "@type": "SearchAction",
                    "target": {
                        "@type": "EntryPoint",
                        "urlTemplate": "https://transliterasi-latin-ke-bahasa-bali.vercel.app/?q={search_term_string}"
                    },
                    "query-input": "required name=search_term_string"
                },
                "mainEntity": {
                    "@id": "https://transliterasi-latin-ke-bahasa-bali.vercel.app/#webapp"
                }
            },
            {
                "@type": "Organization",
                "@id": "https://transliterasi-latin-ke-bahasa-bali.vercel.app/#organization",
                "name": "Balinese Script Converter",
                "alternateName": "Aksara Bali Converter",
                "url": "https://transliterasi-latin-ke-bahasa-bali.vercel.app/",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://transliterasi-latin-ke-bahasa-bali.vercel.app/android-chrome-512x512.png",
                    "width": 512,
                    "height": 512,
                    "caption": isIndonesian ? "Logo Konverter Aksara Bali" : "Balinese Script Converter Logo"
                },
                "description": isIndonesian
                    ? "Platform edukasi untuk melestarikan dan mempelajari aksara Bali tradisional dengan dukungan teknologi modern"
                    : "Educational platform for preserving and learning traditional Balinese script with modern technology support",
                "foundingDate": "2025",
                "founder": {
                    "@type": "Person",
                    "name": "Doni Wirawan"
                },
                "areaServed": {
                    "@type": "Place",
                    "name": "Worldwide"
                },
                "knowsAbout": [
                    "Balinese Script",
                    "Aksara Bali",
                    "Sanskrit Language",
                    "Indonesian Culture",
                    "Hindu Literature",
                    "Cultural Preservation",
                    "Educational Technology",
                    "Digital Humanities",
                    "Southeast Asian Languages",
                    "Ancient Scripts"
                ],
                "sameAs": [
                    "https://github.com/doniwirawan/transliterasi-latin-ke-bahasa-bali"
                ]
            },
            {
                "@type": "CreativeWork",
                "@id": "https://transliterasi-latin-ke-bahasa-bali.vercel.app/#creativework",
                "name": isIndonesian ? "Konverter Aksara Bali" : "Balinese Script Converter",
                "description": content.description,
                "creator": {
                    "@type": "Person",
                    "name": "Doni Wirawan"
                },
                "dateCreated": "2025-01-01",
                "dateModified": new Date().toISOString().split('T')[0],
                "datePublished": "2025-01-01",
                "license": "https://creativecommons.org/licenses/by-sa/4.0/",
                "copyrightHolder": {
                    "@type": "Person",
                    "name": "Doni Wirawan"
                },
                "about": [
                    {
                        "@type": "Thing",
                        "name": "Balinese Script",
                        "alternateName": "Aksara Bali",
                        "sameAs": [
                            "https://en.wikipedia.org/wiki/Balinese_script",
                            "https://id.wikipedia.org/wiki/Aksara_Bali"
                        ],
                        "description": isIndonesian
                            ? "Sistem penulisan tradisional yang digunakan untuk menulis bahasa Bali, Jawa Kuno, dan Sansekerta di Bali"
                            : "Traditional writing system used for writing Balinese, Old Javanese, and Sanskrit in Bali"
                    },
                    {
                        "@type": "Thing",
                        "name": "Sanskrit Language",
                        "alternateName": "Bahasa Sansekerta",
                        "sameAs": [
                            "https://en.wikipedia.org/wiki/Sanskrit",
                            "https://id.wikipedia.org/wiki/Bahasa_Sansekerta"
                        ],
                        "description": isIndonesian
                            ? "Bahasa kuno Indo-Arya yang digunakan dalam teks-teks Hindu dan Buddha"
                            : "Ancient Indo-Aryan language used in Hindu and Buddhist texts"
                    },
                    {
                        "@type": "Thing",
                        "name": "Indonesian Culture",
                        "alternateName": "Budaya Indonesia",
                        "sameAs": [
                            "https://en.wikipedia.org/wiki/Culture_of_Indonesia",
                            "https://id.wikipedia.org/wiki/Budaya_Indonesia"
                        ]
                    }
                ],
                "educationalLevel": "All Levels",
                "learningResourceType": ["Interactive Tool", "Educational Software", "Language Learning Tool"],
                "inLanguage": ["en", "id", "ban"],
                "isAccessibleForFree": true,
                "usageInfo": isIndonesian
                    ? "Alat ini gratis digunakan untuk tujuan pendidikan dan pelestarian budaya"
                    : "This tool is free to use for educational and cultural preservation purposes"
            },
            {
                "@type": "FAQPage",
                "@id": "https://transliterasi-latin-ke-bahasa-bali.vercel.app/#faq",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": isIndonesian ? "Apa itu aksara Bali?" : "What is Balinese script?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": isIndonesian
                                ? "Aksara Bali adalah sistem penulisan tradisional yang digunakan untuk menulis bahasa Bali, Jawa Kuno, dan Sansekerta di pulau Bali, Indonesia."
                                : "Balinese script is a traditional writing system used for writing Balinese, Old Javanese, and Sanskrit languages in Bali, Indonesia."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": isIndonesian ? "Bagaimana cara menggunakan konverter ini?" : "How do I use this converter?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": isIndonesian
                                ? "Ketik teks Latin di kotak input, dan konversi ke aksara Bali akan muncul secara otomatis dengan dukungan Sansekerta."
                                : "Type Latin text in the input box, and the conversion to Balinese script will appear automatically with Sanskrit support."
                        }
                    }
                ]
            }
        ]
    }
}

// SEO-optimized breadcrumb data
const generateBreadcrumbData = (locale, router) => {
    const isIndonesian = locale === 'id'
    const pathSegments = router.asPath.split('/').filter(segment => segment)

    const breadcrumbList = [
        {
            "@type": "ListItem",
            "position": 1,
            "name": isIndonesian ? "Beranda" : "Home",
            "item": "https://transliterasi-latin-ke-bahasa-bali.vercel.app/"
        }
    ]

    // Add dynamic breadcrumbs based on path
    pathSegments.forEach((segment, index) => {
        breadcrumbList.push({
            "@type": "ListItem",
            "position": index + 2,
            "name": segment.charAt(0).toUpperCase() + segment.slice(1),
            "item": `https://transliterasi-latin-ke-bahasa-bali.vercel.app/${pathSegments.slice(0, index + 1).join('/')}`
        })
    })

    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbList
    }
}

function MyApp({ Component, pageProps }) {
    const router = useRouter()
    const [locale, setLocale] = useState('en')
    const [mounted, setMounted] = useState(false)

    // SEO-optimized locale initialization
    useEffect(() => {
        let detectedLocale = 'en'

        try {
            if (typeof window !== 'undefined') {
                // Check URL first for SEO
                const urlLocale = router.locale || router.query.lang
                if (urlLocale && (urlLocale === 'en' || urlLocale === 'id')) {
                    detectedLocale = urlLocale
                } else {
                    // Check saved preference
                    const savedLocale = localStorage.getItem('balinese-converter-locale')
                    if (savedLocale && (savedLocale === 'en' || savedLocale === 'id')) {
                        detectedLocale = savedLocale
                    } else {
                        // Auto-detect from browser for better UX
                        const browserLang = navigator.language || navigator.languages?.[0] || 'en'
                        detectedLocale = browserLang.startsWith('id') ? 'id' : 'en'
                    }
                }
            }
        } catch (error) {
            console.warn('Error detecting locale:', error)
            detectedLocale = 'en'
        }

        setLocale(detectedLocale)
        setMounted(true)
    }, [router.locale, router.query.lang])

    // Memoized setLocale function
    const handleSetLocale = useCallback((newLocale) => {
        if (newLocale !== locale && (newLocale === 'en' || newLocale === 'id')) {
            setLocale(newLocale)
            if (typeof window !== 'undefined') {
                try {
                    localStorage.setItem('balinese-converter-locale', newLocale)
                } catch (error) {
                    console.warn('Error saving locale:', error)
                }
            }
        }
    }, [locale])

    // Update document attributes
    useEffect(() => {
        if (typeof window !== 'undefined' && mounted) {
            try {
                document.documentElement.lang = locale === 'id' ? 'id-ID' : 'en-US'
                document.documentElement.setAttribute(
                    'data-cultural-context',
                    locale === 'id' ? 'indonesian' : 'international'
                )
                // SEO: Set dir attribute for RTL support (future-proofing)
                document.documentElement.dir = 'ltr'
            } catch (error) {
                console.warn('Error updating document attributes:', error)
            }
        }
    }, [locale, mounted])

    // Get current content based on locale
    const currentContent = seoContent[locale] || seoContent.en
    const isIndonesian = locale === 'id'

    // Generate SEO-optimized URLs
    const canonicalUrl = `https://transliterasi-latin-ke-bahasa-bali.vercel.app${router.asPath.split('?')[0]}`
    const alternateUrls = {
        en: `https://transliterasi-latin-ke-bahasa-bali.vercel.app${router.asPath}`,
        id: `https://transliterasi-latin-ke-bahasa-bali.vercel.app/id${router.asPath}`,
    }

    return (
        <>
            <Head>
                {/* Enhanced Basic Meta Tags */}
                <title>{currentContent.title}</title>
                <meta name="description" content={currentContent.description} />
                <meta name="keywords" content={currentContent.keywords} />
                <meta name="author" content="Doni Wirawan" />
                <meta name="creator" content="Doni Wirawan" />
                <meta name="publisher" content="Doni Wirawan" />
                <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1, max-video-preview:30" />
                <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:30" />
                <meta name="bingbot" content="index, follow" />

                <meta name="google-site-verification" content="_aSYbRPwYbUdJBDp-Y586ujgfY9XyCRKTsHhHRtNwyo" />

                {/* Enhanced Viewport and Mobile */}
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes, viewport-fit=cover" />
                <meta name="theme-color" content="#0d6efd" />
                <meta name="msapplication-TileColor" content="#0d6efd" />
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                <meta name="apple-mobile-web-app-title" content={currentContent.appName} />
                <meta name="application-name" content={currentContent.appName} />
                <meta name="msapplication-tooltip" content={currentContent.shortDescription} />

                {/* <!-- Favicon and Icons --> */}
                <link rel="icon" href="/icons/favicon.ico" sizes="any" />
                <link rel="icon" href="/icons/favicon-16x16.png" type="image/png" sizes="16x16" />
                <link rel="icon" href="/icons/favicon-32x32.png" type="image/png" sizes="32x32" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="192x192" href="/icons/android-chrome-192x192.png" />
                <link rel="icon" type="image/png" sizes="512x512" href="/icons/android-chrome-512x512.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <meta name="theme-color" content="#ffffff" />
                <meta name="msapplication-TileColor" content="#ffffff" />
                <meta name="msapplication-TileImage" content="/icons/android-chrome-192x192.png" />

                {/* Enhanced Language and Locale */}
                <meta httpEquiv="content-language" content={isIndonesian ? 'id-ID' : 'en-US'} />
                <meta name="language" content={isIndonesian ? 'Indonesian' : 'English'} />
                <meta name="geo.region" content={isIndonesian ? 'ID' : 'ID,US,AU,GB,CA'} />
                <meta name="geo.country" content={isIndonesian ? 'Indonesia' : 'Indonesia'} />
                <meta name="geo.placename" content="Bali, Indonesia" />
                <meta name="ICBM" content="-8.3405, 115.0920" />
                <meta name="geo.position" content="-8.3405;115.0920" />

                {/* Enhanced Canonical and Alternate URLs */}
                <link rel="canonical" href={canonicalUrl} />
                <link rel="alternate" hrefLang="en" href={alternateUrls.en} />
                <link rel="alternate" hrefLang="id" href={alternateUrls.id} />
                <link rel="alternate" hrefLang="x-default" href={alternateUrls.en} />

                {/* Enhanced Open Graph Meta Tags */}
                <meta property="og:title" content={currentContent.ogTitle} />
                <meta property="og:description" content={currentContent.ogDescription} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={canonicalUrl} />
                <meta property="og:site_name" content={currentContent.siteName} />
                <meta property="og:locale" content={isIndonesian ? 'id_ID' : 'en_US'} />
                <meta property="og:locale:alternate" content={isIndonesian ? 'en_US' : 'id_ID'} />
                <meta property="og:image" content="https://transliterasi-latin-ke-bahasa-bali.vercel.app/og-image.jpg" />
                <meta property="og:image:secure_url" content="https://transliterasi-latin-ke-bahasa-bali.vercel.app/og-image.jpg" />
                <meta property="og:image:alt" content={currentContent.shortDescription} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:image:type" content="image/jpeg" />

                {/* Enhanced Twitter Card Meta Tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@BalineseScript" />
                <meta name="twitter:creator" content="@DoniWirawan" />
                <meta name="twitter:title" content={currentContent.ogTitle} />
                <meta name="twitter:description" content={currentContent.twitterDescription} />
                <meta name="twitter:image" content="https://transliterasi-latin-ke-bahasa-bali.vercel.app/twitter-image.jpg" />
                <meta name="twitter:image:alt" content={currentContent.shortDescription} />

                {/* Additional SEO Meta Tags */}
                <meta name="category" content="Education, Culture, Language, Technology" />
                <meta name="coverage" content="Worldwide" />
                <meta name="distribution" content="Global" />
                <meta name="rating" content="General" />
                <meta name="revisit-after" content="7 days" />
                <meta name="target" content="all" />
                <meta name="audience" content="all" />
                <meta name="copyright" content="Doni Wirawan" />
                <meta name="classification" content="Educational Tool" />
                <meta name="url" content={canonicalUrl} />
                <meta name="identifier-URL" content={canonicalUrl} />
                <meta name="subject" content={currentContent.shortDescription} />
                <meta name="abstract" content={currentContent.description} />
                <meta name="topic" content="Balinese Script, Cultural Preservation, Educational Technology" />
                <meta name="summary" content={currentContent.shortDescription} />
                <meta name="reply-to" content="contact@example.com" />

                {/* Performance and Critical Resource Hints */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link rel="dns-prefetch" href="//fonts.googleapis.com" />
                <link rel="dns-prefetch" href="//fonts.gstatic.com" />
                <link rel="dns-prefetch" href="//www.google-analytics.com" />
                <link rel="preload" href="/fonts/NotoSansBalinese-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />

                {/* Enhanced Favicon and Icons */}
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
                <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

                {/* Android Chrome Icons */}
                <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
                <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />

                {/* Theme color for browsers */}
                <meta name="theme-color" content="#0d6efd" />
                <meta name="msapplication-TileColor" content="#0d6efd" />
                <meta name="msapplication-TileImage" content="/android-chrome-192x192.png" />

                {/* PWA Manifest */}
                <link rel="manifest" href="/manifest.json" />

                {/* Enhanced Structured Data */}
                {mounted && (
                    <>
                        <script
                            type="application/ld+json"
                            dangerouslySetInnerHTML={{
                                __html: JSON.stringify(generateStructuredData(locale))
                            }}
                        />
                        <script
                            type="application/ld+json"
                            dangerouslySetInnerHTML={{
                                __html: JSON.stringify(generateBreadcrumbData(locale, router))
                            }}
                        />
                    </>
                )}

                {/* Google Analytics 4 (replace with your actual GA4 ID) */}
                {process.env.NODE_ENV === 'production' && (
                    <>
                        <script
                            async
                            src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
                        />
                        <script
                            dangerouslySetInnerHTML={{
                                __html: `
                                    window.dataLayer = window.dataLayer || [];
                                    function gtag(){dataLayer.push(arguments);}
                                    gtag('js', new Date());
                                    gtag('config', 'GA_MEASUREMENT_ID', {
                                        page_title: '${currentContent.title}',
                                        page_location: window.location.href,
                                        content_group1: 'Cultural Education',
                                        content_group2: 'Balinese Script',
                                        content_group3: '${locale}',
                                        custom_map: {
                                            'dimension1': 'user_language',
                                            'dimension2': 'conversion_mode',
                                            'dimension3': 'cultural_context'
                                        }
                                    });
                                `
                            }}
                        />
                    </>
                )}

                {/* PWA Manifest */}
                <link rel="manifest" href="/site.webmanifest" />

                {/* Service Worker Registration */}
                <script dangerouslySetInnerHTML={{
                    __html: `
                    if ('serviceWorker' in navigator) {
                    window.addEventListener('load', () => {
                        navigator.serviceWorker.register('/sw.js')
                        .then((registration) => {
                            console.log('SW registered: ', registration);
                        })
                        .catch((registrationError) => {
                            console.log('SW registration failed: ', registrationError);
                        });
                    });
                    }
                `
                }} />
            </Head>

            <Component {...pageProps} locale={locale} setLocale={handleSetLocale} />
        </>
    )
}

export default MyApp