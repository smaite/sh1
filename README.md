# SEE English Learning Hub

A modern, interactive web platform for SEE (Secondary Education Examination) English preparation, featuring grammar lessons, writing exercises, quizzes, and an AI-powered navigation assistant.

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![Node.js](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 🌟 Features

### ✨ Modern UI/UX
- **3D Background Effects**: Interactive particle system with Three.js
- **Reactive Design**: Hover effects, animations, and smooth transitions
- **Glassmorphism**: Modern frosted glass design elements
- **Responsive**: Works perfectly on desktop, tablet, and mobile

### 📚 Learning Content
- **Grammar Section**: Articles, Prepositions, Tenses, Voice, Reported Speech, Question Tags, Causatives
- **Writing Skills**: Essays, Letters, Applications, Dialogues, News Writing, Reviews
- **Interactive Quizzes**: GK Quiz and grammar exercises
- **Sample Content**: Real examples for all writing formats

### 🤖 AI Navigation Bot
- **Smart Assistant**: Helps users navigate the site
- **Quick Actions**: Direct links to Grammar, Writing, and Quiz sections
- **Contextual Help**: Provides relevant information based on user queries

### 🚀 Performance
- **Optimized Assets**: Minified CSS and JavaScript
- **Fast Loading**: Compression and caching enabled
- **CDN Ready**: Built for Netlify deployment

## 📁 Project Structure

```
see-english-hub/
├── public/                 # Static files (served by Express/Netlify)
│   ├── css/               # Stylesheets
│   │   ├── main.css       # Main styles
│   │   └── aibot.css      # AI Bot styles
│   ├── js/                # JavaScript files
│   │   ├── effects.js     # 3D background effects
│   │   └── aibot.js       # AI navigation bot
│   ├── content/           # Learning content
│   │   ├── grammar/       # Grammar lessons
│   │   ├── writing/       # Writing exercises
│   │   └── gk/            # General Knowledge
│   ├── index.html         # Homepage
│   └── 404.html           # Error page
├── scripts/               # Build and utility scripts
│   └── build.js           # Netlify build script
├── server.js              # Express server (local dev)
├── netlify.toml           # Netlify configuration
├── package.json           # Node.js dependencies
└── README.md              # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18.0.0
- npm or yarn

### Installation

1. **Clone or download the repository**
```bash
cd see-english-hub
```

2. **Install dependencies**
```bash
npm install
```

3. **Run locally**
```bash
npm run dev
```

The site will be available at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

This creates a `dist/` folder optimized for Netlify deployment.

## 🌐 Deployment

### Netlify (Recommended)

1. **Connect to GitHub**
   - Push your code to GitHub
   - Connect repository to Netlify
   - Build command: `npm run build`
   - Publish directory: `dist`

2. **Deploy**
   - Netlify will automatically deploy on every push
   - Get a free `.netlify.app` domain
   - Or connect your custom domain

### Manual Deploy

```bash
npm run build
# Upload the dist/ folder to your hosting provider
```

## 📝 Adding Content

### Adding a New Grammar Topic

1. Create a folder in `public/content/grammar/topic-name/`
2. Add `index.html` with the lesson content
3. Link it from the main navigation in `public/index.html`

### Adding a New Writing Exercise

1. Create a folder in `public/content/writing/category/`
2. Add `index.html` with instructions and examples
3. Update the writing section in `public/index.html`

## 🎨 Customization

### Colors
Edit CSS variables in `public/css/main.css`:
```css
:root {
  --primary-color: #667eea;
  --secondary-color: #f5576c;
  --accent-color: #4facfe;
  /* ... */
}
```

### 3D Effects
Modify `public/js/effects.js` to change particle count, colors, or animation speed.

### AI Bot Responses
Edit the response logic in `public/js/aibot.js` in the `generateResponse()` method.

## 🔒 Security

- **Helmet.js**: Security headers enabled
- **CSP**: Content Security Policy configured
- **CORS**: Cross-origin resource sharing setup
- **Compression**: Gzip compression enabled

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 🤝 Contributing

This is an educational project by Nabaraj Dhungana. For feedback or suggestions:

**Email**: ndhungana2076@gmail.com

**School**: Paschimanchal English School, Siddharthanagar-6, Rupandehi

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Nabaraj Dhungana** - Developer and Content Creator
- **Paschimanchal English School** - Support and Testing
- **Students** - For feedback and inspiration

---

**Made with ❤️ for SEE Students in Nepal**

*Version 2.0.0 | Last Updated: 2024*
