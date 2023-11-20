import { splitFilePath } from "./splitFilePath";
import ffmpeg from "fluent-ffmpeg";
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

export function embedSubtitles(videoPath: string, subtitlesPath: string) {
  const { extension } = splitFilePath(videoPath);
  const { pathWithoutExtension } = splitFilePath(subtitlesPath);
  const outFile = `${pathWithoutExtension}-with-meta-subtitles${extension}`;
  return new Promise((resolve, reject) => {
    ffmpeg(videoPath)
      .outputOptions("-c copy") // Copy the video and audio streams without re-encoding
      .outputOptions("-c:s mov_text") // Specify the codec for subtitles (if needed)
      .outputOptions(`-metadata:s:s:0 language=eng`) // Optional: set subtitle language
      .addInput(subtitlesPath)
      .on("end", () => {
        resolve(outFile);
      })
      .on("error", (err) => {
        reject(err);
      })
      .save(outFile);
  });
}
