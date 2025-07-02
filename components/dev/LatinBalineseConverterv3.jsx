'use client'
import React, { useState, useCallback, useEffect } from 'react'
import {
    Languages,
    Copy,
    Download,
    RotateCcw,
    BookOpen,
    Info,
    CheckCircle,
    AlertTriangle,
    Settings,
    Share2,
    ExternalLink,
    Globe,
    ArrowLeftRight,
    RefreshCw
} from 'lucide-react'

const translations = {
    en: {
        appTitle: 'Balinese Script Converter',
        appSubtitle: 'Latin to Aksara Bali with Sanskrit Support',
        darkMode: 'Dark Mode',
        lightMode: 'Light Mode',
        madeWith: 'Made with passion for preserving Balinese culture',
        openSource: 'Open source • Educational • Cultural preservation',
        footerNote: 'This tool is created for educational purposes and cultural preservation. Based on traditional Balinese script conventions with enhanced Sanskrit support.',

        title: 'Latin to Balinese Script Converter',
        subtitle: 'Convert Latin text to beautiful Balinese script (Aksara Bali) with Sanskrit support and V=W equivalency',

        reverseMode: 'Reverse Mode (Balinese → Latin)',
        normalMode: 'Normal Mode (Latin → Balinese)',
        switchToReverse: 'Switch to Reverse',
        switchToNormal: 'Switch to Normal',
        swapTexts: 'Swap Texts',

        transliterationMode: 'Transliteration Mode',
        autoDetect: 'Auto-detect',
        sanskrit: 'Sanskrit',
        balinese: 'Balinese',
        sanskritTooltip: 'Sanskrit/Balinese',
        alwaysUseMurda: 'Always use murda',
        noMurda: 'No murda',
        autoDetectDescription: 'Auto-detect automatically identifies Sanskrit words and applies proper murda forms.',
        databaseInfo: 'Database includes {count}+ Sanskrit terms with V=W equivalency support.',

        latinInput: 'Latin Text Input',
        balineseInput: 'Balinese Script Input',
        placeholder: 'Type your text in Latin script here... (converts in real-time with Sanskrit detection and V=W support)',
        balineseplaceholder: 'Paste or type Balinese script here... (ᬅᬓ᭄ᬱᬭ ᬩᬮᬶ)',
        reset: 'Reset',
        realtimeConversion: '⚡ Real-time conversion with Sanskrit detection & V=W support',
        realtimeReverse: '⚡ Real-time reverse conversion from Balinese script',

        balineseOutput: 'Balinese Script Output',
        latinOutput: 'Latin Text Output',
        outputPlaceholder: 'Balinese script will appear here automatically as you type...',
        latinOutputPlaceholder: 'Latin text will appear here automatically as you type...',

        copy: 'Copy',
        copied: 'Copied!',
        download: 'Download',
        share: 'Share',
        examples: 'Examples (Try different modes and V/W variants!)',
        tryExample: 'Try this example',
        rulesAndGuide: 'Transliteration Rules & Sanskrit Database',
        showGuide: 'Show Guide',
        hideGuide: 'Hide Guide',
        basicRules: 'Basic Rules:',
        charMapping: 'Character Mapping Examples:',
        equivalencyExamples: 'V=W Equivalency Examples:',
        databaseCategories: 'Sanskrit Database Categories:',
        importantNotes: 'Important Notes',
        fontNote: 'Make sure you have Balinese fonts installed for proper display',
        educationalNote: 'The tool is designed for educational and cultural preservation purposes',
        deities: 'Deities',
        philosophy: 'Philosophy',
        scriptures: 'Scriptures',
        characters: 'Characters',
        sages: 'Sages',
        places: 'Places',
        mantras: 'Mantras',
        general: 'General'
    },
    id: {
        appTitle: 'Konverter Aksara Bali',
        appSubtitle: 'Latin ke Aksara Bali dengan Dukungan Sansekerta',
        darkMode: 'Mode Gelap',
        lightMode: 'Mode Terang',
        madeWith: 'Dibuat dengan semangat untuk melestarikan budaya Bali',
        openSource: 'Sumber terbuka • Edukasi • Pelestarian budaya',
        footerNote: 'Alat ini dibuat untuk tujuan pendidikan dan pelestarian budaya. Berdasarkan konvensi aksara Bali tradisional dengan dukungan Sansekerta yang disempurnakan.',

        title: 'Konverter Aksara Bali',
        subtitle: 'Ubah teks Latin ke aksara Bali yang indah dengan dukungan Sansekerta dan ekuivalensi V=W',

        reverseMode: 'Mode Terbalik (Aksara Bali → Latin)',
        normalMode: 'Mode Normal (Latin → Aksara Bali)',
        switchToReverse: 'Beralih ke Mode Terbalik',
        switchToNormal: 'Beralih ke Mode Normal',
        swapTexts: 'Tukar Teks',

        transliterationMode: 'Mode Transliterasi',
        autoDetect: 'Deteksi Otomatis',
        sanskrit: 'Sansekerta',
        balinese: 'Bali',
        sanskritTooltip: 'Sansekerta/Bali',
        alwaysUseMurda: 'Selalu gunakan murda',
        noMurda: 'Tanpa murda',
        autoDetectDescription: 'Deteksi otomatis mengidentifikasi kata-kata Sansekerta dan menerapkan bentuk murda yang tepat.',
        databaseInfo: 'Database mencakup {count}+ istilah Sansekerta dengan dukungan ekuivalensi V=W.',

        latinInput: 'Input Teks Latin',
        balineseInput: 'Input Aksara Bali',
        placeholder: 'Ketik teks Anda dalam aksara Latin di sini... (dikonversi secara real-time dengan deteksi Sansekerta dan dukungan V=W)',
        balineseplaceholder: 'Tempel atau ketik aksara Bali di sini... (ᬅᬓ᭄ᬱᬭ ᬩᬮᬶ)',
        reset: 'Atur Ulang',
        realtimeConversion: '⚡ Konversi real-time dengan deteksi Sansekerta & dukungan V=W',
        realtimeReverse: '⚡ Konversi terbalik real-time dari aksara Bali',

        balineseOutput: 'Output Aksara Bali',
        latinOutput: 'Output Teks Latin',
        outputPlaceholder: 'Aksara Bali akan muncul di sini secara otomatis saat Anda mengetik...',
        latinOutputPlaceholder: 'Teks Latin akan muncul di sini secara otomatis saat Anda mengetik...',

        copy: 'Salin',
        copied: 'Tersalin!',
        download: 'Unduh',
        share: 'Bagikan',
        examples: 'Contoh (Coba mode dan varian V/W yang berbeda!)',
        tryExample: 'Coba contoh ini',
        rulesAndGuide: 'Aturan Transliterasi & Database Sansekerta',
        showGuide: 'Tampilkan Panduan',
        hideGuide: 'Sembunyikan Panduan',
        basicRules: 'Aturan Dasar:',
        charMapping: 'Contoh Pemetaan Karakter:',
        equivalencyExamples: 'Contoh Ekuivalensi V=W:',
        databaseCategories: 'Kategori Database Sansekerta:',
        importantNotes: 'Catatan Penting',
        fontNote: 'Pastikan Anda telah menginstal font Bali untuk tampilan yang benar',
        educationalNote: 'Alat ini dirancang untuk tujuan pendidikan dan pelestarian budaya',
        deities: 'Dewa-Dewi',
        philosophy: 'Filsafat',
        scriptures: 'Kitab Suci',
        characters: 'Tokoh',
        sages: 'Resi',
        places: 'Tempat',
        mantras: 'Mantra',
        general: 'Umum'
    }
}

const LanguageSwitcher = ({ locale, setLocale, darkMode }) => {
    const handleLocaleChange = (e) => {
        const newLocale = e.target.value;
        setLocale(newLocale);
        if (typeof window !== 'undefined') {
            localStorage.setItem('balinese-converter-locale', newLocale);
        }
    };

    return (
        <div className="d-flex align-items-center">
        </div>
    );
};

