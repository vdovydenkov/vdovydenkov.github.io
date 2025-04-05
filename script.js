const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Ноты мелодии
const notes = [
    { note: 'E4', duration: 1, time: 0 },
    { note: 'C5', duration: 0.4, time: 1 },
    { note: 'C5', duration: 0.4, time: 1.5 },
    { note: 'C5', duration: 0.4, time: 2 },
    { note: 'C5', duration: 0.4, time: 2.5 },
    { note: 'C5', duration: 0.9, time: 3 },
    { note: 'B4', duration: 0.4, time: 4 },

    { note: 'B4', duration: 0.4, time: 4.5 },
    { note: 'D5', duration: 0.4, time: 5 },
    { note: 'D5', duration: 0.4, time: 5.5 },
    { note: 'C5', duration: 0.4, time: 6 },
    { note: 'B4', duration: 0.4, time: 6.5 },
    { note: 'B4', duration: 0.5, time: 7 },
    { note: 'C5', duration: 0.5, time: 7.5 },
    { note: 'A4', duration: 0.5, time: 8 }
];

function playFrequency(frequency, startTime, duration) {
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime + startTime);
    const gainNode = audioContext.createGain();
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime + startTime);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.start(audioContext.currentTime + startTime);
    oscillator.stop(audioContext.currentTime + startTime + duration);
}

function noteToFrequency(note) {
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const regex = /^([A-G]#?)(\d)$/;
    const match = note.match(regex);

    if (!match) return 440;

    const [, pitch, octave] = match;
    const noteIndex = notes.indexOf(pitch);
    if (noteIndex === -1) return 440;

    const midiNumber = noteIndex + (parseInt(octave) + 1) * 12;
    return +(440 * Math.pow(2, (midiNumber - 69) / 12)).toFixed(2);
}

function playNote(note) {
    playFrequency(noteToFrequency(note), 0, 0.5);
}

function playMelody() {
    notes.forEach(({ note, time, duration }) => {
        playFrequency(noteToFrequency(note), time, duration);
    });
}

const container = document.createElement('div');
document.body.appendChild(container);

notes.forEach(({ note }) => {
    const button = document.createElement('button');
    button.textContent = note;
    button.onclick = () => playNote(note);
    container.appendChild(button);
});

const playAllButton = document.createElement('button');
playAllButton.textContent = 'Воспроизвести';
playAllButton.onclick = playMelody;
container.appendChild(document.createElement('br'));
container.appendChild(playAllButton);

