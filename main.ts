game.splash("song playing");

let lastNoteChange = 0;
let noteIndex = 0;
let msPer16th = 100; //extracted from midi
let totalMs = 0;
let tickRate = 20;
let index = 0;

let timedNotes = musicStorage.fullMidi;
game.onUpdateInterval(tickRate, function () {
    if (lastNoteChange + msPer16th <= totalMs) {
        while (noteIndex < timedNotes.length && timedNotes[noteIndex][0] <= totalMs) {
            musicStorage.playNote((timedNotes[noteIndex][3]), timedNotes[noteIndex][1], timedNotes[noteIndex][2]);
            noteIndex++;
        }
        lastNoteChange += msPer16th;
    }
    totalMs += tickRate;
});
