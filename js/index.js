// Initializing SpeechSynthesis

const synth = window.speechSynthesis;

// DOM Elements

const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');

let voices = [];

const getVoices = () => {
    voices = synth.getVoices();
    // Loop tofill the select element with voices we get from synth.getVoices()
    voices.forEach(voice => {
        
        // creating DOM element option for select element
        const option = document.createElement('option');
        option.textContent = voice.name + '(' + voice.lang + ')';

        // set needed option attributes 
        option.setAttribute('data-name', voice.name);
        option.setAttribute('data-lang', voice.lang);
        
        // adding option to the select element
        voiceSelect.appendChild(option);
    });
};

getVoices();

if(synth.onvoiceschanged !== undefined){
    synth.onvoiceschanged = getVoices();
}

// speak function
const speak = () => {
    //check speaking
    if(synth.speaking){
        console.log('Already Speaking...');
        return
    }
    if(textInput.value !== ''){
        // getting speaking text
        const speakText = new SpeechSynthesisUtterance(textInput.value);
        
        // speak end
        speakText.onend = e => {
            console.log('Speaking Done...');
        }
        speakText.onerror = e => {
            console.error('Error happend :(');
        }
        
        // getting selected voice in select element
        const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

        // [loop] assinging speakText voice that in voices array by selectedVoice
        voices.forEach(voice => {
            if(voice.name === selectedVoice){
                speakText.voice = voice;
            }
        });

        //setting pitch and rate values to the speakText
        speakText.rate = rate.value;
        speakText.pitch = pitch.value;

        //speak
        synth.speak(speakText);
    }
};

// Event Listeners

// text form
textForm.addEventListener('submit', e => {
    e.preventDefault();
    speak();
    textInput.blur();
});

// to reflect rate input change in rate div
rate.addEventListener('change', e => rateValue.textContent = rate.value);

// to reflect pitch input change in pitch div
pitch.addEventListener('change', e => pitchValue.textContent = pitch.value);

// voice select change
voiceSelect.addEventListener('change', e => speak())