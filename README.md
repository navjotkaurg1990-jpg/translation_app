# Navjot AI - Real-time Voice Translator

A premium, modern web application designed for real-time voice translation between English and Finnish. Built with a sleek dark-mode glassmorphic user interface, Navjot AI provides a seamless translation experience utilizing browser-native technologies and free translation APIs.

---

## ✨ Features

- **Bidirectional Speech Recognition**: Translates from English to Finnish and from Finnish to English, powered by the native Web Speech API (`SpeechRecognition`).
- **Instant Translation**: Utilizes the MyMemory Translation API to fetch translation results dynamically as you speak.
- **Integrated Video Feed**: A built-in camera overlay option enables presenters or speakers to show their camera feed, making the layout feel like an interactive video translation overlay.
- **Copy to Clipboard**: Quick copy functionality with temporary visual success indicators to easily capture translated text.
- **Premium Glassmorphic UI**: Beautiful background gradients, blur layers, responsive flex layouts, and custom state animations (e.g., listening/pulsing micro-interactions).
- **Fully Responsive**: Optimized to provide a polished experience across desktop, tablet, and mobile devices.

---

## 🛠️ Technology Stack

- **Frontend Core**: Semantic HTML5 & Vanilla JavaScript
- **Styling**: Modern CSS3 (featuring HSL variables, glassmorphism gradients, active animations, and custom media queries)
- **Typography**: Outfit Font from Google Fonts
- **APIs**:
  - Web Speech API (`webkitSpeechRecognition` / `SpeechRecognition`)
  - MediaDevices API (`getUserMedia`)
  - [MyMemory Translation API](https://mymemory.translated.net/)

---

## 🚀 Getting Started

### Prerequisites

To utilize all features of the application, including speech-to-text, you should run it in a browser with full support for the Web Speech API (such as **Google Chrome** or **Microsoft Edge**).

### Running Locally

Since this is a client-side vanilla web application, running it is simple:

1. Clone this repository or download the source code:
   ```bash
   git clone https://github.com/navjotkaurg1990-jpg/translation_app.git
   ```
2. Open `index.html` directly in your web browser, or use a local development server (like VS Code's Live Server or `npx serve`):
   ```bash
   npx serve .
   ```
3. Grant permission to use your **microphone** and **camera** when prompted by the application.

---

## 📖 How to Use

1. **Select Direction**: Use the toggle switch at the top to choose between **English ↔ Finnish** mode.
2. **Toggle Camera (Optional)**: Click the camera icon button next to the language switch to show or hide the camera feed.
3. **Start Translating**: Click the main gradient Microphone button at the bottom. The button will pulse, and the status dot will turn green when listening.
4. **Speak**: Speak clearly into your microphone. Your spoken text will appear in the top card in real-time.
5. **View Translation**: The translated version will automatically display in the bottom card.
6. **Copy Translation**: Click the copy icon in the translation card to copy the text to your clipboard.
