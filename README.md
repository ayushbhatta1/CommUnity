<<<<<<< HEAD
# CommUnity
=======
# CommUnity - Social Support Platform

CommUnity is a web application designed to empower underserved individuals by connecting them to critical local resources, job opportunities, and language tools — all powered by AI.

## Features

- 🧭 **Local Resource Finder**: Find nearby services using AI/NLP + Google Maps
- 💼 **Job & Skills Assistant**: Matches users to job listings and training programs
- 🌐 **Language Access Tool**: Real-time translation for non-English speakers
- 💬 **AI Chat Assistant**: Get guidance and support through an AI-powered chatbot
- 👥 **Community Posts**: Share and connect with others in the community

## Prerequisites

- Node.js (v14 or higher)
- Modern web browser with JavaScript enabled
- API keys for:
  - Google Maps
  - OpenAI
  - Google Translate

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/community.git
   cd community
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure API keys:
   - Create a `.env` file in the root directory
   - Add your API keys:
     ```
     GOOGLE_MAPS_API_KEY=your_maps_api_key
     OPENAI_API_KEY=your_openai_api_key
     GOOGLE_TRANSLATE_API_KEY=your_translate_api_key
     ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Open your browser and navigate to `http://localhost:3000`

## Development

### Project Structure

```
community/
├── assets/
│   ├── icons/        # PWA icons
│   ├── screenshots/  # PWA screenshots
│   └── logo.svg      # Application logo
├── css/
│   ├── styles.css    # Core styles
│   └── dashboard.css # Dashboard styles
├── js/
│   ├── app.js        # Main application logic
│   ├── chat.js       # AI chat functionality
│   ├── maps.js       # Google Maps integration
│   └── translate.js  # Translation functionality
├── index.html        # Main HTML file
├── manifest.json     # PWA configuration
├── sw.js            # Service Worker
└── README.md        # This file
```

### Building for Production

1. Build the application:
   ```bash
   npm run build
   ```

2. The production-ready files will be in the `dist` directory

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- OpenAI for the AI chat functionality
- Google Maps for location services
- Google Translate for language support
- All contributors and supporters of the project 
>>>>>>> b15db1c (First commit — project 5 kickoff)
