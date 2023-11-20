export function createCueFromWords(
  words: Word[],
  start: number,
  end: number,
): SubtitleCue {
  const text = words
    .slice(start, end + 1)
    .map((w) => w.word)
    .join(" ");
  return {
    type: "cue",
    data: {
      start: words[start].start * 1000,
      end: words[end].end * 1000,
      text: text,
    },
  };
}