const LatinBalineseConverter = ({ locale: propLocale, setLocale: propSetLocale, darkMode }) => {
    const [latinText, setLatinText] = useState('')
    const [balineseText, setBalineseText] = useState('')
    const [showGuide, setShowGuide] = useState(false)
    const [copySuccessLeft, setCopySuccessLeft] = useState(false)
    const [copySuccessRight, setCopySuccessRight] = useState(false)
    const [transliterationMode, setTransliterationMode] = useState('auto')
    const [isReverseMode, setIsReverseMode] = useState(false)

    const [internalLocale, setInternalLocale] = useState('en')

    const locale = propLocale || internalLocale
    const setLocale = propSetLocale || setInternalLocale

    useEffect(() => {
        if (!propLocale && typeof window !== 'undefined') {
            const savedLocale = localStorage.getItem('balinese-converter-locale')
            if (savedLocale && (savedLocale === 'en' || savedLocale === 'id')) {
                setInternalLocale(savedLocale)
            } else {
                const browserLang = navigator.language || navigator.languages?.[0] || 'en'
                const detectedLocale = browserLang.startsWith('id') ? 'id' : 'en'
                setInternalLocale(detectedLocale)
                localStorage.setItem('balinese-converter-locale', detectedLocale)
            }
        }
    }, [propLocale])

    const t = translations[locale] || translations.en

    const sanskritDatabase = {
        // DEITIES - Expanded
        'brahma': { category: 'deity', usesMurda: ['bra', 'hma'], priority: 'high' },
        'wisnu': { category: 'deity', usesMurda: ['wi', 'snu'], priority: 'high', variants: ['vishnu'] },
        'vishnu': { category: 'deity', usesMurda: ['wi', 'snu'], preferredForm: 'wisnu', priority: 'high' },
        'shiwa': { category: 'deity', usesMurda: ['shi', 'wa'], priority: 'high', variants: ['shiva'] },
        'shiva': { category: 'deity', usesMurda: ['shi', 'wa'], preferredForm: 'shiwa', priority: 'high' },
        'krishna': { category: 'deity', usesMurda: ['kri', 'shna'], priority: 'high' },
        'rama': { category: 'deity', usesMurda: ['ra', 'ma'], priority: 'high' },
        'indra': { category: 'deity', usesMurda: ['in', 'dra'], priority: 'high' },
        'ganesha': { category: 'deity', usesMurda: ['ga', 'ne', 'sha'], priority: 'high' },
        'ganapati': { category: 'deity', usesMurda: ['ga', 'na', 'pa', 'ti'], priority: 'high' },
        'saraswati': { category: 'deity', usesMurda: ['sa', 'ras', 'wa', 'ti'], priority: 'high' },
        'lakshmi': { category: 'deity', usesMurda: ['lak', 'shmi'], priority: 'high' },
        'durga': { category: 'deity', usesMurda: ['dur', 'ga'], priority: 'high' },
        'kali': { category: 'deity', usesMurda: ['ka', 'li'], priority: 'high' },
        'parvati': { category: 'deity', usesMurda: ['par', 'wa', 'ti'], priority: 'high' },
        'hanuman': { category: 'deity', usesMurda: ['ha', 'nu', 'man'], priority: 'high' },
        'surya': { category: 'deity', usesMurda: ['sur', 'ya'], priority: 'high' },
        'chandra': { category: 'deity', usesMurda: ['chan', 'dra'], priority: 'high' },
        'agni': { category: 'deity', usesMurda: ['ag', 'ni'], priority: 'high' },
        'wayu': { category: 'deity', usesMurda: ['wa', 'yu'], priority: 'high', variants: ['vayu'] },
        'vayu': { category: 'deity', usesMurda: ['wa', 'yu'], preferredForm: 'wayu', priority: 'high' },
        'waruna': { category: 'deity', usesMurda: ['wa', 'ru', 'na'], priority: 'high', variants: ['varuna'] },
        'varuna': { category: 'deity', usesMurda: ['wa', 'ru', 'na'], preferredForm: 'waruna', priority: 'high' },
        'yama': { category: 'deity', usesMurda: ['ya', 'ma'], priority: 'high' },
        'kubera': { category: 'deity', usesMurda: ['ku', 'be', 'ra'], priority: 'high' },
        'skanda': { category: 'deity', usesMurda: ['skan', 'da'], priority: 'medium' },
        'kartikeya': { category: 'deity', usesMurda: ['kar', 'ti', 'ke', 'ya'], priority: 'medium' },
        'murugan': { category: 'deity', usesMurda: ['mu', 'ru', 'gan'], priority: 'medium' },
        'ganga': { category: 'deity', usesMurda: ['gan', 'ga'], priority: 'medium' },
        'yamuna': { category: 'deity', usesMurda: ['ya', 'mu', 'na'], priority: 'medium' },
        'nandi': { category: 'deity', usesMurda: ['nan', 'di'], priority: 'medium' },
        'garuda': { category: 'deity', usesMurda: ['ga', 'ru', 'da'], priority: 'medium' },
        'kalki': { category: 'deity', usesMurda: ['kal', 'ki'], priority: 'medium' },
        'parashurama': { category: 'deity', usesMurda: ['pa', 'ra', 'shu', 'ra', 'ma'], priority: 'medium' },
        'wamana': { category: 'deity', usesMurda: ['wa', 'ma', 'na'], priority: 'medium', variants: ['vamana'] },
        'vamana': { category: 'deity', usesMurda: ['va', 'ma', 'na'], preferredForm: 'wamana', priority: 'medium' },
        'narasimha': { category: 'deity', usesMurda: ['na', 'ra', 'sim', 'ha'], priority: 'medium' },
        'kurma': { category: 'deity', usesMurda: ['kur', 'ma'], priority: 'medium' },
        'matsya': { category: 'deity', usesMurda: ['mat', 'sya'], priority: 'medium' },
        'waraha': { category: 'deity', usesMurda: ['wa', 'ra', 'ha'], priority: 'medium', variants: ['varaha'] },
        'varaha': { category: 'deity', usesMurda: ['va', 'ra', 'ha'], preferredForm: 'waraha', priority: 'medium' },
        'buddha': { category: 'deity', usesMurda: ['bud', 'dha'], priority: 'medium' },
        'ashwini': { category: 'deity', usesMurda: ['ash', 'wi', 'ni'], priority: 'low' },
        'rudra': { category: 'deity', usesMurda: ['rud', 'ra'], priority: 'medium' },
        'mahadewa': { category: 'deity', usesMurda: ['ma', 'ha', 'de', 'wa'], priority: 'high', variants: ['mahadeva'] },
        'mahadeva': { category: 'deity', usesMurda: ['ma', 'ha', 'de', 'va'], preferredForm: 'mahadewa', priority: 'high' },
        'bhairava': { category: 'deity', usesMurda: ['bhai', 'ra', 'wa'], priority: 'medium' },
        'dattatreya': { category: 'deity', usesMurda: ['dat', 'ta', 'tre', 'ya'], priority: 'medium' },

        // PHILOSOPHY - Expanded
        'dharma': { category: 'philosophy', usesMurda: ['dha', 'rma'], priority: 'high' },
        'karma': { category: 'philosophy', usesMurda: ['kar', 'ma'], priority: 'high' },
        'yoga': { category: 'philosophy', usesMurda: ['yo', 'ga'], priority: 'high' },
        'moksha': { category: 'philosophy', usesMurda: ['mok', 'sha'], priority: 'high' },
        'nirvana': { category: 'philosophy', usesMurda: ['nir', 'wa', 'na'], priority: 'high' },
        'samsara': { category: 'philosophy', usesMurda: ['sam', 'sa', 'ra'], priority: 'high' },
        'ahimsa': { category: 'philosophy', usesMurda: ['a', 'him', 'sa'], priority: 'medium' },
        'tapas': { category: 'philosophy', usesMurda: ['ta', 'pas'], priority: 'medium' },
        'bhakti': { category: 'philosophy', usesMurda: ['bhak', 'ti'], priority: 'high' },
        'jnana': { category: 'philosophy', usesMurda: ['jna', 'na'], priority: 'medium' },
        'pranayama': { category: 'philosophy', usesMurda: ['pra', 'na', 'ya', 'ma'], priority: 'medium' },
        'asana': { category: 'philosophy', usesMurda: ['a', 'sa', 'na'], priority: 'medium' },
        'mantra': { category: 'philosophy', usesMurda: ['man', 'tra'], priority: 'high' },
        'yantra': { category: 'philosophy', usesMurda: ['yan', 'tra'], priority: 'medium' },
        'tantra': { category: 'philosophy', usesMurda: ['tan', 'tra'], priority: 'medium' },
        'mudra': { category: 'philosophy', usesMurda: ['mud', 'ra'], priority: 'medium' },
        'chakra': { category: 'philosophy', usesMurda: ['chak', 'ra'], priority: 'medium' },
        'kundalini': { category: 'philosophy', usesMurda: ['kun', 'da', 'li', 'ni'], priority: 'medium' },
        'samadhi': { category: 'philosophy', usesMurda: ['sa', 'ma', 'dhi'], priority: 'medium' },
        'atman': { category: 'philosophy', usesMurda: ['at', 'man'], priority: 'high' },
        'brahman': { category: 'philosophy', usesMurda: ['brah', 'man'], priority: 'high' },
        'prakriti': { category: 'philosophy', usesMurda: ['pra', 'kri', 'ti'], priority: 'medium' },
        'purusha': { category: 'philosophy', usesMurda: ['pu', 'ru', 'sha'], priority: 'medium' },
        'maya': { category: 'philosophy', usesMurda: ['ma', 'ya'], priority: 'high' },
        'lila': { category: 'philosophy', usesMurda: ['li', 'la'], priority: 'medium' },
        'sadhana': { category: 'philosophy', usesMurda: ['sa', 'dha', 'na'], priority: 'medium' },
        'guru': { category: 'philosophy', usesMurda: ['gu', 'ru'], priority: 'high' },
        'darshan': { category: 'philosophy', usesMurda: ['dar', 'shan'], priority: 'medium' },
        'wairagya': { category: 'philosophy', usesMurda: ['wai', 'rag', 'ya'], priority: 'medium', variants: ['vairagya'] },
        'vairagya': { category: 'philosophy', usesMurda: ['vai', 'rag', 'ya'], preferredForm: 'wairagya', priority: 'medium' },
        'sannyasa': { category: 'philosophy', usesMurda: ['san', 'nya', 'sa'], priority: 'medium' },
        'brahmacharya': { category: 'philosophy', usesMurda: ['brah', 'ma', 'char', 'ya'], priority: 'medium' },
        'grihastha': { category: 'philosophy', usesMurda: ['gri', 'has', 'tha'], priority: 'medium' },
        'wanaprastha': { category: 'philosophy', usesMurda: ['wa', 'na', 'pras', 'tha'], priority: 'medium', variants: ['vanaprastha'] },
        'vanaprastha': { category: 'philosophy', usesMurda: ['va', 'na', 'pras', 'tha'], preferredForm: 'wanaprastha', priority: 'medium' },
        'satsang': { category: 'philosophy', usesMurda: ['sat', 'sang'], priority: 'medium' },
        'satsanga': { category: 'philosophy', usesMurda: ['sat', 'san', 'ga'], priority: 'medium' },
        'swadharma': { category: 'philosophy', usesMurda: ['swa', 'dhar', 'ma'], priority: 'medium' },
        'dharana': { category: 'philosophy', usesMurda: ['dha', 'ra', 'na'], priority: 'medium' },
        'dhyana': { category: 'philosophy', usesMurda: ['dhya', 'na'], priority: 'medium' },
        'pratyahara': { category: 'philosophy', usesMurda: ['pra', 'tya', 'ha', 'ra'], priority: 'medium' },
        'yama': { category: 'philosophy', usesMurda: ['ya', 'ma'], priority: 'medium' },
        'niyama': { category: 'philosophy', usesMurda: ['ni', 'ya', 'ma'], priority: 'medium' },
        'satya': { category: 'philosophy', usesMurda: ['sat', 'ya'], priority: 'medium' },
        'asteya': { category: 'philosophy', usesMurda: ['as', 'te', 'ya'], priority: 'low' },
        'aparigraha': { category: 'philosophy', usesMurda: ['a', 'pa', 'ri', 'gra', 'ha'], priority: 'low' },
        'saucha': { category: 'philosophy', usesMurda: ['sau', 'cha'], priority: 'low' },
        'santosha': { category: 'philosophy', usesMurda: ['san', 'to', 'sha'], priority: 'low' },
        'ishwarapranidhana': { category: 'philosophy', usesMurda: ['ish', 'wa', 'ra', 'pra', 'ni', 'dha', 'na'], priority: 'low' },
        'swadhyaya': { category: 'philosophy', usesMurda: ['swa', 'dhya', 'ya'], priority: 'low' },
        'kosha': { category: 'philosophy', usesMurda: ['ko', 'sha'], priority: 'low' },
        'annamaya': { category: 'philosophy', usesMurda: ['an', 'na', 'ma', 'ya'], priority: 'low' },
        'pranamaya': { category: 'philosophy', usesMurda: ['pra', 'na', 'ma', 'ya'], priority: 'low' },
        'manomaya': { category: 'philosophy', usesMurda: ['ma', 'no', 'ma', 'ya'], priority: 'low' },
        'vijnanamaya': { category: 'philosophy', usesMurda: ['wi', 'jna', 'na', 'ma', 'ya'], priority: 'low' },
        'anandamaya': { category: 'philosophy', usesMurda: ['a', 'nan', 'da', 'ma', 'ya'], priority: 'low' },

        // SCRIPTURES - Expanded
        'weda': { category: 'scripture', usesMurda: ['we', 'da'], priority: 'high', variants: ['veda'] },
        'veda': { category: 'scripture', usesMurda: ['we', 'da'], preferredForm: 'weda', priority: 'high' },
        'rigweda': { category: 'scripture', usesMurda: ['rig', 'we', 'da'], priority: 'medium', variants: ['rigveda'] },
        'rigveda': { category: 'scripture', usesMurda: ['rig', 've', 'da'], preferredForm: 'rigweda', priority: 'medium' },
        'samaweda': { category: 'scripture', usesMurda: ['sa', 'ma', 'we', 'da'], priority: 'medium', variants: ['samaveda'] },
        'samaveda': { category: 'scripture', usesMurda: ['sa', 'ma', 've', 'da'], preferredForm: 'samaweda', priority: 'medium' },
        'yajurweda': { category: 'scripture', usesMurda: ['ya', 'jur', 'we', 'da'], priority: 'medium', variants: ['yajurveda'] },
        'yajurveda': { category: 'scripture', usesMurda: ['ya', 'jur', 've', 'da'], preferredForm: 'yajurweda', priority: 'medium' },
        'atharwaweda': { category: 'scripture', usesMurda: ['a', 'thar', 'wa', 'we', 'da'], priority: 'medium', variants: ['atharvaveda'] },
        'atharvaveda': { category: 'scripture', usesMurda: ['a', 'thar', 'va', 've', 'da'], preferredForm: 'atharwaweda', priority: 'medium' },
        'upanishad': { category: 'scripture', usesMurda: ['u', 'pa', 'ni', 'shad'], priority: 'medium' },
        'purana': { category: 'scripture', usesMurda: ['pu', 'ra', 'na'], priority: 'medium' },
        'shastra': { category: 'scripture', usesMurda: ['shas', 'tra'], priority: 'medium' },
        'sutra': { category: 'scripture', usesMurda: ['su', 'tra'], priority: 'medium' },
        'ramayana': { category: 'epic', usesMurda: ['ra', 'ma', 'ya', 'na'], priority: 'high' },
        'mahabharata': { category: 'epic', usesMurda: ['ma', 'ha', 'bha', 'ra', 'ta'], priority: 'high' },
        'bhagavadgita': { category: 'scripture', usesMurda: ['bha', 'ga', 'wad', 'gi', 'ta'], priority: 'high' },
        'bhagavatgita': { category: 'scripture', usesMurda: ['bha', 'ga', 'vat', 'gi', 'ta'], priority: 'high' },
        'ishopanishad': { category: 'scripture', usesMurda: ['i', 'sho', 'pa', 'ni', 'shad'], priority: 'medium' },
        'kenopanishad': { category: 'scripture', usesMurda: ['ke', 'no', 'pa', 'ni', 'shad'], priority: 'medium' },
        'kathopanishad': { category: 'scripture', usesMurda: ['ka', 'tho', 'pa', 'ni', 'shad'], priority: 'medium' },
        'prashnopanishad': { category: 'scripture', usesMurda: ['prash', 'no', 'pa', 'ni', 'shad'], priority: 'medium' },
        'mundakopanishad': { category: 'scripture', usesMurda: ['mun', 'da', 'ko', 'pa', 'ni', 'shad'], priority: 'medium' },
        'mandukyopanishad': { category: 'scripture', usesMurda: ['man', 'duk', 'yo', 'pa', 'ni', 'shad'], priority: 'medium' },
        'aitareyopanishad': { category: 'scripture', usesMurda: ['ai', 'ta', 're', 'yo', 'pa', 'ni', 'shad'], priority: 'low' },
        'taittiriyopanishad': { category: 'scripture', usesMurda: ['tait', 'ti', 'ri', 'yo', 'pa', 'ni', 'shad'], priority: 'low' },
        'brihadaranyakopanishad': { category: 'scripture', usesMurda: ['bri', 'ha', 'da', 'ran', 'ya', 'ko', 'pa', 'ni', 'shad'], priority: 'low' },
        'chandogyopanishad': { category: 'scripture', usesMurda: ['chan', 'dog', 'yo', 'pa', 'ni', 'shad'], priority: 'low' },
        'brahmasutra': { category: 'scripture', usesMurda: ['brah', 'ma', 'su', 'tra'], priority: 'medium' },
        'yogasutra': { category: 'scripture', usesMurda: ['yo', 'ga', 'su', 'tra'], priority: 'medium' },
        'sankhyasutra': { category: 'scripture', usesMurda: ['san', 'khya', 'su', 'tra'], priority: 'low' },
        'waisesika': { category: 'scripture', usesMurda: ['wai', 'she', 'shi', 'ka'], priority: 'low', variants: ['vaisheshika'] },
        'vaisheshika': { category: 'scripture', usesMurda: ['vai', 'she', 'shi', 'ka'], preferredForm: 'waisesika', priority: 'low' },
        'nyaya': { category: 'scripture', usesMurda: ['nya', 'ya'], priority: 'low' },
        'mimamsa': { category: 'scripture', usesMurda: ['mi', 'mam', 'sa'], priority: 'low' },
        'wedanta': { category: 'scripture', usesMurda: ['we', 'dan', 'ta'], priority: 'medium', variants: ['vedanta'] },
        'vedanta': { category: 'scripture', usesMurda: ['ve', 'dan', 'ta'], preferredForm: 'wedanta', priority: 'medium' },
        'adwaita': { category: 'philosophy', usesMurda: ['ad', 'wai', 'ta'], priority: 'medium', variants: ['advaita'] },
        'advaita': { category: 'philosophy', usesMurda: ['ad', 'vai', 'ta'], preferredForm: 'adwaita', priority: 'medium' },
        'dwaita': { category: 'philosophy', usesMurda: ['dwai', 'ta'], priority: 'medium', variants: ['dvaita'] },
        'dvaita': { category: 'philosophy', usesMurda: ['dvai', 'ta'], preferredForm: 'dwaita', priority: 'medium' },
        'wishishtadwaita': { category: 'philosophy', usesMurda: ['wi', 'shish', 'ta', 'dwai', 'ta'], priority: 'low', variants: ['vishishtadvaita'] },
        'vishishtadvaita': { category: 'philosophy', usesMurda: ['vi', 'shish', 'ta', 'dvai', 'ta'], preferredForm: 'wishishtadwaita', priority: 'low' },

        // MANTRAS - Expanded
        'om': { category: 'mantra', usesMurda: ['om'], priority: 'high', sacred: true },
        'aum': { category: 'mantra', usesMurda: ['aum'], priority: 'high', sacred: true },
        'soham': { category: 'mantra', usesMurda: ['so', 'ham'], priority: 'medium' },
        'hamsa': { category: 'mantra', usesMurda: ['ham', 'sa'], priority: 'medium' },
        'gayatri': { category: 'mantra', usesMurda: ['ga', 'ya', 'tri'], priority: 'high' },
        'mahamrityunjaya': { category: 'mantra', usesMurda: ['ma', 'ha', 'mri', 'tyun', 'ja', 'ya'], priority: 'medium' },
        'harerama': { category: 'mantra', usesMurda: ['ha', 're', 'ra', 'ma'], priority: 'medium' },
        'harekrishna': { category: 'mantra', usesMurda: ['ha', 're', 'kri', 'shna'], priority: 'medium' },
        'shivoham': { category: 'mantra', usesMurda: ['shi', 'vo', 'ham'], priority: 'medium' },
        'tattwamasi': { category: 'mantra', usesMurda: ['tat', 'twam', 'a', 'si'], priority: 'medium' },
        'ahambrahmasi': { category: 'mantra', usesMurda: ['a', 'ham', 'brah', 'ma', 'si'], priority: 'medium' },
        'sarwamkhalidambrahma': { category: 'mantra', usesMurda: ['sar', 'wam', 'kha', 'li', 'dam', 'brah', 'ma'], priority: 'low' },
        'ayamātmābrahma': { category: 'mantra', usesMurda: ['a', 'yam', 'at', 'ma', 'brah', 'ma'], priority: 'low' },

        // CHARACTERS - Expanded
        'yudhishthira': { category: 'character', usesMurda: ['yu', 'dhish', 'thi', 'ra'], priority: 'medium' },
        'bhima': { category: 'character', usesMurda: ['bhi', 'ma'], priority: 'medium' },
        'arjuna': { category: 'character', usesMurda: ['ar', 'ju', 'na'], priority: 'high' },
        'nakula': { category: 'character', usesMurda: ['na', 'ku', 'la'], priority: 'medium' },
        'sahadeva': { category: 'character', usesMurda: ['sa', 'ha', 'de', 'wa'], priority: 'medium' },
        'sahadewa': { category: 'character', usesMurda: ['sa', 'ha', 'de', 'va'], priority: 'medium' },
        'draupadi': { category: 'character', usesMurda: ['drau', 'pa', 'di'], priority: 'medium' },
        'kunti': { category: 'character', usesMurda: ['kun', 'ti'], priority: 'medium' },
        'duryodhana': { category: 'character', usesMurda: ['dur', 'yo', 'dha', 'na'], priority: 'medium' },
        'karna': { category: 'character', usesMurda: ['kar', 'na'], priority: 'medium' },
        'bhishma': { category: 'character', usesMurda: ['bhish', 'ma'], priority: 'medium' },
        'sita': { category: 'character', usesMurda: ['si', 'ta'], priority: 'high' },
        'lakshmana': { category: 'character', usesMurda: ['lak', 'shma', 'na'], priority: 'medium' },
        'bharata': { category: 'character', usesMurda: ['bha', 'ra', 'ta'], priority: 'medium' },
        'ravana': { category: 'character', usesMurda: ['ra', 'wa', 'na'], priority: 'medium' },
        'rawana': { category: 'character', usesMurda: ['ra', 'va', 'na'], priority: 'medium' },
        'sugriva': { category: 'character', usesMurda: ['su', 'gri', 'wa'], priority: 'medium' },
        'sugriwa': { category: 'character', usesMurda: ['su', 'gri', 'va'], priority: 'medium' },
        'wibhisana': { category: 'character', usesMurda: ['wi', 'bhi', 'sha', 'na'], priority: 'medium', variants: ['vibhishana'] },
        'vibhishana': { category: 'character', usesMurda: ['vi', 'bhi', 'sha', 'na'], preferredForm: 'wibhisana', priority: 'medium' },
        'drona': { category: 'character', usesMurda: ['dro', 'na'], priority: 'medium' },
        'kripacharya': { category: 'character', usesMurda: ['kri', 'pa', 'char', 'ya'], priority: 'medium' },
        'ashwatthama': { category: 'character', usesMurda: ['ash', 'wat', 'tha', 'ma'], priority: 'medium' },
        'jayadratha': { category: 'character', usesMurda: ['ja', 'ya', 'dra', 'tha'], priority: 'low' },
        'abhimanyu': { category: 'character', usesMurda: ['a', 'bhi', 'man', 'yu'], priority: 'medium' },
        'ghatotkacha': { category: 'character', usesMurda: ['gha', 'tot', 'ka', 'cha'], priority: 'low' },
        'drupada': { category: 'character', usesMurda: ['dru', 'pa', 'da'], priority: 'low' },
        'dhrishtadyumna': { category: 'character', usesMurda: ['dhri', 'shta', 'dyum', 'na'], priority: 'low' },
        'shikhandi': { category: 'character', usesMurda: ['shi', 'khan', 'di'], priority: 'low' },
        'gandhari': { category: 'character', usesMurda: ['gan', 'dha', 'ri'], priority: 'medium' },
        'dhritarashtra': { category: 'character', usesMurda: ['dhri', 'ta', 'rash', 'tra'], priority: 'medium' },
        'pandu': { category: 'character', usesMurda: ['pan', 'du'], priority: 'medium' },
        'madri': { category: 'character', usesMurda: ['mad', 'ri'], priority: 'low' },
        'subhadra': { category: 'character', usesMurda: ['sub', 'ha', 'dra'], priority: 'medium' },
        'uttara': { category: 'character', usesMurda: ['ut', 'ta', 'ra'], priority: 'low' },
        'parikshit': { category: 'character', usesMurda: ['pa', 'ri', 'kshit'], priority: 'low' },
        'janaka': { category: 'character', usesMurda: ['ja', 'na', 'ka'], priority: 'medium' },
        'dasharatha': { category: 'character', usesMurda: ['da', 'sha', 'ra', 'tha'], priority: 'medium' },
        'kausalya': { category: 'character', usesMurda: ['kau', 'sal', 'ya'], priority: 'medium' },
        'kaikeyi': { category: 'character', usesMurda: ['kai', 'ke', 'yi'], priority: 'medium' },
        'sumitra': { category: 'character', usesMurda: ['su', 'mi', 'tra'], priority: 'medium' },
        'shatrughna': { category: 'character', usesMurda: ['sha', 'tru', 'ghna'], priority: 'medium' },
        'urmila': { category: 'character', usesMurda: ['ur', 'mi', 'la'], priority: 'low' },
        'mandodari': { category: 'character', usesMurda: ['man', 'do', 'da', 'ri'], priority: 'low' },
        'kumbhakarna': { category: 'character', usesMurda: ['kum', 'bha', 'kar', 'na'], priority: 'medium' },
        'indrajit': { category: 'character', usesMurda: ['in', 'dra', 'jit'], priority: 'low' },
        'meghnad': { category: 'character', usesMurda: ['megh', 'nad'], priority: 'low' },
        'angada': { category: 'character', usesMurda: ['an', 'ga', 'da'], priority: 'low' },
        'jambawan': { category: 'character', usesMurda: ['jam', 'ba', 'wan'], priority: 'low' },
        'jatayu': { category: 'character', usesMurda: ['ja', 'ta', 'yu'], priority: 'medium' },
        'sampati': { category: 'character', usesMurda: ['sam', 'pa', 'ti'], priority: 'low' },
        'surpanakha': { category: 'character', usesMurda: ['sur', 'pa', 'na', 'kha'], priority: 'low' },
        'maricha': { category: 'character', usesMurda: ['ma', 'ri', 'cha'], priority: 'low' },
        'tataka': { category: 'character', usesMurda: ['ta', 'ta', 'ka'], priority: 'low' },
        'bali': { category: 'character', usesMurda: ['ba', 'li'], priority: 'medium' },
        'tara': { category: 'character', usesMurda: ['ta', 'ra'], priority: 'low' },
        'radha': { category: 'character', usesMurda: ['ra', 'dha'], priority: 'high' },
        'yashoda': { category: 'character', usesMurda: ['ya', 'sho', 'da'], priority: 'medium' },
        'nanda': { category: 'character', usesMurda: ['nan', 'da'], priority: 'medium' },
        'wasudewa': { category: 'character', usesMurda: ['wa', 'su', 'de', 'wa'], priority: 'medium', variants: ['vasudeva'] },
        'vasudeva': { category: 'character', usesMurda: ['va', 'su', 'de', 'va'], preferredForm: 'wasudewa', priority: 'medium' },
        'dewaki': { category: 'character', usesMurda: ['de', 'wa', 'ki'], priority: 'medium', variants: ['devaki'] },
        'devaki': { category: 'character', usesMurda: ['de', 'va', 'ki'], preferredForm: 'dewaki', priority: 'medium' },
        'kamsa': { category: 'character', usesMurda: ['kam', 'sa'], priority: 'medium' },
        'putana': { category: 'character', usesMurda: ['pu', 'ta', 'na'], priority: 'low' },
        'trinavarta': { category: 'character', usesMurda: ['tri', 'na', 'war', 'ta'], priority: 'low' },
        'bakasura': { category: 'character', usesMurda: ['ba', 'ka', 'su', 'ra'], priority: 'low' },
        'aghasura': { category: 'character', usesMurda: ['a', 'gha', 'su', 'ra'], priority: 'low' },
        'keshi': { category: 'character', usesMurda: ['ke', 'shi'], priority: 'low' },
        'chanura': { category: 'character', usesMurda: ['cha', 'nu', 'ra'], priority: 'low' },
        'mushtika': { category: 'character', usesMurda: ['mush', 'ti', 'ka'], priority: 'low' },
        'rukmi': { category: 'character', usesMurda: ['ruk', 'mi'], priority: 'low' },
        'rukmini': { category: 'character', usesMurda: ['ruk', 'mi', 'ni'], priority: 'medium' },
        'satyabhama': { category: 'character', usesMurda: ['sat', 'ya', 'bha', 'ma'], priority: 'low' },
        'balarama': { category: 'character', usesMurda: ['ba', 'la', 'ra', 'ma'], priority: 'medium' },
        'rohini': { category: 'character', usesMurda: ['ro', 'hi', 'ni'], priority: 'low' },
        'gopis': { category: 'character', usesMurda: ['go', 'pis'], priority: 'medium' },
        'gopika': { category: 'character', usesMurda: ['go', 'pi', 'ka'], priority: 'medium' },

        // SAGES - Expanded
        'walmiki': { category: 'sage', usesMurda: ['wal', 'mi', 'ki'], priority: 'medium', variants: ['valmiki'] },
        'valmiki': { category: 'sage', usesMurda: ['val', 'mi', 'ki'], preferredForm: 'walmiki', priority: 'medium' },
        'wasistha': { category: 'sage', usesMurda: ['wa', 'sish', 'tha'], priority: 'medium', variants: ['vasishtha'] },
        'vasishtha': { category: 'sage', usesMurda: ['va', 'sish', 'tha'], preferredForm: 'wasistha', priority: 'medium' },
        'wishwamitra': { category: 'sage', usesMurda: ['wish', 'wa', 'mi', 'tra'], priority: 'medium', variants: ['vishwamitra'] },
        'vishwamitra': { category: 'sage', usesMurda: ['vish', 'va', 'mi', 'tra'], preferredForm: 'wishwamitra', priority: 'medium' },
        'vyasa': { category: 'sage', usesMurda: ['vya', 'sa'], priority: 'medium' },
        'narada': { category: 'sage', usesMurda: ['na', 'ra', 'da'], priority: 'medium' },
        'agastya': { category: 'sage', usesMurda: ['a', 'gas', 'tya'], priority: 'medium' },
        'bharadwaja': { category: 'sage', usesMurda: ['bha', 'rad', 'wa', 'ja'], priority: 'medium', variants: ['bharadvaja'] },
        'bharadvaja': { category: 'sage', usesMurda: ['bha', 'rad', 'va', 'ja'], preferredForm: 'bharadwaja', priority: 'medium' },
        'atri': { category: 'sage', usesMurda: ['a', 'tri'], priority: 'medium' },
        'jamadagni': { category: 'sage', usesMurda: ['ja', 'ma', 'dag', 'ni'], priority: 'medium' },
        'gautama': { category: 'sage', usesMurda: ['gau', 'ta', 'ma'], priority: 'medium' },
        'kashyapa': { category: 'sage', usesMurda: ['kash', 'ya', 'pa'], priority: 'medium' },
        'angiras': { category: 'sage', usesMurda: ['an', 'gi', 'ras'], priority: 'medium' },
        'brighu': { category: 'sage', usesMurda: ['bri', 'ghu'], priority: 'medium' },
        'pulastya': { category: 'sage', usesMurda: ['pu', 'las', 'tya'], priority: 'low' },
        'pulaha': { category: 'sage', usesMurda: ['pu', 'la', 'ha'], priority: 'low' },
        'kratu': { category: 'sage', usesMurda: ['kra', 'tu'], priority: 'low' },
        'marichi': { category: 'sage', usesMurda: ['ma', 'ri', 'chi'], priority: 'low' },
        'daksha': { category: 'sage', usesMurda: ['dak', 'sha'], priority: 'medium' },
        'saptarishi': { category: 'sage', usesMurda: ['sap', 'ta', 'ri', 'shi'], priority: 'medium' },
        'durvasa': { category: 'sage', usesMurda: ['dur', 'wa', 'sa'], priority: 'medium' },
        'kapila': { category: 'sage', usesMurda: ['ka', 'pi', 'la'], priority: 'medium' },
        'patanjali': { category: 'sage', usesMurda: ['pa', 'tan', 'ja', 'li'], priority: 'medium' },
        'shankaracharya': { category: 'sage', usesMurda: ['shan', 'ka', 'ra', 'char', 'ya'], priority: 'medium' },
        'ramanuja': { category: 'sage', usesMurda: ['ra', 'ma', 'nu', 'ja'], priority: 'medium' },
        'madhwacharya': { category: 'sage', usesMurda: ['madh', 'wa', 'char', 'ya'], priority: 'medium' },
        'nimbarka': { category: 'sage', usesMurda: ['nim', 'bar', 'ka'], priority: 'low' },
        'wallabhacharya': { category: 'sage', usesMurda: ['wal', 'la', 'bha', 'char', 'ya'], priority: 'low', variants: ['vallabhacharya'] },
        'vallabhacharya': { category: 'sage', usesMurda: ['val', 'la', 'bha', 'char', 'ya'], preferredForm: 'wallabhacharya', priority: 'low' },
        'chaitanya': { category: 'sage', usesMurda: ['chai', 'tan', 'ya'], priority: 'medium' },
        'kabir': { category: 'sage', usesMurda: ['ka', 'bir'], priority: 'medium' },
        'tulsidas': { category: 'sage', usesMurda: ['tul', 'si', 'das'], priority: 'medium' },
        'surdas': { category: 'sage', usesMurda: ['sur', 'das'], priority: 'medium' },
        'meera': { category: 'sage', usesMurda: ['mi', 'ra'], priority: 'medium' },
        'ramakrishna': { category: 'sage', usesMurda: ['ra', 'ma', 'kri', 'shna'], priority: 'medium' },
        'wiwekannanda': { category: 'sage', usesMurda: ['wi', 'we', 'ka', 'nan', 'da'], priority: 'medium', variants: ['vivekananda'] },
        'vivekananda': { category: 'sage', usesMurda: ['vi', 've', 'ka', 'nan', 'da'], preferredForm: 'wiwekannanda', priority: 'medium' },

        // PLACES - Expanded
        'waikuntha': { category: 'place', usesMurda: ['wai', 'kun', 'tha'], priority: 'medium', variants: ['vaikuntha'] },
        'vaikuntha': { category: 'place', usesMurda: ['vai', 'kun', 'tha'], preferredForm: 'waikuntha', priority: 'medium' },
        'wrindawan': { category: 'place', usesMurda: ['wrin', 'da', 'wan'], priority: 'medium', variants: ['vrindavan'] },
        'vrindavan': { category: 'place', usesMurda: ['vrin', 'da', 'van'], preferredForm: 'wrindawan', priority: 'medium' },
        'kailash': { category: 'place', usesMurda: ['kai', 'lash'], priority: 'medium' },
        'dwaraka': { category: 'place', usesMurda: ['dwa', 'ra', 'ka'], priority: 'medium' },
        'dvaraka': { category: 'place', usesMurda: ['dva', 'ra', 'ka'], priority: 'medium' },
        'mathura': { category: 'place', usesMurda: ['ma', 'thu', 'ra'], priority: 'medium' },
        'ayodhya': { category: 'place', usesMurda: ['a', 'yodh', 'ya'], priority: 'medium' },
        'kurukshetra': { category: 'place', usesMurda: ['ku', 'ruk', 'she', 'tra'], priority: 'medium' },
        'lanka': { category: 'place', usesMurda: ['lan', 'ka'], priority: 'medium' },
        'gokula': { category: 'place', usesMurda: ['go', 'ku', 'la'], priority: 'medium' },
        'nandagram': { category: 'place', usesMurda: ['nan', 'da', 'gram'], priority: 'low' },
        'barsana': { category: 'place', usesMurda: ['bar', 'sa', 'na'], priority: 'low' },
        'govardhan': { category: 'place', usesMurda: ['go', 'war', 'dhan'], priority: 'medium' },
        'yamuna': { category: 'place', usesMurda: ['ya', 'mu', 'na'], priority: 'medium' },
        'ganga': { category: 'place', usesMurda: ['gan', 'ga'], priority: 'medium' },
        'saraswati': { category: 'place', usesMurda: ['sa', 'ras', 'wa', 'ti'], priority: 'medium' },
        'narmada': { category: 'place', usesMurda: ['nar', 'ma', 'da'], priority: 'medium' },
        'godawari': { category: 'place', usesMurda: ['go', 'da', 'wa', 'ri'], priority: 'medium', variants: ['godavari'] },
        'godavari': { category: 'place', usesMurda: ['go', 'da', 'va', 'ri'], preferredForm: 'godawari', priority: 'medium' },
        'kaweri': { category: 'place', usesMurda: ['ka', 'we', 'ri'], priority: 'medium', variants: ['kaveri'] },
        'kaveri': { category: 'place', usesMurda: ['ka', 've', 'ri'], preferredForm: 'kaweri', priority: 'medium' },
        'krishna': { category: 'place', usesMurda: ['kri', 'shna'], priority: 'medium' },
        'tungabhadra': { category: 'place', usesMurda: ['tun', 'ga', 'bha', 'dra'], priority: 'low' },
        'tapti': { category: 'place', usesMurda: ['tap', 'ti'], priority: 'low' },
        'mahanadi': { category: 'place', usesMurda: ['ma', 'ha', 'na', 'di'], priority: 'low' },
        'indus': { category: 'place', usesMurda: ['in', 'dus'], priority: 'low' },
        'sindhu': { category: 'place', usesMurda: ['sin', 'dhu'], priority: 'low' },
        'kashi': { category: 'place', usesMurda: ['ka', 'shi'], priority: 'medium' },
        'waranasi': { category: 'place', usesMurda: ['wa', 'ra', 'na', 'si'], priority: 'medium', variants: ['varanasi'] },
        'varanasi': { category: 'place', usesMurda: ['va', 'ra', 'na', 'si'], preferredForm: 'waranasi', priority: 'medium' },
        'prayaga': { category: 'place', usesMurda: ['pra', 'ya', 'ga'], priority: 'medium' },
        'allahabad': { category: 'place', usesMurda: ['al', 'la', 'ha', 'bad'], priority: 'medium' },
        'haridwar': { category: 'place', usesMurda: ['ha', 'ri', 'dwar'], priority: 'medium' },
        'rishikesh': { category: 'place', usesMurda: ['ri', 'shi', 'kesh'], priority: 'medium' },
        'badrinath': { category: 'place', usesMurda: ['bad', 'ri', 'nath'], priority: 'medium' },
        'kedarnath': { category: 'place', usesMurda: ['ke', 'dar', 'nath'], priority: 'medium' },
        'gangotri': { category: 'place', usesMurda: ['gan', 'go', 'tri'], priority: 'medium' },
        'yamunotri': { category: 'place', usesMurda: ['ya', 'mu', 'no', 'tri'], priority: 'medium' },
        'amarnath': { category: 'place', usesMurda: ['a', 'mar', 'nath'], priority: 'medium' },
        'somnath': { category: 'place', usesMurda: ['som', 'nath'], priority: 'medium' },
        'dwarkadish': { category: 'place', usesMurda: ['dwar', 'ka', 'dish'], priority: 'medium' },
        'jagannath': { category: 'place', usesMurda: ['ja', 'gan', 'nath'], priority: 'medium' },
        'puri': { category: 'place', usesMurda: ['pu', 'ri'], priority: 'medium' },
        'rameswaram': { category: 'place', usesMurda: ['ra', 'mesh', 'wa', 'ram'], priority: 'medium' },
        'kanyakumari': { category: 'place', usesMurda: ['kan', 'ya', 'ku', 'ma', 'ri'], priority: 'medium' },
        'tirupati': { category: 'place', usesMurda: ['ti', 'ru', 'pa', 'ti'], priority: 'medium' },
        'tirumala': { category: 'place', usesMurda: ['ti', 'ru', 'ma', 'la'], priority: 'medium' },
        'chidambaram': { category: 'place', usesMurda: ['chi', 'dam', 'ba', 'ram'], priority: 'low' },
        'madurai': { category: 'place', usesMurda: ['ma', 'du', 'rai'], priority: 'low' },
        'thanjavur': { category: 'place', usesMurda: ['than', 'ja', 'wur'], priority: 'low' },
        'kanchipuram': { category: 'place', usesMurda: ['kan', 'chi', 'pu', 'ram'], priority: 'low' },
        'mamallapuram': { category: 'place', usesMurda: ['ma', 'mal', 'la', 'pu', 'ram'], priority: 'low' },
        'hampi': { category: 'place', usesMurda: ['ham', 'pi'], priority: 'low' },
        'wittala': { category: 'place', usesMurda: ['wit', 'ta', 'la'], priority: 'low', variants: ['vittala'] },
        'vittala': { category: 'place', usesMurda: ['vit', 'ta', 'la'], preferredForm: 'wittala', priority: 'low' },
        'pandharpur': { category: 'place', usesMurda: ['pan', 'dhar', 'pur'], priority: 'low' },
        'shirdi': { category: 'place', usesMurda: ['shir', 'di'], priority: 'medium' },
        'nashik': { category: 'place', usesMurda: ['na', 'shik'], priority: 'low' },
        'ujjain': { category: 'place', usesMurda: ['uj', 'jain'], priority: 'medium' },
        'omkareshwar': { category: 'place', usesMurda: ['om', 'ka', 'resh', 'war'], priority: 'low' },
        'mahakaleshwar': { category: 'place', usesMurda: ['ma', 'ha', 'ka', 'lesh', 'war'], priority: 'low' },
        'pushkar': { category: 'place', usesMurda: ['push', 'kar'], priority: 'low' },
        'mount meru': { category: 'place', usesMurda: ['moun', 'te', 'me', 'ru'], priority: 'low' },
        'meru': { category: 'place', usesMurda: ['me', 'ru'], priority: 'medium' },
        'mandara': { category: 'place', usesMurda: ['man', 'da', 'ra'], priority: 'low' },
        'kailasa': { category: 'place', usesMurda: ['kai', 'la', 'sa'], priority: 'medium' },
        'goloka': { category: 'place', usesMurda: ['go', 'lo', 'ka'], priority: 'medium' },
        'swarga': { category: 'place', usesMurda: ['swar', 'ga'], priority: 'medium' },
        'naraka': { category: 'place', usesMurda: ['na', 'ra', 'ka'], priority: 'medium' },
        'patala': { category: 'place', usesMurda: ['pa', 'ta', 'la'], priority: 'low' },
        'bhuloka': { category: 'place', usesMurda: ['bhu', 'lo', 'ka'], priority: 'low' },
        'bhuwarloka': { category: 'place', usesMurda: ['bhu', 'war', 'lo', 'ka'], priority: 'low' },
        'swarloka': { category: 'place', usesMurda: ['swar', 'lo', 'ka'], priority: 'low' },
        'maharloka': { category: 'place', usesMurda: ['ma', 'har', 'lo', 'ka'], priority: 'low' },
        'janaloka': { category: 'place', usesMurda: ['ja', 'na', 'lo', 'ka'], priority: 'low' },
        'tapoloka': { category: 'place', usesMurda: ['ta', 'po', 'lo', 'ka'], priority: 'low' },
        'satyaloka': { category: 'place', usesMurda: ['sat', 'ya', 'lo', 'ka'], priority: 'low' },
        'brahmaloka': { category: 'place', usesMurda: ['brah', 'ma', 'lo', 'ka'], priority: 'low' },

        // GENERAL TERMS - Expanded
        'dewa': { category: 'general', usesMurda: ['de', 'wa'], priority: 'high', variants: ['deva'] },
        'deva': { category: 'general', usesMurda: ['de', 'va'], preferredForm: 'dewa', priority: 'high' },
        'sewa': { category: 'general', usesMurda: ['se', 'wa'], priority: 'medium', variants: ['seva'] },
        'seva': { category: 'general', usesMurda: ['se', 'va'], preferredForm: 'sewa', priority: 'medium' },
        'wisnawa': { category: 'sect', usesMurda: ['wis', 'na', 'wa'], priority: 'medium', variants: ['vaishnava'] },
        'vaishnava': { category: 'sect', usesMurda: ['vais', 'na', 'va'], preferredForm: 'wisnawa', priority: 'medium' },
        'shaiva': { category: 'sect', usesMurda: ['shai', 'wa'], priority: 'medium' },
        'shakta': { category: 'sect', usesMurda: ['shak', 'ta'], priority: 'medium' },
        'smarta': { category: 'sect', usesMurda: ['smar', 'ta'], priority: 'low' },
        'sanatan': { category: 'general', usesMurda: ['sa', 'na', 'tan'], priority: 'medium' },
        'sanatana': { category: 'general', usesMurda: ['sa', 'na', 'ta', 'na'], priority: 'medium' },
        'dharmic': { category: 'general', usesMurda: ['dhar', 'mic'], priority: 'medium' },
        'adharma': { category: 'general', usesMurda: ['a', 'dhar', 'ma'], priority: 'medium' },
        'paap': { category: 'general', usesMurda: ['paap'], priority: 'medium' },
        'punya': { category: 'general', usesMurda: ['pun', 'ya'], priority: 'medium' },
        'samskar': { category: 'general', usesMurda: ['sam', 'skar'], priority: 'medium' },
        'samskaras': { category: 'general', usesMurda: ['sam', 'ska', 'ras'], priority: 'medium' },
        'sanskara': { category: 'general', usesMurda: ['san', 'ska', 'ra'], priority: 'medium' },
        'sanskaras': { category: 'general', usesMurda: ['san', 'ska', 'ras'], priority: 'medium' },
        'yuga': { category: 'general', usesMurda: ['yu', 'ga'], priority: 'medium' },
        'satyayuga': { category: 'general', usesMurda: ['sat', 'ya', 'yu', 'ga'], priority: 'medium' },
        'tretayuga': { category: 'general', usesMurda: ['tre', 'ta', 'yu', 'ga'], priority: 'medium' },
        'dwaparayuga': { category: 'general', usesMurda: ['dwa', 'pa', 'ra', 'yu', 'ga'], priority: 'medium' },
        'kaliyuga': { category: 'general', usesMurda: ['ka', 'li', 'yu', 'ga'], priority: 'medium' },
        'kalpas': { category: 'general', usesMurda: ['kal', 'pas'], priority: 'low' },
        'manvantara': { category: 'general', usesMurda: ['man', 'wan', 'ta', 'ra'], priority: 'low' },
        'manu': { category: 'general', usesMurda: ['ma', 'nu'], priority: 'medium' },
        'warna': { category: 'general', usesMurda: ['war', 'na'], priority: 'medium', variants: ['varna'] },
        'varna': { category: 'general', usesMurda: ['var', 'na'], preferredForm: 'warna', priority: 'medium' },
        'ashrama': { category: 'general', usesMurda: ['ash', 'ra', 'ma'], priority: 'medium' },
        'jati': { category: 'general', usesMurda: ['ja', 'ti'], priority: 'medium' },
        'gotra': { category: 'general', usesMurda: ['go', 'tra'], priority: 'medium' },
        'kuladewaata': { category: 'general', usesMurda: ['ku', 'la', 'de', 'wa', 'ta'], priority: 'low' },
        'kuladewi': { category: 'general', usesMurda: ['ku', 'la', 'de', 'wi'], priority: 'low' },
        'ishtadewata': { category: 'general', usesMurda: ['ish', 'ta', 'de', 'wa', 'ta'], priority: 'medium' },
        'aradhya': { category: 'general', usesMurda: ['a', 'radh', 'ya'], priority: 'medium' },
        'upasana': { category: 'general', usesMurda: ['u', 'pa', 'sa', 'na'], priority: 'medium' },
        'puja': { category: 'general', usesMurda: ['pu', 'ja'], priority: 'high' },
        'yajna': { category: 'general', usesMurda: ['yaj', 'na'], priority: 'medium' },
        'yagya': { category: 'general', usesMurda: ['yag', 'ya'], priority: 'medium' },
        'hawan': { category: 'general', usesMurda: ['ha', 'wan'], priority: 'medium' },
        'homa': { category: 'general', usesMurda: ['ho', 'ma'], priority: 'medium' },
        'aarti': { category: 'general', usesMurda: ['aar', 'ti'], priority: 'medium' },
    }

    const balineseMapping = {
        'ka': '\u1B13', 'kha': '\u1B14', 'ga': '\u1B15', 'gha': '\u1B16', 'nga': '\u1B17',
        'ca': '\u1B18', 'cha': '\u1B19', 'ja': '\u1B1A', 'jha': '\u1B1B', 'nya': '\u1B1C',
        'tha': '\u1B1D', 'thha': '\u1B1E', 'dha': '\u1B1F', 'dhha': '\u1B20', 'nna': '\u1B21',
        'ta': '\u1B22', 'ttha': '\u1B23', 'da': '\u1B24', 'ddha': '\u1B25', 'na': '\u1B26',
        'pa': '\u1B27', 'pha': '\u1B28', 'ba': '\u1B29', 'bha': '\u1B2A', 'ma': '\u1B2B',
        'ya': '\u1B2C', 'ra': '\u1B2D', 'la': '\u1B2E',
        'wa': '\u1B2F', 'va': '\u1B2F',
        'sha': '\u1B30', 'ssa': '\u1B31', 'sa': '\u1B32', 'ha': '\u1B33',

        'kha_murda': '\u1B14', 'gha_murda': '\u1B16', 'cha_murda': '\u1B19', 'jha_murda': '\u1B1B',
        'tha_murda': '\u1B1D', 'dha_murda': '\u1B1F', 'nna_murda': '\u1B21', 'pha_murda': '\u1B28',
        'bha_murda': '\u1B2A', 'sha_murda': '\u1B30',

        'a': '\u1B05', 'i': '\u1B07', 'u': '\u1B09', 'e': '\u1B0F', 'o': '\u1B11',
        'aa': '\u1B05\u1B35', 'ii': '\u1B07\u1B37', 'uu': '\u1B09\u1B39',

        'aa_mark': '\u1B35', 'i_mark': '\u1B36', 'ii_mark': '\u1B37',
        'u_mark': '\u1B38', 'uu_mark': '\u1B39', 'e_mark': '\u1B3E', 'o_mark': '\u1B40',

        'ng': '\u1B02',
        'r_sound': '\u1B03',
        'h_sound': '\u1B04',
        'virama': '\u1B44',
        'om': '\u1B00',

        '0': '\u1B50', '1': '\u1B51', '2': '\u1B52', '3': '\u1B53', '4': '\u1B54',
        '5': '\u1B55', '6': '\u1B56', '7': '\u1B57', '8': '\u1B58', '9': '\u1B59',

        'dot': '\u1B5F',
        'comma': '\u1B5E',
        'space': '\u200B'
    }

    const reverseMapping = {}
    Object.entries(balineseMapping).forEach(([latin, balinese]) => {
        if (balinese && !latin.includes('_mark') && !latin.includes('_murda')) {
            // For reverse mapping, we'll prefer 'pa' over 'fa' since they map to the same character
            // This means F will be converted to P in reverse conversion
            if (latin !== 'fa' && latin !== 'f') { // Skip FA and F to avoid conflicts with PA
                reverseMapping[balinese] = latin
            }
        }
    })

    const vowelMarks = {
        '\u1B35': 'aa',
        '\u1B36': 'i',
        '\u1B37': 'ii',
        '\u1B38': 'u',
        '\u1B39': 'uu',
        '\u1B3E': 'e',
        '\u1B40': 'o'
    }

    const isVowel = (char) => {
        return ['a', 'i', 'u', 'e', 'o'].includes(char?.toLowerCase())
    }

    const isConsonant = (char) => {
        const consonants = 'bcdfghjklmnpqrstvwxyz'
        return consonants.includes(char?.toLowerCase())
    }

    const isPunctuation = (char) => {
        return '.,!?;:()[]{}"\'-'.includes(char)
    }

    const normalizeConsonant = (char) => {
        if (char?.toLowerCase() === 'v') return 'w'
        if (char?.toLowerCase() === 'f') return 'p' // F -> P mapping
        return char?.toLowerCase()
    }

    const isNonNativeSound = (char) => {
        return ['f'].includes(char?.toLowerCase())
    }

    const normalizeVW = (word) => {
        return word
            .replace(/^v/i, 'w')
            .replace(/([aeiou])v/gi, '$1w')
    }

    const detectSanskritWord = (word) => {
        const normalizedWord = word.toLowerCase()

        if (sanskritDatabase[normalizedWord]) {
            return sanskritDatabase[normalizedWord]
        }

        const normalizedForm = normalizeVW(normalizedWord)
        if (sanskritDatabase[normalizedForm]) {
            return {
                ...sanskritDatabase[normalizedForm],
                originalForm: normalizedWord,
                normalizedTo: normalizedForm
            }
        }

        const reversedForm = normalizedWord
            .replace(/^w/i, 'v')
            .replace(/([aeiou])w/gi, '$1v')

        if (sanskritDatabase[reversedForm]) {
            return {
                ...sanskritDatabase[reversedForm],
                originalForm: normalizedWord,
                normalizedTo: reversedForm
            }
        }

        return null
    }

    const getWordsFromText = (text) => {
        return text.toLowerCase().split(/[\s.,!?;:()[\\]{}"\'-]+/).filter(word => word.length > 0)
    }

    const isStartOfSanskritWord = (text, position) => {
        if (transliterationMode === 'bali') return false
        if (transliterationMode === 'sanskrit') return true

        const words = getWordsFromText(text)
        let currentPos = 0

        for (const word of words) {
            const wordStart = text.toLowerCase().indexOf(word, currentPos)
            const wordEnd = wordStart + word.length

            if (position >= wordStart && position < wordEnd) {
                const sanskritInfo = detectSanskritWord(word)
                return sanskritInfo !== null
            }
            currentPos = wordEnd
        }

        return false
    }

    const convertToLatin = useCallback((balineseText) => {
        if (!balineseText) return ''

        let result = ''
        let i = 0

        while (i < balineseText.length) {
            let currentChar = balineseText[i]
            let matched = false

            if (currentChar === '\u200B') {
                result += ' '
                i++
                continue
            }

            for (let num = 0; num <= 9; num++) {
                if (currentChar === balineseMapping[num.toString()]) {
                    result += num.toString()
                    matched = true
                    break
                }
            }

            if (matched) {
                i++
                continue
            }

            if (currentChar === balineseMapping['dot']) {
                result += '.'
                i++
                continue
            }
            if (currentChar === balineseMapping['comma']) {
                result += ','
                i++
                continue
            }

            if (currentChar === balineseMapping['om']) {
                result += 'om'
                i++
                continue
            }

            if (currentChar === balineseMapping['ng']) {
                result += 'ng'
                i++
                continue
            }

            let consonantFound = false
            for (const [latin, balinese] of Object.entries(balineseMapping)) {
                if (balinese === currentChar && !latin.includes('_mark') && !latin.includes('_murda') && latin !== 'virama') {
                    let vowelAdded = false

                    if (i + 1 < balineseText.length) {
                        const nextChar = balineseText[i + 1]

                        if (nextChar === balineseMapping['virama']) {
                            if (latin.endsWith('a')) {
                                result += latin.slice(0, -1)
                            } else {
                                result += latin
                            }
                            i += 2
                            consonantFound = true
                            break
                        }

                        for (const [vowelChar, vowelLatin] of Object.entries(vowelMarks)) {
                            if (nextChar === vowelChar) {
                                if (latin.endsWith('a')) {
                                    result += latin.slice(0, -1) + vowelLatin
                                } else {
                                    result += latin + vowelLatin
                                }
                                i += 2
                                vowelAdded = true
                                consonantFound = true
                                break
                            }
                        }
                    }

                    if (!vowelAdded && !consonantFound) {
                        result += latin
                        i++
                        consonantFound = true
                    }
                    break
                }
            }

            if (consonantFound) {
                continue
            }

            let vowelFound = false
            for (const [latin, balinese] of Object.entries(balineseMapping)) {
                if (balinese === currentChar && ['a', 'i', 'u', 'e', 'o', 'aa', 'ii', 'uu'].includes(latin)) {
                    result += latin
                    vowelFound = true
                    break
                }
            }

            if (vowelFound) {
                i++
                continue
            }

            result += currentChar
            i++
        }

        return result
    }, [])

    const convertToBalinese = useCallback((text) => {
        if (!text) return ''

        let result = ''
        let i = 0
        const normalizedText = text.toLowerCase().trim()

        while (i < normalizedText.length) {
            let matched = false
            let currentChar = normalizedText[i]

            if (currentChar === ' ') {
                result += '\u200B'
                i++
                continue
            }

            if (currentChar === '.') {
                result += balineseMapping['dot'] || '.'
                i++
                continue
            }
            if (currentChar === ',') {
                result += balineseMapping['comma'] || ','
                i++
                continue
            }

            if (/[0-9]/.test(currentChar)) {
                result += balineseMapping[currentChar] || currentChar
                i++
                continue
            }

            const isSanskritContext = isStartOfSanskritWord(normalizedText, i)

            let lookAhead = ''
            let maxLookAhead = Math.min(4, normalizedText.length - i)

            for (let j = 0; j < maxLookAhead; j++) {
                lookAhead += normalizedText[i + j]

                let syllableFound = false

                for (let len = Math.min(4, lookAhead.length); len >= 1; len--) {
                    let substr = lookAhead.substring(0, len)

                    if (len === 4 && ['thha', 'dhha', 'ttha', 'ddha'].includes(substr)) {
                        const key = isSanskritContext ? substr + '_murda' : substr
                        result += balineseMapping[key] || balineseMapping[substr]
                        i += len
                        matched = true
                        syllableFound = true
                        break
                    }

                    if (len === 3 && ['nga', 'nya', 'nna', 'kha', 'gha', 'cha', 'jha', 'tha', 'dha', 'pha', 'bha', 'sha', 'ssa'].includes(substr)) {
                        const murdaKey = substr + '_murda'
                        if (isSanskritContext && balineseMapping[murdaKey]) {
                            result += balineseMapping[murdaKey]
                        } else {
                            result += balineseMapping[substr]
                        }
                        i += len
                        matched = true
                        syllableFound = true
                        break
                    }

                    if (len === 2 && substr === 'ng') {
                        result += balineseMapping['ng']
                        i += len
                        matched = true
                        syllableFound = true
                        break
                    }

                    if (len === 2 && ['aa', 'ii', 'uu'].includes(substr)) {
                        if (i === 0 || normalizedText[i - 1] === ' ' || !isConsonant(normalizedText[i - 1])) {
                            result += balineseMapping[substr]
                        } else {
                            result += balineseMapping[substr.charAt(0) + '_mark']
                        }
                        i += len
                        matched = true
                        syllableFound = true
                        break
                    }

                    if (len === 2 && ['fa'].includes(substr)) {
                        // Handle FA specifically
                        result += balineseMapping['fa'] // This gives us ᬧ (PA)
                        i += len
                        matched = true
                        syllableFound = true
                        break
                    }

                    if (len === 2 && isConsonant(substr[0]) && isVowel(substr[1])) {
                        const normalizedConsonant = normalizeConsonant(substr[0])
                        const consonantWithA = normalizedConsonant + 'a'

                        const murdaKey = consonantWithA + '_murda'
                        let consonantBase = balineseMapping[consonantWithA]

                        if (isSanskritContext && balineseMapping[murdaKey]) {
                            consonantBase = balineseMapping[murdaKey]
                        }

                        if (consonantBase) {
                            if (substr[1] === 'a') {
                                result += consonantBase
                            } else {
                                result += consonantBase + balineseMapping[substr[1] + '_mark']
                            }
                            i += len
                            matched = true
                            syllableFound = true
                            break
                        }
                    }
                }

                if (syllableFound) break
            }

            if (!matched) {
                if (isVowel(currentChar)) {
                    if (i === 0 || normalizedText[i - 1] === ' ' || !isConsonant(normalizedText[i - 1])) {
                        result += balineseMapping[currentChar] || currentChar
                    } else {
                        result += balineseMapping[currentChar + '_mark'] || currentChar
                    }
                    i++
                    continue
                }

                if (isConsonant(currentChar)) {
                    const nextChar = i + 1 < normalizedText.length ? normalizedText[i + 1] : null
                    const normalizedConsonant = normalizeConsonant(currentChar)
                    const consonantWithA = normalizedConsonant + 'a'

                    const murdaKey = consonantWithA + '_murda'
                    let consonantBase = balineseMapping[consonantWithA]

                    if (isSanskritContext && balineseMapping[murdaKey]) {
                        consonantBase = balineseMapping[murdaKey]
                    }

                    if (consonantBase) {
                        if (nextChar === null ||
                            nextChar === ' ' ||
                            isPunctuation(nextChar) ||
                            /[0-9]/.test(nextChar) ||
                            isConsonant(nextChar)) {
                            result += consonantBase + balineseMapping['virama']
                        } else {
                            if (i + 1 >= normalizedText.length || !isVowel(nextChar)) {
                                result += consonantBase + balineseMapping['virama']
                            } else {
                                result += consonantBase
                            }
                        }
                    } else {
                        result += currentChar
                    }
                    i++
                    continue
                }

                result += currentChar
                i++
            }
        }

        return result
    }, [transliterationMode])

    useEffect(() => {
        if (isReverseMode) {
            const converted = convertToLatin(balineseText)
            setLatinText(converted)
        } else {
            const converted = convertToBalinese(latinText)
            setBalineseText(converted)
        }
    }, [latinText, balineseText, convertToBalinese, convertToLatin, isReverseMode])

    const handleModeSwitch = () => {
        setIsReverseMode(!isReverseMode)
    }

    const handleSwapTexts = () => {
        const tempLatin = latinText
        const tempBalinese = balineseText
        setLatinText(tempBalinese)
        setBalineseText(tempLatin)
        setIsReverseMode(!isReverseMode)
    }

    const handleCopyLeft = async () => {
        try {
            const textToCopy = isReverseMode ? balineseText : latinText
            await navigator.clipboard.writeText(textToCopy)
            setCopySuccessLeft(true)
            setTimeout(() => setCopySuccessLeft(false), 2000)
        } catch (err) {
            console.error('Failed to copy text: ', err)
        }
    }

    const handleCopyRight = async () => {
        try {
            const textToCopy = isReverseMode ? latinText : balineseText
            await navigator.clipboard.writeText(textToCopy)
            setCopySuccessRight(true)
            setTimeout(() => setCopySuccessRight(false), 2000)
        } catch (err) {
            console.error('Failed to copy text: ', err)
        }
    }

    const handleDownloadLeft = () => {
        const element = document.createElement('a')
        const textToDownload = isReverseMode ? balineseText : latinText
        const filename = isReverseMode ? 'balinese_text.txt' : 'latin_text.txt'
        const file = new Blob([textToDownload], { type: 'text/plain;charset=utf-8' })
        element.href = URL.createObjectURL(file)
        element.download = filename
        document.body.appendChild(element)
        element.click()
        document.body.removeChild(element)
    }

    const handleDownloadRight = () => {
        const element = document.createElement('a')
        const textToDownload = isReverseMode ? latinText : balineseText
        const filename = isReverseMode ? 'latin_text.txt' : 'balinese_text.txt'
        const file = new Blob([textToDownload], { type: 'text/plain;charset=utf-8' })
        element.href = URL.createObjectURL(file)
        element.download = filename
        document.body.appendChild(element)
        element.click()
        document.body.removeChild(element)
    }

    const handleReset = () => {
        setLatinText('')
        setBalineseText('')
    }

    return (
        <div className="container-fluid py-4">
            <div className="row justify-content-center">
                <div className="col-12 col-lg-10">
                    <div className="text-center mb-4">
                        <div className="d-flex justify-content-between align-items-start mb-3">
                            <div></div>
                            <div className="text-center flex-grow-1">
                                <h1 className="display-6 fw-bold text-primary mb-3">
                                    <Languages className="me-3" size={48} />
                                    {t.title}
                                </h1>
                            </div>
                            <div>
                                <LanguageSwitcher
                                    locale={locale}
                                    setLocale={setLocale}
                                    darkMode={darkMode}
                                />
                            </div>
                        </div>
                        <p className="lead text-muted">
                            {t.subtitle}
                        </p>
                    </div>

                    <div className="row g-4 mb-4">
                        <div className="col-md-5">
                            <div className="card h-100">
                                <div className={`card-header ${isReverseMode ? 'bg-success' : 'bg-primary'} text-white`}>
                                    <h5 className="mb-0">
                                        <i className="bi bi-keyboard me-2"></i>
                                        {isReverseMode ? t.balineseInput : t.latinInput}
                                    </h5>
                                </div>
                                <div className="card-body">
                                    <textarea
                                        className="form-control"
                                        value={isReverseMode ? balineseText : latinText}
                                        onChange={(e) => isReverseMode ? setBalineseText(e.target.value) : setLatinText(e.target.value)}
                                        placeholder={isReverseMode ? t.balineseplaceholder : t.placeholder}
                                        rows="8"
                                        style={{
                                            resize: 'vertical',
                                            fontSize: isReverseMode ? '14px' : '14px',
                                            lineHeight: isReverseMode ? '1.5' : '1.5',
                                            height: '250px'
                                        }}
                                    />
                                    <div className="mt-3 d-flex gap-2">
                                        <button
                                            onClick={handleCopyLeft}
                                            className="btn btn-outline-primary"
                                            disabled={isReverseMode ? !balineseText : !latinText}
                                        >
                                            {copySuccessLeft ? (
                                                <>
                                                    <CheckCircle size={16} className="me-2" />
                                                    {t.copied}
                                                </>
                                            ) : (
                                                <>
                                                    <Copy size={16} className="me-2" />
                                                    {t.copy}
                                                </>
                                            )}
                                        </button>
                                        <button
                                            onClick={handleDownloadLeft}
                                            className="btn btn-outline-success"
                                            disabled={isReverseMode ? !balineseText : !latinText}
                                        >
                                            <Download size={16} className="me-2" />
                                            {t.download}
                                        </button>
                                        <button
                                            onClick={handleReset}
                                            className="btn btn-outline-secondary"
                                        >
                                            <RotateCcw size={16} className="me-2" />
                                            {t.reset}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-2 d-flex align-items-center justify-content-center">
                            <div className="text-center">
                                <button
                                    onClick={handleModeSwitch}
                                    className={`btn ${isReverseMode ? 'btn-outline-primary' : 'btn-primary'} mb-3`}
                                    style={{ minWidth: '150px' }}
                                >
                                    <ArrowLeftRight size={16} className="me-2" />
                                    {isReverseMode ? t.switchToNormal : t.switchToReverse}
                                </button>
                                <div className="alert alert-info py-2 px-3 mb-0">
                                    <small>
                                        {isReverseMode ? t.realtimeReverse : t.realtimeConversion}
                                    </small>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-5">
                            <div className="card h-100">
                                <div className={`card-header ${isReverseMode ? 'bg-primary' : 'bg-success'} text-white`}>
                                    <h5 className="mb-0">
                                        {isReverseMode ? t.latinOutput : t.balineseOutput}
                                    </h5>
                                </div>
                                <div className="card-body">
                                    <textarea
                                        className="form-control"
                                        value={isReverseMode ? latinText : balineseText}
                                        placeholder={isReverseMode ? t.latinOutputPlaceholder : t.outputPlaceholder}
                                        readOnly
                                        style={{
                                            height: '250px',
                                            resize: 'vertical',
                                            fontSize: isReverseMode ? '14px' : '14px',
                                            lineHeight: isReverseMode ? '1.5' : '1.5'
                                        }}
                                    />
                                    <div className="mt-3 d-flex gap-2">
                                        <button
                                            onClick={handleCopyRight}
                                            className="btn btn-outline-primary"
                                            disabled={isReverseMode ? !latinText : !balineseText}
                                        >
                                            {copySuccessRight ? (
                                                <>
                                                    <CheckCircle size={16} className="me-2" />
                                                    {t.copied}
                                                </>
                                            ) : (
                                                <>
                                                    <Copy size={16} className="me-2" />
                                                    {t.copy}
                                                </>
                                            )}
                                        </button>
                                        <button
                                            onClick={handleDownloadRight}
                                            className="btn btn-outline-success"
                                            disabled={isReverseMode ? !latinText : !balineseText}
                                        >
                                            <Download size={16} className="me-2" />
                                            {t.download}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {!isReverseMode && (
                        <div className="card mb-4">
                            <div className="card-header">
                                <h5 className="mb-0">
                                    <Settings size={20} className="me-2" />
                                    {t.transliterationMode}
                                </h5>
                            </div>
                            <div className="card-body">
                                <div className="row g-3">
                                    <div className="col-auto">
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="transliterationMode"
                                                id="auto"
                                                value="auto"
                                                checked={transliterationMode === 'auto'}
                                                onChange={(e) => setTransliterationMode(e.target.value)}
                                            />
                                            <label className="form-check-label" htmlFor="auto">
                                                <strong>{t.autoDetect}</strong> ({t.sanskritTooltip})
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-auto">
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="transliterationMode"
                                                id="sanskrit"
                                                value="sanskrit"
                                                checked={transliterationMode === 'sanskrit'}
                                                onChange={(e) => setTransliterationMode(e.target.value)}
                                            />
                                            <label className="form-check-label" htmlFor="sanskrit">
                                                <strong>{t.sanskrit}</strong> ({t.alwaysUseMurda})
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-auto">
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="transliterationMode"
                                                id="bali"
                                                value="bali"
                                                checked={transliterationMode === 'bali'}
                                                onChange={(e) => setTransliterationMode(e.target.value)}
                                            />
                                            <label className="form-check-label" htmlFor="bali">
                                                <strong>{t.balinese}</strong> ({t.noMurda})
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <small className="text-muted">
                                        {t.autoDetectDescription} {' '}
                                        {t.databaseInfo.replace('{count}', Object.keys(sanskritDatabase).length)}
                                    </small>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default LatinBalineseConverter