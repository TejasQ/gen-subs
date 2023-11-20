import ffmpeg from "fluent-ffmpeg";
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";
import { splitFilePath } from "./splitFilePath";
import { join } from "path";

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

export function burnInSubtitles(filePath: string, subPath: string) {
  const { pathWithoutExtension } = splitFilePath(subPath);
  const { extension } = splitFilePath(filePath);
  const outFile = `${pathWithoutExtension}-with-burned-subs${extension}`;
  return new Promise((resolve, reject) => {
    ffmpeg(filePath)
      .videoFilter("subtitles=" + subPath)
      .on("error", function (err) {
        reject(err);
      })
      .save(outFile)
      .on("end", function () {
        resolve(outFile);
      });
  });
}
