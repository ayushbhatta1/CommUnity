# CommUnity - Social Support Platform

CommUnity is a web application designed to empower underserved individuals by connecting them to critical local resources, job opportunities, and language tools — all powered by AI.

## Features

- 🧭 **Local Resource Finder**: Find nearby services using AI/NLP + Google Maps
- 💼 **Job & Skills Assistant**: Matches users to job listings and training programs
- 🌐 **Language Access Tool**: Real-time translation for non-English speakers
- 💬 **AI Chat Assistant**: Get guidance and support through an AI-powered chatbot
- 👥 **Community Posts**: Share and connect with others in the community

## Community Support Resources

### Health Resources

- **Community Clinics**
  - Free or low-cost primary care services
  - No insurance required
  - Walk-in appointments available
  - Locations: Downtown Medical Center, Westside Health Clinic, Eastside Family Health

- **Mental Health Support**
  - Free counseling services
  - Support groups for various needs
  - Crisis hotline: 24/7 availability
  - Contact: (555) 123-4567

- **Mobile Health Units**
  - Weekly visits to underserved neighborhoods
  - Basic health screenings
  - Vaccination services
  - Schedule available on our mobile app

### Housing Assistance

- **Emergency Shelters**
  - 24/7 access for immediate needs
  - Basic amenities provided
  - No pre-registration required
  - Locations: Central Shelter, Northside Emergency Housing

- **Transitional Housing**
  - 3-6 month programs
  - Case management services
  - Job placement assistance
  - Application process through our website

- **Affordable Housing Programs**
  - Income-based rent
  - Long-term housing solutions
  - Application assistance available
  - Contact: Housing Support Line (555) 987-6543

### Free Food Access

- **Food Banks**
  - Weekly grocery distribution
  - No ID required
  - Open: Mon-Fri 9AM-5PM
  - Locations: Central Food Bank, Community Pantry

- **Soup Kitchens**
  - Daily hot meals
  - Open to all
  - Hours: 11AM-2PM, 5PM-7PM
  - No registration needed

- **Community Food Pantries**
  - Monthly food boxes
  - Basic registration required
  - Open: Tue-Sat 10AM-4PM
  - Bring reusable bags if possible

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
