import { RecognitionResults } from "vosk";

type CssStyle = {
    color?: string; // Text color
    backgroundColor?: string; // Background color (simulated with border)
    box?: boolean; // Toggle for box-like background
    // ASS doesn't support padding and rounded corners in the CSS sense
};

function formatTime(time: number): string {
    const hours = Math.floor(time / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((time % 3600) / 60).toString().padStart(2, '0');
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    const centiseconds = Math.floor((time % 1) * 100).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}.${centiseconds}`;
}

function generateAssHeader(): string {
    return `[Script Info]
Title: Generated ASS
ScriptType: v4.00+
WrapStyle: 0
ScaledBorderAndShadow: yes
YCbCr Matrix: None

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Default, Arial, 20, &H00FFFFFF, &H00FFFFFF, &H00000000, &H00000000, 0, 0, 0, 0, 100, 100, 0, 0, 1, 1, 0, 2, 10, 10, 10, 1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
`;
}

function cssHexColorToAssBgr(hexColor: string): string {
    const bgr = hexColor.slice(1).match(/.{2}/g)?.reverse().join('');
    return bgr ? `&H00${bgr}&` : `&H00FFFFFF&`; // Default to white if invalid
}

function generateHighlightedWord(word: string, css: CssStyle): string {
    const textColor = css.color ? cssHexColorToAssBgr(css.color) : '&H00FFFFFF'; // Default: white
    const backgroundColor = css.backgroundColor ? cssHexColorToAssBgr(css.backgroundColor) : '&H00000000'; // Default: transparent
    const boxEffect = css.box ? '{\\bord4}{\\3c' + backgroundColor + '}' : '{\\bord0}';
    const defaultStyle = '{\\bord1}{\\shad0}{\\3c&H000000&}{\\1c&HFFFFFF&}'; // Default style

    // Apply styles to the highlighted word and reset immediately after
    return `${boxEffect}{\\1c${textColor}}${word}${defaultStyle}`;
}


export function createAssFromRecognitionResults(results: RecognitionResults[], highlightColor = '#048BA8'): string {
    let dialogues = '';

    if (!results.length) {
        throw new Error("No words identified to create subtitles from.");
    }

    results.forEach(r => {
        r.result.forEach((word, i) => {
            const startTime = formatTime(word.start);
            const endTime = formatTime(word.end);
            const textBefore = r.result.slice(Math.max(0, i - 5), i).map(w => w.word).join(' ');
            const highlightedWord = generateHighlightedWord(word.word, {
                backgroundColor: highlightColor,
                color: '#ffffff',
                box: true,
            });
            const textAfter = r.result.slice(i + 1, i + 6).map(w => w.word).join(' ');
            const lineText = textBefore + ' ' + highlightedWord + ' ' + textAfter;

            dialogues += `Dialogue: 0,${startTime},${endTime},Default,,0,0,0,,${lineText.trim()}\n`;
        });

    })
    return `${generateAssHeader()}
${dialogues}`;
}
