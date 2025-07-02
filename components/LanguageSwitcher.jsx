import React, { useCallback } from 'react';
import { Globe } from 'lucide-react';

export const translations = {
    en: {
        appTitle: 'Balinese Script Converter',
        appSubtitle: 'Latin to Aksara Bali with Sanskrit Support',
        darkMode: 'Dark Mode',
        lightMode: 'Light Mode',
        madeWith: 'Made with passion for preserving Balinese culture',
        openSource: 'Open source • Educational • Cultural preservation',
        footerNote: 'This tool is created for educational purposes and cultural preservation. Based on traditional Balinese script conventions with enhanced Sanskrit support.',
    },
    id: {
        appTitle: 'Konverter Aksara Bali',
        appSubtitle: 'Latin ke Aksara Bali dengan Dukungan Sansekerta',
        darkMode: 'Mode Gelap',
        lightMode: 'Mode Terang',
        madeWith: 'Dibuat dengan semangat untuk melestarikan budaya Bali',
        openSource: 'Sumber terbuka • Edukasi • Pelestarian budaya',
        footerNote: 'Alat ini dibuat untuk tujuan pendidikan dan pelestarian budaya. Berdasarkan konvensi aksara Bali tradisional dengan dukungan Sansekerta yang disempurnakan.',
    },
};

const LanguageSwitcher = ({ locale, setLocale, darkMode }) => {
    // FIXED: Memoized handler to prevent unnecessary re-renders
    const handleLocaleChange = useCallback((e) => {
        const newLocale = e.target.value;

        // Only call setLocale if the value actually changed
        if (newLocale !== locale && (newLocale === 'en' || newLocale === 'id')) {
            setLocale(newLocale);
        }
    }, [locale, setLocale]);

    return (
        <div className="d-flex align-items-center">
            <Globe size={16} className="me-2" />
            <select
                className={`form-select form-select-sm ${darkMode ? 'bg-dark text-white border-secondary' : 'bg-white text-dark'}`}
                value={locale}
                onChange={handleLocaleChange}
                aria-label="Select language"
                style={{ minWidth: '120px' }}
            >
                <option value="en">English</option>
                <option value="id">Bahasa Indonesia</option>
            </select>
        </div>
    );
};

export default LanguageSwitcher;