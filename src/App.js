import React from 'react';
import logo from './logo.svg';
import './App.css';

import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano';
import 'react-piano/dist/styles.css';

function App() {
  const firstNote = MidiNumbers.fromNote('c3');
  const lastNote = MidiNumbers.fromNote('f5');
  const keyboardShortcuts = KeyboardShortcuts.create({
    firstNote: firstNote,
    lastNote: lastNote,
    keyboardConfig: KeyboardShortcuts.HOME_ROW,
  });

  function playSound() {
    // Array of sounds for each piano key
    const pianoSounds = [
      "sounds/A.wav",
      "sounds/ASharp.wav",
      "sounds/B.wav",
      "sounds/C.wav",
      "sounds/CSharp.wav",
      "sounds/D.wav",
      "sounds/DSharp.wav",
      "sounds/E.wav",
      "sounds/F.wav",
      "sounds/FSharp.wav",
      "sounds/G.wav",
      "sounds/GSharp.wav",
    ];
    // Generate a random note from the sounds array
    const randomNote = pianoSounds[Math.floor(Math.random() * pianoSounds.length)];
    // Get the audio element
    const audio = document.querySelector(".piano-audio");
    // Set the src of the source within the audio element to the random note
    audio.querySelector(".piano-note").setAttribute("src", randomNote);
    // Load and play the audio
    audio.load();
    audio.play();
  }

  return (
    <div>
      <Piano
        noteRange={{ first: firstNote, last: lastNote }}
        playNote={(midiNumber) => {
          // Play a given note - see notes below
        }}
        stopNote={(midiNumber) => {
          // Stop playing a given note - see notes below
        }}
        width={1000}
        keyboardShortcuts={keyboardShortcuts}
      />
      {/* Clicking the button will play any one of the sounds below */}
      <button type="button" onClick={playSound}>Play Note</button>
      <audio className="piano-audio">
        <source className="piano-note" src="" type="audio/wav"></source>
      </audio>
    </div>
    // <Piano
    //   noteRange={{ first: firstNote, last: lastNote }}
    //   playNote={(midiNumber) => {
    //     // Play a given note - see notes below
    //   }}
    //   stopNote={(midiNumber) => {
    //     // Stop playing a given note - see notes below
    //   }}
    //   width={1000}
    //   keyboardShortcuts={keyboardShortcuts}
    // />
  );
}

export default App;
