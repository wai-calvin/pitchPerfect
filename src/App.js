import React from 'react';
import './App.css';

import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano';
import 'react-piano/dist/styles.css';

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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.playSound = this.playSound.bind(this);
    this.playRandomSound = this.playRandomSound.bind(this);

    this.state = {
      userSound: '',
      randomSound: ''
    }
  }

  playSound(index, audioClass) {
    // Get the audio element
    const audio = document.querySelector(audioClass);
    // Set the src of the source within the audio element to the random note
    audio.querySelector(".piano-note").setAttribute("src", pianoSounds[index]);
    // Load and play the audio
    audio.load();
    audio.play();
  }

  playRandomSound() {
    // Generate a random note from the sounds array
    const randomNoteIndex = Math.floor(Math.random() * pianoSounds.length);
    this.setState({randomSound: pianoSounds[randomNoteIndex]}, function() {
      console.log("Random State " + this.state["randomSound"]);
    });
    this.playSound(randomNoteIndex, ".random-piano-audio");
  }

  render() {
    return (
      <div>
        <Piano
          noteRange={{ first: firstNote, last: lastNote }}
          playNote={(midiNumber) => {
            // Play a given note - see notes below
            // console.log(`Played ${pianoSounds[midiNumber - firstNote]}`)
            this.setState({userSound: pianoSounds[midiNumber - firstNote]}, function() {
              console.log("User State " + this.state["userSound"]);
              if (this.state["userSound"] === this.state["randomSound"]) {
                console.log("Correct!");
              } else {
                console.log("Sorry, try again!");
              }
            });
            this.playSound(midiNumber - firstNote, ".piano-component-audio");
          }}
          stopNote={(midiNumber) => {
            // Stop playing a given note - see notes below
            // const audio = document.querySelector(".piano-component-audio");
            // audio.pause();
          }}
          width={750}
          keyboardShortcuts={keyboardShortcuts}
        />
        {/* Clicking the button will play any one of the sounds below */}
        <button type="button" onClick={this.playRandomSound}>Play Note</button>
        <audio className="random-piano-audio">
          <source className="piano-note" src="" type="audio/wav"></source>
        </audio>
        <audio className="piano-component-audio">
          <source className="piano-note" src="" type="audio/wav"></source>
        </audio>
      </div>
    );
  }
}

export default App;
