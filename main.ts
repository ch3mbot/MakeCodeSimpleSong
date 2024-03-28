game.splash("song playing");

let lastNoteChange = 0;
let noteIndex = 0;
let msPer16th = 100; //extracted from midi
let totalMs = 0;
let tickRate = 20;
let index = 0;

let bufferOffsetIndex = 0;
let currentParityBit = 0;
let restingTime = 0;
let nextNoteChange = 0;
let nextNoteData: number[] = musicStorage.getNoteFromBufferV2(0);
let lastNoteData: number[];

function flipParityBit() {
    currentParityBit = 1 - currentParityBit;
    //game.splash("flipper: " + currentParityBit);
}

let validNotesPlayed = 0;

game.onUpdateInterval(tickRate, function () {
    if (lastNoteChange + msPer16th <= totalMs) {
        //while (noteIndex < timedNotes.length && timedNotes[noteIndex][0] <= totalMs) {
        //    musicStorage.playNote((timedNotes[noteIndex][3]), timedNotes[noteIndex][1], timedNotes[noteIndex][2]);
        //    noteIndex++;
        //}

        //while (noteIndex < timedNotes.length && nextNoteData[0] * msPer16th <= totalMs) {
        //    musicStorage.playNote(nextNoteData[3], musicStorage.noteIndexToFrequency(nextNoteData[1]), nextNoteData[2] * msPer16th);
        //    noteIndex++;
        //    nextNoteData = musicStorage.getNoteFromBuffer(noteIndex);
        //}

        if (restingTime >= msPer16th) {
            restingTime -= msPer16th;
        }
        else {
            flipParityBit();
            while (nextNoteData[0] == currentParityBit) {
                if (nextNoteData[1] != 0) {
                    musicStorage.playNote(nextNoteData[4], musicStorage.noteIndexToFrequency(nextNoteData[2]), (nextNoteData[3] + 1) * msPer16th);
                    validNotesPlayed++;
                    //game.splash("playa");
                } else {
                    restingTime = (nextNoteData[2] - 1) * msPer16th;
                }
                bufferOffsetIndex++;
                lastNoteData = nextNoteData;
                nextNoteData = musicStorage.getNoteFromBufferV2(bufferOffsetIndex);
            }

        }
        lastNoteChange += msPer16th;
    }
    totalMs += tickRate;
});