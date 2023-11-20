import * as wav from "wav";
import { Readable } from "stream";
import { createReadStream } from "fs";
import vosk, { RecognitionResults } from "vosk";
import { Ora } from "ora";
import { loadModel } from "./loadModel";
import { stat } from "fs/promises";
import { join } from "path";
import { __dirname, workingDir } from "./util";

export const createTextFromAudioFile = (
  spinner: Ora,
  fileName: string,
  modelName: string
): Promise<RecognitionResults[]> =>
  new Promise(async (resolve, reject) => {
    const model = await loadModel(join(workingDir, "models", modelName));
    spinner.text = "Listening...";

    if (!fileName) {
      throw new Error("Source audio file name is not provided.");
    }

    const fileStats = await stat(fileName);
    const totalSize = fileStats.size;
    let bytesRead = 0;
    let lastLoggedPercentage = 0;

    const updateProgressBar = (currentSize: number) => {
      const percentage = Math.round((currentSize / totalSize) * 100);
      const totalResults = results.length;
      const preview = results.map((result) => result.text).join(" ");
      if (percentage !== lastLoggedPercentage) {
        spinner.text = `Listening... (${percentage}%).\nHeard so far:\n\n\t${totalResults > 1 ? `[...] ${preview.slice(-360)} [...]` : preview}`;
        lastLoggedPercentage = percentage;
      }
    };

    const wfReader = new wav.Reader();
    const wfReadable = new Readable().wrap(wfReader);
    let results: RecognitionResults[] = [];

    wfReader.on("format", async (format: AudioFormat) => {
      if (format.audioFormat !== 1 || format.channels !== 1) {
        throw new Error("Audio file must be WAV format mono PCM.");
      }
      spinner.text = "Creating recognizer...";
      const recognizer = new vosk.Recognizer({
        model,
        sampleRate: format.sampleRate,
      });
      recognizer.setWords(true);

      spinner.text = "Listening. Heard so far: ";

      for await (const data of wfReadable) {
        bytesRead += data.length;
        updateProgressBar(bytesRead);
        const endOfSpeech = recognizer.acceptWaveform(data);
        if (endOfSpeech) {
          const result = recognizer.result();
          results.push(result);
        }
      }
      spinner.clear();
      recognizer.free();
      model.free();
      resolve(results);
    });

    createReadStream(fileName, { highWaterMark: 4096 })
      .pipe(wfReader)
      .on("error", reject);
  });
