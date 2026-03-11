/**
 * Silo AI - Real-time Voice Translator
 * Logic for Speech Recognition and Translation
 */

const micBtn = document.getElementById('mic-btn');
const micLabel = document.getElementById('mic-label');
const langToggle = document.getElementById('lang-toggle');
const sourceText = document.getElementById('source-text');
const translatedText = document.getElementById('translated-text');
const micStatus = document.getElementById('mic-status');
const currentInputLangLabel = document.getElementById('current-input-lang');
const currentOutputLangLabel = document.getElementById('current-output-lang');
const labelFrom = document.getElementById('label-from');
const labelTo = document.getElementById('label-to');
const copyBtn = document.getElementById('copy-btn');

// State
let isListening = false;
let recognition = null;
let mode = 'en-fi'; // en-fi or fi-en

// Translation API Config (MyMemory API - Free tier)
const TRANSLATE_API = "https://api.mymemory.translated.net/get";

// Initialize Speech Recognition
function initRecognition() {
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!window.SpeechRecognition) {
        sourceText.innerText = "Speech Recognition not supported in this browser. Please use Chrome or Edge.";
        micBtn.disabled = true;
        return null;
    }

    const rec = new SpeechRecognition();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = mode === 'en-fi' ? 'en-US' : 'fi-FI';

    rec.onstart = () => {
        isListening = true;
        micBtn.parentElement.classList.add('listening');
        micStatus.classList.add('active');
        micLabel.innerText = "Listening...";
    };

    rec.onend = () => {
        isListening = false;
        micBtn.parentElement.classList.remove('listening');
        micStatus.classList.remove('active');
        micLabel.innerText = "Press to Start Translating";
    };

    rec.onerror = (event) => {
        console.error("Speech Recognition Error:", event.error);
        if (event.error === 'not-allowed') {
            sourceText.innerText = "Microphone access denied. Please enable it in browser settings.";
        }
    };

    rec.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                finalTranscript += event.results[i][0].transcript;
            } else {
                interimTranscript += event.results[i][0].transcript;
            }
        }

        if (finalTranscript || interimTranscript) {
            const textToProcess = finalTranscript || interimTranscript;
            sourceText.innerText = textToProcess;
            
            // Trigger translation if we have final text or substantial interim text
            if (finalTranscript) {
                translate(finalTranscript);
            }
        }
    };

    return rec;
}

// Translation Function
async function translate(text) {
    if (!text || text.trim().length === 0) return;

    const from = mode === 'en-fi' ? 'en' : 'fi';
    const to = mode === 'en-fi' ? 'fi' : 'en';

    translatedText.innerText = "Translating...";

    try {
        const response = await fetch(`${TRANSLATE_API}?q=${encodeURIComponent(text)}&langpair=${from}|${to}`);
        const data = await response.json();

        if (data.responseData) {
            translatedText.innerText = data.responseData.translatedText;
        } else {
            translatedText.innerText = "Translation failed. Try again.";
        }
    } catch (error) {
        console.error("Translation error:", error);
        translatedText.innerText = "Error connecting to translation service.";
    }
}

// Event Listeners
micBtn.addEventListener('click', () => {
    if (!recognition) {
        recognition = initRecognition();
    }

    if (isListening) {
        recognition.stop();
    } else {
        recognition.start();
    }
});

langToggle.addEventListener('change', () => {
    mode = langToggle.checked ? 'fi-en' : 'en-fi';
    
    // Update Labels
    if (mode === 'en-fi') {
        labelFrom.classList.add('active');
        labelTo.classList.remove('active');
        currentInputLangLabel.innerText = "Listening English...";
        currentOutputLangLabel.innerText = "Finnish Translation";
        sourceText.innerText = "Speak now...";
    } else {
        labelFrom.classList.remove('active');
        labelTo.classList.add('active');
        currentInputLangLabel.innerText = "Kuunnellaan (Finnish)...";
        currentOutputLangLabel.innerText = "English Translation";
        sourceText.innerText = "Puhu nyt...";
    }

    // Reset translated text
    translatedText.innerText = "Translations will appear here...";

    // Restart recognition with new language if it was active
    if (isListening) {
        recognition.stop();
        recognition = initRecognition();
        setTimeout(() => recognition.start(), 300);
    } else {
        recognition = initRecognition();
    }
});

copyBtn.addEventListener('click', () => {
    const text = translatedText.innerText;
    if (text && text !== "Translations will appear here..." && text !== "Translating...") {
        navigator.clipboard.writeText(text).then(() => {
            const originalTitle = copyBtn.getAttribute('title');
            copyBtn.setAttribute('title', 'Copied!');
            setTimeout(() => copyBtn.setAttribute('title', originalTitle), 2000);
        });
    }
});

// Initialize UI
labelFrom.classList.add('active');
recognition = initRecognition();
