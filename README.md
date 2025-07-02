# Balinese Script Converter

A comprehensive web application for converting Latin text to Balinese script (Aksara Bali) with advanced Sanskrit support and V=W equivalency.

![Balinese Script Converter](https://img.shields.io/badge/Balinese-Script%20Converter-blue?style=for-the-badge&logo=react)
![Next.js](https://img.shields.io/badge/Next.js-14.0.4-black?style=flat&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue?style=flat&logo=typescript)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.2-purple?style=flat&logo=bootstrap)

## 🌟 Features

- **Real-time Conversion**: Character-by-character processing with instant results
- **Sanskrit Support**: Comprehensive database with 100+ Sanskrit terms
- **V=W Equivalency**: Treats V and W as equivalent (Vishnu = Wisnu, Deva = Dewa)
- **Auto-detection**: Automatically identifies Sanskrit words for proper murda forms
- **Multiple Modes**: Auto-detect, Sanskrit-only, or Balinese-only transliteration
- **Mobile-first Design**: Responsive layout optimized for all devices
- **Dark/Light Theme**: User preference support with system detection
- **PWA Ready**: Install as a native app with offline capabilities
- **Cultural Preservation**: Educational tool for preserving Balinese culture

## 🚀 Tech Stack

- **Framework**: Next.js 14 with TypeScript
- **Styling**: Bootstrap 5.3 + Custom CSS
- **Icons**: Lucide React
- **Fonts**: Noto Sans Balinese, Inter
- **PWA**: Manifest.json with service worker support
- **Build**: Static export for easy deployment

## 📁 Project Structure

```
balinese-script-converter/
├── README.md
├── package.json
├── next.config.js
├── tsconfig.json
├── setup.sh (Unix/Linux/Mac)
├── setup.bat (Windows)
├── public/
│   ├── favicon.ico
│   ├── manifest.json
│   ├── robots.txt
│   └── icons/
├── styles/
│   └── globals.css
├── pages/
│   ├── _app.tsx
│   ├── _document.tsx
│   └── index.tsx
└── components/
    └── LatinBalineseConverter.tsx
```

## ⚡ Quick Start

### Option 1: Automated Setup (Recommended)

#### For Unix/Linux/Mac:
```bash
# Download and run setup script
curl -O https://raw.githubusercontent.com/yourusername/balinese-script-converter/main/setup.sh
chmod +x setup.sh
./setup.sh
```

#### For Windows:
```cmd
# Download and run setup script
curl -O https://raw.githubusercontent.com/yourusername/balinese-script-converter/main/setup.bat
setup.bat
```

### Option 2: Manual Setup

1. **Clone or create project directory**
   ```bash
   mkdir balinese-script-converter
   cd balinese-script-converter
   ```

2. **Install dependencies**
   ```bash
   npm init -y
   npm install next@14.0.4 react@^18.2.0 react-dom@^18.2.0 lucide-react@^0.263.1 bootstrap@^5.3.2
   npm install --save-dev @types/node@^20.10.5 @types/react@^18.2.45 @types/react-dom@^18.2.18 eslint@^8.56.0 eslint-config-next@14.0.4 typescript@^5.3.3
   ```

3. **Create directory structure**
   ```bash
   mkdir -p pages components styles public
   ```

4. **Copy all file contents** from the artifacts provided above

5. **Generate icons** using [favicon.io](https://favicon.io/favicon-generator/)
   - Text: "ᬅᬓ" (Balinese characters)
   - Background: #0d6efd
   - Download all sizes and place in `public/`

## 🔧 Development

### Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the app.

### Build for Production
```bash
npm run build
npm run start
```

### Export Static Site
```bash
npm run export
```
The static files will be in the `out/` directory.

### Lint Code
```bash
npm run lint
```

## 🎨 Customization

### Themes
The app supports both light and dark themes with automatic system detection. Users can manually toggle between themes.

### Fonts
- **Balinese Text**: Noto Sans Balinese (Google Fonts)
- **UI Text**: Inter (Google Fonts)
- **Monospace**: SF Mono, Monaco, Cascadia Code

### Colors
- **Primary**: #0d6efd (Bootstrap Blue)
- **Success**: #198754 (Bootstrap Green)
- **Dark**: #212529
- **Light**: #f8f9fa

## 📱 PWA Features

- **Installable**: Add to home screen on mobile devices
- **Offline Support**: Basic functionality works offline
- **App-like Experience**: Standalone display mode
- **Push Notifications**: Ready for implementation
- **Shortcuts**: Quick access to different modes

## 🌐 Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm run export
# Upload 'out' folder to Netlify
```

### GitHub Pages
```bash
npm install --save-dev gh-pages
# Add to package.json: "deploy": "next build && next export && gh-pages -d out"
npm run deploy
```

### Self-hosted
```bash
npm run build
npm run start
# Or serve the 'out' folder with any static server
```

## 🔤 Sanskrit Database

The converter includes a comprehensive Sanskrit database with:

- **100+ Terms**: Deities, philosophical concepts, scriptures
- **Categories**: 
  - Deities (25+ entries): Brahma, Vishnu, Shiva, etc.
  - Philosophy (30+ entries): Dharma, Karma, Yoga, etc.
  - Scriptures (15+ entries): Vedas, Upanishads, Puranas
  - Characters (20+ entries): Rama, Arjuna, Sita, etc.
  - Places (12+ entries): Kailash, Ayodhya, Lanka, etc.
  - Mantras (8+ entries): Om, Gayatri, Soham, etc.

- **V=W Equivalency**: Automatic conversion between V and W forms
- **Murda Forms**: Sanskrit words use appropriate capital letter forms
- **Auto-detection**: Smart recognition of Sanskrit vs. Balinese words

## 📚 Usage Examples

### Basic Conversion
```
Input:  "bali"
Output: "ᬩᬮᬶ"
```

### Sanskrit with V=W Support
```
Input:  "vishnu dharma"  or  "wisnu dharma"
Output: "ᬯᬶᬱ᭄ᬡᬸ ᬥᬃᬫ" (both produce same result)
```

### Mixed Text
```
Input:  "om swastyastu rahajeng semeng"
Output: "ᬒᬁ ᬲ᭄ᬯᬲ᭄ᬢ᭄ᬬᬲ᭄ᬢᬸ ᬭᬳᬚᬾᬂ ᬲᬾᬫᬾᬂ"
```

## 🛠️ Transliteration Rules

1. **Consonants**: Each consonant inherently contains vowel "a"
2. **Vowel Marks**: i, u, e, o are added as diacritical marks
3. **Pangkon**: Consonants at word end get virama (pangkon)
4. **Double Vowels**: aa, ii, uu represent long vowels
5. **Sanskrit Detection**: Automatic murda form application
6. **V=W Equivalency**: Both map to same Balinese character
7. **Numbers**: 0-9 convert to Balinese numerals
8. **Punctuation**: Basic punctuation support

## 🔧 Browser Support

- **Chrome**: ✅ Full support
- **Firefox**: ✅ Full support  
- **Safari**: ✅ Full support
- **Edge**: ✅ Full support
- **Mobile**: ✅ Responsive design

### Font Requirements
Ensure Balinese fonts are installed for proper display:
- **Web**: Automatically loaded via Google Fonts
- **System**: Noto Sans Balinese recommended

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Development Guidelines
- Follow TypeScript best practices
- Use Bootstrap classes for styling
- Maintain responsive design
- Test on multiple devices
- Document Sanskrit database additions

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Balinese Culture**: Preserving the beautiful Aksara Bali script
- **Sanskrit Tradition**: Honoring ancient philosophical texts
- **Open Source Community**: Built with amazing open source tools
- **Google Fonts**: Noto Sans Balinese font support
- **Unicode Consortium**: Balinese script standardization

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/balinese-script-converter/issues)
- **Documentation**: [Project Wiki](https://github.com/yourusername/balinese-script-converter/wiki)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/balinese-script-converter/discussions)

## 🔗 Related Links

- [Balinese Script (Wikipedia)](https://en.wikipedia.org/wiki/Balinese_script)
- [Unicode Balinese Block](https://www.unicode.org/charts/PDF/U1B00.pdf)
- [Noto Sans Balinese Font](https://fonts.google.com/noto/specimen/Noto+Sans+Balinese)
- [Sanskrit Language](https://en.wikipedia.org/wiki/Sanskrit)

## 📊 Roadmap

- [ ] **Audio Pronunciation**: Text-to-speech for Balinese text
- [ ] **OCR Support**: Image to text conversion
- [ ] **Advanced Editor**: Rich text editing with preview
- [ ] **API Endpoint**: RESTful API for developers
- [ ] **Mobile App**: Native iOS/Android applications
- [ ] **Extended Database**: More Sanskrit and Balinese terms
- [ ] **Collaboration**: Multi-user editing features
- [ ] **Export Formats**: PDF, DOCX, image export options

---

**Made with ❤️ for preserving Balinese culture and Sanskrit heritage**

*This tool is created for educational purposes and cultural preservation. Please use responsibly and help spread awareness about the beautiful Balinese script tradition.*