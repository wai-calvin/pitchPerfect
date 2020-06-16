import React from 'react';
import './App.css';

import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano';
import 'react-piano/dist/styles.css';

function App() {
  const firstNote = MidiNumbers.fromNote('c3');
  const lastNote = MidiNumbers.fromNote('b3');
  const keyboardShortcuts = KeyboardShortcuts.create({
    firstNote: firstNote,
    lastNote: lastNote,
    keyboardConfig: KeyboardShortcuts.HOME_ROW,
  });
  // Array of sounds for each piano key
  const pianoSounds = [
    "sounds/C.wav",
    "sounds/CSharp.wav",
    "sounds/D.wav",
    "sounds/DSharp.wav",
    "sounds/E.wav",
    "sounds/F.wav",
    "sounds/FSharp.wav",
    "sounds/G.wav",
    "sounds/GSharp.wav",
    "sounds/A.wav",
    "sounds/ASharp.wav",
    "sounds/B.wav",
  ];

  function playSound(index, audioClass) {
    // Get the audio element
    const audio = document.querySelector(audioClass);
    // Set the src of the source within the audio element to the random note
    audio.querySelector(".piano-note").setAttribute("src", pianoSounds[index]);
    // Load and play the audio
    audio.load();
    audio.play();
  }

  function playRandomSound() {
    // Generate a random note from the sounds array
    const randomNoteIndex = Math.floor(Math.random() * pianoSounds.length);
    playSound(randomNoteIndex, ".random-piano-audio");
  }

  return (
    <div>
      <Piano
        noteRange={{ first: firstNote, last: lastNote }}
        playNote={(midiNumber) => {
          // Play a given note - see notes below
          console.log(`Played ${pianoSounds[midiNumber - firstNote]}`)
          playSound(midiNumber - firstNote, ".piano-component-audio");
        }}
        stopNote={(midiNumber) => {
          // Stop playing a given note - see notes below
        }}
        width={750}
        keyboardShortcuts={keyboardShortcuts}
      />
      {/* Clicking the button will play any one of the sounds below */}
      <button type="button" onClick={playRandomSound}>Play Note</button>
      <audio className="random-piano-audio">
        <source className="piano-note" src="" type="audio/wav"></source>
      </audio>
      <audio className="piano-component-audio">
        <source className="piano-note" src="" type="audio/wav"></source>
      </audio>
    </div>
  );
}

export default App;
