import { stringifySync } from "subtitle";
import { createCueFromWords } from "./createCueFromWords";
import { RecognitionResults } from "vosk";

export async function createSrtFromRecognitionResults(results: RecognitionResults[]) {
  const WORDS_PER_LINE = 7;
  const subtitles: SubtitleCue[] = [];

  if (!results.length) {
    throw new Error("No words identified to create subtitles from.");
  }

  results.forEach(({ result: words }) => {
    if (!words) return;
    for (let start = 0; start < words.length; start += WORDS_PER_LINE) {
      const end = Math.min(start + WORDS_PER_LINE - 1, words.length - 1);
      const cue = createCueFromWords(words, start, end);
      subtitles.push(cue);
    }
  });

  return stringifySync(subtitles, { format: "SRT" });
}
