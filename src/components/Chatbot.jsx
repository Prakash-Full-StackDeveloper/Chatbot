 //  Voice to Text & Text to Voice
 //  Prakash kumar sahoo

import React, { useState } from 'react';

const Chatbot = () => {
  const [transcript, setTranscript] = useState('');
  const [speaking, setSpeaking] = useState(false);

  // Check for SpeechRecognition API support
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  const handleVoiceRecording = () => {
    if (!SpeechRecognition) {
      alert("Sorry, your browser does not support speech recognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      setTranscript(speechResult);
      speakText(speechResult);
    };

    recognition.onerror = (event) => {
      if (event.error === 'not-allowed') {
        alert('Microphone access denied. Please allow access and try again.');
      } else {
        console.error('Speech recognition error detected: ' + event.error);
      }
    };

    recognition.start();
  };

  // Speech Synthesis for Text to Speech
  const speakText = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h2>Voice to Text & Text to Voice</h2>
      <h3>Developed by @Prakash</h3>
      <p>Click the button below to start recording your voice.</p>
      <button
        onClick={handleVoiceRecording}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          backgroundColor: '#61dafb',
          border: 'none',
          borderRadius: '5px',
          marginTop: '20px',
        }}
        disabled={speaking}
      >
        Start Recording
      </button>
      {transcript && (
        <div style={{ marginTop: '30px' }}>
          <h3>Transcript:</h3>
          <p>{transcript}</p>
        </div>
      )}
    </div>
  );
};

export default Chatbot;

// Prakash kumar sahoo